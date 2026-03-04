import Balancer from "react-wrap-balancer"

export default function BicycleTrips() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">
        <Balancer ratio={0.3}>Bicycle trips</Balancer>
      </h1>
      <p className="text-sm text-neutral-700">
        Select a trip from the menu to read the story and explore the route.
      </p>
    </section>
  )
}
