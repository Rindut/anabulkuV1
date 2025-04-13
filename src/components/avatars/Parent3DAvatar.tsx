
import { cn } from "@/lib/utils";

interface Parent3DAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
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
    xl: "h-40 w-40"
  };

  // Use the appropriate avatar based on gender
  const avatarSrc = gender === "Female" 
    ? "/lovable-uploads/bb8117e8-508a-411c-b8bc-36be54652c2e.png"  // Female parent avatar
    : "/lovable-uploads/2ead3c6c-ebb4-40a2-8b9d-71a2da6f9680.png";  // Male parent avatar
    
  // Fallback images if new assets aren't uploaded yet
  const fallbackSrc = gender === "Female" 
    ? "/lovable-uploads/bb8117e8-508a-411c-b8bc-36be54652c2e.png"  
    : "/lovable-uploads/2ead3c6c-ebb4-40a2-8b9d-71a2da6f9680.png";

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-end justify-center relative", 
      floating && "drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${gender} Parent Avatar`}
        className={cn(
          "w-full object-cover object-bottom",
          floating && "absolute bottom-0 h-[130%]",
          !floating && "h-full"
        )}
        style={{ objectPosition: 'bottom' }}
        loading="lazy"
        onError={(e) => {
          // Try fallback image if primary fails
          const imgElement = e.currentTarget;
          imgElement.onerror = null;
          imgElement.src = fallbackSrc;
          
          // Add second error handler for fallback image
          imgElement.onerror = (e2) => {
            // If fallback also fails, show error message
            if (e2 instanceof Event && e2.currentTarget instanceof HTMLImageElement) {
              const failedImg = e2.currentTarget;
              failedImg.onerror = null;
              failedImg.nextSibling!.textContent = "Avatar not available";
              failedImg.style.display = "none";
            }
          };
        }}
      />
      <span className="hidden text-sm text-gray-500 text-center"></span>
    </div>
  );
};
