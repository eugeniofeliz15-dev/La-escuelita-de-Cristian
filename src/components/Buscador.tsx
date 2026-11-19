import { Search } from "lucide-react";

interface Props {
  valor: string;
  onCambiar: (valor: string) => void;
  placeholder?: string;
}

export function Buscador({ valor, onCambiar, placeholder = "Buscar..." }: Props) {
  return (
    <div className="relative max-w-md">
      <Search
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-3 pl-10 text-sm focus:border-marca-500 focus:ring-2 focus:ring-marca-100 focus:outline-none"
      />
    </div>
  );
}