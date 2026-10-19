"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { useState } from "react"
import Balancer from "react-wrap-balancer"
import type { TripImage, TripWithGallery } from "../trips"

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
              <TripPhoto photo={photo} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

function TripPhoto({ photo }: { photo: TripImage }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`View ${photo.alt} full screen`}
          className="block w-full cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="block h-auto w-full rounded-lg shadow-lg"
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/95" />
        <Dialog.Content
          aria-describedby={undefined}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 text-white sm:p-8"
        >
          <Dialog.Title className="sr-only">{photo.alt}</Dialog.Title>
          <Dialog.Close
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-3xl leading-none hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
          >
            ×
          </Dialog.Close>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="100vw"
            className="m-auto h-auto max-h-[calc(100dvh-6rem)] w-auto max-w-full object-contain"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
