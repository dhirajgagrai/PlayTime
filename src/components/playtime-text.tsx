import { FC, ReactElement } from "react"

import Link from "next/link"

const PlayTimeText: FC = (): ReactElement => (
  <Link href="/">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">PlayTime</h1>
  </Link>
)

export { PlayTimeText }
