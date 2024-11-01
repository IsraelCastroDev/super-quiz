interface Props {
  children: React.ReactNode;
}

export function Card({ children }: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
      {children}
    </div>
  );
}
