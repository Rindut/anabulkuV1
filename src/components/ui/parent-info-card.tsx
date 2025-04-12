
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
        "bg-[#D9EBE7] rounded-3xl py-8 px-6 flex min-h-[180px]",
        "shadow-sm relative mt-8", // Margin to accommodate floating greeting text
        className
      )}
    >
      {/* Avatar Container positioned on the left */}
      <div className="flex-shrink-0 w-44 -ml-6 z-[1]">
        {avatar}
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-[#465352] text-lg font-medium font-poppins">Pawrent's Name</div>
        <div className="text-[32px] font-semibold text-[#1A2928] mb-6 font-poppins">{name}</div>
        
        <div className="text-[#465352] text-lg font-medium font-poppins">Number of Pets</div>
        <div className="text-[32px] font-semibold text-[#1A2928] font-poppins">{petCount}</div>
      </div>
    </div>
  );
};
