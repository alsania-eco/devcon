# Alsania Cyberpunk Glass Theme

A futuristic cyberpunk design system with glass morphism effects, featuring neon green highlights, midnight/navy backgrounds, and translucent glass-like components.

## 🎨 Brand Colors

- **Neon Green**: `#39FF14` - Primary highlight, glowing/energy effect
- **Midnight**: `#0A2472` - Primary background
- **Navy**: `#001F3F` - Secondary background
- **Black**: `#000000` - Dark contexts
- **White**: `#FFFFFF` - Light contexts

## 🔤 Typography

- **Orbitron**: Headlines, futuristic Alsania branding
- **Rajdhani**: Dashboard/UI labels (clean, tech-like)
- **Open Sans**: Body text for readability

## 🧩 Components

### CyberpunkButton
```tsx
<CyberpunkButton variant="glass" size="md" onClick={handleClick}>
  Click Me
</CyberpunkButton>
```

**Variants:**
- `glass` - Glass morphism with backdrop blur
- `solid` - Solid cyberpunk styling
- `outline` - Outlined with neon border
- `ghost` - Transparent with hover effects

**Sizes:**
- `sm` - Small (px-4 py-2)
- `md` - Medium (px-6 py-3)
- `lg` - Large (px-8 py-4)

### CyberpunkCard
```tsx
<CyberpunkCard variant="glass" hover={true}>
  <h3>Card Title</h3>
  <p>Card content</p>
</CyberpunkCard>
```

**Variants:**
- `glass` - Glass morphism effect
- `solid` - Solid cyberpunk styling
- `outline` - Outlined with neon border

### CyberpunkInput
```tsx
<CyberpunkInput
  label="Username"
  placeholder="Enter username"
  variant="glass"
  value={value}
  onChange={setValue}
/>
```

**Variants:**
- `glass` - Glass morphism with backdrop blur
- `solid` - Solid cyberpunk styling
- `outline` - Outlined with neon border

### CyberpunkPanel
```tsx
<CyberpunkPanel title="Panel Title" variant="glass" size="md">
  <p>Panel content</p>
</CyberpunkPanel>
```

**Variants:**
- `glass` - Glass morphism effect
- `solid` - Solid cyberpunk styling
- `outline` - Outlined with neon border

**Sizes:**
- `sm` - Small padding (p-4)
- `md` - Medium padding (p-6)
- `lg` - Large padding (p-8)
- `xl` - Extra large padding (p-10)

### AlsaniaLogo
```tsx
<AlsaniaLogo variant="emblem" size={64} animated={true} />
```

**Variants:**
- `emblem` - Just the emblem SVG
- `text` - Text only
- `full` - Emblem + text

## 🎭 CSS Classes

### Glass Morphism
- `.glass` - Basic glass effect
- `.glass-strong` - Stronger glass effect
- `.glass-accent` - Accent glass effect
- `.glass-btn` - Glass button styling
- `.glass-card` - Glass card styling
- `.glass-input` - Glass input styling
- `.glass-panel` - Glass panel styling
- `.glass-nav` - Glass navigation styling
- `.glass-modal` - Glass modal styling

### Cyberpunk Effects
- `.cyberpunk-glow` - Neon glow effect
- `.cyberpunk-glow-blue` - Blue glow effect
- `.cyberpunk-gradient` - Neon to blue gradient
- `.cyberpunk-border` - Neon border
- `.cyberpunk-pulse` - Pulsing animation
- `.cyberpunk-scan` - Scanning line effect

### Typography
- `.cyberpunk-font-headline` - Orbitron font for headlines
- `.cyberpunk-font-dashboard` - Rajdhani font for UI
- `.cyberpunk-font-body` - Open Sans for body text
- `.cyberpunk-text-neon` - Neon green text
- `.cyberpunk-text-glow` - Glowing text effect
- `.cyberpunk-text-outline` - Outlined text

### Backgrounds
- `.cyberpunk-bg-main` - Main cyberpunk background
- `.cyberpunk-bg-grid` - Grid pattern background
- `.cyberpunk-bg-circuit` - Circuit pattern background
- `.cyberpunk-bg-splatter` - Splatter pattern background
- `.cyberpunk-bg-pattern` - Geometric pattern
- `.cyberpunk-bg-geometric` - Geometric lines

### Special Effects
- `.cyberpunk-terminal` - Terminal styling
- `.cyberpunk-hologram` - Hologram effect
- `.cyberpunk-spinner` - Loading spinner
- `.cyberpunk-progress` - Progress bar

## 🎨 Usage Examples

### Basic Layout
```tsx
<div className="cyberpunk-bg-main cyberpunk-bg-circuit min-h-screen">
  <div className="glass-nav p-6">
    <AlsaniaLogo variant="full" />
  </div>
  
  <div className="container mx-auto p-8">
    <CyberpunkPanel title="Main Content" variant="glass">
      <CyberpunkInput label="Search" variant="glass" />
      <CyberpunkButton variant="glass">Search</CyberpunkButton>
    </CyberpunkPanel>
  </div>
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <CyberpunkCard key={item.id} variant="glass" hover={true}>
      <h3 className="cyberpunk-font-headline text-cyberpunk-neon">
        {item.title}
      </h3>
      <p className="cyberpunk-font-body text-cyberpunk-white">
        {item.description}
      </p>
    </CyberpunkCard>
  ))}
</div>
```

### Form Layout
```tsx
<CyberpunkPanel title="User Registration" variant="glass">
  <div className="space-y-4">
    <CyberpunkInput
      label="Username"
      variant="glass"
      value={username}
      onChange={setUsername}
    />
    <CyberpunkInput
      label="Email"
      type="email"
      variant="glass"
      value={email}
      onChange={setEmail}
    />
    <CyberpunkInput
      label="Password"
      type="password"
      variant="glass"
      value={password}
      onChange={setPassword}
    />
    <div className="flex space-x-4">
      <CyberpunkButton variant="glass">Register</CyberpunkButton>
      <CyberpunkButton variant="outline">Cancel</CyberpunkButton>
    </div>
  </div>
</CyberpunkPanel>
```

## 🎯 Key Features

- **Glass Morphism**: Translucent components with backdrop blur
- **Neon Effects**: Glowing borders and text with cyberpunk aesthetics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper contrast ratios and focus states
- **Animations**: Smooth transitions and cyberpunk-style effects
- **Customizable**: Easy to extend with new variants and styles

## 🚀 Getting Started

1. Import the components:
```tsx
import { CyberpunkButton, CyberpunkCard, AlsaniaLogo } from './components/ui';
```

2. Use the CSS classes:
```tsx
<div className="cyberpunk-bg-main glass-card">
  <h1 className="cyberpunk-font-headline cyberpunk-text-glow">
    Welcome to Alsania
  </h1>
</div>
```

3. Customize the theme by modifying the CSS variables in `index.css`:
```css
:root {
  --cyberpunk-neon-green: #39FF14;
  --cyberpunk-midnight: #0A2472;
  --cyberpunk-navy: #001F3F;
}
```

## 📱 Browser Support

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

**Note**: Glass morphism effects require backdrop-filter support. Fallbacks are provided for older browsers.