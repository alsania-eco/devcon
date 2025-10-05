import React from 'react';
import { clsx } from 'clsx';

interface CyberpunkInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  variant?: 'glass' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

export const CyberpunkInput: React.FC<CyberpunkInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  variant = 'glass',
  size = 'md',
  disabled = false,
  className = '',
  label,
  error
}) => {
  const baseClasses = "w-full transition-all duration-300 font-rajdhani disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    glass: "glass-input",
    solid: "cyberpunk-input",
    outline: "bg-transparent border border-cyberpunk-neon text-cyberpunk-neon rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyberpunk-neon"
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };

  const inputClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    error && "border-red-500 focus:ring-red-500",
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-cyberpunk-neon text-sm font-rajdhani font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 font-rajdhani">
          {error}
        </p>
      )}
    </div>
  );
};

export default CyberpunkInput;