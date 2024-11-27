import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";

export const Route = createFileRoute("/signin/")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignIn />
    </div>
  );
}
