import {
  UtensilsCrossed,
  Sparkles,
  Heart,
  Shirt,
  Wrench,
  GraduationCap,
  Laptop,
  Car,
  Home,
  Dumbbell,
  PawPrint,
  Scale,
  HardHat,
  Camera,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Sparkles,
  Heart,
  Shirt,
  Wrench,
  GraduationCap,
  Laptop,
  Car,
  Home,
  Dumbbell,
  PawPrint,
  Scale,
  HardHat,
  Camera,
  ShoppingCart,
}

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon className={className} />
}
