import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const tabValues = [
  ['Sales', 'sales'],
  ['Visits', 'visits'],
  ['Customers', 'customers'],
  ['Products', 'products'],
  ['Orders', 'orders'],
] as const;

export default function TabDashboard() {
  const t = useTranslations('Dashboard');
  const [activeTab, setActiveTab] = useState('Sales');

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-auto w-full justify-start gap-2 border-2 sm:gap-6 2xl:mx-auto 2xl:max-w-250 2xl:justify-center">
          {tabValues.map(([value, labelKey]) => (
            <TabsTrigger
              key={value}
              value={value}
              // This tab bar has no tab panels, so Radix's aria-controls would
              // point at an element that does not exist.
              aria-controls={undefined}
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-base"
            >
              {t(labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
