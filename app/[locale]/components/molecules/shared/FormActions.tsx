import SaveButton from '@atoms/shared/SaveButton';
import CancelButton from '@atoms/shared/CancelButton';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  showIcons?: boolean;
  cancelText?: string;
  saveText?: string;
  className?: string;
  cancelButtonProps?: Partial<React.ComponentProps<typeof CancelButton>>;
  saveButtonProps?: Partial<React.ComponentProps<typeof SaveButton>>;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting = false,
  disabled = false,
  cancelText = 'cancel',
  saveText = 'save',
  showIcons = false,
  className = 'flex gap-2',
  cancelButtonProps = {},
  saveButtonProps = {},
}) => {
  return (
    <div className={className}>
      <CancelButton
        type="button"
        onClick={onCancel}
        disabled={isSubmitting || disabled}
        translationKey={cancelText}
        showIcon={showIcons}
        {...cancelButtonProps}
      />
      <SaveButton
        type="submit"
        loading={isSubmitting}
        disabled={disabled}
        translationKey={saveText}
        showIcon={showIcons}
        {...saveButtonProps}
      />
    </div>
  );
};

export default FormActions;
