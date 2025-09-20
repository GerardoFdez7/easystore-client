import TagInputFormField from '@molecules/shared/TagInputFormField';

export default function TagsFormField() {
  return (
    <TagInputFormField
      name="tags"
      label="Tags"
      placeholder="Add"
      addButtonText="Add tag"
      emptyStateText="No tags added"
      deleteAriaLabel={'Delete'}
    />
  );
}
