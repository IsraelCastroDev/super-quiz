interface Props {
  children: React.ReactNode;
}

export function Container({ children }: Props) {
  return <section className="mt-24 relative">{children}</section>;
}
