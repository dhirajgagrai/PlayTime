import { ReactElement } from "react"

import PlayTime from "@/components/playtime"
import Search from "@/components/search"

const Page = (): ReactElement => (
  <main className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="mt-40 max-w-2xl w-full px-4 md:px-6">
      <div className="space-y-4 text-center">
        <PlayTime />
      </div>
      <Search />
    </div>
  </main>
)

export default Page
