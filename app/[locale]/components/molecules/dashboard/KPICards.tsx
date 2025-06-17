import CardStat from "@atoms/dashboard/CardStat";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

export function KPICards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-6 @2xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <CardStat
        description="Total Revenue"
        amount="$1,250.00"
        trend="+12.5%"
        icon={<IconTrendingUp className="size-4" />}
        footerText="Trending up this month"
        footerSubtext="Visitors for the last 6 months"
      />
      <CardStat
        description="New Customers"
        amount="1,234"
        trend="-20%"
        icon={<IconTrendingDown className="size-4" />}
        footerText="Down 20% this period"
        footerSubtext="Acquisition needs attention"
      />
      <CardStat
        description="Active Accounts"
        amount="45,678"
        trend="+12.5%"
        icon={<IconTrendingUp className="size-4" />}
        footerText="Strong user retention"
        footerSubtext="Engagement exceed targets"
      />
      <CardStat
        description="Growth Rate"
        amount="4.5%"
        trend="+4.5%"
        icon={<IconTrendingUp className="size-4" />}
        footerText="Steady performance increase"
        footerSubtext="Meets growth projections"
      />
    </div>
  );
}
