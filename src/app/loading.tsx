'use client'

import { MapPin } from 'lucide-react'

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center justify-center animate-pulse">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-primary-500/20 blur-xl" />

                {/* Logo */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl shadow-primary-500/30">
                    <MapPin className="h-8 w-8 text-white" />
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-800">Catálogo RB</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">Carregando...</p>
            </div>
        </div>
    )
}
