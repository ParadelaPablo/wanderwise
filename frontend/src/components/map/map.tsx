import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map({ geoLocation, isFullScreen }) {
  const containerStyle = {
    width: "100%",
    height: isFullScreen ? "100vh" : "90vh",
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyBfBneyoXPKgNKs7LOMurVbqmOYleIFvgk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={geoLocation}
          zoom={10}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
}

export { Map };
