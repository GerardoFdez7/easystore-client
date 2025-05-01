'use client';
import { ButtonBase } from '@components/atoms/landing/ButtonBase';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Portrait = () => {
  const t = useTranslations('Landing');

  return (
    <section
      className="mx-0 my-3 min-h-[770px] rounded-xl bg-cover bg-center text-white sm:mx-7 sm:min-h-[700px]"
      style={{
        backgroundImage: `url('/portrait_image.svg')`,
      }}
    >
      <div className="max-w-screen-xl py-20 sm:ml-13">
        <div className="ml-0 max-w-85 pl-5 sm:max-w-xl">
          <h1 className="mb-13 text-5xl font-extrabold sm:text-6xl">
            Grow Your Brand Effortlessly with EasyStore
          </h1>
          <p className="font-regular text-text mb-40 text-xl sm:text-2xl">
            Build a powerful online store that adapts to any business – no
            coding or developer needed!
          </p>
          <div className="flex gap-4">
            <Link href="/signup">
              <ButtonBase
                label={t('buttonStartFree')}
                className="border-primary border-3 px-5 py-5 text-lg sm:px-8 sm:py-6 sm:text-xl"
              />
            </Link>
            <Link href="/plans">
              <ButtonBase
                label={t('buttonStartFree')}
                className="border-3 border-white bg-transparent px-5 py-5 text-lg sm:px-8 sm:py-6 sm:text-xl"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
