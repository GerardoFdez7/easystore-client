import type { Meta, StoryObj } from '@storybook/react';
import MainDetailCategory from '@organisms/categories/detail-category/MainDetailCategory';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  CategoryDetail: {
    welcomeDetailCategory: 'Detalle de categoría',
    addCategory: 'Añadir categoría',
    editCategory: 'Editar categoría',
    title: 'Título',
    titlePlaceholder: 'Ingresa el título de la categoría',
    description: 'Descripción',
    descriptionPlaceholder: 'Escribe una breve descripción para esta categoría',
    products: 'Productos',
    searchProducts: 'Buscar productos',
    explore: 'Explorar',
    order: 'Orden',
    orderAsc: 'Ascendente',
    orderDesc: 'Descendente',
    statusActive: 'Activo',
    statusInactive: 'Inactivo',
    showMore: 'Ver más',
    cancel: 'Cancelar',
    create: 'Crear',
    save: 'Guardar',
  },
};

const meta: Meta<typeof MainDetailCategory> = {
  title: 'Organisms/DetailCategory/MainDetailCategory',
  component: MainDetailCategory,
  args: {
    id: 'new',
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={messages}>
        <div style={{ background: '#f3f4f6', minHeight: '100vh' }}>
          <Story />
        </div>
      </NextIntlClientProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof MainDetailCategory>;
export const CreateMode: Story = {};
