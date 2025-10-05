import React, { useState } from 'react';
import { 
  CyberpunkButton, 
  CyberpunkCard, 
  CyberpunkInput, 
  CyberpunkPanel, 
  AlsaniaLogo 
} from '../ui';

export const CyberpunkThemeDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<'glass' | 'solid' | 'outline'>('glass');

  return (
    <div className="min-h-screen cyberpunk-bg-main cyberpunk-bg-circuit p-8">
      {/* Header */}
      <div className="glass-nav mb-8 p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <AlsaniaLogo variant="full" size={48} animated={true} />
          <div className="flex space-x-4">
            <CyberpunkButton variant="glass" size="sm">
              Login
            </CyberpunkButton>
            <CyberpunkButton variant="outline" size="sm">
              Sign Up
            </CyberpunkButton>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Components Showcase */}
        <div className="space-y-6">
          <CyberpunkPanel title="Component Variants" variant="glass">
            <div className="space-y-4">
              <div>
                <h4 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">Buttons</h4>
                <div className="flex flex-wrap gap-3">
                  <CyberpunkButton variant="glass">Glass</CyberpunkButton>
                  <CyberpunkButton variant="solid">Solid</CyberpunkButton>
                  <CyberpunkButton variant="outline">Outline</CyberpunkButton>
                  <CyberpunkButton variant="ghost">Ghost</CyberpunkButton>
                </div>
              </div>

              <div>
                <h4 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <CyberpunkButton variant="glass" size="sm">Small</CyberpunkButton>
                  <CyberpunkButton variant="glass" size="md">Medium</CyberpunkButton>
                  <CyberpunkButton variant="glass" size="lg">Large</CyberpunkButton>
                </div>
              </div>
            </div>
          </CyberpunkPanel>

          <CyberpunkCard variant="glass">
            <h3 className="cyberpunk-font-headline text-cyberpunk-neon text-lg mb-4">
              Input Components
            </h3>
            <div className="space-y-4">
              <CyberpunkInput
                label="Username"
                placeholder="Enter your username"
                value={inputValue}
                onChange={setInputValue}
                variant="glass"
              />
              <CyberpunkInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                variant="glass"
              />
              <CyberpunkInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                variant="glass"
              />
            </div>
          </CyberpunkCard>
        </div>

        {/* Center Column - Interactive Demo */}
        <div className="space-y-6">
          <CyberpunkPanel title="Interactive Demo" variant="glass">
            <div className="space-y-6">
              <div>
                <h4 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-4">
                  Select Component Variant
                </h4>
                <div className="flex space-x-2">
                  {(['glass', 'solid', 'outline'] as const).map((variant) => (
                    <CyberpunkButton
                      key={variant}
                      variant={selectedVariant === variant ? 'solid' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant}
                    </CyberpunkButton>
                  ))}
                </div>
              </div>

              <CyberpunkCard variant={selectedVariant}>
                <h5 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">
                  Dynamic Card
                </h5>
                <p className="cyberpunk-font-body text-cyberpunk-white text-sm">
                  This card changes its appearance based on the selected variant.
                  The glass morphism effect creates a modern, translucent look
                  with cyberpunk aesthetics.
                </p>
              </CyberpunkCard>

              <div className="cyberpunk-terminal">
                <div className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">
                  $ alsania-system status
                </div>
                <div className="text-sm space-y-1">
                  <div>✓ Glass morphism: Active</div>
                  <div>✓ Neon effects: Enabled</div>
                  <div>✓ Cyberpunk theme: Loaded</div>
                  <div>✓ Backdrop blur: 10px</div>
                </div>
              </div>
            </div>
          </CyberpunkPanel>
        </div>

        {/* Right Column - Effects Showcase */}
        <div className="space-y-6">
          <CyberpunkPanel title="Visual Effects" variant="glass">
            <div className="space-y-4">
              <div>
                <h4 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">
                  Text Effects
                </h4>
                <div className="space-y-2">
                  <div className="cyberpunk-text-glow cyberpunk-font-headline">
                    Glowing Text
                  </div>
                  <div className="cyberpunk-text-outline cyberpunk-font-headline">
                    Outlined Text
                  </div>
                </div>
              </div>

              <div>
                <h4 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">
                  Loading States
                </h4>
                <div className="space-y-3">
                  <div className="cyberpunk-spinner"></div>
                  <div className="cyberpunk-progress"></div>
                </div>
              </div>

              <div>
                <h4 className="cyberpunk-font-dashboard text-cyberpunk-neon mb-2">
                  Background Patterns
                </h4>
                <div className="space-y-2">
                  <div className="h-16 cyberpunk-bg-grid rounded-lg"></div>
                  <div className="h-16 cyberpunk-bg-splatter rounded-lg"></div>
                </div>
              </div>
            </div>
          </CyberpunkPanel>

          <CyberpunkCard variant="glass" className="cyberpunk-hologram">
            <h4 className="cyberpunk-font-headline text-cyberpunk-neon mb-2">
              Hologram Effect
            </h4>
            <p className="cyberpunk-font-body text-cyberpunk-white text-sm">
              This card demonstrates the hologram effect with animated
              background patterns that create a futuristic appearance.
            </p>
          </CyberpunkCard>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 glass-nav p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="cyberpunk-font-body text-cyberpunk-neon">
            © 2024 Alsania. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <CyberpunkButton variant="ghost" size="sm">
              Privacy
            </CyberpunkButton>
            <CyberpunkButton variant="ghost" size="sm">
              Terms
            </CyberpunkButton>
            <CyberpunkButton variant="ghost" size="sm">
              Contact
            </CyberpunkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkThemeDemo;