
import { cn } from "@/lib/utils";

interface Pet3DAvatarProps {
  petType: "cat" | "dog";
  size?: "sm" | "md" | "lg" | "xl";
  gender?: "Male" | "Female";
  className?: string;
  floating?: boolean;
}

export const Pet3DAvatar = ({
  petType,
  size = "md",
  gender = "Male",
  className,
  floating = false
}: Pet3DAvatarProps) => {
  const sizeClasses = {
    sm: "h-20 w-20",
    md: "h-32 w-32",
    lg: "h-40 w-40",
    xl: "h-48 w-48",
  };

  // Use the appropriate avatar based on pet type only (as specified in requirements)
  const avatarSrc = petType === "cat"
    ? "/lovable-uploads/avatar_pet_cat.png"  // Cat avatar - new asset
    : "/lovable-uploads/avatar_pet_dog.png"; // Dog avatar - new asset
    
  // Fallback images if new assets aren't uploaded yet
  const fallbackSrc = petType === "cat"
    ? (gender === "Female" 
        ? "/lovable-uploads/8bb63a94-6d29-4995-b0a3-e88aafad5672.png"  // Female cat
        : "/lovable-uploads/2849d71e-b0b1-4fd0-95e6-10898124372b.png") // Male cat
    : (gender === "Female"
        ? "/lovable-uploads/5490fca1-cc3d-4041-b89f-9dd2d90be0ec.png"  // Female dog
        : "/lovable-uploads/c22508c8-76e4-40a4-824b-6a4b629a00c4.png"); // Male dog

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-end justify-center relative",
      floating && "relative z-10",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${petType} avatar`}
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
