export function ContainerForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[35rem] mx-auto px-5 md:px-10 py-5 border border-slate-700 shadow-md rounded-md mt-5 space-y-3">
      {children}
    </div>
  );
}
