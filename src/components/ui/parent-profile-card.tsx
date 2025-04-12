
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParentProfileCardProps {
  name: string;
  avatar: ReactNode;
  petCount: number;
  className?: string;
}

export const ParentProfileCard = ({
  name,
  avatar,
  petCount,
  className,
}: ParentProfileCardProps) => {
  return (
    <div 
      className={cn(
        "bg-petapp-mint bg-opacity-50 rounded-2xl p-3 flex items-center",
        "shadow-sm",
        className
      )}
    >
      <div className="mr-4 flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1">
        <div className="text-gray-600 text-xs font-medium">Pawrent's Name</div>
        <div className="text-lg font-bold mb-2">{name}</div>
        
        <div className="text-gray-600 text-xs font-medium">Number of Pets</div>
        <div className="text-lg font-bold">{petCount}</div>
      </div>
    </div>
  );
};
