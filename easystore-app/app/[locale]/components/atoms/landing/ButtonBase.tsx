import { Button } from '@components/atoms/shared/ButtonCn';

type ButtonProps = {
  label: string;
};

export const ButtonBase = ({ label }: ButtonProps) => (
  <Button className="bg-primary flex h-[70px] w-[180px] items-center justify-center rounded-full text-2xl font-extrabold text-white max-[580px]:h-[12vw] max-[580px]:w-[33vw] max-[580px]:text-[4vw]">
    {label}
  </Button>
);
