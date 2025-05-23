
import { cn } from "@/lib/utils";

interface ParentAvatar3DProps {
  gender?: "boy" | "girl";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const ParentAvatar3D = ({ 
  gender = "boy", 
  size = "md",
  className
}: ParentAvatar3DProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-40 w-40"
  };

  // Match gender format to the required avatar format
  const mappedGender = gender === "boy" ? "Male" : "Female";
  
  // Always use fallback images since the named assets aren't available
  const avatarSrc = mappedGender === "Female" 
    ? "/lovable-uploads/219f256f-b5cc-4690-bc72-e88aeca5f0a9.png"  // Female parent avatar
    : "/lovable-uploads/125f7b15-7adc-436d-874d-7488ebd8507e.png";  // Male parent avatar
    
  // Fallback images if new assets aren't uploaded yet
  const fallbackSrc = mappedGender === "Female" 
    ? "/lovable-uploads/219f256f-b5cc-4690-bc72-e88aeca5f0a9.png"
    : "/lovable-uploads/125f7b15-7adc-436d-874d-7488ebd8507e.png";

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center overflow-hidden rounded-full shadow-sm",
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
