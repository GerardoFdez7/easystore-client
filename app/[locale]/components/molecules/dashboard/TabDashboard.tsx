import { Tabs, TabsList, TabsTrigger } from "@shadcn/ui/tabs";
import { useState } from "react";

export default function TabDashboard() {
  const [activeTab, setActiveTab] = useState("Sales");
  const tabs = ["Sales", "Visits", "Customers", "Products", "Orders"];

  return (
    <div className="mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-auto w-full justify-start gap-2 sm:gap-6 border-2 2xl:mx-auto 2xl:justify-center 2xl:max-w-[1000px]">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="border-2 data-[state=active]:border-primary data-[state=active]:text-primary text-foreground hover:text-primary px-1 pb-2 font-medium text-xs sm:text-[16px]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
