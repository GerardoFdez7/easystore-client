import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { GetDashboardDataDocument } from '@graphql/generated';

interface UseDashboardOptions {
  skip?: boolean;
}

export interface DashboardSummary {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  uniqueCustomers: number;
  completedOrders: number;
  cancelledOrders: number;
  processingOrders: number;
  confirmedOrders: number;
  shippedOrders: number;
  completedRevenue: number;
  cancelledRevenue: number;
}

export interface OrderTimelinePoint {
  date: string;
  ordersCount: number;
  revenue: number;
}

export interface RecentOrder {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  orderTotal: number;
  orderStatus: string;
  shippingCity: string | null;
}

export interface TopProduct {
  variantId: string;
  variantSku: string;
  productName: string;
  productBrand: string | null;
  variantPrice: number;
  variantCover: string | null;
  productCover: string | null;
  totalQuantitySold: number;
  totalRevenue: number;
  ordersCount: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  ordersTimeline: OrderTimelinePoint[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
}

export function useDashboard(options: UseDashboardOptions = {}) {
  const { skip = false } = options;

  const { data, loading, error, refetch } = useQuery(GetDashboardDataDocument, {
    skip,
    fetchPolicy: 'cache-and-network',
  });

  const dashboardData = useMemo<DashboardData | null>(() => {
    if (!data?.getDashboardData) {
      return null;
    }

    const backendData = data.getDashboardData;

    return {
      summary: {
        totalOrders: backendData.summary.total_orders,
        totalRevenue: backendData.summary.total_revenue,
        averageOrderValue: backendData.summary.average_order_value,
        uniqueCustomers: backendData.summary.unique_customers,
        completedOrders: backendData.summary.completed_orders,
        cancelledOrders: backendData.summary.cancelled_orders,
        processingOrders: backendData.summary.processing_orders,
        confirmedOrders: backendData.summary.confirmed_orders,
        shippedOrders: backendData.summary.shipped_orders,
        completedRevenue: backendData.summary.completed_revenue,
        cancelledRevenue: backendData.summary.cancelled_revenue,
      },
      ordersTimeline: backendData.ordersTimeline.map((item) => ({
        date: item.date,
        ordersCount: item.orders_count,
        revenue: item.revenue,
      })),
      recentOrders: backendData.recentOrders.map((order) => ({
        orderId: order.order_id,
        orderNumber: order.order_number,
        orderDate: order.order_date,
        customerName: order.customer_name,
        orderTotal: order.order_total,
        orderStatus: order.order_status,
        shippingCity: order.shipping_city ?? null,
      })),
      topProducts: backendData.topProducts.map((product) => ({
        variantId: product.variant_id,
        variantSku: product.variant_sku,
        productName: product.product_name,
        productBrand: product.product_brand ?? null,
        variantPrice: product.variant_price,
        variantCover: product.variant_cover ?? null,
        productCover: product.product_cover ?? null,
        totalQuantitySold: product.total_quantity_sold,
        totalRevenue: product.total_revenue,
        ordersCount: product.orders_count,
      })),
    };
  }, [data]);

  return {
    dashboardData,
    loading,
    error,
    refetch,
  };
}
