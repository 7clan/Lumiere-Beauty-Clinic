export function Section({
  eyebrow,
  title,
  children,
  className = ""
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          {eyebrow && <p className="text-sm font-bold uppercase tracking-[0.22em] text-rosewood">{eyebrow}</p>}
          <h2 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
