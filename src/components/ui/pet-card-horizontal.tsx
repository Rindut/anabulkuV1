
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PetCardHorizontalProps {
  name: string;
  gender: string;
  age: number;
  petType: string;
  image: ReactNode;
  className?: string;
}

export const PetCardHorizontal = ({
  name,
  gender,
  age,
  petType,
  image,
  className,
}: PetCardHorizontalProps) => {
  return (
    <div 
      className={cn(
        "bg-petapp-peach rounded-2xl p-4 shadow-sm min-w-[130px] flex-shrink-0",
        "flex flex-col items-center justify-between h-full",
        className
      )}
    >
      <div className="flex-1 flex items-center justify-center mb-1 pt-2 overflow-visible h-32 relative">
        {image}
      </div>
      <div className="text-center w-full">
        <h3 className="text-base font-semibold text-petapp-text-strong mb-0.5">{name}</h3>
        <p className="text-petapp-text-neutral text-xs font-medium">
          {age} yo {gender.toLowerCase()} {petType}
        </p>
      </div>
    </div>
  );
};
