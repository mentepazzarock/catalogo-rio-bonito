import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

const variantStyles = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-accent-100 text-accent-700',
  warning: 'bg-warm-100 text-warm-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-primary-100 text-primary-700',
  outline: 'border border-slate-200 text-slate-600',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}
