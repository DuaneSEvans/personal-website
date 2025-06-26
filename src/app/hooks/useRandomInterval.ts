import { useEffect, useRef } from "react"
import { randomInt } from "../utils/randomInt"

// Credit to Josh W Comeau https://www.joshwcomeau.com/snippets/react-hooks/use-random-interval/
// TODO(dse): my use case has limited time I want this to run. Update api to
// support a cancel at time.
export function useRandomInterval(
  callback: () => void,
  minDelay: number,
  maxDelay: number
) {
  const timeoutId = useRef<number | undefined>(undefined)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const handleTick = () => {
      const nextTickAt = randomInt(minDelay, maxDelay)

      timeoutId.current = window.setTimeout(() => {
        savedCallback.current()
        handleTick()
      }, nextTickAt)
    }

    handleTick()
    return () => window.clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])
}
