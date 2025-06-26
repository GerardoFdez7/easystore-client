import { Tabs, TabsList, TabsTrigger } from '@shadcn/ui/tabs';
import { useState } from 'react';

export default function TabDashboard() {
  const [activeTab, setActiveTab] = useState('Sales');
  const tabs = ['Sales', 'Visits', 'Customers', 'Products', 'Orders'];

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-auto w-full justify-start gap-2 border-2 sm:gap-6 2xl:mx-auto 2xl:max-w-[1000px] 2xl:justify-center">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary border-2 px-1 pb-2 text-xs font-medium sm:text-[16px]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
