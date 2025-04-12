
import { cn } from "@/lib/utils";

interface Pet3DAvatarProps {
  petType: "cat" | "dog";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Pet3DAvatar = ({
  petType,
  size = "md",
  className
}: Pet3DAvatarProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-20 w-20",
    lg: "h-24 w-24",
  };

  // Using the uploaded image - we'll need actual pet images in a real app
  const imageUrl = "/lovable-uploads/5490fca1-cc3d-4041-b89f-9dd2d90be0ec.png";

  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center",
      className
    )}>
      <img 
        src={imageUrl} 
        alt={`${petType} avatar`}
        className="h-full object-contain"
      />
    </div>
  );
};
