// Temporary Order type until GraphQL schema is updated
export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  currency: string;
  shippingMethod?: string;
  customer: OrderCustomer;
  createdAt: string;
}

export interface OrderCustomer {
  id: string;
  name: string;
  email?: string;
}

export enum OrderStatus {
  PROCESSING = 'PROCESSING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
