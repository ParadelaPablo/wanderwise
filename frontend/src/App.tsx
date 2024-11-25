import { Map } from "./components/map/map"

function App() {

  return (
    <>
      <Map
        geoLocation={{ lat: 57.78145, lng: 14.15618 }} // Center the map
        isFullScreen={false} // Regular screen size
        origin="Gothenburg, Sweden" // Starting location
        destination="Stockholm, Sweden" // Ending location
      />
    </>
  )
}

export default App
