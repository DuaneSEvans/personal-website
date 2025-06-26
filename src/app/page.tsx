"use client"

import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Sparkles from "./components/Sparkles"

const delays = [0.1, 1.6, 2.4, 3.2, 4, 5.5, 5.9, 6.3, 6.7]

function getDelay(index: number): number {
  return delays[index] ?? 0
}

const RECENT_VISIT_DURATION_MS =
  process.env.NODE_ENV === "development" ? 1000 * 10 : 1000 * 60 * 5 // 5 minutes

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
    <Sparkles delayMs={sparkleDelay} durationMs={6000}>
      <div className="flex flex-col justify-center h-full w-full max-w-[700px] p-3 gap-8 items-center">
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: visitedRecently ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: getDelay(0),
            ease: "easeIn",
          }}
        >
          <Balancer ratio={0.3}>This is Duane's website.</Balancer>
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
                You've made it.{" "}
              </motion.span>
            </>
          )}
          <motion.span
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(4), ease: "easeIn" }}
          >
            Check out the{" "}
            <Link
              href="/bicycle-trips"
              className="text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline"
            >
              bicycle trips
            </Link>{" "}
            or some of the things{" "}
            <Link
              href="/projects"
              className="text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline"
            >
              I've built on the internet
            </Link>
          </motion.span>
          .
        </p>
        <ul className="self-start">
          <motion.li
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(5), ease: "easeIn" }}
          >
            email:{" "}
            <Link
              href="mailto:duanesevans@gmail.com"
              className="text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline"
            >
              duanesevans@gmail.com
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(6), ease: "easeIn" }}
          >
            gh:{" "}
            <Link
              href="https://github.com/duanesevans"
              className="text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline"
              target="_blank"
            >
              DuaneSEvans
            </Link>
          </motion.li>
          <motion.li
            initial={{ opacity: visitedRecently ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: getDelay(7), ease: "easeIn" }}
          >
            linkedin:{" "}
            <Link
              href="https://www.linkedin.com/in/duane-evans-73a5a510a/"
              className="text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline"
              target="_blank"
            >
              duane-evans-73a5a510a
            </Link>
          </motion.li>
        </ul>
      </div>
    </Sparkles>
  )
}
