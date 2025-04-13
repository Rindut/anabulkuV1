
import { cn } from "@/lib/utils";

interface PetAvatarProps {
  petType?: "cat" | "dog";
  size?: "sm" | "md" | "lg";
  gender?: "male" | "female";
  className?: string;
}

export const PetAvatar = ({ 
  petType = "cat", 
  size = "md", 
  gender = "male",
  className
}: PetAvatarProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  // Normalize petType to lowercase for consistent comparison
  const normalizedPetType = petType.toLowerCase() as "cat" | "dog";

  // Since we don't have the new assets yet, directly use the existing images
  // The images we have are:
  // - 8bb63a94-6d29-4995-b0a3-e88aafad5672.png (Female cat)
  // - 2849d71e-b0b1-4fd0-95e6-10898124372b.png (Male cat)
  // - 5490fca1-cc3d-4041-b89f-9dd2d90be0ec.png (Female dog)
  // - c22508c8-76e4-40a4-824b-6a4b629a00c4.png (Male dog)
  
  // Convert gender format for consistency
  const mappedGender = gender === "male" ? "Male" : "Female";
  
  // Use the appropriate avatar based on pet type and gender
  const avatarSrc = normalizedPetType === "cat"
    ? (mappedGender === "Female" 
        ? "/lovable-uploads/b8226aef-a13f-4a35-bada-135f83ae2048.png"  // Female cat
        : "/lovable-uploads/e7900b6a-5622-42d2-baca-790be1ec9676.png") // Male cat
    : (mappedGender === "Female"
        ? "/lovable-uploads/fdfeeb31-74a9-49e0-af89-ec9a81f063bd.png"  // Female dog
        : "/lovable-uploads/bff0fe33-19ca-41db-88ce-700b66f66bbe.png"); // Male dog
    
  // Define fallback images in case the primary ones fail
  const fallbackSrc = normalizedPetType === "cat"
    ? (mappedGender === "Female" 
        ? "/lovable-uploads/b8226aef-a13f-4a35-bada-135f83ae2048.png"  // Female cat
        : "/lovable-uploads/e7900b6a-5622-42d2-baca-790be1ec9676.png") // Male cat
    : (mappedGender === "Female"
        ? "/lovable-uploads/fdfeeb31-74a9-49e0-af89-ec9a81f063bd.png"  // Female dog
        : "/lovable-uploads/bff0fe33-19ca-41db-88ce-700b66f66bbe.png"); // Male dog

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center overflow-hidden rounded-full",
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
