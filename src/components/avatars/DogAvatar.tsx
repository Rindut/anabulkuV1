
import { cn } from "@/lib/utils";

interface DogAvatarProps {
  gender: "Male" | "Female";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  floating?: boolean;
}

export const DogAvatar = ({
  gender,
  size = "md",
  className,
  floating = false
}: DogAvatarProps) => {
  const sizeClasses = {
    sm: "h-20 w-20",
    md: "h-32 w-32",
    lg: "h-40 w-40",
    xl: "h-48 w-48",
  };

  // Use new gender-specific dog avatars
  const avatarSrc = gender === "Female"
    ? "/lovable-uploads/8ff221f5-6b20-42db-8af6-3efa83db08e4.png"  // Female dog
    : "/lovable-uploads/6db4f94e-6f10-4087-bc7b-fc4184ee3857.png"; // Male dog

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-end justify-center relative",
      floating && "relative z-10",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`Dog avatar (${gender})`}
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
