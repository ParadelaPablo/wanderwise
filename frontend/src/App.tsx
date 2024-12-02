import { Providers } from "./utils/providers";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { LoadScript } from "@react-google-maps/api";
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>

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
        <ToastContainer />
      </Providers>
    </LoadScript>
  );
}

export default App;
