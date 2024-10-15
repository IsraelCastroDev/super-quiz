interface Props {
  children: React.ReactNode;
  isPending?: boolean;
}

function ButtonSubmit({ children, isPending }: Props) {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-slate-700 hover:bg-slate-800 text-white p-3 rounded-md text-center cursor-pointer block w-full disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Cargando..." : children}
      </button>
    </div>
  );
}
export default ButtonSubmit;
