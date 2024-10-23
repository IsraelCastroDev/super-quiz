interface Props {
  children: React.ReactNode;
  isPending?: boolean;
  messageLoading?: string;
}

export function ButtonSubmit({
  children,
  isPending,
  messageLoading = "Cargando...",
}: Props) {
  return (
    <div className="flex justify-center w-full">
      <button
        type="submit"
        className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-md text-center cursor-pointer block w-full disabled:opacity-50 disabled:cursor-default"
        disabled={isPending}
      >
        {isPending ? messageLoading : children}
      </button>
    </div>
  );
}
