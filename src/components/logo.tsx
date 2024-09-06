import Image from "next/image"
import Link from "next/link"
import { ReactElement } from "react"

const Logo = (): ReactElement => (
  <Link className="flex justify-center items-center" href="/">
    <Image className="mr-2 h-fit" src="/icon.png" alt="TubeTime logo" width={25} height={25} />
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">TubeTime</h1>
  </Link>
)

export default Logo
