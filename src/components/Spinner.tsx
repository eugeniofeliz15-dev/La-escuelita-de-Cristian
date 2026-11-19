interface Props {
  mensaje?: string;
}

export function Spinner({ mensaje = "Cargando..." }: Props) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-marca-500 border-t-transparent" />
      <p className="text-slate-600">{mensaje}</p>
    </div>
  );
}