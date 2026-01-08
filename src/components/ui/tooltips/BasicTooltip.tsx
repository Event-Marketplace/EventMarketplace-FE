type BasicTooltipProps = {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  width?: number;
};

export default function BasicTooltip({
  text,
  children,
  position = "top",
  width,
}: BasicTooltipProps) {
  const positionClasses: Record<string, string> = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2 ",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  const widthClass = width ? `w-[${width}px]` : "w-auto";

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute ${positionClasses[position]} 
        opacity-0 group-hover:opacity-100
        bg-gray-800 text-white text-sm rounded py-1 px-2
        pointer-events-none z-50
        transition-opacity duration-300 
        ${widthClass}`}
      >
        {text}
      </div>
    </div>
  );
}
