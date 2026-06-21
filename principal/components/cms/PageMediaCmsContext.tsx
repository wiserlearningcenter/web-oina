"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PageMediaCmsPanels } from "@/components/cms/PageMediaCmsPanels";
import {
  fetchCmsDraft,
  saveCmsDraft,
} from "@/lib/cms/api-client";
import {
  isCmsEditOrigin,
  postToEditor,
  type CmsEditMessage,
} from "@/lib/cms/edit-bridge";
import { registerCmsEditInit } from "@/lib/cms/edit-session";
import { useCmsEditMode } from "@/hooks/useCmsEditMode";
import {
  emptyPageMediaCard,
  emptyPageMediaSection,
  mergePageMediaIntoDoc,
  pageMediaForPage,
} from "@/lib/cms/page-media";
import { isCmsEnabled, useCmsDocument } from "@/lib/cms/provider";
import type {
  CmsDocument,
  CmsPageMediaCard,
  CmsPageMediaSection,
  CmsPageMediaTarget,
} from "@/lib/cms/types";

type PageMediaCmsEditContextValue = {
  ready: boolean;
  pageId: CmsPageMediaTarget;
  sections: CmsPageMediaSection[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  patchSection: (id: string, patch: Partial<CmsPageMediaSection>) => void;
  patchCard: (
    sectionId: string,
    cardId: string,
    patch: Partial<CmsPageMediaCard>,
  ) => void;
  addSection: () => string;
  addCard: (sectionId: string) => string;
  deleteSection: (id: string) => void;
  deleteCard: (sectionId: string, cardId: string) => void;
  saveDraft: () => Promise<void>;
  dirty: boolean;
  busy: boolean;
  token: string | null;
};

const PageMediaCmsEditContext =
  createContext<PageMediaCmsEditContextValue | null>(null);

export function usePageMediaCmsEdit() {
  return useContext(PageMediaCmsEditContext);
}

export function usePageMediaDisplay(pageId: CmsPageMediaTarget) {
  const edit = usePageMediaCmsEdit();
  const cms = useCmsDocument();
  if (edit?.ready && edit.pageId === pageId) return edit.sections;
  if (isCmsEnabled()) {
    return pageMediaForPage(cms?.sections.pageMediaSections, pageId);
  }
  return [];
}

function PageMediaCmsEditInner({
  pageId,
  children,
}: {
  pageId: CmsPageMediaTarget;
  children: ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [sections, setSections] = useState<CmsPageMediaSection[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const ready = !!token;

  const markDirty = useCallback(() => {
    setDirty(true);
    postToEditor({ type: "cms-dirty", dirty: true });
  }, []);

  const applyLoadedDoc = useCallback(
    (draft: CmsDocument) => {
      setSections(pageMediaForPage(draft.sections.pageMediaSections, pageId));
    },
    [pageId],
  );

  const saveDraft = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    setStatus("Guardando fotos y videos…");
    try {
      const latest = await fetchCmsDraft("acropolis");
      const next = mergePageMediaIntoDoc(latest, pageId, sections);
      await saveCmsDraft("acropolis", token, next);
      setDirty(false);
      setStatus("Borrador guardado.");
      postToEditor({ type: "cms-status", text: "Medios guardados.", ok: true });
    } catch (e) {
      setStatus(String(e));
      postToEditor({ type: "cms-status", text: String(e), ok: false });
    } finally {
      setBusy(false);
    }
  }, [token, pageId, sections]);

  useEffect(() => {
    return registerCmsEditInit((initToken) => {
      setToken(initToken);
      fetchCmsDraft("acropolis")
        .then((draft) => applyLoadedDoc(draft))
        .catch(() => setStatus("No se pudo cargar medios."));
    }, "acropolis");
  }, [applyLoadedDoc]);

  useEffect(() => {
    function onMessage(ev: MessageEvent<CmsEditMessage>) {
      if (!isCmsEditOrigin(ev.origin)) return;
      const msg = ev.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "cms-save" && dirty) {
        window.setTimeout(() => void saveDraft(), 350);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [saveDraft, dirty]);

  const patchSection = useCallback(
    (id: string, patch: Partial<CmsPageMediaSection>) => {
      setSections((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      );
      markDirty();
    },
    [markDirty],
  );

  const patchCard = useCallback(
    (
      sectionId: string,
      cardId: string,
      patch: Partial<CmsPageMediaCard>,
    ) => {
      setSections((prev) =>
        prev.map((s) =>
          s.id !== sectionId
            ? s
            : {
                ...s,
                cards: s.cards.map((c) =>
                  c.id === cardId ? { ...c, ...patch } : c,
                ),
              },
        ),
      );
      markDirty();
    },
    [markDirty],
  );

  const addSection = useCallback(() => {
    const item = emptyPageMediaSection(pageId);
    setSections((prev) => [...prev, item]);
    markDirty();
    return item.id;
  }, [markDirty, pageId]);

  const addCard = useCallback(
    (sectionId: string) => {
      const item = emptyPageMediaCard();
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, cards: [...s.cards, item] } : s,
        ),
      );
      markDirty();
      return item.id;
    },
    [markDirty],
  );

  const deleteSection = useCallback(
    (id: string) => {
      setSections((prev) => prev.filter((s) => s.id !== id));
      markDirty();
    },
    [markDirty],
  );

  const deleteCard = useCallback(
    (sectionId: string, cardId: string) => {
      setSections((prev) =>
        prev.map((s) =>
          s.id !== sectionId
            ? s
            : { ...s, cards: s.cards.filter((c) => c.id !== cardId) },
        ),
      );
      markDirty();
    },
    [markDirty],
  );

  const value = useMemo(
    (): PageMediaCmsEditContextValue => ({
      ready,
      pageId,
      sections,
      selectedId,
      setSelectedId,
      patchSection,
      patchCard,
      addSection,
      addCard,
      deleteSection,
      deleteCard,
      saveDraft,
      dirty,
      busy,
      token,
    }),
    [
      ready,
      pageId,
      sections,
      selectedId,
      patchSection,
      patchCard,
      addSection,
      addCard,
      deleteSection,
      deleteCard,
      saveDraft,
      dirty,
      busy,
      token,
    ],
  );

  return (
    <PageMediaCmsEditContext.Provider value={value}>
      {children}
      <PageMediaCmsPanels
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        sections={sections}
        patchSection={patchSection}
        patchCard={patchCard}
        addSection={addSection}
        addCard={addCard}
        deleteSection={deleteSection}
        deleteCard={deleteCard}
        dirty={dirty}
        busy={busy}
        status={status}
        onSave={() => void saveDraft()}
        token={token}
      />
    </PageMediaCmsEditContext.Provider>
  );
}

export function PageMediaCmsProvider({
  pageId,
  children,
}: {
  pageId: CmsPageMediaTarget;
  children: ReactNode;
}) {
  const mode = useCmsEditMode();
  if (!mode) return <>{children}</>;
  return (
    <PageMediaCmsEditInner pageId={pageId}>{children}</PageMediaCmsEditInner>
  );
}
