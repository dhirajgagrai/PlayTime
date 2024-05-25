import { ReactElement } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import PlayTime from "@/components/playtime"
import Search from "@/components/search"

import yt, { PlaylistOverview } from "@/services/youtube"

const filterPlaylistId = (params : { [key: string]: string | string[] | undefined }) => {
  if (params.list) {
    return params.list
  } else if (params.q) {
    const searchString = (params.q as string).substring(params.q.indexOf("?"))
    const p = new URLSearchParams(searchString)
    const list = p.get("list")
    if (list) {
      return list
    } else {
      return searchString
    }
  }
}

const getPlaylistOverview = async (id: string) => {
  const playlistOverview = {} as PlaylistOverview
  const resPlaylist = await yt.playlists.list({
    id: [id],
    part: ["snippet"],
  })

  if (resPlaylist.data.items && resPlaylist.data.items.length) {
    const playlist = resPlaylist.data.items[0].snippet
    playlistOverview.title = playlist?.title
    playlistOverview.channel = playlist?.channelTitle
  } else {
    return null
  }

  const resItems = await yt.playlistItems.list({
    playlistId: id,
    part: ["snippet"],
  })

  if (resItems && resItems.data.pageInfo) {
    playlistOverview.videoCount = resItems.data.pageInfo.totalResults
  }

  return playlistOverview
}

const Page = async ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<ReactElement> => {
  const id = filterPlaylistId(searchParams)
  const playlist = await getPlaylistOverview(id as string)
  return (
    <main className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mt-40 max-w-2xl w-full px-4 md:px-6">
        <div className="space-y-4 text-center">
          <PlayTime />
        </div>
        <Search value={searchParams.q as string} />
        <div className="mt-8">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Playlist Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Playlist</h3>
                  <p className="text-gray-500 dark:text-gray-400">{playlist?.title}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Video Count</h3>
                  <p className="text-gray-500 dark:text-gray-400">{playlist?.videoCount}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Channel</h3>
                  <p className="text-gray-500 dark:text-gray-400">{playlist?.channel}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={`/playlist?id=${id}`}>
                <Button className="mr-2" variant="outline">View Playlist</Button>
              </Link>
              <Button className="mr-2" variant="outline">Download Playlist</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Page
