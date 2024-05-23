import { FC, ReactElement } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlayTimeText } from "@/components/playtime-text"

import { redirect } from "next/navigation"

const searchPlaylist = async (formData: FormData) => {
  "use server"
  const q = formData.get("q") as string
  if (q) {
    return redirect(`/search?q=${q}`)
  }
}

const Page: FC = (): ReactElement => (
  <main className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="mt-40 max-w-2xl w-full px-4 md:px-6">
      <div className="space-y-4 text-center">
        <PlayTimeText />
      </div>
      <form action={searchPlaylist} className="mt-8 flex items-center space-x-4">
        <Input
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary"
          placeholder="Paste YouTube playlist URL or ID"
          type="text"
          name="q"
          autoComplete="off"
        />
        <Button
          className="rounded-md bg-primary px-6 py-2 text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-primary/50"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  </main>
)

export default Page
