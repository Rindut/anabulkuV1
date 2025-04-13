
import { cn } from "@/lib/utils";

interface ParentAvatarProps {
  gender?: "boy" | "girl";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ParentAvatar = ({ 
  gender = "boy", 
  size = "md",
  className
}: ParentAvatarProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  // Match gender format to the required avatar format
  const mappedGender = gender === "boy" ? "Male" : "Female";
  
  // Use the appropriate avatar based on gender
  const avatarSrc = mappedGender === "Female" 
    ? "/lovable-uploads/bb8117e8-508a-411c-b8bc-36be54652c2e.png"
    : "/lovable-uploads/2ead3c6c-ebb4-40a2-8b9d-71a2da6f9680.png";
    
  // Fallback images if new assets aren't uploaded yet
  const fallbackSrc = mappedGender === "Female" 
    ? "/lovable-uploads/bb8117e8-508a-411c-b8bc-36be54652c2e.png"
    : "/lovable-uploads/2ead3c6c-ebb4-40a2-8b9d-71a2da6f9680.png";

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center overflow-hidden rounded-full",
      className
    )}>
      <img 
        src={avatarSrc} 
        alt={`${mappedGender} Parent Avatar`}
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
