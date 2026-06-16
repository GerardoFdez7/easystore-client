'use client';

import { useTranslations } from 'next-intl';
import { OrderStatus as OrderStatusEnum } from '@lib/types/order';

interface OrderStatusProps {
  status: OrderStatusEnum;
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const t = useTranslations('Orders');

  const getStatusConfig = (status: OrderStatusEnum) => {
    switch (status) {
      case OrderStatusEnum.PROCESSING:
        return {
          label: t('processing'),
          className: 'bg-yellow-100 text-yellow-700',
        };
      case OrderStatusEnum.CONFIRMED:
        return {
          label: t('confirmed'),
          className: 'bg-blue-100 text-blue-700',
        };
      case OrderStatusEnum.SHIPPED:
        return {
          label: t('shipped'),
          className: 'bg-purple-100 text-purple-700',
        };
      case OrderStatusEnum.COMPLETED:
        return {
          label: t('completed'),
          className: 'bg-green-100 text-green-700',
        };
      case OrderStatusEnum.CANCELLED:
        return {
          label: t('cancelled'),
          className: 'bg-red-100 text-red-700',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-100 text-gray-700',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
