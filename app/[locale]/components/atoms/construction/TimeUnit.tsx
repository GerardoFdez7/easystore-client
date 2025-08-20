type TimeUnitProps = {
  value: number;
  label: string;
};

const TimeUnit = ({ value, label }: TimeUnitProps) => {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <div className="bg-title text-primary-foreground font-heading flex items-center justify-center rounded-lg p-4 text-2xl font-black md:text-3xl">
        {value}
      </div>
      <div className="text-muted-foreground text-sm font-medium">{label}</div>
    </div>
  );
};

export default TimeUnit;
