import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/clerk-react";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const queryClient = new QueryClient();

type ProvidersProps = { children: ReactNode };

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInForceRedirectUrl="/dashboard">
      <QueryClientProvider client={queryClient}>

        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
};

// {
//   process.env.NODE_ENV === "development" && (
//     <ReactQueryDevtools initialIsOpen={false} />
//   )
// }