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
      className={`mb-5 border-b border-gray-200 pb-8 ${className}`}
    >
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
