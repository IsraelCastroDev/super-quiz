interface BadgeGroupProps {
  children: React.ReactNode;
}

export function BadgeGroup({ children }: BadgeGroupProps) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}
