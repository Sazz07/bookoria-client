import { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

type LogoProps = {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'icon' | 'minimal';
  animated?: boolean;
  onClick?: () => void;
};

export default function Logo({
  className,
  size = 'md',
  variant = 'full',
  animated = true,
  onClick,
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const logoRef = useRef<SVGSVGElement>(null);

  const sizeClasses = {
    xs: 'w-5 h-5',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  };

  // Initial animation
  useEffect(() => {
    if (animated) {
      setIsLoaded(true);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  // Handle mouse interaction
  const handleMouseEnter = () => {
    if (animated) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (animated) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center',
        onClick && 'cursor-pointer',
        isHovered && 'scale-105',
        'transition-transform duration-300'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Logo SVG */}
      <svg
        ref={logoRef}
        viewBox='0 0 200 200'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(
          sizeClasses[size],
          className,
          isLoaded && animated && 'transition-all duration-700',
          isAnimating && animated && 'animate-logo-entrance'
        )}
        aria-label='Bookoria logo'
      >
        <defs>
          {/* Rich Gradients */}
          <linearGradient id='goldGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#f5d485' />
            <stop offset='50%' stopColor='#f0c454' />
            <stop offset='100%' stopColor='#d4af37' />
          </linearGradient>

          <linearGradient
            id='primaryGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#b17a73' />
            <stop offset='50%' stopColor='#9c6962' />
            <stop offset='100%' stopColor='#8C5E58' />
          </linearGradient>

          <linearGradient
            id='accentGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#3d5f8a' />
            <stop offset='50%' stopColor='#34547c' />
            <stop offset='100%' stopColor='#2D4B73' />
          </linearGradient>

          <linearGradient
            id='creamGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#f7f3e3' />
            <stop offset='50%' stopColor='#f3ecd9' />
            <stop offset='100%' stopColor='#F0EAD6' />
          </linearGradient>

          <linearGradient id='pageGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='#ffffff' />
            <stop offset='50%' stopColor='#f9f9f9' />
            <stop offset='100%' stopColor='#f0f0f0' />
          </linearGradient>

          <linearGradient
            id='shoppingBagGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#34547c' />
            <stop offset='100%' stopColor='#2D4B73' />
          </linearGradient>

          {/* Filters for depth and effects */}
          <filter id='dropShadow' x='-20%' y='-20%' width='140%' height='140%'>
            <feDropShadow dx='0' dy='3' stdDeviation='3' floodOpacity='0.3' />
          </filter>

          <filter id='innerShadow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur in='SourceAlpha' stdDeviation='3' result='blur' />
            <feOffset dy='3' dx='0' />
            <feComposite
              in2='SourceAlpha'
              operator='arithmetic'
              k2='-1'
              k3='1'
              result='shadowDiff'
            />
            <feFlood floodColor='#000000' floodOpacity='0.15' />
            <feComposite in2='shadowDiff' operator='in' />
            <feComposite in2='SourceGraphic' operator='over' />
          </filter>

          <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='5' result='blur' />
            <feFlood floodColor='#f5d485' floodOpacity='0.5' />
            <feComposite in2='blur' operator='in' result='glow' />
            <feComposite in='SourceGraphic' in2='glow' operator='over' />
          </filter>

          {/* Animated elements */}
          <animate
            xlinkHref='#bookCover'
            attributeName='d'
            dur='10s'
            repeatCount='indefinite'
            values='
              M40,60 C40,60 100,45 160,60 L160,150 C160,150 100,135 40,150 Z;
              M40,60 C40,60 100,50 160,60 L160,150 C160,150 100,140 40,150 Z;
              M40,60 C40,60 100,45 160,60 L160,150 C160,150 100,135 40,150 Z
            '
            calcMode='spline'
            keySplines='0.4 0 0.6 1; 0.4 0 0.6 1'
          />
        </defs>

        {/* Main circular background */}
        <circle
          cx='100'
          cy='100'
          r='95'
          fill='url(#creamGradient)'
          className={cn(
            'transition-all duration-500',
            isHovered && 'animate-pulse-subtle'
          )}
        />

        {/* Shopping bag in background */}
        <path
          d='M60,70 L60,45 C60,30 80,20 100,20 C120,20 140,30 140,45 L140,70 L150,70 L150,160 C150,170 140,180 130,180 L70,180 C60,180 50,170 50,160 L50,70 L60,70 Z'
          fill='url(#shoppingBagGradient)'
          opacity='0.15'
          filter='url(#innerShadow)'
          className={cn(
            'transition-all duration-500',
            isHovered && 'opacity-25'
          )}
        />

        {/* Shopping bag handles */}
        <path
          d='M60,70 L60,45 C60,30 80,20 100,20 C120,20 140,30 140,45 L140,70'
          fill='none'
          stroke='url(#accentGradient)'
          strokeWidth='5'
          strokeLinecap='round'
          opacity='0.3'
          className={cn(
            'transition-all duration-500',
            isHovered && 'opacity-40'
          )}
        />

        {/* Main book group */}
        <g
          filter='url(#dropShadow)'
          className={cn(
            'transition-transform duration-500',
            isHovered && 'translate-y-[-5px]'
          )}
        >
          {/* Book cover */}
          <path
            id='bookCover'
            d='M40,60 C40,60 100,45 160,60 L160,150 C160,150 100,135 40,150 Z'
            fill='url(#accentGradient)'
            stroke='#1e3a5f'
            strokeWidth='1'
          />

          {/* Book spine */}
          <path
            d='M40,60 C40,60 40,150 40,150'
            stroke='#1e3a5f'
            strokeWidth='2'
            fill='none'
          />

          {/* Book pages */}
          <path
            d='M45,65 C45,65 100,52 155,65 L155,145 C155,145 100,132 45,145 Z'
            fill='url(#pageGradient)'
            stroke='#e5e5e5'
            strokeWidth='0.5'
            className={cn(
              'transition-all duration-500',
              isHovered && 'filter-none'
            )}
            filter={isHovered ? 'url(#glow)' : 'none'}
          />

          {/* Gold page edges */}
          <path
            d='M45,65 L45,145'
            stroke='url(#goldGradient)'
            strokeWidth='2'
            fill='none'
            className={cn(
              'transition-all duration-500',
              isHovered && 'stroke-[3px]'
            )}
          />

          {/* Bookmark ribbon */}
          <path
            d='M130,65 C130,65 130,100 120,110 C115,115 110,110 110,110'
            stroke='url(#primaryGradient)'
            strokeWidth='3'
            fill='none'
            strokeLinecap='round'
            className={cn(
              'transition-all duration-700',
              isHovered && 'translate-y-[3px]'
            )}
          />

          {/* Page lines */}
          <g opacity='0.7'>
            <path d='M60,80 L140,90' stroke='#8C5E58' strokeWidth='0.7' />
            <path d='M60,95 L140,105' stroke='#8C5E58' strokeWidth='0.7' />
            <path d='M60,110 L140,120' stroke='#8C5E58' strokeWidth='0.7' />
            <path d='M60,125 L110,130' stroke='#8C5E58' strokeWidth='0.7' />
          </g>

          {/* Stylized B letter */}
          <path
            d='M75,75 C75,75 95,72 100,75 C105,78 105,88 100,90 C105,92 105,102 100,105 C95,108 75,105 75,105 L75,75 Z'
            fill='url(#primaryGradient)'
            className={cn(
              'transition-all duration-500',
              isHovered && 'filter-none'
            )}
            filter={isHovered ? 'url(#glow)' : 'none'}
          />
          <path
            d='M80,80 C80,80 90,78 93,80 C96,82 96,86 93,88 C96,90 96,94 93,96 C90,98 80,96 80,96 L80,80 Z'
            fill='white'
          />
        </g>

        {/* Shopping cart icon */}
        <g
          className={cn(
            'transition-all duration-500',
            isHovered && 'translate-y-[-8px] translate-x-[3px]'
          )}
        >
          <circle
            cx='150'
            cy='60'
            r='20'
            fill='url(#primaryGradient)'
            opacity='0.9'
          />
          <path
            d='M140,60 L145,60 L147,52 L160,52 L162,60 L165,60 M146,64 A2,2 0 1 0 146,68 A2,2 0 1 0 146,64 M158,64 A2,2 0 1 0 158,68 A2,2 0 1 0 158,64'
            stroke='white'
            strokeWidth='1.5'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>

        {/* Floating elements */}
        <g
          className={cn(
            'transition-all duration-1000',
            isHovered && 'translate-y-[-5px]'
          )}
        >
          <circle
            cx='50'
            cy='40'
            r='8'
            fill='url(#primaryGradient)'
            opacity='0.7'
          />
          <circle
            cx='170'
            cy='130'
            r='6'
            fill='url(#goldGradient)'
            opacity='0.8'
          />
          <rect
            x='30'
            y='100'
            width='15'
            height='5'
            rx='1'
            fill='url(#accentGradient)'
            opacity='0.6'
            transform='rotate(-15, 30, 100)'
          />
        </g>

        {/* Star rating */}
        <g
          className={cn(
            'transition-all duration-700',
            isHovered && 'translate-y-[-3px] translate-x-[2px]'
          )}
        >
          <path
            d='M165,140 L167,145 L172,145 L168,148 L170,153 L165,150 L160,153 L162,148 L158,145 L163,145 Z'
            fill='url(#goldGradient)'
            opacity='0.9'
          />
        </g>
      </svg>

      {/* Text for full variant */}
      {variant === 'full' && (
        <span
          className={cn(
            'ml-2 text-[#8C5E58] font-bold transition-colors duration-300',
            size === 'xs' && 'text-sm',
            size === 'sm' && 'text-base',
            size === 'md' && 'text-xl',
            size === 'lg' && 'text-2xl',
            size === 'xl' && 'text-3xl',
            size === '2xl' && 'text-4xl',
            isHovered && 'text-[#b17a73]'
          )}
        >
          Bookoria
        </span>
      )}

      {/* Glow effect on hover */}
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-[#f5d485] blur-xl -z-10 transition-opacity duration-500',
          isHovered ? 'opacity-30' : 'opacity-0'
        )}
      ></div>
    </div>
  );
}
