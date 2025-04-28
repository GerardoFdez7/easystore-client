import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-7xl font-black">{t('title')}</h1>

        <h1 className="text-title text-5xl font-extrabold">Title</h1>

        <button className="bg-primary rounded-lg p-2 text-xl font-bold text-white">
          Primary color for button and others
        </button>

        <div className="text-secondary text-xl">
          Secondary color for some Icons or details
        </div>

        <p className="text-text font-regular text-2xl">Regular text</p>
      </main>
    </div>
  );
}
