import PlanBasic from '@molecules/confirm-register/PlanBasic';
import PlanAdvanced from '@molecules/confirm-register/PlanAdvanced';
import PlanPremium from '@molecules/confirm-register/PlanPremium';
import PlanEnterPrise from '@molecules/confirm-register/PlanEnterPrise';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/shared/Tabs';

export default function Pricing() {
  return (
    <section>
      <div>
        <Tabs defaultValue="monthly">
          <TabsList className="mx-auto grid w-[263px] grid-cols-2 gap-2">
            <TabsTrigger value="monthly">Montly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="mb-8 flex flex-wrap justify-center gap-6">
              <PlanBasic />
              <PlanAdvanced price="$15" />
              <PlanPremium price="$30" />
              <PlanEnterPrise price="$100" />
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="mb-8 flex flex-wrap justify-center gap-6">
              <PlanBasic />
              <PlanAdvanced price="$11" />
              <PlanPremium price="$22" />
              <PlanEnterPrise price="$75" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
