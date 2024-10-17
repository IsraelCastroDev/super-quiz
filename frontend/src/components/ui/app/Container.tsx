interface Props {
  children: React.ReactNode;
}

function Container({ children }: Props) {
  return <section className="mt-24 relative">{children}</section>;
}
export default Container;
