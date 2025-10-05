import React from 'react';
import { clsx } from 'clsx';

interface CyberpunkPanelProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'glass' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const CyberpunkPanel: React.FC<CyberpunkPanelProps> = ({
  children,
  title,
  variant = 'glass',
  size = 'md',
  className = '',
  header,
  footer
}) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300";
  
  const variantClasses = {
    glass: "glass-panel",
    solid: "bg-cyberpunk-midnight border border-cyberpunk-neon rounded-xl",
    outline: "bg-transparent border border-cyberpunk-neon rounded-xl"
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <div className={combinedClasses}>
      {(title || header) && (
        <div className="mb-4 pb-4 border-b border-cyberpunk-neon border-opacity-30">
          {header || (
            <h3 className="cyberpunk-font-headline text-cyberpunk-neon text-lg font-bold">
              {title}
            </h3>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-cyberpunk-neon border-opacity-30">
          {footer}
        </div>
      )}
    </div>
  );
};

export default CyberpunkPanel;