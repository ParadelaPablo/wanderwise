import { Providers } from "./utils/providers";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { LoadScript } from "@react-google-maps/api";
const router = createRouter({ routeTree });
const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <LoadScript
      googleMapsApiKey={VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </LoadScript>
  );
}

export default App;
