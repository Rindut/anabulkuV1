
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

  // Since we don't have the new assets yet, directly use the existing images
  // The images we have are:
  // - 8bb63a94-6d29-4995-b0a3-e88aafad5672.png (Female cat)
  // - 2849d71e-b0b1-4fd0-95e6-10898124372b.png (Male cat)
  // - 5490fca1-cc3d-4041-b89f-9dd2d90be0ec.png (Female dog)
  // - c22508c8-76e4-40a4-824b-6a4b629a00c4.png (Male dog)
  
  console.log('Pet3DAvatar rendered with:', { petType, normalizedPetType, gender });
  
  // Use the appropriate avatar based on pet type and gender
  const avatarSrc = normalizedPetType === "cat"
    ? (gender === "Female" 
        ? "/lovable-uploads/b8226aef-a13f-4a35-bada-135f83ae2048.png"  // Female cat
        : "/lovable-uploads/e7900b6a-5622-42d2-baca-790be1ec9676.png") // Male cat
    : (gender === "Female"
        ? "/lovable-uploads/fdfeeb31-74a9-49e0-af89-ec9a81f063bd.png"  // Female dog
        : "/lovable-uploads/bff0fe33-19ca-41db-88ce-700b66f66bbe.png"); // Male dog
    
  // Define fallback images in case the primary ones fail
  const fallbackSrc = normalizedPetType === "cat"
    ? (gender === "Female" 
        ? "/lovable-uploads/b8226aef-a13f-4a35-bada-135f83ae2048.png"  // Female cat
        : "/lovable-uploads/e7900b6a-5622-42d2-baca-790be1ec9676.png") // Male cat
    : (gender === "Female"
        ? "/lovable-uploads/fdfeeb31-74a9-49e0-af89-ec9a81f063bd.png"  // Female dog
        : "/lovable-uploads/bff0fe33-19ca-41db-88ce-700b66f66bbe.png"); // Male dog

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
