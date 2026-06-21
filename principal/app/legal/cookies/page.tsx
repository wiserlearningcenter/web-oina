import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-black text-na-heketDark">
        Política de cookies
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-na-muted">
        <p>
          Este sitio puede utilizar cookies técnicas necesarias para su
          funcionamiento y, en su caso, cookies analíticas anónimas para
          comprender el uso del sitio y mejorar la experiencia de navegación.
        </p>
        <p>
          Puede configurar su navegador para rechazar cookies, aunque algunas
          funciones del sitio podrían dejar de estar disponibles.
        </p>
        <p>
          Si tiene preguntas sobre el uso de cookies, escríbanos a{" "}
          <a
            href="mailto:oinadom@nuevaacropolis.org.do"
            className="font-semibold text-na-kefer hover:underline"
          >
            oinadom@nuevaacropolis.org.do
          </a>
          .
        </p>
      </div>
    </div>
  );
}
