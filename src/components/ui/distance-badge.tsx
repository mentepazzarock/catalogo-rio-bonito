'use client'

import { Navigation } from 'lucide-react'
import { useLocation } from '@/store/use-location'
import { calculateDistance, formatDistance } from '@/lib/utils'

interface DistanceBadgeProps {
  latitude: number | null
  longitude: number | null
  className?: string
}

export function DistanceBadge({ latitude, longitude, className = '' }: DistanceBadgeProps) {
  const { latitude: userLat, longitude: userLng, status } = useLocation()

  if (status !== 'granted' || !userLat || !userLng || !latitude || !longitude) {
    return null
  }

  const distance = calculateDistance(userLat, userLng, latitude, longitude)

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold text-primary-600 ${className}`}>
      <Navigation className="h-2.5 w-2.5" />
      {formatDistance(distance)}
    </span>
  )
}
