"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { EditorialBrandMark } from "@/components/EditorialBrandMark";
import { EditorialNaSectionLogo } from "@/components/EditorialNaSectionLogo";
import {
  useEditorialFooterTagline,
  useEditorialHeaderNav,
} from "@/lib/cms/hooks";
import type { EditorialNavItem } from "@/lib/editorial-content";
import { navItemIsActive } from "@/lib/editorial-navigation";
import {
  BIBLIOTECA_URL,
  CIVIS_URL,
  PRINCIPAL_SITE_URL,
} from "@/lib/site-config";
import { setCartOpen } from "@/lib/cart-store";
import "./EditorialFooter.css";

function FooterNavLink({
  item,
  pathname,
}: {
  item: EditorialNavItem;
  pathname: string;
}) {
  const active = navItemIsActive(pathname, "", item);

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.label}
        <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      prefetch={false}
      onClick={() => setCartOpen(false)}
    >
      {item.label}
    </Link>
  );
}

export function EditorialFooter() {
  const pathname = usePathname();
  const headerNav = useEditorialHeaderNav();
  const tagline = useEditorialFooterTagline();

  return (
    <footer className="editorial-footer">
      <div className="editorial-footer__inner">
        <div className="editorial-footer__grid">
          <div className="editorial-footer__brand-col">
            <Link
              href="/"
              className="editorial-footer__brand"
              aria-label="Librería Editorial Logos — inicio"
              prefetch={false}
            >
              <EditorialBrandMark size="sm" />
            </Link>
            <p className="editorial-footer__tagline">{tagline}</p>
          </div>

          <div className="editorial-footer__na-mark">
            <EditorialNaSectionLogo size="footer" align="center" />
          </div>

          <div className="editorial-footer__nav-col">
            <nav aria-label="Secciones de Editorial Logos">
              <p className="editorial-footer__nav-label">Navegación</p>
              <ul className="editorial-footer__nav-list">
                {headerNav
                  .filter((item) => item.id !== "sesion")
                  .map((item) => (
                    <li key={item.id}>
                      <FooterNavLink item={item} pathname={pathname} />
                    </li>
                  ))}
              </ul>
            </nav>

            <nav aria-label="Enlaces institucionales">
              <p className="editorial-footer__nav-label">Nueva Acrópolis</p>
              <ul className="editorial-footer__nav-list">
                <li>
                  <a
                    href={PRINCIPAL_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sitio principal
                    <ExternalLink
                      className="h-3.5 w-3.5 opacity-70"
                      aria-hidden
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={BIBLIOTECA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Biblioteca Sophia
                    <ExternalLink
                      className="h-3.5 w-3.5 opacity-70"
                      aria-hidden
                    />
                  </a>
                </li>
                <li>
                  <a href={CIVIS_URL} target="_blank" rel="noopener noreferrer">
                    Civis Consulting
                    <ExternalLink
                      className="h-3.5 w-3.5 opacity-70"
                      aria-hidden
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="editorial-footer__legal-row">
          <p className="editorial-footer__legal">
            © {new Date().getFullYear()} Librería Editorial Logos · Nueva
            Acrópolis RD
          </p>
        </div>
      </div>
    </footer>
  );
}
