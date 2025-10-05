import React from 'react';
import { clsx } from 'clsx';

interface CyberpunkCardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'outline';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CyberpunkCard: React.FC<CyberpunkCardProps> = ({
  children,
  variant = 'glass',
  hover = true,
  className = '',
  onClick
}) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300";
  
  const variantClasses = {
    glass: "glass-card",
    solid: "cyberpunk-card",
    outline: "bg-transparent border border-cyberpunk-neon rounded-lg p-6"
  };

  const hoverClasses = hover ? "hover:transform hover:-translate-y-1" : "";
  const clickableClasses = onClick ? "cursor-pointer" : "";

  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    hoverClasses,
    clickableClasses,
    className
  );

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CyberpunkCard;