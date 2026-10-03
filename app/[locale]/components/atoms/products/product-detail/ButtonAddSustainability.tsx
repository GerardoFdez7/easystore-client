import { useTranslations } from 'next-intl';
import { Button } from '@shadcn/ui/button';
import { Plus } from 'lucide-react';
import { forwardRef } from 'react';

const ButtonAddSustainability = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const t = useTranslations('Products');
  return (
    <Button
      ref={ref}
      variant="outline"
      size="sm"
      className="border-title text-title hover:bg-title hover:text-white dark:hover:bg-white dark:hover:text-black"
      {...props}
    >
      <Plus className="mr-2 h-4 w-4" />
      {t('addSustainability')}
    </Button>
  );
});

ButtonAddSustainability.displayName = 'ButtonAddSustainability';

export default ButtonAddSustainability;
