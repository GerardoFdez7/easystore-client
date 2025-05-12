'use client';
import ButtonPrimary from '@atoms/landing/ButtonPrimary';
import ButtonViewPlans from '@atoms/landing/ButtonViewPlans';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Portrait() {
  const t = useTranslations('Landing');
  return (
    <section
      className="my-3 min-h-[770px] rounded-xl bg-cover bg-center text-white sm:min-h-[770px]"
      style={{
        backgroundImage: `url('/portrait_image.webp')`,
      }}
    >
      <div className="max-w-screen-xl py-20 sm:ml-13">
        <div className="max-w-85 pl-5 sm:max-w-xl">
          <h1 className="mb-13 text-5xl font-extrabold sm:text-6xl">
            {t('title')}
          </h1>
          <p className="font-regular text-text mb-40 text-xl sm:text-2xl">
            {t('slogan')}
          </p>
          <div className="flex gap-4">
            <Link href="/signup">
              <ButtonPrimary />
            </Link>
            <Link href="/plans">
              <ButtonViewPlans />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
