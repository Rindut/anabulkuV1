
import { cn } from "@/lib/utils";

interface Parent3DAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Parent3DAvatar = ({
  size = "md",
  className
}: Parent3DAvatarProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
  };

  // Using the uploaded image for the parent avatar
  return (
    <div className={cn(
      sizeClasses[size],
      "flex items-center justify-center",
      className
    )}>
      <img 
        src="/lovable-uploads/5490fca1-cc3d-4041-b89f-9dd2d90be0ec.png" 
        alt="Parent Avatar"
        className="h-full object-cover"
      />
    </div>
  );
};
