
import { cn } from "@/lib/utils";

interface Pet3DAvatarProps {
  petType: "cat" | "dog";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Pet3DAvatar = ({
  petType,
  size = "md",
  className
}: Pet3DAvatarProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20",
    lg: "h-24 w-24",
  };

  // Use the appropriate avatar based on pet type
  const avatarSrc = petType === "cat"
    ? "/lovable-uploads/2849d71e-b0b1-4fd0-95e6-10898124372b.png"  // Cat avatar
    : "/lovable-uploads/c22508c8-76e4-40a4-824b-6a4b629a00c4.png";  // Dog avatar

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${petType} avatar`}
        className="h-full object-contain"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.nextSibling!.textContent = "Avatar not available";
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="hidden text-sm text-gray-500 text-center"></span>
    </div>
  );
};
