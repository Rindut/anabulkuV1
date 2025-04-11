
import { User } from "lucide-react";

interface ParentAvatarProps {
  gender?: "boy" | "girl";
  size?: "sm" | "md" | "lg";
}

export const ParentAvatar = ({ 
  gender = "boy", 
  size = "md" 
}: ParentAvatarProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const bgColor = gender === "boy" ? "bg-blue-100" : "bg-pink-100";
  const iconColor = gender === "boy" ? "text-blue-500" : "text-pink-500";

  return (
    <div className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center`}>
      <User className={`${iconColor} ${size === "sm" ? "h-6 w-6" : size === "md" ? "h-10 w-10" : "h-16 w-16"}`} />
    </div>
  );
};
