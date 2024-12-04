import { createFileRoute } from '@tanstack/react-router'
import TripGallery from '../../components/dashboard/tripGallery'


export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (<div className='h-full'><TripGallery/></div>)

}

export default RouteComponent
