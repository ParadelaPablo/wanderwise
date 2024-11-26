import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

export const Route = createFileRoute('/')({
  component: SignInPage,
})

function SignInPage() {
  return <SignIn />;
}
