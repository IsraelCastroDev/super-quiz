interface Props {
  children: React.ReactNode;
}

function ErrorMessage({ children }: Props) {
  return <p className="text-red-500">{children}</p>;
}
export default ErrorMessage;
