
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PetCardHorizontalProps {
  name: string;
  gender: string;
  age: number;
  petType: string;
  image: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const PetCardHorizontal = ({
  name,
  gender,
  age,
  petType,
  image,
  className,
  onClick,
}: PetCardHorizontalProps) => {
  return (
    <div 
      className={cn(
        "bg-petapp-petBox rounded-[20px] p-5 pb-4 pt-16 shadow-md min-w-[140px] flex-shrink-0", // Increased top padding
        "flex flex-col items-center justify-between h-full",
        "cursor-pointer transition-all hover:scale-105 hover:shadow-lg",
        "relative mt-14", // Increased top margin for better avatar visibility
        className
      )}
      onClick={onClick}
    >
      {/* Avatar Container - Positioned absolutely to float above the card */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
        {image}
      </div>
      
      <div className="text-center w-full mt-3">
        <h3 className="text-lg font-bold text-petapp-text-strong mb-1">{name}</h3>
        <p className="text-petapp-text-neutral text-sm font-medium">
          {age} yo {gender.toLowerCase()} {petType}
        </p>
      </div>
    </div>
  );
};
