
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
    md: "h-[8.5rem] w-[8.5rem]",
    lg: "h-32 w-32",
  };

  const avatarSrc = gender === "Female" 
    ? "/lovable-uploads/219f256f-b5cc-4690-bc72-e88aeca5f0a9.png"
    : "/lovable-uploads/125f7b15-7adc-436d-874d-7488ebd8507e.png";

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center relative overflow-hidden", 
      floating && "drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${gender} Parent Avatar`}
        className={cn(
          "w-full object-cover object-bottom",
          floating && "absolute bottom-0 h-[120%] max-w-none" 
        )}
        style={{ 
          objectPosition: 'bottom',
          transform: floating ? 'translateY(10%)' : undefined
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
