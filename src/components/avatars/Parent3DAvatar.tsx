
import { cn } from "@/lib/utils";

interface Parent3DAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  gender?: "Male" | "Female";
  floating?: boolean;
}

export const Parent3DAvatar = ({
  size = "md",
  className,
  gender = "Male",
  floating = false
}: Parent3DAvatarProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20",  // Adjusted to match the 80px request for medium size
    lg: "h-32 w-32",
  };

  // Use the appropriate avatar based on gender
  const avatarSrc = gender === "Female" 
    ? "/lovable-uploads/219f256f-b5cc-4690-bc72-e88aeca5f0a9.png"  // Female parent avatar
    : "/lovable-uploads/125f7b15-7adc-436d-874d-7488ebd8507e.png";  // Male parent avatar

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center",
      floating && "drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-110 bg-white/30 rounded-full backdrop-blur-sm", // Enhanced shadow and slightly larger when floating with subtle glow
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${gender} Parent Avatar`}
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
