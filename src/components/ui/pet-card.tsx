
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ButtonCustom } from "./button-custom";

interface PetCardProps {
  avatar: ReactNode;
  name: string;
  type: string;
  age: string | number;
  className?: string;
  onClick?: () => void;
}

export const PetCard = ({
  avatar,
  name,
  type,
  age,
  className,
  onClick,
}: PetCardProps) => {
  return (
    <div 
      className={cn(
        "bg-petapp-peach rounded-2xl p-4 shadow-md flex flex-col items-center",
        "transition-transform hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="mb-2">{avatar}</div>
      <h3 className="font-bold text-lg mb-1">{name}</h3>
      <div className="text-sm text-gray-600 mb-1">{type}</div>
      <div className="text-sm text-gray-600 mb-3">{typeof age === 'number' ? `${age} years` : age}</div>
      <ButtonCustom 
        variant="primary" 
        size="sm"
        className="mt-auto"
      >
        Pet Journal
      </ButtonCustom>
    </div>
  );
};
