import SortBySelect from '@atoms/shared/SortBySelect';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';
import { SortOrder, SortBy } from '@graphql/generated';
import { cn } from 'utils';

export interface SortControlsProps {
  sortsClassName?: string;
  className?: string;
  sortBy: SortBy;
  updateSortBy: (value: SortBy) => void;
  sortOrder: SortOrder;
  updateSortOrder: (value: SortOrder) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortsClassName,
  className,
  sortBy,
  updateSortBy,
  sortOrder,
  updateSortOrder,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center',
        className,
      )}
    >
      <SortBySelect
        value={sortBy}
        onChange={(value) => {
          if (value) {
            updateSortBy(value);
          }
        }}
        className={sortsClassName ?? 'w-full sm:w-40'}
        availableOptions={[SortBy.Name, SortBy.CreatedAt, SortBy.UpdatedAt]}
      />

      <SortOrderSelect
        value={sortOrder}
        onChange={(value) => {
          if (value) {
            updateSortOrder(value);
          }
        }}
        className={sortsClassName ?? 'w-full sm:w-40'}
      />
    </div>
  );
};
