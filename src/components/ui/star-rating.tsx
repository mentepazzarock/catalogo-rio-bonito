'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: number
  showValue?: boolean
  totalReviews?: number
  interactive?: boolean
  onRate?: (rating: number) => void
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  showValue = false,
  totalReviews,
  interactive = false,
  onRate,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => {
          const filled = i < Math.floor(rating)
          const halfFilled = !filled && i < rating
          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => onRate?.(i + 1)}
              className={cn(
                'transition-colors',
                interactive && 'cursor-pointer hover:scale-110'
              )}
            >
              <Star
                size={size}
                className={cn(
                  filled
                    ? 'fill-warm-400 text-warm-400'
                    : halfFilled
                    ? 'fill-warm-200 text-warm-400'
                    : 'fill-transparent text-slate-300'
                )}
              />
            </button>
          )
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>
      )}
      {totalReviews !== undefined && (
        <span className="text-sm text-slate-500">({totalReviews})</span>
      )}
    </div>
  )
}
