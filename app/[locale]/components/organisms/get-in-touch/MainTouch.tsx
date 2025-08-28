'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import ContactFields from '@molecules/get-in-touch/ContactFields';
import FeaturesList from '@molecules/get-in-touch/FeatureList';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTouch } from '@hooks/domains/authentication/useTouch';

export default function MainTouch() {
  const t = useTranslations('GetInTouch');
  const { form, handleSubmit, isLoading } = useTouch();

  return (
    <main className="flex-1 bg-gray-100 pt-16">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <section>
            <h1 className="text-title mb-10 text-[32px] font-extrabold sm:text-5xl 2xl:text-5xl">
              {t('title')}
            </h1>
            <FeaturesList />
          </section>

          <section className="rounded-lg p-6">
            <FormProvider {...form}>
              <Form {...form}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void form.handleSubmit(handleSubmit)(e);
                  }}
                  className="space-y-6"
                >
                  <ContactFields />

                  <ButtonLoadable
                    type="submit"
                    variant="auth"
                    size="xl"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    {t('submit')}
                  </ButtonLoadable>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {t('privacyNoticePrefix')}{' '}
                    <Link href="/privacy" className="text-primary underline">
                      {t('privacyPolicy')}
                    </Link>
                  </p>
                </form>
              </Form>
            </FormProvider>
          </section>
        </div>
      </div>
    </main>
  );
}
