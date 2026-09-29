export function ContentSection({
  id,
  title,
  children,
  className = '',
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-hover dark:border-chart-3 mb-5 border-b pb-8 ${className}`}
    >
      <h2 className="text-text mb-6 text-2xl font-semibold">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
