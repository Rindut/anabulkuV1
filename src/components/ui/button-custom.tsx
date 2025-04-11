
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const ButtonCustom = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonCustomProps) => {
  const variantClasses = {
    primary: "bg-petapp-green text-white shadow-md hover:shadow-lg",
    secondary: "bg-petapp-pink text-gray-800 shadow-md hover:shadow-lg",
    outline: "bg-transparent border-2 border-petapp-green text-gray-800 hover:bg-petapp-green/10",
    danger: "bg-red-500 text-white shadow-md hover:shadow-lg",
  };

  const sizeClasses = {
    sm: "text-sm py-2 px-3",
    md: "text-base py-2.5 px-4",
    lg: "text-lg py-3 px-6",
  };

  return (
    <button
      className={cn(
        "rounded-full font-bold transition-all",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
