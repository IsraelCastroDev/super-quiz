interface Props {
  text?: string;
  htmlFor?: string;
}

export function Label({ text, htmlFor }: Props) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {text}
    </label>
  );
}
