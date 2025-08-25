import { Button } from '@shadcn/ui/button';

interface ProfileSectionProps {
  title: string;
  description?: string;
  buttonText: string;
  onButtonClick?: () => void;
  className?: string;
}

export default function ProfileSection({
  title,
  description,
  buttonText,
  onButtonClick,
  className = 'mb-10',
}: ProfileSectionProps) {
  return (
    <section
      className={`${className} grid grid-cols-1 items-start gap-3 md:grid-cols-[140px_1fr] md:gap-6`}
    >
      <div className="text-title pt-1 font-bold md:pt-2">{title}</div>
      <div className="bg-foregorund rounded-xl border border-gray-200 p-4 shadow-sm sm:p-5">
        {description && (
          <p className="text-text mb-4 font-medium">{description}</p>
        )}
        <Button
          variant="outline"
          className="border-title text-title hover:bg-title w-full rounded-full hover:text-white"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
