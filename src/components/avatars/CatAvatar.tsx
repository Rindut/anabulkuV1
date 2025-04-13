
import { cn } from "@/lib/utils";

interface CatAvatarProps {
  gender: "Male" | "Female";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  floating?: boolean;
}

export const CatAvatar = ({
  gender,
  size = "md",
  className,
  floating = false
}: CatAvatarProps) => {
  const sizeClasses = {
    sm: "h-20 w-20",
    md: "h-32 w-32",
    lg: "h-40 w-40",
    xl: "h-48 w-48",
  };

  // Use new gender-specific cat avatars
  const avatarSrc = gender === "Female"
    ? "/lovable-uploads/f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png"  // Female cat
    : "/lovable-uploads/a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png"; // Male cat

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-end justify-center relative",
      floating && "relative z-10",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`Cat avatar (${gender})`}
        className={cn(
          "w-full object-cover object-bottom",
          floating && "absolute bottom-0 h-[160%] drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] z-10",
          !floating && "h-[150%]"
        )}
        style={{ 
          objectPosition: 'bottom',
          transform: floating ? 'translateY(-30px)' : undefined
        }}
        loading="lazy"
      />
    </div>
  );
};
