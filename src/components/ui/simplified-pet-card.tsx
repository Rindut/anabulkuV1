
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SimplifiedPetCardProps {
  name: string;
  gender: string;
  age: number;
  image: ReactNode;
  className?: string;
}

export const SimplifiedPetCard = ({
  name,
  gender,
  age,
  image,
  className,
}: SimplifiedPetCardProps) => {
  return (
    <div 
      className={cn(
        "bg-blue-50 rounded-3xl p-6 shadow-sm",
        "flex flex-col items-center justify-between h-full",
        className
      )}
    >
      <div className="flex-1 flex items-center justify-center mb-4 py-2">
        {image}
      </div>
      <div className="text-center w-full mt-2">
        <h3 className="text-2xl font-bold mb-1">{name}</h3>
        <p className="text-gray-700 font-medium text-lg">
          {gender} - {age} yo
        </p>
      </div>
    </div>
  );
};
