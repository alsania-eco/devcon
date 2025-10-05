import React from 'react';

interface AlsaniaLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  variant?: 'emblem' | 'text' | 'full';
}

export const AlsaniaLogo: React.FC<AlsaniaLogoProps> = ({ 
  size = 64, 
  className = '', 
  animated = true,
  variant = 'emblem' 
}) => {
  const baseClasses = "transition-all duration-300 hover:scale-105";
  const combinedClasses = `${baseClasses} ${className}`;

  if (variant === 'emblem') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={combinedClasses}
      >
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#39FF14', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#2ECC40', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#39FF14', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        
        {/* Outer ring with cyberpunk pattern */}
        <circle 
          cx="32" 
          cy="32" 
          r="30" 
          fill="none" 
          stroke="url(#neon-gradient)" 
          strokeWidth="2" 
          filter="url(#neon-glow)"
        />
        
        {/* Inner geometric pattern */}
        <polygon 
          points="32,8 44,20 44,44 20,44 20,20" 
          fill="none" 
          stroke="url(#neon-gradient)" 
          strokeWidth="1.5" 
          filter="url(#neon-glow)"
        />
        
        {/* Central "A" symbol */}
        <path 
          d="M32 12 L28 28 L36 28 L32 12 Z M26 32 L38 32 L36 36 L28 36 L26 32 Z" 
          fill="url(#neon-gradient)" 
          filter="url(#neon-glow)"
        />
        
        {/* Cyberpunk accent lines */}
        <line x1="16" y1="16" x2="20" y2="20" stroke="url(#neon-gradient)" strokeWidth="1" filter="url(#neon-glow)"/>
        <line x1="48" y1="16" x2="44" y2="20" stroke="url(#neon-gradient)" strokeWidth="1" filter="url(#neon-glow)"/>
        <line x1="16" y1="48" x2="20" y2="44" stroke="url(#neon-gradient)" strokeWidth="1" filter="url(#neon-glow)"/>
        <line x1="48" y1="48" x2="44" y2="44" stroke="url(#neon-gradient)" strokeWidth="1" filter="url(#neon-glow)"/>
        
        {/* Scanning line effect */}
        {animated && (
          <line 
            x1="0" 
            y1="32" 
            x2="64" 
            y2="32" 
            stroke="#39FF14" 
            strokeWidth="0.5" 
            opacity="0.6"
          >
            <animate 
              attributeName="opacity" 
              values="0.6;1;0.6" 
              dur="2s" 
              repeatCount="indefinite"
            />
          </line>
        )}
      </svg>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`cyberpunk-font-headline text-cyberpunk-neon ${combinedClasses}`}>
        <span className="text-2xl font-bold tracking-wider">ALSANIA</span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex items-center space-x-3 ${combinedClasses}`}>
        <AlsaniaLogo size={size * 0.6} animated={animated} variant="emblem" />
        <div className="cyberpunk-font-headline text-cyberpunk-neon">
          <span className="text-xl font-bold tracking-wider">ALSANIA</span>
        </div>
      </div>
    );
  }

  return null;
};

export default AlsaniaLogo;