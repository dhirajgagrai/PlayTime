import { ReactElement } from "react"
import moment from "moment"

import { CheckIcon, TrashIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

import yt, { PlaylistDetails } from "@/services/youtube"

const getPlaylistDetails = async (id: string): Promise<PlaylistDetails | null> => {
  const playlistDetails = {} as PlaylistDetails
  const resPlaylist = await yt.playlists.list({
    id: [id],
    part: ["snippet"],
  })

  if (resPlaylist.data.items && resPlaylist.data.items.length) {
    const playlist = resPlaylist.data.items[0].snippet
    playlistDetails.title = playlist?.title
  } else {
    return null
  }

  let pageToken = ""
  while (true) {
    const resItems = await yt.playlistItems.list({
      playlistId: id,
      maxResults: 50,
      pageToken,
      part: ["snippet", "status"],
    })

    if (resItems.data.pageInfo) {
      playlistDetails.videoCount = resItems.data.pageInfo.totalResults
    }

    if (resItems && resItems.data.items) {
      if (!playlistDetails.videos) {
        playlistDetails.videos = resItems.data.items
      } else {
        playlistDetails.videos.push(...resItems.data.items)
      }
    }

    if (resItems.data.nextPageToken) {
      pageToken = resItems.data.nextPageToken
    } else {
      break
    }
  }
  playlistDetails.videos = playlistDetails.videos.filter(video => video.status?.privacyStatus != "private")

  return playlistDetails
}

const getVideosDuration = async (ids: string[]): Promise<(string | null | undefined)[]> => {
  const duration = []

  while (ids.length) {
    const tempIds = ids.splice(0, 50)
    const videosDetails = await yt.videos.list({
      id: tempIds,
      part: ["contentDetails"],
    })

    if (videosDetails.data.items?.length) {
      const temp_duration = videosDetails.data.items.map(item => item.contentDetails?.duration)
      duration.push(...temp_duration)
    }
  }

  return duration
}

const formatMomentDuration = (d: moment.Duration): string => {
  if (!d) {
    return "NA"
  }
  if (d.asHours() > 1) {
    const hourDuration = d.asHours()
    const duration = new Date(0,0)
    duration.setSeconds(+hourDuration * 60 * 60)
    return `${duration.getHours()}h ${duration.getMinutes()}m ${duration.getSeconds()}s`
  }else {
    return `${d.minutes()}m ${d.seconds()}s`
  }
}

export const generateMetadata =  async ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> => {
  const pd = await getPlaylistDetails(searchParams.id as string)
  return {
    title: pd?.title,
    description: "Bye",
  }
}

const Page = async ({ searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }): Promise<ReactElement> => {
  const pd = await getPlaylistDetails(searchParams.id as string)
  const videoIds = pd?.videos.map(video => video.snippet?.resourceId?.videoId)
  const videosDuration = await getVideosDuration(videoIds as string[])
  const formattedDuration = videosDuration.map(vd => moment.duration(vd))
  const totalDuration = formattedDuration.reduce(
    (prev, curr) => prev.add(curr),
    moment.duration(0)
  )
  const unavailableVideoCount = (pd?.videoCount as number) - (pd?.videos.length as number)
  return (
    <main className="flex flex-col">
      <div className="min-h-screen bg-gray-100 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-3">
            <div>
              <Link href={`https://www.youtube.com/playlist?list=${searchParams.id}`} target="_blank" className="hover:underline">
                <div className="text-2xl font-bold mr-10">{pd?.title}</div>
              </Link>
              <div className="text-gray-500">Total videos: {pd?.videos.length} {Boolean(unavailableVideoCount) && `(${unavailableVideoCount} unavailable)`}</div>
              <div className="flex gap-2 mt-4 items-center">
                <Button className="text-gray-400 hover:text-gray-900 w-auto" size="icon" variant="ghost">
                  <TrashIcon className="h-4 w-4 mr-1" /> Delete
                </Button>
                <Separator className="h-5 bg-gray-400" orientation="vertical" />
                <Button className="text-gray-400 hover:text-gray-900 w-auto" size="icon" variant="ghost">
                  <CheckIcon className="h-4 w-4 mr-1" />Watched
                </Button>
              </div>
            </div>
            <div className="text-4xl font-bold">
              <span>0</span>
              <span className="text-2xl"> / </span>
              <span>
                {formatMomentDuration(totalDuration)}
              </span>
            </div>
          </div>
          <Progress className="mb-5" value={50} />
          <div className="space-y-4">
            {
              pd?.videos.map((video, i) => (
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
                      {formatMomentDuration(formattedDuration[i])}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page
