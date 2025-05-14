type HeaderPlanProps = {
  title: string;
  price: string;
};

export default function HeaderPlan({ title, price }: HeaderPlanProps) {
  return (
    <div className="mb-4">
      <h3 className="text-title font-bold">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-title text-4xl font-extrabold">{price}</span>
        <span className="text-title ml-1 font-bold">/month</span>
      </div>
    </div>
  );
}
