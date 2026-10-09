import { GetDashboardDataDocument } from '@graphql/generated';

const TIMELINE_DAYS = 90;
// The timeline ends today so it always falls inside the chart's ranges.
const LAST_DATE = Date.parse(new Date().toISOString().slice(0, 10));
const DAY_MS = 86_400_000;

// Money fixtures are decimal strings, as on the wire; no cent arithmetic.
const money = (amount: string) => ({
  __typename: 'Money' as const,
  amount,
  currency: 'USD',
});

// Deterministic, uneven daily sales with a weekly rhythm and an upward trend.
const ordersTimeline = Array.from({ length: TIMELINE_DAYS }, (_, index) => {
  const date = new Date(LAST_DATE - (TIMELINE_DAYS - 1 - index) * DAY_MS)
    .toISOString()
    .slice(0, 10);
  const ordersCount = 1 + ((index * 7) % 5) + (index % 7 === 5 ? 3 : 0);
  const whole = 40 + ordersCount * 12 + (index % 17) + Math.floor(index / 3);
  return {
    __typename: 'OrderTimeline' as const,
    date,
    ordersCount,
    revenue: money(`${whole}.${String((index * 37) % 100).padStart(2, '0')}`),
  };
});

const totalOrders = ordersTimeline.reduce((sum, d) => sum + d.ordersCount, 0);
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
const totalRevenue = money('18450.75');

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

const orderTotals = [
  '45.00',
  '82.79',
  '120.58',
  '158.37',
  '196.16',
  '53.95',
  '91.74',
  '129.53',
];

const recentOrders = customers.map((customerName, index) => ({
  __typename: 'RecentOrder' as const,
  orderId: `order-${index + 1}`,
  orderNumber: `ES-${1100 - index}`,
  orderDate: new Date(
    LAST_DATE - index * DAY_MS + 12 * 3_600_000,
  ).toISOString(),
  customerName,
  orderTotal: money(orderTotals[index]),
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

const unitPrices = [
  '18.00',
  '24.50',
  '31.00',
  '37.50',
  '44.00',
  '50.50',
  '57.00',
  '63.50',
];
const productRevenues = [
  '1728.00',
  '2205.00',
  '2480.00',
  '2625.00',
  '2640.00',
  '2525.00',
  '2280.00',
  '1905.00',
];

const topProducts = productNames.map((productName, index) => {
  const totalQuantitySold = 96 - index * 11;
  return {
    __typename: 'TopProduct' as const,
    variantId: `variant-${index + 1}`,
    variantSku: `SKU-${String(index + 1).padStart(3, '0')}`,
    productName,
    productBrand: index % 3 === 0 ? 'EasyStore' : null,
    variantPrice: money(unitPrices[index]),
    variantCover: '/laptop.webp',
    productCover: null,
    totalQuantitySold,
    totalRevenue: money(productRevenues[index]),
    ordersCount: Math.ceil(totalQuantitySold * 0.7),
  };
});

const populatedDashboard = {
  __typename: 'Dashboard' as const,
  summary: {
    __typename: 'DashboardSummary' as const,
    totalOrders,
    totalRevenue,
    averageOrderValue: money('57.50'),
    uniqueCustomers: Math.round(totalOrders * 0.58),
    completedOrders,
    cancelledOrders,
    processingOrders,
    confirmedOrders,
    shippedOrders,
    completedRevenue: money('14391.59'),
    cancelledRevenue: money('738.03'),
  },
  ordersTimeline,
  recentOrders,
  topProducts,
};

const emptyDashboard = {
  ...populatedDashboard,
  summary: {
    ...populatedDashboard.summary,
    totalOrders: 0,
    totalRevenue: money('0'),
    averageOrderValue: money('0'),
    uniqueCustomers: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    processingOrders: 0,
    confirmedOrders: 0,
    shippedOrders: 0,
    completedRevenue: money('0'),
    cancelledRevenue: money('0'),
  },
  ordersTimeline: [],
  recentOrders: [],
  topProducts: [],
};

const historicalDashboard = {
  ...emptyDashboard,
  recentOrders,
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

export const historicalOrdersDashboardMocks = [
  {
    request: dashboardRequest,
    result: { data: { getDashboard: historicalDashboard } },
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
}).format(totalRevenue.amount as unknown as number);
