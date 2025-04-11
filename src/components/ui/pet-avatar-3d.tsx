
import { Cat, Dog } from "lucide-react";
import { cn } from "@/lib/utils";

interface PetAvatar3DProps {
  petType?: "cat" | "dog";
  size?: "sm" | "md" | "lg" | "xl";
  gender?: "male" | "female";
  className?: string;
}

export const PetAvatar3D = ({ 
  petType = "cat", 
  size = "md", 
  gender = "male",
  className
}: PetAvatar3DProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32"
  };

  const bgColor = petType === "cat" 
    ? (gender === "male" ? "bg-orange-100" : "bg-orange-50") 
    : (gender === "male" ? "bg-amber-100" : "bg-amber-50");
  
  const iconColor = petType === "cat"
    ? (gender === "male" ? "text-orange-600" : "text-orange-500")
    : (gender === "male" ? "text-amber-600" : "text-amber-500");

  return (
    <div className={cn(
      sizeClasses[size],
      bgColor,
      "rounded-full flex items-center justify-center shadow-sm",
      className
    )}>
      {petType === "cat" ? (
        <Cat className={cn(
          iconColor,
          size === "sm" ? "h-6 w-6" : 
          size === "md" ? "h-10 w-10" : 
          size === "lg" ? "h-16 w-16" :
          "h-20 w-20"
        )} />
      ) : (
        <Dog className={cn(
          iconColor,
          size === "sm" ? "h-6 w-6" : 
          size === "md" ? "h-10 w-10" : 
          size === "lg" ? "h-16 w-16" :
          "h-20 w-20"
        )} />
      )}
    </div>
  );
};
