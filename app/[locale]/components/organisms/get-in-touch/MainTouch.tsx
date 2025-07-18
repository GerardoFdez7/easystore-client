'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '@shadcn/ui/form';
import ContactFields from '@molecules/get-in-touch/ContactField';
import FeaturesList from '@molecules/get-in-touch/FeatureList';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MainTouch() {
  const t = useTranslations('GetInTouch');
  const methods = useForm({
    defaultValues: {
      fullName: '',
      businessEmail: '',
      businessPhone: '',
      company: '',
      websiteUrl: '',
      country: '',
      annualRevenue: '',
      isAgency: 'no',
    },
  });

  const rawSubmit = methods.handleSubmit(async (data) => {
    console.log('submitted:', data);
  });

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void rawSubmit(e);
  };

  return (
    <div className="flex-1 bg-gray-100 pt-16">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <section>
            <h1 className="text-title mb-10 text-[32px] font-extrabold sm:text-5xl 2xl:text-5xl">
              {t('title')}
            </h1>
            <FeaturesList />
          </section>

          <section className="rounded-lg p-6">
            <FormProvider {...methods}>
              <Form {...methods}>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <ContactFields />

                  <ButtonLoadable
                    type="submit"
                    className="bg-primary hover:bg-primary/90 h-12 w-full rounded-lg font-medium text-white"
                    isLoading={false}
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
    </div>
  );
}
