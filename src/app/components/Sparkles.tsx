import { useRef, useState } from "react"
import { randomInt } from "../utils/randomInt"
import { motion } from "framer-motion"
import { choose } from "../utils/array"
import { useRandomInterval } from "../hooks/useRandomInterval"

const SPARKLE_COLORS = ["var(--accent)", "var(--accent-complimentary)"] as const

// Credit to Josh W Comeau for much of this: https://www.joshwcomeau.com/react/animated-sparkles-in-react/
export default function Sparkles({
  children,
  delayMs,
  durationMs,
}: {
  children: React.ReactNode
  delayMs: number
  durationMs: number
}) {
  const { current: startSparklesTime } = useRef(Date.now() + delayMs)

  const [sparkles, setSparkles] = useState(Array(3).map(generateSparkle))
  useRandomInterval(
    () => {
      const showSparkles =
        startSparklesTime < Date.now() &&
        startSparklesTime + durationMs > Date.now()
      if (!showSparkles) return

      const sparkle = generateSparkle()
      const now = Date.now()
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    50,
    450
  )
  return (
    <span className="relative inline-block">
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} size={sparkle.size} style={sparkle.style} />
      ))}
      <span className="relative z-1">{children}</span>
    </span>
  )
}

function Sparkle({
  size,
  style,
}: {
  size: number
  style: React.CSSProperties
}) {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
  return (
    <motion.span
      style={style}
      initial={{ scale: 0 }}
      animate={{
        scale: [0, 1, 0],
        direction: "forwards",
      }}
      className="absolute block"
      transition={{ duration: 0.7 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        className="block"
        animate={{ transform: "rotate(180deg)", transition: { duration: 1 } }}
      >
        <path d={path} fill={choose(SPARKLE_COLORS)} />
      </motion.svg>
    </motion.span>
  )
}

type SparkleType = {
  id: string
  createdAt: number
  size: number
  style: {
    top: string
    left: string
  }
}

function generateSparkle(): SparkleType {
  return {
    id: String(randomInt(10000, 99999)),
    createdAt: Date.now(),
    size: randomInt(10, 20),
    style: {
      left: randomInt(0, 100) + "%",
      top: randomInt(0, 100) + "%",
    },
  }
}
