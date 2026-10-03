import { useBulkProductArchiveAction } from './useBulkProductArchiveAction';

interface UseMultipleRestoreProductsProps {
  onSuccess?: () => void;
}

export const useMultipleRestoreProducts = ({
  onSuccess,
}: UseMultipleRestoreProductsProps = {}) => {
  const { run, loading, error } = useBulkProductArchiveAction(
    'restore',
    onSuccess,
  );

  return {
    handleMultipleRestore: run,
    loading,
    error,
  };
};

export default useMultipleRestoreProducts;
