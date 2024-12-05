import { createFileRoute, useParams } from '@tanstack/react-router'
import Footer from '../../../../components/footer/footer'
import Todo from '../../../../components/todo/todo'
import ToPack from '../../../../components/topack/topack'
import { useState } from 'react'
import Highlights from '../../../../components/highlights/highlights'
import { MapForFooter } from '../../../../components/map/mapForFooter'
import { useQuery } from '@tanstack/react-query'
import { getTripById } from '@/lib/api'
import { TripData } from '@/lib/types'
import { LoadingState } from '@/components/ui-states/loading'

export const Route = createFileRoute('/dashboard/trips/$tripId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const tripId = useParams({
    from: '/dashboard/trips/$tripId/',
    select: (params) => params.tripId,
  })
  const [visibleComponent, setVisibleComponent] = useState('Map')

  const {
    isLoading,
    isError,
    data: tripData,
  } = useQuery<TripData>({
    queryKey: ['trip', tripId],
    queryFn: () => getTripById(Number(tripId)),
    enabled: !!tripId,
  })

  return (
    <div className="flex flex-col justify-center w-full items-center">
      {isLoading && <LoadingState />}
      {isError && <div> The trip is on vacation...</div>}
      <h1 className="text-xl font-bold">{tripData?.title}</h1>
      <div className="w-full">
        <div className="flex justify-left items-start my-2 p-1 w-full h-full">
          {visibleComponent === 'Map' && (
            <MapForFooter tripId={Number(tripId)} tripData={tripData!} />
          )}
          {visibleComponent === 'Todo' && <Todo tripId={tripId} />}
          {visibleComponent === 'ToPack' && <ToPack tripId={tripId} />}
          {visibleComponent === 'Highlights' && <Highlights tripId={tripId} />}
        </div>
      </div>
      <Footer setVisibleComponent={setVisibleComponent} />
    </div>
  )
}
