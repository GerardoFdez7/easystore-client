import { useVariantArchiveAction } from './useVariantArchiveAction';

export function useRestoreVariant() {
  const { run, loading } = useVariantArchiveAction('restore');
  return { handleRestore: run, loading };
}
