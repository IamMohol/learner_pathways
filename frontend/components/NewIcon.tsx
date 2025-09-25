import { FC, SVGProps } from "react";

interface IconProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Icon({
  icon: IconComponent,
  className = "",
  size = "md",
}: IconProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };
  return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
}
