import { useBulkProductArchiveAction } from './useBulkProductArchiveAction';

interface UseMultipleSoftDeleteProductsProps {
  onSuccess?: () => void;
}

export const useMultipleSoftDeleteProducts = ({
  onSuccess,
}: UseMultipleSoftDeleteProductsProps = {}) => {
  const { run, loading, error } = useBulkProductArchiveAction(
    'archive',
    onSuccess,
  );

  return {
    handleMultipleSoftDelete: run,
    loading,
    error,
  };
};

export default useMultipleSoftDeleteProducts;
