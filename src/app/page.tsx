import { FC, ReactElement } from "react"

import PlayTimeText from "@/components/playtime-text"
import PlaylistSearch from "@/components/playlist-search"

const Page: FC = (): ReactElement => (
  <main className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="mt-40 max-w-2xl w-full px-4 md:px-6">
      <div className="space-y-4 text-center">
        <PlayTimeText />
      </div>
      <PlaylistSearch />
    </div>
  </main>
)

export default Page
