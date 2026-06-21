"use client";

import { useEffect, useState } from "react";
import {
  isCmsEditOrigin,
  type CmsEditMessage,
} from "@/lib/cms/edit-bridge";
import { isInEditorIframe } from "@/lib/cms/edit-mode";

/** True cuando la página está en un iframe del editor (3400). */
export function useCmsEditorEmbedded() {
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    if (isInEditorIframe()) setEmbedded(true);

    function onMessage(ev: MessageEvent<CmsEditMessage>) {
      if (!isCmsEditOrigin(ev.origin)) return;
      if (ev.data?.type === "cms-edit-init") setEmbedded(true);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return embedded;
}
