import Link from "next/link"
import type { ComponentProps } from "react"

type AccentLinkVariant = "default" | "strong"
type AccentLinkUnderline = "hover" | "always" | "none"

type AccentLinkProps = ComponentProps<typeof Link> & {
  variant?: AccentLinkVariant
  underline?: AccentLinkUnderline
}

const VARIANT_CLASSES: Record<AccentLinkVariant, string> = {
  default: "text-[var(--accent)] hover:text-[var(--accent)]/80",
  strong: "text-[var(--accent)] font-semibold hover:text-[var(--accent)]/80",
}

const UNDERLINE_CLASSES: Record<AccentLinkUnderline, string> = {
  hover: "hover:underline",
  always: "underline",
  none: "no-underline hover:no-underline",
}

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function AccentLink({
  variant = "default",
  underline = "hover",
  className,
  ...props
}: AccentLinkProps) {
  return (
    <Link
      className={joinClasses(
        VARIANT_CLASSES[variant],
        UNDERLINE_CLASSES[underline],
        className,
      )}
      {...props}
    />
  )
}
