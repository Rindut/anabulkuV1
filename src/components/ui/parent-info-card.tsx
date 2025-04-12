
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
        "bg-petapp-pawrentBox/60 rounded-xl p-3 flex items-start relative overflow-visible",
        "shadow-sm", // Added overflow-visible to allow elements to extend outside
        className
      )}
    >
      {/* Avatar Container with larger size to extend outside */}
      <div className="z-[1] mr-6 -mt-8 -ml-1 flex items-end pawrent-avatar relative top-[30px] -mb-[30px]">
        {avatar}
      </div>
      
      <div className="flex-1 flex flex-col"> {/* Removed extra left margin and top margin */}
        <div className="text-black text-[12px] font-poppins">Pawrent's Name</div>
        <div className="text-[15px] font-poppins text-black mb-2">{name}</div>
        
        <div className="text-black text-[12px] font-poppins">Number of Pets</div>
        <div className="text-[15px] font-poppins text-black">{petCount}</div>
      </div>
    </div>
  );
};
