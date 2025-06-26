'use client';

import WelcomeDashboard from '@atoms/dashboard/WelcomeDashboard';
import TabDashboard from '@molecules/dashboard/TabDashboard';
import { DataTable } from 'app/[locale]/components/shadcn/data-table';
import { SiteHeader } from '@molecules/dashboard/SiteHeader';

import {
  SidebarInset,
  SidebarProvider,
} from 'app/[locale]/components/shadcn/ui/sidebar';

import data from '../../../../dashboard/data.json';
import { SiderbarDashboard } from '@molecules/dashboard/Sidebar';
import { KPICards } from '@molecules/dashboard/KPICards';
import { ChartTotalSales } from '@molecules/dashboard/ChartTotalSales';
import TopProducts from '@molecules/dashboard/TopProducts';

export default function MainDashboard() {
  return (
    <main className="pt-22 2xl:m-5">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <SiderbarDashboard />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <WelcomeDashboard />
                <KPICards />
                <TabDashboard />
                <div className="px-4 lg:px-6">
                  {/* Total Sales */}
                  <ChartTotalSales />

                  {/* Sales Overview */}
                  <DataTable data={data} />

                  {/* Top Products */}
                  <TopProducts />

                  {/* Customer satisfaction */}

                  {/* Reviews */}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* <div className="space-y-8"> */}
      {/* Customer Satisfaction */}
      {/* <h2 className="text-xl font-bold text-[#1e1e1e] mb-4">
              Customer satisfaction
            </h2>
            <Card className="bg-[#ffffff] border-[#e2e8f0]">
              <CardHeader>
                <div className="text-sm text-[#757575]">Average rating</div>
                <div className="text-3xl font-bold text-[#1e1e1e]">5.0</div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end h-32 mb-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex flex-col items-center">
                      <div
                        className="w-12 bg-[#bd5cf5] rounded-t"
                        style={{ height: `${rating * 20}px` }}
                      ></div>
                      <span className="text-xs text-[#757575] mt-2">
                        {rating}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

      {/* Reviews */}
      {/* <h2 className="text-xl font-bold text-[#1e1e1e] mb-4">Reviews</h2>
            <Card className="bg-[#ffffff] border-[#e2e8f0]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#1e1e1e]">5</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-[#bd5cf5] text-[#bd5cf5]"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-[#757575]">100 reviews</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { stars: 5, percentage: 50 },
                    { stars: 4, percentage: 15 },
                    { stars: 3, percentage: 3 },
                    { stars: 2, percentage: 1 },
                    { stars: 1, percentage: 1 },
                  ].map((review) => (
                    <div key={review.stars} className="flex items-center gap-3">
                      <span className="text-sm text-[#757575] w-2">
                        {review.stars}
                      </span>
                      <div className="flex-1 bg-[#e2e8f0] rounded-full h-2">
                        <div
                          className="bg-[#10b981] h-2 rounded-full"
                          style={{ width: `${review.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-[#757575] w-8">
                        {review.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
      {/* </div> */}
    </main>
  );
}
