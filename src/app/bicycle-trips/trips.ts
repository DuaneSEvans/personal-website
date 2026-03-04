export type TripImage = {
  src: string
  width: number
  height: number
  alt: string
}

export type Trip = {
  slug: string
  title: string
  summary: string
  galleryDirectory: string
  content: string[]
}

export type TripWithGallery = Trip & {
  gallery: Array<TripImage>
}

export const trips: Trip[] = [
  {
    slug: "japan",
    title: "Japan",
    summary: "Japan is a friendly, beautiful and wet country.",
    galleryDirectory: "japan2025",
    content: [
      "We started cycling at the very northern end of Hokkaido.",
      "The folks we met were curious and very friendly to the 3 oddly dressed Canadians with bikes and gear.",
      "We ended in Nagasaki. During our 3 months we cycled 3740km, climbed 32229m, endured 4 thunderstorms and visisted 5 Montbells.",
    ],
  },
  {
    slug: "europe",
    title: "Europe",
    summary:
      'A tour of northern and central Europe and our first "long" bicycle trip.',
    galleryDirectory: "europe2023",
    content: [
      "The journey began in Inverness in the Scottish highlands.",
      "We were spoiled by long hours of sunshine in the north and big lunches.",
      "As we rolled into our final city, Budapest, one of our members got a flat tire with only 200m remaining - his 5th of the trip.",
    ],
  },
]

export function getTripBySlug(slug: string) {
  return trips.find((trip) => trip.slug === slug)
}
