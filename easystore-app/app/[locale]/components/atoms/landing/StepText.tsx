type StepTitleProps = {
  number: string;
  title: string;
};

export default function StepText({ number, title }: StepTitleProps) {
  return (
    <div className="flex w-full max-w-sm flex-col text-center md:text-left">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-secondary text-xl font-bold">{number}</span>
        <h3 className="text-text font-regular text-2xl sm:text-3xl">{title}</h3>
      </div>
      <div className="border-t border-gray-300 pt-4"></div>
    </div>
  );
}
