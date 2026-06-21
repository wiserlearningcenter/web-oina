import Image from "next/image";

type CmsBrandHeaderProps = {
  subtitle?: string;
  compact?: boolean;
};

export function CmsBrandHeader({ subtitle, compact }: CmsBrandHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src="/brand/logo-nueva-acropolis-stacked.webp"
        alt="Nueva Acrópolis"
        width={2429}
        height={1113}
        className={
          compact
            ? "h-auto w-full max-w-[11rem] sm:max-w-[12rem]"
            : "h-auto w-full max-w-[14rem] sm:max-w-[16rem]"
        }
        priority
      />
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-teal">
        Sistema de contenidos
      </p>
      {subtitle ? (
        <p className="mt-2 max-w-md text-sm text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
