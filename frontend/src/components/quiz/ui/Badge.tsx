interface PropsBadge {
  text: string;
}

export function Badge({ text }: PropsBadge) {
  return (
    <button
      type="button"
      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
    >
      {text}
    </button>
  );
}
