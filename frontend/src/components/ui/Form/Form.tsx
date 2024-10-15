interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

function Form({ onSubmit, children }: Props) {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-3">
      {children}
    </form>
  );
}
export default Form;
