"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AccentLink from "../components/AccentLink"
import SiteTitleText from "../components/SiteTitleText"
import type { Trip } from "./trips"
import { trips } from "./trips"

export default function BicycleTripsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? ""
  const activeSlug = pathname.startsWith("/bicycle-trips/")
    ? (pathname.split("/")[2] ?? null)
    : null
  const isDetail = Boolean(activeSlug)
  const isIndex = !isDetail
  const shouldReduceMotion = useReducedMotion()
  const entryTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.div
      className="relative w-full max-w-[1200px] self-start py-6"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={entryTransition}
    >
      <div
        className={`flex flex-col gap-8 md:flex-row md:items-start ${
          isIndex ? "md:justify-center md:gap-0" : "md:gap-10"
        }`}
      >
        <motion.div
          layout
          initial={false}
          transition={entryTransition}
          className={`flex w-full flex-col md:sticky md:top-8 h-fit ${
            isDetail ? "md:w-[280px] md:pl-2" : "md:w-[400px]"
          }`}
        >
          <div className="mb-6">
            <AccentLink
              href="/"
              aria-label="Back home"
              variant="strong"
              className="relative z-40 inline-flex text-sm"
            >
              <SiteTitleText />
            </AccentLink>
          </div>
          <aside className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Bicycle trips
              </p>
            </div>
            <TripMenu trips={trips} activeSlug={activeSlug} />
          </aside>
        </motion.div>

        {isDetail ? (
          <motion.section
            key={pathname}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={entryTransition}
            className="min-w-0 flex-1"
          >
            {children}
          </motion.section>
        ) : null}
      </div>
    </motion.div>
  )
}

type TripMenuProps = {
  trips: Trip[]
  activeSlug: string | null
}

function TripMenu({ trips, activeSlug }: TripMenuProps) {
  return (
    <nav aria-label="Trip list">
      <ul className="[&>li+li]:border-t [&>li+li]:border-black/15">
        {trips.map((trip) => {
          const isActive = activeSlug === trip.slug

          return (
            <li key={trip.slug}>
              <Link
                href={`/bicycle-trips/${trip.slug}`}
                aria-current={isActive ? "page" : undefined}
                className={`block py-3 text-lg leading-tight transition ${
                  isActive
                    ? "font-semibold text-[var(--accent)]"
                    : "text-neutral-800 hover:text-black"
                }`}
              >
                <span>{trip.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
