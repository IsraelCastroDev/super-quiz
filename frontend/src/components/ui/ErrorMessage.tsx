interface Props {
  children: React.ReactNode;
}

export function ErrorMessage({ children }: Props) {
  return <p className="text-red-500">{children}</p>;
}
