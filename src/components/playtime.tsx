import Link from "next/link"
import { ReactElement } from "react"

const PlayTime = (): ReactElement => (
  <Link href="/">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">PlayTime</h1>
  </Link>
)

export default PlayTime
