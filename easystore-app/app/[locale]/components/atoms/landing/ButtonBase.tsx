import { Button } from '@components/atoms/ButtonCn';

type ButtonProps = {
  label: string;
};

export const ButtonBase = ({ label }: ButtonProps) => (
  <Button className="bg-primary rounded-lg p-2 text-sm font-bold text-white">
    {label}
  </Button>
);
