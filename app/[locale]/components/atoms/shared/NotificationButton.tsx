import { Bell } from 'lucide-react';
import { Button } from '@shadcn/ui/button';

export default function NotificationButton() {
  return (
    <Button className="hover:bg-hover rounded-lg p-2">
      <Bell className="text-title h-5 w-5" />
    </Button>
  );
}
