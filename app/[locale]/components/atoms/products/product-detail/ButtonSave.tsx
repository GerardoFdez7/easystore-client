import { Button } from '@shadcn/ui/button';
import { useRouter } from 'next/navigation';

export default function ButtonSave() {
  const router = useRouter();
  return (
    <Button
      type="submit"
      className="bg-title hover:bg-title/80"
      onClick={() => router.back()}
    >
      Save Changes
    </Button>
  );
}
