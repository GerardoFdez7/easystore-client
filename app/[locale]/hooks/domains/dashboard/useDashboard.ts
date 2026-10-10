import { isMoneyAmount } from '@lib/utils/money';
import { useQuery } from '@apollo/client/react';
import {
  GetDashboardDataDocument,
  type GetDashboardDataQuery,
} from '@graphql/generated';

interface UseDashboardOptions {
  skip?: boolean;
}

type QueryDashboard = GetDashboardDataQuery['getDashboard'];
type QuerySummary = QueryDashboard['summary'];
type QueryTimelinePoint = QueryDashboard['ordersTimeline'][number];
type QueryRecentOrder = QueryDashboard['recentOrders'][number];
type QueryTopProduct = QueryDashboard['topProducts'][number];

export type Money = Omit<QuerySummary['totalRevenue'], 'amount'> & {
  amount: string;
};

export type DashboardSummary = Omit<
  QuerySummary,
  'totalRevenue' | 'averageOrderValue' | 'completedRevenue' | 'cancelledRevenue'
> & {
  totalRevenue: Money;
  averageOrderValue: Money;
  completedRevenue: Money;
  cancelledRevenue: Money;
};

export type OrderTimelinePoint = Omit<QueryTimelinePoint, 'revenue'> & {
  revenue: Money;
};

export type RecentOrder = Omit<QueryRecentOrder, 'orderTotal'> & {
  orderTotal: Money;
};

export type TopProduct = Omit<
  QueryTopProduct,
  'variantPrice' | 'totalRevenue'
> & {
  variantPrice: Money;
  totalRevenue: Money;
};

export interface DashboardData {
  summary: DashboardSummary;
  ordersTimeline: OrderTimelinePoint[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
}

function hasDecimalAmount(value: QuerySummary['totalRevenue']): value is Money {
  return typeof value.amount === 'string' && isMoneyAmount(value.amount);
}

function hasValidMoney(
  dashboard: QueryDashboard,
): dashboard is QueryDashboard & DashboardData {
  const summary = dashboard.summary;

  return (
    hasDecimalAmount(summary.totalRevenue) &&
    hasDecimalAmount(summary.averageOrderValue) &&
    hasDecimalAmount(summary.completedRevenue) &&
    hasDecimalAmount(summary.cancelledRevenue) &&
    dashboard.ordersTimeline.every((point) =>
      hasDecimalAmount(point.revenue),
    ) &&
    dashboard.recentOrders.every((order) =>
      hasDecimalAmount(order.orderTotal),
    ) &&
    dashboard.topProducts.every(
      (product) =>
        hasDecimalAmount(product.variantPrice) &&
        hasDecimalAmount(product.totalRevenue),
    )
  );
}

export function useDashboard({ skip = false }: UseDashboardOptions = {}) {
  const { data, loading, error, refetch } = useQuery(GetDashboardDataDocument, {
    skip,
    fetchPolicy: 'cache-and-network',
  });
  const response = data?.getDashboard;
  const invalidData = Boolean(response && !hasValidMoney(response));
  const dashboardData = response && hasValidMoney(response) ? response : null;

  return {
    dashboardData,
    loading,
    error,
    invalidData,
    refetch,
  };
}
