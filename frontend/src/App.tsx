import { Map } from "./components/map/map"

function App() {

  return (
    <>
      <Map geoLocation={{ lat: 59.3467183, lng: 18.0097756 }} isFullScreen={false} />
    </>
  )
}

export default App
