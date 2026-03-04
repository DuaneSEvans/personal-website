"use client"

import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { motion, Variants, useAnimation } from "framer-motion"
import { useEffect } from "react"
import AccentLink from "../components/AccentLink"

type ProjectName = "321-NHL" | "Slamsgiving" | "Fidget" | "Fantastic PWHL"

type Project = {
  name: ProjectName
  imgName: string
  description: string
  link: string
}

const projects: Project[] = [
  {
    name: "Fantastic PWHL",
    imgName: "fantastic-pwhl.png",
    description:
      "A free and fantastic fantasy hockey league for the Professional Women's Hockey League (PWHL). Friends can start leagues, draft and trade players, and compete for the top spot in their league.",
    link: "https://fantasticpwhl.com",
  },
  {
    name: "321-NHL",
    imgName: "321-nhl.png",
    description:
      "Hockey, the greatest sport on earth, is played in the National Hockey League (NHL). The NHL awards 2 points to the winning team. But what if the league followed a more traditional sport point system which awards 3 points to the winning team and splits them for non-regulation wins? This website displays the standings of the NHL if they used this alternate 3-2-1-0 point system.",
    link: "https://www.321nhl.com",
  },
  {
    name: "Slamsgiving",
    imgName: "slamsgiving.png",
    description:
      "Slamsgiving is the most popular annual Shrek/Dennys/Slam party in western Canada. Confused? Don't be. Take a look at the joy of slamming that takes place each year.",
    link: "https://www.slamsgiving.com",
  },
  {
    name: "Fidget",
    imgName: "fidget.png",
    description:
      "My first website, fidgetpodcast.com is the official website for the Fidget Podcast.",
    link: "https://www.fidgetpodcast.com",
  },
]

export default function Projects() {
  return (
    <div className="flex flex-col justify-center h-full w-full max-w-[1080px] gap-12">
      <h1 className="text-4xl font-bold text-center">
        <Balancer ratio={0.3}>Hobby Projects.</Balancer>
      </h1>
      <div className="flex gap-16 flex-wrap justify-center">
        {projects.map((project, index) => (
          <ProjectItem {...project} key={project.name} index={index} />
        ))}
      </div>
    </div>
  )
}

const projectVariants: Variants = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: [0, 8, 0],
    y: [0, -8, 0],
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  hover: {
    x: 8,
    y: -8,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
}

function ProjectItem({
  name,
  imgName,
  description,
  link,
  index,
}: Project & { index: number }) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start("animate", {
      delay: index * 0.3,
    })
  }, [controls, index])

  return (
    <article className="flex-1 flex flex-col gap-2 pb-2 min-w-[300px] max-w-[500px]">
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <Link href={link} rel="noreferrer" target="_blank">
        <div className="relative">
          <div className="absolute bg-[var(--accent-complimentary)] w-full h-full -z-1 translate-y-[6px] -translate-x-[6px]" />
          <motion.div
            variants={projectVariants}
            initial="initial"
            animate={controls}
            onHoverStart={() => controls.start("hover")}
            onHoverEnd={() => controls.start("initial")}
          >
            <Image
              src={`/projects/${imgName}`}
              alt={name}
              width={1000}
              height={1000}
              className="shadow-xl"
            />
          </motion.div>
        </div>
      </Link>
      <p className="text-sm text-justify">{description}</p>
      <AccentLink
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1"
      >
        {link}
        <ExternalLinkIcon />
      </AccentLink>
    </article>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  )
}
