'use client'

/**
 * Design primitives — the small set of building blocks every page composes from.
 * See DESIGN.md §4–§7.
 */

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { inViewFadeUp, lineReveal, sectionStagger, VIEWPORT } from '@/lib/animations'

/* -------------------------------------------------------------------------
   Shell — the 1560px layout container
   ------------------------------------------------------------------------- */
export function Shell({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('shell', className)} {...rest}>
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------
   Section — full-bleed boundary + shell-constrained content
   ------------------------------------------------------------------------- */
export function Section({
  id,
  className,
  bleed = true,
  children,
}: {
  id?: string
  className?: string
  bleed?: boolean
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('relative', className)}>
      {bleed && <Rule />}
      <Shell className="py-[clamp(72px,11vh,150px)]">{children}</Shell>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Rule — a full-bleed horizontal boundary that draws itself in
   ------------------------------------------------------------------------- */
export function Rule({ className, animate = true }: { className?: string; animate?: boolean }) {
  if (!animate) return <div className={cn('rule-x', className)} aria-hidden="true" />
  return (
    <motion.div
      aria-hidden="true"
      className={cn('rule-x origin-left', className)}
      variants={lineReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    />
  )
}

/* -------------------------------------------------------------------------
   MonoLabel — uppercase technical label
   ------------------------------------------------------------------------- */
export function MonoLabel({
  children,
  className,
  dot = false,
}: {
  children: React.ReactNode
  className?: string
  dot?: boolean
}) {
  return (
    <span className={cn('t-label inline-flex items-center gap-2', className)}>
      {dot && <span className="status-dot" />}
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------
   SectionHeader — numbered editorial heading with optional right-hand meta
   ------------------------------------------------------------------------- */
export function SectionHeader({
  index,
  label,
  title,
  meta,
  lead,
  className,
}: {
  index: string
  label: string
  title: React.ReactNode
  meta?: React.ReactNode
  lead?: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={sectionStagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn('mb-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6', className)}
    >
      <motion.div variants={inViewFadeUp} className="lg:col-span-3">
        <MonoLabel className="text-[var(--subtle)]">
          {index} <span className="mx-1 opacity-40">/</span> {label}
        </MonoLabel>
      </motion.div>

      <motion.div variants={inViewFadeUp} className="lg:col-span-6">
        <h2 className="t-section text-[var(--fg)]">{title}</h2>
        {lead && <p className="t-lead mt-5 max-w-[52ch]">{lead}</p>}
      </motion.div>

      {meta && (
        <motion.div
          variants={inViewFadeUp}
          className="t-mono self-end text-[var(--subtle)] uppercase lg:col-span-3 lg:text-right"
        >
          {meta}
        </motion.div>
      )}
    </motion.div>
  )
}

/* -------------------------------------------------------------------------
   ArrowLink — animated underline + travelling arrow
   ------------------------------------------------------------------------- */
type ArrowLinkProps = {
  href: string
  children: React.ReactNode
  external?: boolean
  quiet?: boolean
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function ArrowLink({
  href,
  children,
  external,
  quiet = false,
  className,
  onClick,
}: ArrowLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href)
  const body = (
    <>
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </>
  )

  const classes = cn(
    'link-line t-mono uppercase',
    quiet ? 'text-[var(--muted)] hover:text-[var(--fg)]' : 'text-[var(--fg)]',
    'transition-colors duration-200',
    className,
  )

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {body}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {body}
    </Link>
  )
}

/* -------------------------------------------------------------------------
   Tag — a real technology name
   ------------------------------------------------------------------------- */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('tag sheen-hover', className)}>{children}</span>
}

/* -------------------------------------------------------------------------
   Reveal — scroll-triggered entrance wrapper
   ------------------------------------------------------------------------- */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  as?: 'div' | 'li' | 'article' | 'header'
}) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/* -------------------------------------------------------------------------
   MetaRow — a label/value pair sitting on a hairline
   ------------------------------------------------------------------------- */
export function MetaRow({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-6 border-b py-3',
        className,
      )}
      style={{ borderColor: 'var(--line)' }}
    >
      <span className="t-label shrink-0">{label}</span>
      <span className="t-mono text-right text-[var(--fg-dim)] uppercase">{children}</span>
    </div>
  )
}
