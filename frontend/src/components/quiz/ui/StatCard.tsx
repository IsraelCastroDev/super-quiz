interface StatCardProps {
  text: string;
  IconComponent?: React.ElementType;
}

export function StatCard({ text, IconComponent }: StatCardProps) {
  return (
    <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-lg">
      {IconComponent && <IconComponent className="h-6 w-6 text-slate-500" />}
      <span className="text-slate-600">{text}</span>
    </div>
  );
}
