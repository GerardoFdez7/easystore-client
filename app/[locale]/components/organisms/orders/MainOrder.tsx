'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PackageOpen, Plus } from 'lucide-react';

import { OrderTable } from '@molecules/orders/OrderTable';
import { OrdersToolbar } from '@molecules/orders/OrdersToolbar';
import EmptyState from '@molecules/shared/EmptyState';
import { Order, OrderStatus } from '@lib/types/order';

const itemsPerPage = 25;

// Mock data - Replace with actual GraphQL query when backend is ready
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    status: OrderStatus.PROCESSING,
    total: 120.0,
    currency: 'USD',
    shippingMethod: 'Standard',
    customer: {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    status: OrderStatus.CONFIRMED,
    total: 80.0,
    currency: 'USD',
    shippingMethod: 'Express',
    customer: {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    createdAt: '2024-06-02T11:30:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    status: OrderStatus.SHIPPED,
    total: 150.0,
    currency: 'USD',
    shippingMethod: 'Standard',
    customer: {
      id: '3',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
    },
    createdAt: '2024-06-03T14:15:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    status: OrderStatus.COMPLETED,
    total: 200.0,
    currency: 'USD',
    shippingMethod: 'Express',
    customer: {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@example.com',
    },
    createdAt: '2024-06-04T09:45:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-005',
    status: OrderStatus.CANCELLED,
    total: 95.0,
    currency: 'USD',
    shippingMethod: 'Standard',
    customer: {
      id: '5',
      name: 'Eve Adams',
      email: 'eve@example.com',
    },
    createdAt: '2024-06-05T16:20:00Z',
  },
];

export default function MainOrder() {
  const t = useTranslations('Orders');
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Replace with useOrdersContext() when backend is ready
  // const { orders: allOrders, refreshOrders, total } = useOrdersContext();

  // Mock data - Replace with actual data fetching
  const allOrders = mockOrders;
  const totalItems = allOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = allOrders.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // TODO: Implement refresh when hook is ready
    // void refreshOrders({
    //   page,
    //   limit: itemsPerPage,
    //   search: searchTerm || null,
    // });
  }, []);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, handlePageChange]);

  const handleFirstPage = useCallback(() => {
    handlePageChange(1);
  }, [handlePageChange]);

  const handleLastPage = useCallback(() => {
    handlePageChange(totalPages);
  }, [totalPages, handlePageChange]);

  // Handle search term change
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
    // TODO: Implement search when hook is ready
    // void refreshOrders({
    //   page: 1,
    //   limit: itemsPerPage,
    //   search: term || null,
    // });
  }, []);

  const hasNoOrders = !allOrders || allOrders.length === 0;

  return (
    <main className="flex w-full flex-col gap-4 px-4 xl:mx-auto">
      {hasNoOrders ? (
        <EmptyState
          icon={PackageOpen}
          title={t('noOrdersFound')}
          description={t('noOrdersDescription')}
          buttonText={t('createOrder')}
          buttonIcon={Plus}
          onButtonClick={() => {
            router.push('/orders/new');
          }}
        />
      ) : (
        <>
          <OrdersToolbar
            searchTerm={searchTerm}
            onSearch={handleSearchChange}
          />

          <OrderTable
            orders={paginatedOrders}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRows={totalItems}
            onPageChange={handlePageChange}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onFirstPage={handleFirstPage}
            onLastPage={handleLastPage}
            canPreviousPage={currentPage > 1}
            canNextPage={currentPage < totalPages}
          />
        </>
      )}
    </main>
  );
}
