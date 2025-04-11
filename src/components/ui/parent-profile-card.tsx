
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
        "bg-petapp-mint bg-opacity-50 rounded-3xl p-5 flex items-center",
        "shadow-sm",
        className
      )}
    >
      <div className="mr-8 flex-shrink-0 py-2">
        {avatar}
      </div>
      <div className="flex-1">
        <div className="text-gray-600 font-medium">Pawrent's Name</div>
        <div className="text-2xl font-bold mb-4">{name}</div>
        
        <div className="text-gray-600 font-medium">Number of Pets</div>
        <div className="text-2xl font-bold">{petCount}</div>
      </div>
    </div>
  );
};
