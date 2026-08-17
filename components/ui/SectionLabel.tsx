interface SectionLabelProps {
  children: React.ReactNode;
  showDivider?: boolean;
  light?: boolean;
}

export default function SectionLabel({ children, showDivider = true, light = false }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-xs font-bold uppercase tracking-widest ${
          light ? 'text-white/90' : 'text-[#D91B5C]'
        }`}
      >
        {children}
      </span>
      {showDivider && (
        <div
          className={`h-[1.5px] w-12 rounded-full ${
            light
              ? 'bg-white/40'
              : 'bg-gradient-to-r from-[#D91B5C] to-[#D4A520]'
          }`}
        />
      )}
    </div>
  );
}
