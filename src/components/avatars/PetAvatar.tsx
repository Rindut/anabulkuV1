
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

  // Using the new assets provided by the user:
  // - f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png (Female cat)
  // - a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png (Male cat)
  // - 8ff221f5-6b20-42db-8af6-3efa83db08e4.png (Female dog)
  // - 6db4f94e-6f10-4087-bc7b-fc4184ee3857.png (Male dog)
  
  // Convert gender format for consistency
  const mappedGender = gender === "male" ? "Male" : "Female";
  
  // Use the appropriate avatar based on both pet type and gender
  const avatarSrc = normalizedPetType === "cat"
    ? (mappedGender === "Female"
        ? "/lovable-uploads/f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png"  // Female cat
        : "/lovable-uploads/a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png") // Male cat
    : (mappedGender === "Female"
        ? "/lovable-uploads/8ff221f5-6b20-42db-8af6-3efa83db08e4.png"  // Female dog
        : "/lovable-uploads/6db4f94e-6f10-4087-bc7b-fc4184ee3857.png"); // Male dog
    
  // Define fallback images in case the primary ones fail (same as primary)
  const fallbackSrc = normalizedPetType === "cat"
    ? (mappedGender === "Female" 
        ? "/lovable-uploads/f30f5de4-ad57-4373-9e61-ae7bc0bb6b7e.png"  // Female cat
        : "/lovable-uploads/a38b8e7b-a267-4de5-bca5-4e8d3a67a542.png") // Male cat
    : (mappedGender === "Female"
        ? "/lovable-uploads/8ff221f5-6b20-42db-8af6-3efa83db08e4.png"  // Female dog
        : "/lovable-uploads/6db4f94e-6f10-4087-bc7b-fc4184ee3857.png"); // Male dog

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
