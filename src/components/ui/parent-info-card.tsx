
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParentInfoCardProps {
  name: string;
  avatar: ReactNode;
  petCount: number;
  className?: string;
}

export const ParentInfoCard = ({
  name,
  avatar,
  petCount,
  className,
}: ParentInfoCardProps) => {
  return (
    <div 
      className={cn(
        "bg-[#D9EBE7]/60 rounded-xl p-3 flex items-start",
        "shadow-sm",
        className
      )}
    >
      {avatar}
      
      <div className="ml-3 flex-1">
        <div className="text-petapp-text-neutral text-xs font-medium">Pawrent's Name</div>
        <div className="text-xl font-semibold text-petapp-text-strong mb-2">{name}</div>
        
        <div className="text-petapp-text-neutral text-xs font-medium">Number of Pets</div>
        <div className="text-xl font-semibold text-petapp-text-strong">{petCount}</div>
      </div>
    </div>
  );
};
