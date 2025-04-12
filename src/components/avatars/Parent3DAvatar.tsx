
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
    md: "h-24 w-24",
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
      floating && "drop-shadow-[0_6px_10px_rgba(0,0,0,0.2)] scale-110", // Enhanced shadow and slightly larger when floating
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
