import Link from "next/link"
import Balancer from "react-wrap-balancer"

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">
        <Balancer ratio={0.3}>This is Duane's website.</Balancer>
      </h1>
      <p className="text-justify">
        Hi there. This is it. You've made it. Check out the{" "}
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
        .
      </p>
      <p>
        You can reach me at{" "}
        <Link
          href="mailto:duanesevans@gmail.com"
          className="text-[var(--accent)] hover:text-[var(--accent)]/80 hover:underline"
        >
          duanesevans@gmail.com
        </Link>
        .
      </p>
    </>
  )
}
