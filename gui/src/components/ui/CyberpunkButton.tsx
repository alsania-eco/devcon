import React from 'react';
import { clsx } from 'clsx';

interface CyberpunkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'glass' | 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const CyberpunkButton: React.FC<CyberpunkButtonProps> = ({
  children,
  onClick,
  variant = 'glass',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = "relative overflow-hidden font-rajdhani font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    glass: "glass-btn",
    solid: "cyberpunk-btn",
    outline: "cyberpunk-border bg-transparent text-cyberpunk-neon hover:bg-cyberpunk-neon hover:text-black",
    ghost: "bg-transparent text-cyberpunk-neon hover:bg-glass-accent border border-transparent hover:border-glass-border"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default CyberpunkButton;