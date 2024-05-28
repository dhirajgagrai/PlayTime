"use client"

import { CheckIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { ReactElement } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PlaylistDetails } from "@/services/youtube"

import { formatHrToDuration } from "@/lib/utils"

const Videos = (props: { pd: PlaylistDetails, fd: number[] }): ReactElement => {
  return (
    <div className="space-y-4">
      {
        props.pd?.videos.map((video, i) => (
          <div className="flex items-center justify-between" key={`video-div-${i}`}>
            <div className="flex items-center gap-4 max-w-xl">
              <Checkbox id={`video-${i}`} />
              <Link href={`https://www.youtube.com/watch?v=${video.snippet?.resourceId?.videoId}`} target="_blank" className="hover:underline">
                <div className="font-medium">{video.snippet?.title}</div>
              </Link>
            </div>
            <div className="flex basis-48 items-center gap-2">
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Watched</span>
              </Button>
              <div className="basis-28 text-gray-500">
                {formatHrToDuration(props.fd[i])}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
  
export default Videos
