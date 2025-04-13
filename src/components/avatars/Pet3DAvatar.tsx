
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

  // Normalize petType to lowercase for consistent comparison
  const normalizedPetType = petType.toLowerCase() as "cat" | "dog";

  // Using the new assets provided by the user:
  // - f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png (Female cat)
  // - a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png (Male cat)
  // - 8ff221f5-6b20-42db-8af6-3efa83db08e4.png (Female dog)
  // - 6db4f94e-6f10-4087-bc7b-fc4184ee3857.png (Male dog)
  
  console.log('Pet3DAvatar rendered with:', { petType, normalizedPetType, gender });
  
  // For all pets, use the gender-specific avatar
  let avatarSrc = null;
  if (normalizedPetType === "cat") {
    // Cats should use the appropriate gender avatar
    if (gender === "Female") {
      avatarSrc = "/lovable-uploads/f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png"; // Female cat
    } else {
      avatarSrc = "/lovable-uploads/a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png"; // Male cat
    }
  } else {
    // Dogs should use the appropriate gender avatar
    if (gender === "Female") {
      avatarSrc = "/lovable-uploads/8ff221f5-6b20-42db-8af6-3efa83db08e4.png"; // Female dog
    } else {
      avatarSrc = "/lovable-uploads/6db4f94e-6f10-4087-bc7b-fc4184ee3857.png"; // Male dog
    }
  }
    
  // Define fallback images in case the primary ones fail (same as primary)
  const fallbackSrc = normalizedPetType === "cat"
    ? (gender === "Female" 
        ? "/lovable-uploads/f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png"  // Female cat
        : "/lovable-uploads/a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png") // Male cat
    : (gender === "Female"
        ? "/lovable-uploads/8ff221f5-6b20-42db-8af6-3efa83db08e4.png"  // Female dog
        : "/lovable-uploads/6db4f94e-6f10-4087-bc7b-fc4184ee3857.png"); // Male dog

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-end justify-center relative",
      floating && "relative z-10",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${normalizedPetType} avatar`}
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
