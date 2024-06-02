"use client"

import { CheckIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { ReactElement, useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PlaylistDetails } from "@/services/youtube"

import { formatSecToDuration } from "@/lib/utils"

// TODO: Refactor for handling multiple states using videos state
const Videos = (props: { pId:string, pd: PlaylistDetails, fd: number[] }): ReactElement => {
  const [videos, setVideos] = useState(props.pd.videos)
  const [totalDuration, setTotalDuration] = useState(props.fd.reduce((prev, curr) => prev + curr, 0))
  const [watchedDuration, setWatchedDuration] = useState(0)
  const [watched, setWatched] = useState<string[]>([])
  const [checkedVideos, setCheckedVideos] = useState<{
    duration: number
    id: string
    index: number
  }[]>([])
  const [checked, setChecked] = useState<boolean[]>(new Array(videos.length).fill(false))

  const unavailableVideoCount = (props.pd?.videoCount as number) - (props.pd?.videos.length as number)
  const progress = totalDuration ? Math.round(watchedDuration / totalDuration * 100) : 0

  const isChecked = (id: string): boolean => watched.some(element => element === id)

  const handleDelete = (duration: number, id: string, index: number): void => {
    if (watched.some(element => element === id)) {
      setWatchedDuration(watchedDuration - duration)
    }
    setTotalDuration(totalDuration - duration)
    setVideos(videos.filter(element => element.id !== id))
    props.fd.splice(index, 1)
  }

  const handleMultiDelete = () => {
    const watchedVideos = checkedVideos.filter(element => watched.some(wElement => wElement === element.id))
    const netWatchedDuration = watchedVideos.reduce((acc, curr) => acc + curr.duration, 0)
    const netDeleteDuration = checkedVideos.reduce((acc, curr) => acc + curr.duration, 0)
    const indexes = checkedVideos.map(element => element.index).sort()

    setWatchedDuration(watchedDuration - netWatchedDuration)
    setTotalDuration(totalDuration - netDeleteDuration)
    /**
     * Filters videos that are in the indexes and returns rest of the videos.
     * indexes.indexOf(i) returns -1 for all i that are not in indexes.
     * However, if i is in indexes it gets filtered out as indexOf(i) returns non-negative value.
     *  */
    setVideos(videos.filter((_, i) => indexes.indexOf(i) === -1))
    setCheckedVideos([])
    setChecked(new Array(videos.length).fill(false))
    while (indexes.length) {
      props.fd.splice(indexes.pop() as number, 1)
    }
  }

  const handleWatched = (duration: number, id: string): void => {
    if (watched.some(element => element === id)) {
      setWatchedDuration(watchedDuration - duration)
      setWatched(watched.filter(element => element !== id))
    } else {
      setWatchedDuration(watchedDuration + duration)
      setWatched([...watched, id])
    }
  }

  const handleMultiWatched = () => {
    const unwatchedVideos = checkedVideos.filter(element => !watched.some(wElement => wElement === element.id))
    const ids = unwatchedVideos.map(element => element.id)
    const netUnwatchedDuration = unwatchedVideos.reduce((acc ,curr) => acc + curr.duration, 0)

    setWatchedDuration(watchedDuration + netUnwatchedDuration)
    setWatched([...watched, ...ids])
    setCheckedVideos([])
    setChecked(new Array(videos.length).fill(false))
  }

  const handleCheck = (duration: number, id: string, index: number): void => {
    if (checkedVideos.some(element => element.id === id)) {
      setCheckedVideos(checkedVideos.filter(element => element.id !== id))
    } else {
      setCheckedVideos([...checkedVideos, { duration, id, index }])
    }
    setChecked(checked.with(index, !checked[index]))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between mb-2">
        <div>
          <Link href={`https://www.youtube.com/playlist?list=${props.pId}`} target="_blank" className="hover:underline">
            <div className="text-2xl font-bold mr-10">{props.pd?.title}</div>
          </Link>
          <div className="text-gray-500">
            Total videos: {videos.length} {Boolean(unavailableVideoCount) && `(${unavailableVideoCount} unavailable)`}
          </div>
          <div className="flex gap-2 mt-4 items-center">
            <Button
              className="text-gray-400 hover:text-gray-900 w-auto" size="icon" variant="ghost"
              onClick={handleMultiDelete}
            >
              <TrashIcon className="h-4 w-4 mr-1" /> Delete
            </Button>
            <Separator className="h-5 bg-gray-400" orientation="vertical" />
            <Button
              className="text-gray-400 hover:text-gray-900 w-auto" size="icon" variant="ghost"
              onClick={handleMultiWatched}
            >
              <CheckIcon className="h-4 w-4 mr-1" />Watched
            </Button>
          </div>
        </div>
        {
          Boolean(totalDuration) &&
          <div className="flex">
            <div className="text-2xl font-bold">
              <span>
                {formatSecToDuration(watchedDuration, false)}&nbsp;
              </span>
            </div>
            <div className="text-3xl font-bold">
              <span>
                  / {formatSecToDuration(totalDuration)}
              </span>
            </div>
          </div>
        }
      </div>
      <div className="flex items-center justify-between mb-5 text-sm font-bold">
        <Progress className="w-11/12" value={progress} />
        <span>{progress}%</span>
      </div>
      <div className="space-y-4">
        {
          videos.map((video, i) => (
            <div className="flex items-center justify-between" key={`video-div-${i}`}>
              <div className="flex items-center gap-4 max-w-xl">
                <Checkbox
                  checked={checked[i]}
                  onClick={() => handleCheck(props.fd[i], video.id as string, i)}
                />
                <Link href={`https://www.youtube.com/watch?v=${video.snippet?.resourceId?.videoId}`} target="_blank" className="hover:underline">
                  <div className="font-medium">{video.snippet?.title}</div>
                </Link>
              </div>
              <div className="flex basis-48 items-center gap-2">
                <Button
                  className="text-gray-300 hover:text-gray-900" size="icon" variant="ghost"
                  onClick={() => handleDelete(props.fd[i], video.id as string, i)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
                <Button
                  className={isChecked(video.id as string) ? "text-gray-900 hover:text-green-500" : "text-gray-300 hover:text-gray-900"}
                  size="icon" variant="ghost"
                  onClick={() => handleWatched(props.fd[i], video.id as string)}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="sr-only">Watched</span>
                </Button>
                <div className="basis-28 text-gray-500">
                  {formatSecToDuration(props.fd[i])}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
  
export default Videos
