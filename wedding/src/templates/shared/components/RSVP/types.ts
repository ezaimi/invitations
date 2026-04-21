import type { InputHTMLAttributes, ReactNode } from "react"

export interface RSVPFieldConfig {
  icon?: ReactNode
  placeholder?: string
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"]
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
}

export interface RSVPOverlayContent {
  title: string
  message: string
}
