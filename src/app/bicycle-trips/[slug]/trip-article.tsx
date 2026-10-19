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
          {trip.gallery.map((photo, photoIndex) => (
            <li
              key={photo.src}
              className="inline-block w-full break-inside-avoid"
            >
              <TripPhoto
                photo={photo}
                photoIndex={photoIndex}
                gallery={trip.gallery}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

function TripPhoto({
  photo,
  photoIndex,
  gallery,
}: {
  photo: TripImage
  photoIndex: number
  gallery: Array<TripImage>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(photoIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 })
  const activePhoto = gallery[activePhotoIndex] ?? photo

  function showPreviousPhoto() {
    setIsZoomed(false)
    setActivePhotoIndex((currentIndex) =>
      (currentIndex - 1 + gallery.length) % gallery.length,
    )
  }

  function showNextPhoto() {
    setIsZoomed(false)
    setActivePhotoIndex((currentIndex) => (currentIndex + 1) % gallery.length)
  }

  function updateZoomOrigin({
    clientX,
    clientY,
    photoButton,
  }: {
    clientX: number
    clientY: number
    photoButton: HTMLButtonElement
  }) {
    const photoBounds = photoButton.getBoundingClientRect()
    setZoomOrigin({
      x: Math.min(
        100,
        Math.max(0, ((clientX - photoBounds.left) / photoBounds.width) * 100),
      ),
      y: Math.min(
        100,
        Math.max(0, ((clientY - photoBounds.top) / photoBounds.height) * 100),
      ),
    })
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) {
          setActivePhotoIndex(photoIndex)
          setIsZoomed(false)
        }
      }}
    >
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
          onKeyDown={(event) => {
            if (gallery.length < 2) return
            if (event.key === "ArrowLeft") {
              event.preventDefault()
              showPreviousPhoto()
            } else if (event.key === "ArrowRight") {
              event.preventDefault()
              showNextPhoto()
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 text-white sm:p-8"
        >
          <Dialog.Title className="sr-only">{activePhoto.alt}</Dialog.Title>
          <span aria-live="polite" className="sr-only">
            Photo {activePhotoIndex + 1} of {gallery.length}
          </span>
          <Dialog.Close
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-3xl leading-none hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
          >
            ×
          </Dialog.Close>
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-2xl hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex"
                onClick={(event) => {
                  event.stopPropagation()
                  showPreviousPhoto()
                }}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-2xl hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex"
                onClick={(event) => {
                  event.stopPropagation()
                  showNextPhoto()
                }}
              >
                →
              </button>
            </>
          )}
          <button
            type="button"
            aria-label={`${isZoomed ? "Zoom out of" : "Zoom in on"} ${activePhoto.alt}`}
            className={`m-auto flex max-h-full max-w-full items-center justify-center border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            onClick={(event) => {
              event.stopPropagation()
              if (isZoomed) {
                setIsZoomed(false)
                return
              }
              if (event.detail !== 0) {
                updateZoomOrigin({
                  clientX: event.clientX,
                  clientY: event.clientY,
                  photoButton: event.currentTarget,
                })
              } else {
                setZoomOrigin({ x: 50, y: 50 })
              }
              setIsZoomed(true)
            }}
            onMouseMove={(event) => {
              if (!isZoomed) return
              updateZoomOrigin({
                clientX: event.clientX,
                clientY: event.clientY,
                photoButton: event.currentTarget,
              })
            }}
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={activePhoto.width}
              height={activePhoto.height}
              sizes={isZoomed ? "200vw" : "100vw"}
              style={{
                transform: isZoomed ? "scale(2)" : undefined,
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              }}
              className="h-auto max-h-[calc(100dvh-6rem)] w-auto max-w-full object-contain motion-safe:transition-transform motion-safe:duration-200"
            />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
