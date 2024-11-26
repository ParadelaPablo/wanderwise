import { Providers } from "./utils/providers";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
  <>
    <Map
      geoLocation={{ lat: 57.78145, lng: 14.15618 }} // Center the map
      isFullScreen={false} // Regular screen size
      origin="Gothenburg, Sweden" // Starting location
      destination="Stockholm, Sweden" // Ending location
    />
  </>
}

export default App;
