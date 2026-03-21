'use client'

import { useRef } from 'react'
import { motion, useInView, type Variant } from 'framer-motion'

interface MotionWrapperProps {
    children: React.ReactNode
    className?: string
    variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale'
    delay?: number
    duration?: number
    once?: boolean
    amount?: number
}

const variants: Record<string, { hidden: Variant; visible: Variant }> = {
    'fade-up': {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
    },
    'fade-in': {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    'slide-left': {
        hidden: { opacity: 0, x: -24 },
        visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
        hidden: { opacity: 0, x: 24 },
        visible: { opacity: 1, x: 0 },
    },
    'scale': {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
}

export function MotionWrapper({
    children,
    className,
    variant = 'fade-up',
    delay = 0,
    duration = 0.5,
    once = true,
    amount = 0.2,
}: MotionWrapperProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, amount })
    const v = variants[variant]

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={v}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger container for lists/grids
interface StaggerContainerProps {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
}

export function StaggerContainer({ children, className, staggerDelay = 0.08 }: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ staggerChildren: staggerDelay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Animated counter
interface AnimatedCounterProps {
    value: number
    suffix?: string
    prefix?: string
    className?: string
    duration?: number
}

export function AnimatedCounter({ value, suffix = '', prefix = '', className, duration = 1.5 }: AnimatedCounterProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
        >
            {prefix}
            <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
            >
                <CountUpNumber value={value} isInView={isInView} duration={duration} />
            </motion.span>
            {suffix}
        </motion.span>
    )
}

function CountUpNumber({ value, isInView, duration }: { value: number; isInView: boolean; duration: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null)

    if (typeof window !== 'undefined' && isInView && nodeRef.current) {
        const start = 0
        const end = value
        const startTime = performance.now()

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            const current = Math.round(start + (end - start) * eased)
            if (nodeRef.current) {
                nodeRef.current.textContent = current.toLocaleString('pt-BR')
            }
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }

    return <span ref={nodeRef}>{isInView ? '0' : '0'}</span>
}
