
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
        "shadow-sm relative pt-14 mt-8", // Added padding and margin to accommodate floating avatar
        className
      )}
    >
      {/* Avatar Container with floating effect */}
      <div className="absolute -top-8 left-4 z-[1]">
        {avatar}
      </div>
      
      <div className="ml-24 flex-1 flex flex-col mt-2"> {/* Added small top margin for perfect alignment with avatar */}
        <div className="text-black text-[12px] font-poppins">Pawrent's Name</div>
        <div className="text-[15px] font-poppins text-black mb-2">{name}</div>
        
        <div className="text-black text-[12px] font-poppins">Number of Pets</div>
        <div className="text-[15px] font-poppins text-black">{petCount}</div>
      </div>
    </div>
  );
};
