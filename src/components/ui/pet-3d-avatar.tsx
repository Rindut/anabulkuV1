
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
    md: "h-32 w-32",
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
      floating && "relative z-10", // Added z-index to make avatar appear above card
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${petType} avatar`}
        className={cn(
          "w-full object-cover object-bottom",
          floating && "absolute bottom-0 h-[150%] drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] z-10", // Enhanced shadow for floating effect
          !floating && "h-[150%]"
        )}
        style={{ 
          objectPosition: 'bottom',
          transform: floating ? 'translateY(-20px)' : undefined // Move avatar up slightly for floating effect
        }}
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
