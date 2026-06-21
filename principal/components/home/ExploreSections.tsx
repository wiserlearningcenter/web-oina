import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  HeartHandshake,
  Siren,
  GraduationCap,
  Briefcase,
  Library,
  ShoppingBag,
  CalendarDays,
  Feather,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  platformEffectiveUrl,
  platformIsExternal,
  type PlatformId,
} from "@/lib/site-config";
import { accentCardShell, accentTokens } from "@/lib/brand-accents";

type Section = {
  icon: typeof BookOpen;
  title: string;
  text: string;
  href: string;
  external?: boolean;
  live: boolean;
};

const INTERNAL_SECTIONS: Omit<Section, "href" | "external">[] = [
  {
    icon: BookOpen,
    title: "Filosofía",
    text: "Escuela de filosofía a la manera clásica y el Diplomado Filosofía para la Vida.",
    live: true,
  },
  {
    icon: Sparkles,
    title: "Cultura",
    text: "Talleres de arte, eventos por estación y celebraciones en nuestras sedes.",
    live: true,
  },
  {
    icon: HeartHandshake,
    title: "Voluntariado",
    text: "Ecología, acompañamiento a mayores y actividades con niños. Todos somos voluntarios.",
    live: true,
  },
  {
    icon: Siren,
    title: "Punto Focal Esfera",
    text: "Formación humanitaria y preparación ante desastres con base en el Manual Esfera.",
    live: true,
  },
  {
    icon: CalendarDays,
    title: "Eventos",
    text: "Encuentros, celebraciones y noticias fuera de las clases y programas regulares.",
    live: true,
  },
  {
    icon: Feather,
    title: "Artículos",
    text: "Artículos y reflexiones de filosofía práctica para pensar mejor y vivir con sentido.",
    live: true,
  },
  {
    icon: GraduationCap,
    title: "Cursos",
    text: "El arte de respirar, pintura, Tai Chi, círculo de lectura, bienestar y más.",
    live: true,
  },
];

const PLATFORM_SECTIONS: {
  id: PlatformId;
  icon: typeof Briefcase;
  title: string;
  text: string;
}[] = [
  {
    id: "biblioteca",
    icon: Library,
    title: "Biblioteca",
    text: "Catálogo, préstamos y novedades de nuestra biblioteca.",
  },
  {
    id: "civis",
    icon: Briefcase,
    title: "Civis Consulting",
    text: "Talleres corporativos, salones y entrenadores — plataforma Civis.",
  },
  {
    id: "tienda",
    icon: ShoppingBag,
    title: "Librería Editorial Logos",
    text: "Libros, separadores, lapiceros y artículos de nuestra editorial.",
  },
];

function buildSections(): Section[] {
  const internal: Section[] = [
    { ...INTERNAL_SECTIONS[0], href: "/filosofia" },
    { ...INTERNAL_SECTIONS[1], href: "/cultura" },
    { ...INTERNAL_SECTIONS[2], href: "/voluntariado" },
    { ...INTERNAL_SECTIONS[3], href: "/esfera" },
    { ...INTERNAL_SECTIONS[4], href: "/eventos" },
    { ...INTERNAL_SECTIONS[5], href: "/articulos" },
    { ...INTERNAL_SECTIONS[6], href: "/cursos" },
  ];

  const platforms: Section[] = PLATFORM_SECTIONS.map((p) => {
    const href = platformEffectiveUrl(p.id);
    return {
      icon: p.icon,
      title: p.title,
      text: p.text,
      href,
      external: platformIsExternal(href),
      live: true,
    };
  });

  return [...internal, ...platforms];
}

function CardInner({ s, index }: { s: Section; index: number }) {
  const Icon = s.icon;
  const a = accentTokens(index);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.iconWrap} ${a.icon}`}>
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
        </div>
        {s.live ? (
          s.external ? (
            <ExternalLink className={`h-5 w-5 transition group-hover:translate-x-0.5 ${a.link}`} />
          ) : (
            <ArrowRight className={`h-5 w-5 transition group-hover:translate-x-1 ${a.link}`} />
          )
        ) : (
          <span className="rounded-full bg-na-amon/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-na-amon">
            Próximamente
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-black text-na-heketDark">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-na-muted">{s.text}</p>
    </>
  );
}

export function ExploreSections() {
  const sections = buildSections();

  return (
    <section className="border-t border-na-heket/10 bg-na-heket/[0.04] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-na-amon">
          Explora
        </p>
        <h2 className="mt-2 text-balance text-3xl font-black text-na-heketDark sm:text-4xl">
          Todo lo que ofrecemos
        </h2>
        <p className="mt-3 max-w-2xl text-na-muted">
          Conoce nuestras áreas y proyectos. Cada espacio tiene su propia página
          con detalles, horarios y formas de participar.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, i) => {
            const cardClass = `${accentCardShell(i)} p-6`;
            return s.live ? (
              s.external ? (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${cardClass}`}
                >
                  <CardInner s={s} index={i} />
                </a>
              ) : (
                <Link key={s.title} href={s.href} className={`group ${cardClass}`}>
                  <CardInner s={s} index={i} />
                </Link>
              )
            ) : (
              <div
                key={s.title}
                className={`border-dashed bg-na-surface/70 ${cardClass}`}
              >
                <CardInner s={s} index={i} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
