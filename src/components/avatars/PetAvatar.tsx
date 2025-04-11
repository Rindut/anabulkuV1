
import { Cat, Dog } from "lucide-react";

interface PetAvatarProps {
  petType?: "cat" | "dog";
  size?: "sm" | "md" | "lg";
  gender?: "male" | "female";
}

export const PetAvatar = ({ 
  petType = "cat", 
  size = "md", 
  gender = "male" 
}: PetAvatarProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const bgColor = gender === "male" ? "bg-blue-100" : "bg-pink-100";
  const iconColor = gender === "male" ? "text-blue-500" : "text-pink-500";

  return (
    <div className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center`}>
      {petType === "cat" ? (
        <Cat className={`${iconColor} ${size === "sm" ? "h-6 w-6" : size === "md" ? "h-10 w-10" : "h-16 w-16"}`} />
      ) : (
        <Dog className={`${iconColor} ${size === "sm" ? "h-6 w-6" : size === "md" ? "h-10 w-10" : "h-16 w-16"}`} />
      )}
    </div>
  );
};
