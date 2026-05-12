import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_authed/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/_authed/onboarding/"!</div>
}
