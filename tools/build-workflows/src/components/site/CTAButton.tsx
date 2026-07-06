'use client'

import Link from 'next/link'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: CTAButtonProps) {
  const cls = `btn btn-${variant} ${className}`.trim()

  if (onClick) {
    return (
      <button className={cls} onClick={onClick} type="button">
        {children}
      </button>
    )
  }

  const isExternal = href.startsWith('http')
  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
