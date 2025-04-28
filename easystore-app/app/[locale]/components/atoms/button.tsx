type ButtonProps = {
  label: string;
};

export const Button = ({ label }: ButtonProps) => (
  <button className="rounded-full bg-purple-500 px-4 py-2 font-semibold text-white transition hover:bg-purple-600">
    {label}
  </button>
);
