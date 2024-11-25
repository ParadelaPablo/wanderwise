import { Providers } from "./utils/providers";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  return (
    <>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </>
  );
}

export default App;
