import { Button } from '@shadcn/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shadcn/ui/card';

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
  className,
}: ProfileSectionProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <h2>{title}</h2>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <CardAction>
          <Button type="button" variant="outline" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
