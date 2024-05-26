import { ReactElement } from "react"

import Link from "next/link"
import Image from "next/image"

import { Separator } from "./ui/separator"

const Social = (): ReactElement => (
  <div className="flex items-center absolute bottom-2">
    <Link className="flex items-center hover:underline" href="https://github.com/dhirajgagrai/PlayTime" target="_blank">
      <Image className="mr-2" src="/github.png" alt="GitHub logo" width={20} height={20} />repo
    </Link>
    <Separator className="h-5 bg-gray-900 mx-2" orientation="vertical" />
    <p>
      made by <Link className="hover:underline" href="https://dhirajgagrai.dev" target="_blank">dhirajgagrai.dev</Link>
    </p>
  </div>
)

export default Social
