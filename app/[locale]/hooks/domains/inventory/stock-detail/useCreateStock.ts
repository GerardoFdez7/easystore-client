'use client';

import { useMemo, useCallback, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApolloClient, useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import type { DocumentNode } from 'graphql';

import {
  AddStockToWarehouseDocument,
  type AddStockToWarehouseMutation,
  type AddStockToWarehouseMutationVariables,
  FindWarehouseByIdDocument,
  FindWarehousesDocument,
  type FindWarehousesQuery,
  type FindWarehousesQueryVariables,
  FindAllVariantsToCreateStockDocument,
  type FindAllVariantsToCreateStockQuery,
  type FindAllVariantsToCreateStockQueryVariables,
  SortBy,
  SortOrder,
} from '@graphql/generated';

/* ----------------------------- Schema del form ----------------------------- */

export type StockFormValues = z.infer<ReturnType<typeof buildSchema>>;

function buildSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    available: z
      .number({ invalid_type_error: t('availablePlaceholder') })
      .min(0, { message: t('availablePlaceholder') }),
    reserved: z
      .number({ invalid_type_error: t('reservedPlaceholder') })
      .min(0, { message: t('reservedPlaceholder') }),
    productLocation: z
      .string()
      .trim()
      .max(100, { message: t('productLocationPlaceholder') })
      .optional()
      .or(z.literal(''))
      .refine(
        (v) => v === '' || (typeof v === 'string' && v.trim().length >= 10),
        { message: t('productLocationTooShort') },
      ),
    lotNumber: z.string().trim().max(50).optional().or(z.literal('')),
    replenishmentDate: z.date().nullable().optional(),
    reason: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine(
        (v) => v === '' || (typeof v === 'string' && v.trim().length >= 10),
        { message: t('updateReasonTooShort') },
      ),
  });
}

/* --------------------------------- Opciones -------------------------------- */

type CreateStockByLookupOptions = {
  // Identificación de almacén
  warehouseId?: string;
  warehouseName?: string; // si no hay id, se resuelve por nombre exacto

  // Identificación de variante
  variantId?: string;
  variantSku?: string; // prioridad para resolver variante
  productName?: string; // fallback: buscar por nombre de producto
  variantAttributeFilter?: { key: string; value: string }; // afina resultado si hay varias variantes

  // Seriales y razón
  getSerialNumbers?: () => string[];
  reason?: string;

  // Refetch extra
  extraRefetchQueries?: ReadonlyArray<{
    query: DocumentNode;
    variables?: Record<string, unknown>;
  }>;

  // Callback
  onSuccess?: (opts: { updatedWarehouseId?: string }) => void;
};

/* ---------------------------------- Hook ---------------------------------- */

