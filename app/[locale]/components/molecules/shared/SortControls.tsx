import SortBySelect from '@atoms/shared/SortBySelect';
import SortOrderSelect from '@atoms/shared/SortOrderSelect';
import { SortOrder, SortBy } from '@graphql/generated';

export interface SortControlsProps {
  sortBy: SortBy;
  updateSortBy: (value: SortBy) => void;
  sortOrder: SortOrder;
  updateSortOrder: (value: SortOrder) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  updateSortBy,
  sortOrder,
  updateSortOrder,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <SortBySelect
        value={sortBy}
        onChange={(value) => {
          if (value) {
            updateSortBy(value);
          }
        }}
        className="w-32"
        availableOptions={[SortBy.Name, SortBy.CreatedAt, SortBy.UpdatedAt]}
      />

      <SortOrderSelect
        value={sortOrder}
        onChange={(value) => {
          if (value) {
            updateSortOrder(value);
          }
        }}
        className="w-32"
      />
    </div>
  );
};
