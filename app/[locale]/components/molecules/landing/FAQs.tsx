import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@shadcn/ui/accordion';
import { useTranslations } from 'next-intl';

export default function FAQs() {
  const t = useTranslations('Landing');

  return (
    <section className="mx-auto p-5">
      <h1 className="text-title mb-12 text-5xl font-extrabold sm:text-6xl xl:text-left">
        {t('FAQsTitle')}
      </h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{t('whatIsEasyStoreTitle')}</AccordionTrigger>
          <AccordionContent>{t('whatIsEasyStore')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t('EasyStoreCostTitle')}</AccordionTrigger>
          <AccordionContent>{t('EasyStoreCost')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>{t('cancelAccountTitle')}</AccordionTrigger>
          <AccordionContent>{t('cancelAccount')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>{t('changePlanTitle')}</AccordionTrigger>
          <AccordionContent>{t('changePlan')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>{t('dicountsTitle')}</AccordionTrigger>
          <AccordionContent>{t('dicounts')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>{t('countriesUseTitle')}</AccordionTrigger>
          <AccordionContent>{t('countriesUse')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>{t('transactionTitle')}</AccordionTrigger>
          <AccordionContent>{t('transaction')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>{t('switchToEasyStoreTitle')}</AccordionTrigger>
          <AccordionContent>{t('switchToEasyStore')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>{t('domainNameTitle')}</AccordionTrigger>
          <AccordionContent>{t('domainName')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10">
          <AccordionTrigger>{t('hostingTitle')}</AccordionTrigger>
          <AccordionContent>{t('hosting')}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-11">
          <AccordionTrigger>{t('onlineStoreTitle')}</AccordionTrigger>
          <AccordionContent>{t('onlineStore')}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
