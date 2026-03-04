"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import AccentLink from "./components/AccentLink"
import SiteTitleText from "./components/SiteTitleText"
import Sparkles from "./components/Sparkles"

const delays = [0.1, 1, 1.8, 2.6, 3.4, 4.9, 5.3, 5.7, 6.1]

function getDelay(index: number): number {
  return delays[index] ?? 0
}

const RECENT_VISIT_DURATION_MS = 1000 * 60 * 60 * 24 // 1 day

// TODO(dse): have even more fun with this and change text each time the user
// visits again and again. e.g. "wow it's you again!"
export default function Home() {
  const [visitedRecently, setVisitedRecently] = useState<boolean | null>(null)

  useEffect(() => {
    const timeVisited = parseInt(localStorage.getItem("timeVisited") ?? "0")
    if (timeVisited > new Date().getTime() - RECENT_VISIT_DURATION_MS) {
      setVisitedRecently(true)
    } else {
      setVisitedRecently(false)
    }
    localStorage.setItem("timeVisited", new Date().getTime().toString())
  }, [])

  if (visitedRecently == null) {
    return null
  }

  const sparkleDelay = (delays[delays.length - 1] ?? 0) * 1000

  return (
    <Sparkles delayMs={visitedRecently ? 0 : sparkleDelay} durationMs={6000}>
      <div className="flex h-full w-full max-w-[700px] flex-col items-center justify-center gap-8 p-3">
        <motion.h1
          className="text-center text-4xl font-bold"
          initial={{ opacity: visitedRecently ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: getDelay(0),
            ease: "easeIn",
          }}
        >
          <SiteTitleText />
        </motion.h1>

        <p className="text-justify">
          {visitedRecently ? (
            "Hello and welcome back. Great to see you again. "
          ) : (
            <>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: getDelay(1),
                  ease: "easeIn",
                }}
              >
                Hi there.{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: getDelay(2),
                  ease: "easeIn",
                }}
              >
                This is it.{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: getDelay(3),
                  ease: "easeIn",
                }}
              >
                You&apos;ve made it.{" "}
              </motion.span>
            </>
          )}
          <motion.span
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(4), ease: "easeIn" }}
          >
            Check out the{" "}
            <AccentLink href="/bicycle-trips">
              bicycle trips
            </AccentLink>{" "}
            or some of my{" "}
            <AccentLink href="/projects">
              hobby projects
            </AccentLink>
            .
          </motion.span>
        </p>
        <ul className="self-start">
          <motion.li
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(5), ease: "easeIn" }}
          >
            email:{" "}
            <AccentLink href="mailto:duanesevans@gmail.com">
              duanesevans@gmail.com
            </AccentLink>
          </motion.li>
          <motion.li
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(6), ease: "easeIn" }}
          >
            gh:{" "}
            <AccentLink
              href="https://github.com/duanesevans"
              rel="noreferrer"
              target="_blank"
            >
              DuaneSEvans
            </AccentLink>
          </motion.li>
          <motion.li
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(7), ease: "easeIn" }}
          >
            linkedin:{" "}
            <AccentLink
              href="https://www.linkedin.com/in/duane-evans-73a5a510a/"
              rel="noreferrer"
              target="_blank"
            >
              duane-evans-73a5a510a
            </AccentLink>
          </motion.li>
        </ul>
      </div>
    </Sparkles>
  )
}
