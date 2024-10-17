interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export function Form({ onSubmit, children }: Props) {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-3">
      {children}
    </form>
  );
}
