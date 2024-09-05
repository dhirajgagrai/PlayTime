import { ReactElement } from "react"

import PlayTime from "@/components/playtime"
import Search from "@/components/search"
import Social from "@/components/social"

const Page = (): ReactElement => (
  <main className="flex flex-col items-center justify-between h-dvh">
    <div className="mt-10 md:mt-40 max-w-2xl w-full px-4 md:px-6">
      <div className="mb-4 text-center">
        <PlayTime />
      </div>
      <Search />
    </div>
    <Social />
  </main>
)

export default Page
