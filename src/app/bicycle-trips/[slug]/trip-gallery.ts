import type { Dirent } from "node:fs"
import { readdir } from "node:fs/promises"
import path from "node:path"
import { getTripBySlug, type TripImage, type TripWithGallery } from "../trips"

const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
])
const DEFAULT_PHOTO_WIDTH = 1600
const DEFAULT_PHOTO_HEIGHT = 1200

function isTripPhotoFile({ fileName }: { fileName: string }) {
  const fileExtension = path.extname(fileName).toLowerCase()
  return SUPPORTED_IMAGE_EXTENSIONS.has(fileExtension)
}

async function getTripGalleryPhotos({
  galleryDirectory,
  tripTitle,
}: {
  galleryDirectory: string
  tripTitle: string
}) {
  const publicGalleryDirectoryPath = path.join(
    process.cwd(),
    "public",
    "bicycle-trips",
    galleryDirectory,
  )
  let directoryEntries: Array<Dirent> = []

  try {
    directoryEntries = await readdir(publicGalleryDirectoryPath, {
      withFileTypes: true,
    })
  } catch {
    return []
  }
  const photoFileNames = directoryEntries
    .filter((directoryEntry) => directoryEntry.isFile())
    .map((directoryEntry) => directoryEntry.name)
    .filter((fileName) => isTripPhotoFile({ fileName }))
    .sort((photoFileNameA, photoFileNameB) =>
      photoFileNameA.localeCompare(photoFileNameB),
    )

  return photoFileNames.map<TripImage>((photoFileName, photoIndex) => ({
    src: `/bicycle-trips/${galleryDirectory}/${photoFileName}`,
    width: DEFAULT_PHOTO_WIDTH,
    height: DEFAULT_PHOTO_HEIGHT,
    alt: `${tripTitle} trip photo ${photoIndex + 1}`,
  }))
}

export async function getTripWithGalleryBySlug({
  slug,
}: {
  slug: string
}): Promise<TripWithGallery | undefined> {
  const trip = getTripBySlug(slug)

  if (!trip) {
    return undefined
  }

  const galleryPhotos = await getTripGalleryPhotos({
    galleryDirectory: trip.galleryDirectory,
    tripTitle: trip.title,
  })

  return {
    ...trip,
    gallery: galleryPhotos,
  }
}
