"use client"

import Image from "next/image"
import Balancer from "react-wrap-balancer"
import type { TripWithGallery } from "../trips"

type TripArticleProps = {
  trip: TripWithGallery
}

export default function TripArticle({ trip }: TripArticleProps) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          Trip
        </p>
        <h1 className="text-4xl font-bold">
          <Balancer ratio={0.3}>{trip.title}</Balancer>
        </h1>
        <p className="text-sm text-neutral-700">{trip.summary}</p>
      </header>
      <section className="flex flex-col gap-4 text-sm text-neutral-700">
        {trip.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <ul className="list-none columns-1 [column-gap:1rem] sm:columns-2 lg:columns-3">
          {trip.gallery.map((photo) => (
            <li
              key={photo.src}
              className="inline-block w-full break-inside-avoid"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="block h-auto w-full rounded-lg shadow-lg"
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