export function useCreateWarehouseStockByLookup(
  opts: CreateStockByLookupOptions = {},
) {
  const {
    warehouseId: initialWarehouseId,
    warehouseName,
    variantId: initialVariantId,
    variantSku,
    productName,
    variantAttributeFilter,
    getSerialNumbers,
    reason,
    extraRefetchQueries = [],
    onSuccess,
  } = opts;

  const t = useTranslations('StockDetail');
  const schema = useMemo(() => buildSchema(t), [t]);
  const apollo = useApolloClient();

  type SelectedVariant = {
    id: string;
    sku?: string | null;
    productName?: string;
    attributes?: Array<{ key: string; value: string }>;
  };

  // Estado para variante seleccionada (puede venir del selector de UI)
  const [selectedVariant, setSelectedVariant] =
    useState<SelectedVariant | null>(null);

  const selectVariantFromSelector = useCallback(
    (
      variantId: string,
      sku?: string | null,
      productName?: string,
      attributes?: Array<{ key: string; value: string }>,
    ) => {
      setSelectedVariant({ id: variantId, sku, productName, attributes });
    },
    [],
  );

  // Si nos vienen identificadores iniciales (variantId, variantSku o productName),
  // intentamos prefetch para poblar `selectedVariant` y que la UI muestre los datos
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        if (selectedVariant) return; // ya tenemos
        if (!initialVariantId && !variantSku && !productName) return;

        const variables: FindAllVariantsToCreateStockQueryVariables = {
          page: 1,
          limit: 20,
          name: productName || undefined,
          sortBy: SortBy.Name,
          sortOrder: SortOrder.Asc,
          includeSoftDeleted: false,
        };

        const res = await apollo.query<
          FindAllVariantsToCreateStockQuery,
          FindAllVariantsToCreateStockQueryVariables
        >({
          query: FindAllVariantsToCreateStockDocument,
          variables,
          fetchPolicy: 'network-only',
        });

        const products = res.data?.getAllProducts?.products ?? [];
        const allVariants = products.flatMap((p) =>
          (p.variants ?? []).map((v) => ({ ...v, productName: p.name })),
        );

        let found: SelectedVariant | null = null;

        if (initialVariantId) {
          found = allVariants.find((v) => v.id === initialVariantId) ?? null;
        }

        if (!found && variantSku) {
          found =
            allVariants.find(
              (v) => (v.sku ?? '').toLowerCase() === variantSku.toLowerCase(),
            ) ?? null;
        }

        if (!found && productName) {
          const exact = products.filter(
            (p) => (p.name ?? '').toLowerCase() === productName.toLowerCase(),
          );
          if (exact.length === 1) {
            const vs = exact[0].variants ?? [];
            if (vs.length === 1) {
              const v = vs[0];
              found = {
                id: v.id,
                sku: v.sku ?? null,
                attributes: v.attributes ?? [],
                productName: exact[0].name,
              };
            }
          }
        }

        if (found && mounted) {
          setSelectedVariant({
            id: found.id,
            sku: found.sku,
            productName: found.productName,
            attributes: found.attributes ?? [],
          });
        }
      } catch (_e) {
        // ignore
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, [apollo, initialVariantId, variantSku, productName, selectedVariant]);

  const form = useForm<StockFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      available: 0,
      reserved: 0,
      productLocation: '',
      lotNumber: '',
      replenishmentDate: null,
    },
    mode: 'onChange',
  });

  /* ----------------------------- Mutación create ---------------------------- */

  const [mutate, createState] = useMutation<
    AddStockToWarehouseMutation,
    AddStockToWarehouseMutationVariables
  >(AddStockToWarehouseDocument, {
    refetchQueries: [
      ...(initialWarehouseId
        ? [
            {
              query: FindWarehouseByIdDocument,
              variables: { id: initialWarehouseId },
            },
          ]
        : []),
      ...extraRefetchQueries,
    ],
    awaitRefetchQueries: true,
    errorPolicy: 'all',
  });

  /* --------------------- Resolutores: warehouse y variant ------------------- */

  const resolveWarehouseId = useCallback(
    async (providedId?: string): Promise<string> => {
      if (providedId) return providedId;

      const name = (warehouseName ?? '').trim();
      if (!name)
        throw new Error(
          t('missingWarehouseName') || 'Falta el nombre del almacén',
        );

      const variables: FindWarehousesQueryVariables = {
        page: 1,
        limit: 10,
        name,
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
      };

      const res = await apollo.query<
        FindWarehousesQuery,
        FindWarehousesQueryVariables
      >({
        query: FindWarehousesDocument,
        variables,
        fetchPolicy: 'network-only',
      });

      const list = res.data?.getAllWarehouses?.warehouses ?? [];
      const exact = list.filter(
        (w) => (w.name ?? '').toLowerCase() === name.toLowerCase(),
      );

      if (exact.length === 0) {
        throw new Error(
          //   t('warehouseNotFound') ||
          `No se encontró almacén con nombre "${name}".`,
        );
      }
      if (exact.length > 1) {
        throw new Error(
          t('warehouseAmbiguous') ||
            `Hay múltiples almacenes con nombre "${name}". Refina el nombre o usa el ID.`,
        );
      }
      return exact[0].id;
    },
    [apollo, warehouseName, t],
  );

  const resolveVariantId = useCallback(
    async (providedId?: string): Promise<string> => {
      // Prefer providedId, luego selección hecha desde UI, luego initialVariantId
      if (providedId) return providedId;
      if (selectedVariant?.id) return selectedVariant.id;
      if (initialVariantId) return initialVariantId;

      // 1) Preferimos resolver por SKU exacto
      // Si hay SKU en options o en selectedVariant, intentamos resolver por SKU
      const skuToUse = selectedVariant?.sku ?? variantSku ?? '';
      if (skuToUse && skuToUse.trim()) {
        // Buscar por nombre (server filtra por product name), por eso pedimos varias páginas si hace falta.
        // Aquí haremos una primera pasada y luego filtramos por SKU en cliente.
        const variables: FindAllVariantsToCreateStockQueryVariables = {
          page: 1,
          limit: 20,
          name: undefined, // no filtramos por nombre para no perdernos el SKU
          sortBy: SortBy.Name,
          sortOrder: SortOrder.Asc,
          includeSoftDeleted: false,
        };

        const res = await apollo.query<
          FindAllVariantsToCreateStockQuery,
          FindAllVariantsToCreateStockQueryVariables
        >({
          query: FindAllVariantsToCreateStockDocument,
          variables,
          fetchPolicy: 'network-only',
        });

        const products = res.data?.getAllProducts?.products ?? [];
        const allVariants =
          products.flatMap((p) =>
            (p.variants ?? []).map((v) => ({
              ...v,
              productName: p.name,
            })),
          ) ?? [];

        const matchesBySku = allVariants.filter(
          (v) => (v.sku ?? '').toLowerCase() === skuToUse.toLowerCase(),
        );

        if (matchesBySku.length === 0) {
          throw new Error(
            t('variantNotFoundBySku') ||
              `No se encontró variante con SKU "${skuToUse}".`,
          );
        }
        if (matchesBySku.length > 1) {
          // Si nos dan un filtro de atributo, intentemos desambiguar
          if (variantAttributeFilter?.key && variantAttributeFilter?.value) {
            const narrowed = matchesBySku.filter((v) =>
              (v.attributes ?? []).some(
                (a) =>
                  a.key?.toLowerCase() ===
                    variantAttributeFilter.key.toLowerCase() &&
                  a.value?.toLowerCase() ===
                    variantAttributeFilter.value.toLowerCase(),
              ),
            );
            if (narrowed.length === 1) return narrowed[0].id;
          }
          throw new Error(
            t('variantAmbiguousSku') ||
              `Existen múltiples variantes con SKU "${skuToUse}". Añade filtros o usa variantId.`,
          );
        }
        // Si no tenemos información de producto/atributos guardada, guardémosla
        if (!selectedVariant) {
          const first = matchesBySku[0];
          setSelectedVariant({
            id: first.id,
            sku: first.sku,
            productName: first.productName,
            attributes: first.attributes ?? [],
          });
        }
        return matchesBySku[0].id;
      }

      // 2) Fallback: buscar por nombre de producto y (opcional) atributo
      const name = (selectedVariant?.productName ?? productName ?? '').trim();
      if (!name) {
        throw new Error(
          t('missingVariantIdentifier') ||
            'Falta cómo identificar la variante (variantId, variantSku o productName).',
        );
      }

      const variables: FindAllVariantsToCreateStockQueryVariables = {
        page: 1,
        limit: 20,
        name, // el backend suele filtrar por nombre de producto
        sortBy: SortBy.Name,
        sortOrder: SortOrder.Asc,
        includeSoftDeleted: false,
      };

      const res = await apollo.query<
        FindAllVariantsToCreateStockQuery,
        FindAllVariantsToCreateStockQueryVariables
      >({
        query: FindAllVariantsToCreateStockDocument,
        variables,
        fetchPolicy: 'network-only',
      });

      const products = res.data?.getAllProducts?.products ?? [];
      const exactProducts = products.filter(
        (p) => (p.name ?? '').toLowerCase() === name.toLowerCase(),
      );

      if (exactProducts.length === 0) {
        throw new Error(
          t('productNotFound') ||
            `No se encontró producto con nombre "${name}".`,
        );
      }
      if (exactProducts.length > 1) {
        throw new Error(
          t('productAmbiguous') ||
            `Hay múltiples productos con nombre "${name}". Refina el nombre.`,
        );
      }

      const variants = exactProducts[0].variants ?? [];
      if (variants.length === 0) {
        throw new Error(
          t('productHasNoVariants') ||
            `El producto "${name}" no tiene variantes.`,
        );
      }

      if (variantAttributeFilter?.key && variantAttributeFilter?.value) {
        const narrowed = variants.filter((v) =>
          (v.attributes ?? []).some(
            (a) =>
              a.key?.toLowerCase() ===
                variantAttributeFilter.key.toLowerCase() &&
              a.value?.toLowerCase() ===
                variantAttributeFilter.value.toLowerCase(),
          ),
        );
        if (narrowed.length === 1) return narrowed[0].id;
        if (narrowed.length > 1) {
          throw new Error(
            t('variantAmbiguousAttr') ||
              `Varias variantes coinciden con ${variantAttributeFilter.key}:${variantAttributeFilter.value}.`,
          );
        }
        // Si no coincide ninguna, seguimos abajo con reglas por defecto
      }

      if (variants.length === 1) {
        if (!selectedVariant) {
          setSelectedVariant({
            id: variants[0].id,
            sku: variants[0].sku,
            productName: exactProducts[0].name,
            attributes: variants[0].attributes ?? [],
          });
        }
        return variants[0].id;
      }

      throw new Error(
        t('variantAmbiguous') ||
          `El producto "${name}" tiene múltiples variantes. Especifica SKU, atributos o usa variantId.`,
      );
    },
    [
      apollo,
      productName,
      variantSku,
      variantAttributeFilter,
      initialVariantId,
      selectedVariant,
      t,
    ],
  );

  /* --------------------------------- Submit -------------------------------- */

  const _submit = form.handleSubmit(async (values) => {
    try {
      // 1) Resolver IDs
      const [warehouseId, variantId] = await Promise.all([
        resolveWarehouseId(initialWarehouseId),
        resolveVariantId(initialVariantId),
      ]);

      const serials = getSerialNumbers?.() ?? [];

      const input: AddStockToWarehouseMutationVariables['input'] = {
        qtyAvailable: Number(values.available ?? 0),
        qtyReserved: Number(values.reserved ?? 0),
        productLocation: (values.productLocation ?? '').trim() || null,
        lotNumber: (values.lotNumber ?? '').trim() || null,
        serialNumbers: serials.length ? serials : undefined,
        estimatedReplenishmentDate: values.replenishmentDate
          ? values.replenishmentDate.toISOString()
          : null,
      };

      // 2) Crear stock
      const res = await mutate({
        variables: {
          warehouseId,
          variantId,
          input,
          reason: values.reason ?? reason ?? null,
        },
        // si el warehouseId se resolvió en runtime, hacemos refetch del warehouse correcto
        refetchQueries: [
          { query: FindWarehouseByIdDocument, variables: { id: warehouseId } },
          ...extraRefetchQueries,
        ],
      });

      if (res.data?.addStockToWarehouse?.id) {
        toast.success(t('createSuccess') || 'Stock creado exitosamente');
        onSuccess?.({ updatedWarehouseId: warehouseId });
        form.reset({
          available: 0,
          reserved: 0,
          productLocation: '',
          lotNumber: '',
          replenishmentDate: null,
        });
      } else {
        toast.error(t('createError') || 'No se pudo crear el stock.');
      }
    } catch (e) {
      const msg =
        (e as { message?: string })?.message ??
        t('createError') ??
        'Error al crear stock';
      toast.error(msg);
    }
  });

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    void _submit();
  };

  return {
    form,
    handleSubmit,
    isSubmitting: createState.loading,
    // Exponer selección de variante para que el componente principal/selector la pueda setear
    selectedVariant,
    selectVariantFromSelector,
  };
}
