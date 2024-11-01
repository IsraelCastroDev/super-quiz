interface Props {
  children: React.ReactNode;
}

export function CardContent({ children }: Props) {
  return (
    <div className="p-4 flex items-center justify-between">{children}</div>
  );
}
