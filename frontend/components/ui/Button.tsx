import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-medium transition-colors rounded-lg disabled:opacity-50 disabled:pointer-events-none',
        {
          'w-full': fullWidth,
          'bg-ink text-paper hover:bg-accent': variant === 'primary',
          'bg-[#e5e5e5] text-ink hover:bg-[#d4d4d4]': variant === 'secondary',
          'bg-transparent text-ink hover:bg-black/5': variant === 'ghost',
          'border border-ink bg-transparent hover:bg-ink hover:text-paper': variant === 'outline',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-5 py-2.5 text-base': size === 'md',
          'px-8 py-3.5 text-lg': size === 'lg'
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
