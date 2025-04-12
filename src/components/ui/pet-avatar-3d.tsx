
import { cn } from "@/lib/utils";

interface PetAvatar3DProps {
  petType?: "cat" | "dog";
  size?: "sm" | "md" | "lg" | "xl";
  gender?: "male" | "female";
  className?: string;
}

export const PetAvatar3D = ({ 
  petType = "cat", 
  size = "md", 
  gender = "male",
  className
}: PetAvatar3DProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-28 w-28"
  };

  // Normalize petType to lowercase for consistent comparison
  const normalizedPetType = petType.toLowerCase() as "cat" | "dog";

  // Use the appropriate avatar based on pet type only (as specified in requirements)
  const avatarSrc = normalizedPetType === "cat"
    ? "/lovable-uploads/avatar_pet_cat.png"
    : "/lovable-uploads/avatar_pet_dog.png";
    
  // Convert gender format for fallback
  const mappedGender = gender === "male" ? "Male" : "Female";
  
  // Fallback images if new assets aren't uploaded yet
  const fallbackSrc = normalizedPetType === "cat"
    ? (mappedGender === "Female" 
        ? "/lovable-uploads/8bb63a94-6d29-4995-b0a3-e88aafad5672.png"
        : "/lovable-uploads/2849d71e-b0b1-4fd0-95e6-10898124372b.png")
    : (mappedGender === "Female"
        ? "/lovable-uploads/5490fca1-cc3d-4041-b89f-9dd2d90be0ec.png"
        : "/lovable-uploads/c22508c8-76e4-40a4-824b-6a4b629a00c4.png");

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center overflow-hidden rounded-full shadow-sm",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${normalizedPetType} avatar`}
        className="w-full h-full object-cover"
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
              failedImg.style.display = "none";
            }
          };
        }}
      />
    </div>
  );
};
