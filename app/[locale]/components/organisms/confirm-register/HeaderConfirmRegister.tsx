import { useTranslations } from 'next-intl';
import Input from '@atoms/shared/Input';
import { Label } from '@atoms/shared/Label';
import { LanguageButton } from '@atoms/shared/ButtonLanguage';

export default function HeaderConfirmRegister() {
  const t = useTranslations('ConfirmRegister');

  return (
    <header className="mt-4 md:mx-20 xl:mx-35">
      <div className="mx-9 mb-5 flex justify-end sm:mx-1">
        <LanguageButton />
      </div>
      <div className="px-5">
        <h1 className="text-title mb-2 text-[32px] font-extrabold sm:text-4xl 2xl:text-5xl">
          {t('title')}
        </h1>
        <p className="text-primary tex-[16px] mb-8 2xl:text-xl">
          {t('description')}
        </p>

        <div className="mb-15">
          <Label
            htmlFor="businessName"
            className="tex-[16px] text-foreground mb-2 block font-medium 2xl:text-xl"
          >
            {t('businessName')}
          </Label>
          <Input
            required
            type="text"
            id="businessName"
            className="md:w-[593px]"
          />
        </div>
      </div>
    </header>
  );
}
