'use client';

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'white' | 'outline-white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-cranberry text-white shadow-button-primary hover:bg-cranberry-glow active:scale-[0.97] transition-all duration-200',
  secondary:
    'bg-surface-dark text-white border border-border-dark hover:border-border-dark-strong active:scale-[0.97] transition-all duration-200',
  ghost:
    'bg-transparent text-text-secondary hover:text-cranberry transition-colors duration-200',
  white:
    'bg-white text-cranberry shadow-button-white hover:shadow-card-hover active:scale-[0.97] transition-all duration-200',
  'outline-white':
    'bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/50 active:scale-[0.97] transition-all duration-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-[13px] font-semibold rounded-pill',
  md: 'px-7 py-3 text-[15px] font-bold rounded-pill',
  lg: 'px-8 py-4 text-[15px] font-bold rounded-pill',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', showArrow = false, href, className, children, ...props }, ref) => {
    const classes = twMerge(
      clsx(
        'inline-flex items-center justify-center gap-2 cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )
    );

    const content = (
      <>
        <span>{children}</span>
        {showArrow && (
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black/90">
            <ArrowRight className="h-[11px] w-[11px] text-white" />
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileTap={{ scale: 0.97 }}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.97 }}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
