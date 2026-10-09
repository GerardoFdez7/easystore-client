import { GetDashboardDataDocument } from '@graphql/generated';

const TIMELINE_DAYS = 90;
const LAST_DATE = Date.UTC(2026, 9, 9);
const DAY_MS = 86_400_000;

// Money is built from integer cents so fixtures never touch floating point.
const money = (cents: number) => ({
  __typename: 'Money' as const,
  amount: `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, '0')}`,
  currency: 'USD',
});

// Deterministic, uneven daily sales with a weekly rhythm and an upward trend.
const ordersTimeline = Array.from({ length: TIMELINE_DAYS }, (_, index) => {
  const date = new Date(LAST_DATE - (TIMELINE_DAYS - 1 - index) * DAY_MS)
    .toISOString()
    .slice(0, 10);
  const ordersCount = 1 + ((index * 7) % 5) + (index % 7 === 5 ? 3 : 0);
  const cents = ordersCount * (4200 + ((index * 131) % 1800)) + index * 90;
  return {
    __typename: 'OrderTimeline' as const,
    date,
    ordersCount,
    cents,
  };
});

const totalOrders = ordersTimeline.reduce((sum, d) => sum + d.ordersCount, 0);
const totalCents = ordersTimeline.reduce((sum, d) => sum + d.cents, 0);
const cancelledOrders = Math.round(totalOrders * 0.04);
const processingOrders = Math.round(totalOrders * 0.08);
const confirmedOrders = Math.round(totalOrders * 0.06);
const shippedOrders = Math.round(totalOrders * 0.1);
const completedOrders =
  totalOrders -
  cancelledOrders -
  processingOrders -
  confirmedOrders -
  shippedOrders;
const cancelledCents = Math.round(totalCents * 0.04);
const completedCents = Math.round(totalCents * 0.78);

const customers = [
  'Alicia Rivera',
  'Bruno Castillo',
  'Carla Soto',
  'Diego Morales',
  'Elena Pérez',
  'Fernando López',
  'Gabriela Ruiz',
  'Hugo Mendoza',
];
const statuses = [
  'PROCESSING',
  'CONFIRMED',
  'SHIPPED',
  'COMPLETED',
  'COMPLETED',
  'CANCELLED',
  'COMPLETED',
  'SHIPPED',
];
const cities = ['Guatemala City', 'Antigua', 'Quetzaltenango', 'Escuintla'];

const recentOrders = customers.map((customerName, index) => ({
  __typename: 'RecentOrder' as const,
  orderId: `order-${index + 1}`,
  orderNumber: `ES-${1100 - index}`,
  orderDate: new Date(
    LAST_DATE - index * DAY_MS + 12 * 3_600_000,
  ).toISOString(),
  customerName,
  orderTotal: money(4500 + ((index * 3779) % 16_000)),
  orderStatus: statuses[index],
  shippingCity: cities[index % cities.length],
}));

const productNames = [
  "Women's T-shirt",
  "Men's T-shirt",
  "Women's Hoodie",
  "Men's Hoodie",
  "Women's Sweatpants",
  "Men's Sweatpants",
  'Ceramic mug',
  'Canvas tote bag',
];

const topProducts = productNames.map((productName, index) => {
  const unitCents = 1800 + index * 650;
  const totalQuantitySold = 96 - index * 11;
  return {
    __typename: 'TopProduct' as const,
    variantId: `variant-${index + 1}`,
    variantSku: `SKU-${String(index + 1).padStart(3, '0')}`,
    productName,
    productBrand: index % 3 === 0 ? 'EasyStore' : null,
    variantPrice: money(unitCents),
    variantCover: '/laptop.webp',
    productCover: null,
    totalQuantitySold,
    totalRevenue: money(unitCents * totalQuantitySold),
    ordersCount: Math.ceil(totalQuantitySold * 0.7),
  };
});

const populatedDashboard = {
  __typename: 'Dashboard' as const,
  summary: {
    __typename: 'DashboardSummary' as const,
    totalOrders,
    totalRevenue: money(totalCents),
    averageOrderValue: money(Math.round(totalCents / totalOrders)),
    uniqueCustomers: Math.round(totalOrders * 0.58),
    completedOrders,
    cancelledOrders,
    processingOrders,
    confirmedOrders,
    shippedOrders,
    completedRevenue: money(completedCents),
    cancelledRevenue: money(cancelledCents),
  },
  ordersTimeline: ordersTimeline.map(({ cents, ...point }) => ({
    ...point,
    revenue: money(cents),
  })),
  recentOrders,
  topProducts,
};

const emptyDashboard = {
  ...populatedDashboard,
  summary: {
    ...populatedDashboard.summary,
    totalOrders: 0,
    totalRevenue: money(0),
    averageOrderValue: money(0),
    uniqueCustomers: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    processingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    completedRevenue: money(0),
    cancelledRevenue: money(0),
  },
  ordersTimeline: [],
  recentOrders: [],
  topProducts: [],
};

const dashboardRequest = { query: GetDashboardDataDocument };

export const dashboardMocks = [
  {
    request: dashboardRequest,
    result: { data: { getDashboard: populatedDashboard } },
  },
];

export const emptyDashboardMocks = [
  {
    request: dashboardRequest,
    result: { data: { getDashboard: emptyDashboard } },
  },
];

export const errorDashboardMocks = [
  { request: dashboardRequest, error: new Error('Network error') },
];

export const loadingDashboardMocks = [
  { request: dashboardRequest, delay: Infinity },
];

/** Formatted en-US total revenue, for play assertions. */
export const expectedTotalRevenue = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(totalCents / 100);
