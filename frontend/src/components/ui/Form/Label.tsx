interface Props {
  text: string;
  htmlFor?: string;
}

function Label({ text, htmlFor }: Props) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {text}
    </label>
  );
}
export default Label;
