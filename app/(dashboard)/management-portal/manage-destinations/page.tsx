import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ManageDestinationsClient from "@/components/other/ManageDestinations"

export default async function ManageDestinationsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }

  return <ManageDestinationsClient />
}