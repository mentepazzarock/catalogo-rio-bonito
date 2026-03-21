// Centralized category color map — single source of truth
// Used by: business-card, business-card-compact, categories-section, categorias page, negocio detail

export type CategoryColorKey =
    | 'alimentacao'
    | 'beleza-estetica'
    | 'saude'
    | 'moda-vestuario'
    | 'reparos-manutencao'
    | 'educacao'
    | 'tecnologia'
    | 'automotivo'
    | 'casa-decoracao'
    | 'esporte-lazer'
    | 'advocacia-contabilidade'
    | 'pet-shop-veterinario'
    | 'construcao-civil'
    | 'fotografia-eventos'
    | 'supermercados-conveniencia'

export interface CategoryColors {
    gradient: string
    bg: string
    bgHover: string
    text: string
    border: string
    pill: string
    pillText: string
}

const CATEGORY_COLOR_MAP: Record<string, CategoryColors> = {
    'alimentacao': {
        gradient: 'from-orange-500 via-red-500 to-rose-600',
        bg: 'bg-orange-50',
        bgHover: 'hover:bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        pill: 'bg-orange-100',
        pillText: 'text-orange-700',
    },
    'beleza-estetica': {
        gradient: 'from-pink-500 via-fuchsia-500 to-purple-600',
        bg: 'bg-pink-50',
        bgHover: 'hover:bg-pink-100',
        text: 'text-pink-600',
        border: 'border-pink-200',
        pill: 'bg-pink-100',
        pillText: 'text-pink-700',
    },
    'saude': {
        gradient: 'from-teal-500 via-emerald-500 to-green-600',
        bg: 'bg-teal-50',
        bgHover: 'hover:bg-teal-100',
        text: 'text-teal-600',
        border: 'border-teal-200',
        pill: 'bg-teal-100',
        pillText: 'text-teal-700',
    },
    'moda-vestuario': {
        gradient: 'from-violet-500 via-purple-500 to-indigo-600',
        bg: 'bg-violet-50',
        bgHover: 'hover:bg-violet-100',
        text: 'text-violet-600',
        border: 'border-violet-200',
        pill: 'bg-violet-100',
        pillText: 'text-violet-700',
    },
    'reparos-manutencao': {
        gradient: 'from-amber-500 via-orange-500 to-yellow-600',
        bg: 'bg-amber-50',
        bgHover: 'hover:bg-amber-100',
        text: 'text-amber-600',
        border: 'border-amber-200',
        pill: 'bg-amber-100',
        pillText: 'text-amber-700',
    },
    'educacao': {
        gradient: 'from-blue-500 via-indigo-500 to-violet-600',
        bg: 'bg-blue-50',
        bgHover: 'hover:bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        pill: 'bg-blue-100',
        pillText: 'text-blue-700',
    },
    'tecnologia': {
        gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
        bg: 'bg-cyan-50',
        bgHover: 'hover:bg-cyan-100',
        text: 'text-cyan-600',
        border: 'border-cyan-200',
        pill: 'bg-cyan-100',
        pillText: 'text-cyan-700',
    },
    'automotivo': {
        gradient: 'from-slate-500 via-gray-600 to-zinc-700',
        bg: 'bg-slate-50',
        bgHover: 'hover:bg-slate-100',
        text: 'text-slate-600',
        border: 'border-slate-200',
        pill: 'bg-slate-100',
        pillText: 'text-slate-700',
    },
    'casa-decoracao': {
        gradient: 'from-lime-500 via-green-500 to-emerald-600',
        bg: 'bg-lime-50',
        bgHover: 'hover:bg-lime-100',
        text: 'text-lime-600',
        border: 'border-lime-200',
        pill: 'bg-lime-100',
        pillText: 'text-lime-700',
    },
    'esporte-lazer': {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
        bg: 'bg-emerald-50',
        bgHover: 'hover:bg-emerald-100',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        pill: 'bg-emerald-100',
        pillText: 'text-emerald-700',
    },
    'advocacia-contabilidade': {
        gradient: 'from-indigo-500 via-blue-600 to-sky-700',
        bg: 'bg-indigo-50',
        bgHover: 'hover:bg-indigo-100',
        text: 'text-indigo-600',
        border: 'border-indigo-200',
        pill: 'bg-indigo-100',
        pillText: 'text-indigo-700',
    },
    'pet-shop-veterinario': {
        gradient: 'from-yellow-500 via-amber-500 to-orange-600',
        bg: 'bg-yellow-50',
        bgHover: 'hover:bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-200',
        pill: 'bg-yellow-100',
        pillText: 'text-yellow-700',
    },
    'construcao-civil': {
        gradient: 'from-stone-500 via-amber-600 to-orange-700',
        bg: 'bg-stone-50',
        bgHover: 'hover:bg-stone-100',
        text: 'text-stone-600',
        border: 'border-stone-200',
        pill: 'bg-stone-100',
        pillText: 'text-stone-700',
    },
    'fotografia-eventos': {
        gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
        bg: 'bg-rose-50',
        bgHover: 'hover:bg-rose-100',
        text: 'text-rose-600',
        border: 'border-rose-200',
        pill: 'bg-rose-100',
        pillText: 'text-rose-700',
    },
    'supermercados-conveniencia': {
        gradient: 'from-green-500 via-emerald-500 to-teal-600',
        bg: 'bg-green-50',
        bgHover: 'hover:bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        pill: 'bg-green-100',
        pillText: 'text-green-700',
    },
}

const DEFAULT_COLORS: CategoryColors = {
    gradient: 'from-primary-500 via-primary-600 to-primary-800',
    bg: 'bg-primary-50',
    bgHover: 'hover:bg-primary-100',
    text: 'text-primary-600',
    border: 'border-primary-200',
    pill: 'bg-primary-100',
    pillText: 'text-primary-700',
}

export function getCategoryColors(slug?: string): CategoryColors {
    if (!slug) return DEFAULT_COLORS
    return CATEGORY_COLOR_MAP[slug] || DEFAULT_COLORS
}

export function getCategoryGradient(slug?: string): string {
    return getCategoryColors(slug).gradient
}
