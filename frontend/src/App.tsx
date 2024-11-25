import { Providers } from "./utils/providers";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import './index.css'
import { routeTree } from "./routeTree.gen";

import Footer from "./components/footer"; 
import HomeBeforeLogIn from "./components/homeBeforeLogIn";
import HamburguerMenu from "./components/hamburguerMenu";



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
      <HamburguerMenu />
      <HomeBeforeLogIn />
      <Footer />

    </Providers>

  );
}

export default App;
