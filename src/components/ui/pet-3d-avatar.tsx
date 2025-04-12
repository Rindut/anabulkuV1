
import { cn } from "@/lib/utils";

interface Pet3DAvatarProps {
  petType: "cat" | "dog";
  size?: "sm" | "md" | "lg";
  className?: string;
  floating?: boolean;
}

export const Pet3DAvatar = ({
  petType,
  size = "md",
  className,
  floating = false
}: Pet3DAvatarProps) => {
  const sizeClasses = {
    sm: "h-20 w-20",
    md: "h-32 w-32", // Further increased size to emphasize head extending
    lg: "h-40 w-40",
  };

  // Use the appropriate avatar based on pet type
  const avatarSrc = petType === "cat"
    ? "/lovable-uploads/2849d71e-b0b1-4fd0-95e6-10898124372b.png"  // Cat avatar
    : "/lovable-uploads/c22508c8-76e4-40a4-824b-6a4b629a00c4.png";  // Dog avatar

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-end justify-center relative",
      floating && "drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${petType} avatar`}
        className={cn(
          "w-full object-cover object-bottom",
          floating && "absolute bottom-0 h-[150%]", // Increased from 130% to 150%
          !floating && "h-[150%]"
        )}
        style={{ objectPosition: 'bottom' }}
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
