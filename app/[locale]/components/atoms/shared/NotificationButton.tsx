import { Bell } from 'lucide-react';
import { Button } from '@shadcn/ui/button';

export default function NotificationButton() {
  return (
    <Button className="hover:bg-hover bg-background h-10 w-10 rounded-lg p-2 shadow-none">
      <Bell className="text-title size-6" />
    </Button>
  );
}
