import { Card, CardContent } from '@shadcn/ui/card';
import { AlertCircle } from 'lucide-react';
import { cn } from 'utils';

interface ErrorStateProps {
  className?: string;
  title?: string;
  message: string;
}

/**
 * ErrorState component displays an error message with an alert icon
 * Used for indicating error states in various components
 */
const ErrorState: React.FC<ErrorStateProps> = ({
  className,
  title = 'Error',
  message,
}) => {
  return (
    <Card className={cn('border-destructive w-full', className)}>
      <CardContent className="p-6">
        <div className="text-destructive flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span>
            {title}: {message}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorState;
