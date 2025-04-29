import { Button } from '@components/atoms/ButtonCn';

type ButtonProps = {
  label: string;
};

export const ButtonBase = ({ label }: ButtonProps) => (
  <Button className="rounded-full bg-purple-500 font-semibold text-white hover:bg-purple-600">
    {label}
  </Button>
);
