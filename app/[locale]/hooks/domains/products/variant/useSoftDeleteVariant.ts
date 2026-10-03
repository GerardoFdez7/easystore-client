import { useVariantArchiveAction } from './useVariantArchiveAction';

export function useSoftDeleteVariant() {
  const { run, loading } = useVariantArchiveAction('archive');
  return { handleSoftDelete: run, loading };
}
