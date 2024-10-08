import moment from "moment"

import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { ReactElement } from "react"

import yt, { PlaylistDetails } from "@/services/youtube"

import Videos from "@/components/videos"

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
  let pageEnd = false
  while (!pageEnd) {
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
      pageEnd = true
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

export const generateMetadata = async ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> => {
  const pd = await getPlaylistDetails(searchParams.id as string)
  return {
    title: pd?.title,
    description: `Know the watch time of the playlist - ${pd?.title}`,
  }
}

const Page = async ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<ReactElement> => {
  const pd = await getPlaylistDetails(searchParams.id as string)
  const videoIds = pd?.videos.map(video => video.snippet?.resourceId?.videoId)
  const videosDuration = await getVideosDuration(videoIds as string[])
  const hrFormattedDuration = videosDuration.map(vd => moment.duration(vd).asSeconds())
  return (
    <main className="flex flex-col">
      <div className="min-h-screen bg-gray-100 my-10 px-8 overflow-y-auto">
        <div className="flex flex-col max-w-3xl mx-auto">
          <Link href="/" className="flex items-center self-start mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />Go back to search
          </Link>
          <Videos pId={searchParams.id as string} pd={pd as PlaylistDetails} fd={hrFormattedDuration} />
        </div>
      </div>
    </main>
  )
}

export default Page
