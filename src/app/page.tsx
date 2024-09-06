import { ReactElement } from "react"

import Logo from "@/components/logo"
import Search from "@/components/search"
import Social from "@/components/social"

const Page = (): ReactElement => (
  <main className="flex flex-col items-center justify-between h-dvh">
    <div className="mt-10 md:mt-20 max-w-2xl w-full px-4 md:px-6">
      <Logo />
      <Search />
    </div>
    <Social />
  </main>
)

export default Page
