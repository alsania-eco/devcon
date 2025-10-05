import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useFontSize } from "./ui/font";

export interface PageHeaderProps {
  onTitleClick?: () => void;
  title?: string;
  rightContent?: React.ReactNode;
  showBorder?: boolean;
}

export function PageHeader({
  onTitleClick,
  title,
  rightContent,
  showBorder,
}: PageHeaderProps) {
  const fontSize = useFontSize(-1);

  return (
    <div
      className={`sticky top-0 z-20 m-0 flex items-center justify-between glass py-2 px-4 ${
        showBorder
          ? "border-0 border-b-[1px] border-solid border-b-primary"
          : ""
      }`}
    >
      {title ? (
        <div
          className="flex cursor-pointer items-center transition-colors duration-200 hover:brightness-125"
          onClick={onTitleClick}
        >
          <ArrowLeftIcon className="ml-3 inline-block h-3 w-3" />
          <span
            className="mx-2 inline-block text-lg font-bold cyberpunk-heading neon-glow"
            style={{
              fontSize,
              fontFamily: "Orbitron, monospace",
            }}
          >
            {title}
          </span>
        </div>
      ) : (
        <div />
      )}

      {rightContent && <div className="pr-2">{rightContent}</div>}
    </div>
  );
}
