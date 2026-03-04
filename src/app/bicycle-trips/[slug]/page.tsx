import { notFound } from "next/navigation"
import TripArticle from "./trip-article"
import { trips } from "../trips"
import { getTripWithGalleryBySlug } from "./trip-gallery"

type TripPageProps = {
  params: Promise<{ slug: string }>
}

export default async function TripPage({ params }: TripPageProps) {
  const { slug } = await params
  const trip = await getTripWithGalleryBySlug({ slug })

  if (!trip) {
    notFound()
  }

  return <TripArticle trip={trip} />
}

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }))
}
