"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SoftUICardProps {
  children: ReactNode
  className?: string
  pressed?: boolean
  hoverable?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export function SoftUICard({ children, className, pressed = false, hoverable = true, onClick, style }: SoftUICardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border-none transition-all duration-300 ease-out",
        pressed ? "soft-shadow-inset" : "soft-shadow",
        hoverable && !pressed && "hover:soft-shadow-hover cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}
