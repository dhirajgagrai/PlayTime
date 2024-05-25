import { ReactElement } from "react"
import { RedirectType, redirect } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const searchPlaylist = async (formData: FormData): Promise<RedirectType | undefined> => {
  "use server"
  const q = formData.get("q") as string
  if (q) {
    return redirect(`/search?q=${q}`)
  }
}
  
const PlaylistSearch = (props: { value?: string }): ReactElement => (
  <form action={searchPlaylist} className="mt-8 flex items-center space-x-4">
    <Input
      className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary"
      placeholder="Paste YouTube playlist URL or ID"
      type="text"
      name="q"
      autoComplete="off"
      defaultValue={props.value}
    />
    <Button
      className="rounded-md bg-primary px-6 py-2 text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-primary/50"
      type="submit"
    >
        Search
    </Button>
  </form>
)

export default PlaylistSearch
