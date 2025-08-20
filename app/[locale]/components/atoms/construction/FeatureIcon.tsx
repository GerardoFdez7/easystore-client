import { LucideIcon } from 'lucide-react';

type FeatureIconProps = {
  icon: LucideIcon;
  label: string;
  iconColor?: string;
};

const FeatureIcon = ({
  icon: Icon,
  label,
  iconColor = 'text-title',
}: FeatureIconProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="bg-card rounded-xl border p-4 shadow-sm">
        <Icon className={`h-8 w-8 ${iconColor}`} />
      </div>
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
    </div>
  );
};

export default FeatureIcon;
