import React, { useRef, useState, useEffect } from 'react';
import { CloudUpload, Trash2, Undo2, Redo2, Share2, Sun, Moon } from 'lucide-react';

interface HeaderVillaFloraProps {
  currentLevel: 'Bachillerato' | 'Primaria';
  onSelectLevel: (lvl: 'Bachillerato' | 'Primaria') => void;
  onOpenDeleteModal: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onPublish: () => void;
}

export const HeaderVillaFlora: React.FC<HeaderVillaFloraProps> = ({
  currentLevel,
  onSelectLevel,
  onOpenDeleteModal,
  onUndo,
  onRedo,
  onPublish,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('vf_custom_logo') || '/villa-flora-logo.svg';
    } catch {
      return '/villa-flora-logo.svg';
    }
  });

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLogoUrl(result);
        try {
          localStorage.setItem('vf_custom_logo', result);
        } catch {}
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="w-full h-[85px] bg-white border-b border-[#939598]/20 px-4 lg:px-6 flex items-center justify-between gap-4 select-none shrink-0 z-20 shadow-2xs">
      {/* Hidden file input to update logo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleLogoFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Left: Complete Institutional Logo Image with hover action overlay */}
      <div className="flex items-center h-full py-2 shrink-0">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative group h-full flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 rounded-lg outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#007DC5]"
          title="Hacer clic para cambiar o actualizar el logo institucional"
        >
          <img
            src={logoUrl}
            alt="Institución Educativa Villa Flora"
            className="h-full max-h-[70px] w-auto object-contain border-0 outline-none shadow-none bg-transparent select-none transition-opacity duration-150 group-hover:opacity-90"
          />
          {/* Overlay emergente al pasar el cursor (hover disimulado y transparente) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/25 backdrop-blur-[1.5px] text-white/90 text-[10px] font-normal border border-white/15">
              <CloudUpload className="w-3 h-3 text-white/85" />
              <span>Actualizar logo</span>
            </span>
          </div>
        </button>
      </div>

      {/* Center: Academic Level Segmented Controls */}
      <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-xl border border-[#939598]/25 text-xs shadow-2xs">
        <button
          type="button"
          onClick={() => onSelectLevel('Bachillerato')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentLevel === 'Bachillerato'
              ? 'bg-[#231F20] text-white shadow-xs'
              : 'text-[#231F20] hover:text-[#034EA2] hover:bg-white/70'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Bachillerato</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectLevel('Primaria')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            currentLevel === 'Primaria'
              ? 'bg-[#231F20] text-white shadow-xs'
              : 'text-[#231F20] hover:text-[#034EA2] hover:bg-white/70'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Primaria</span>
        </button>
      </div>

      {/* Right Actions: Undo/Redo, ELIMINAR, Publicar */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Undo / Redo controls */}
        <div className="flex items-center bg-slate-50 border border-[#939598]/25 rounded-lg p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={onUndo}
            className="rounded p-1 text-[#939598] hover:text-[#231F20] hover:bg-slate-200/60 active:scale-95 transition cursor-pointer"
            title="Deshacer última acción"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            className="rounded p-1 text-[#939598] hover:text-[#231F20] hover:bg-slate-200/60 active:scale-95 transition cursor-pointer"
            title="Rehacer última acción"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ELIMINAR action */}
        <button
          type="button"
          onClick={onOpenDeleteModal}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#ED145B]/30 bg-[#ED145B]/10 px-3 py-1.5 text-xs font-bold text-[#ED145B] hover:bg-[#ED145B] hover:text-white transition-all active:scale-95 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED145B]"
          title="Restaurar o purgar horario (requiere confirmación estricta)"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>ELIMINAR</span>
        </button>

        {/* Publicar parrilla CTA */}
        <button
          type="button"
          onClick={onPublish}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#008A52] hover:bg-[#007545] px-4 py-2 text-xs font-bold text-white shadow-xs transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008A52]"
          title="Publicar parrilla académica"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Publicar parrilla</span>
        </button>
      </div>
    </header>
  );
};
