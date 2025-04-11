
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParentAvatar3DProps {
  gender?: "boy" | "girl";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const ParentAvatar3D = ({ 
  gender = "boy", 
  size = "md",
  className
}: ParentAvatar3DProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-40 w-40"
  };

  // Using a placeholder rounded avatar with User icon
  // In a real app, this would be replaced with 3D models
  return (
    <div className={cn(
      sizeClasses[size], 
      gender === "boy" ? "bg-blue-200" : "bg-pink-200",
      "rounded-full flex items-center justify-center shadow-sm",
      className
    )}>
      <User 
        className={cn(
          gender === "boy" ? "text-blue-700" : "text-pink-700",
          size === "sm" ? "h-6 w-6" : 
          size === "md" ? "h-10 w-10" : 
          size === "lg" ? "h-16 w-16" :
          "h-24 w-24"
        )} 
      />
    </div>
  );
};
