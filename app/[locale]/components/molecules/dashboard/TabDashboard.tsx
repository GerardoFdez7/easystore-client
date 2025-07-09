import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function TabDashboard() {
  const t = useTranslations('Dashboard');
  const [activeTab, setActiveTab] = useState('Sales');

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-auto w-full justify-start gap-2 border-2 sm:gap-6 2xl:mx-auto 2xl:max-w-[1000px] 2xl:justify-center">
          <TabsTrigger
            value="Sales"
            className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-[16px]"
          >
            {t('sales')}
          </TabsTrigger>
          <TabsTrigger
            value="Visits"
            className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-[16px]"
          >
            {t('visits')}
          </TabsTrigger>
          <TabsTrigger
            value="Customers"
            className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-[16px]"
          >
            {t('customers')}
          </TabsTrigger>
          <TabsTrigger
            value="Products"
            className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-[16px]"
          >
            {t('products')}
          </TabsTrigger>
          <TabsTrigger
            value="Orders"
            className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-[16px]"
          >
            {t('orders')}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
