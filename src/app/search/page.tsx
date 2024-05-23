import { FC, ReactElement } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { PlayTimeText } from "@/components/playtime-text"

import Link from "next/link"

import yt from "@/services/youtube"

interface PlaylistDetails {
  title: string | null | undefined
  channel: string | null | undefined
  videoCount: number | null | undefined
}

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

const getPlaylistDetails = async (id: string) => {
  const playlistDetails = {} as PlaylistDetails
  const resPlaylist = await yt.playlists.list({ id: [id], part: ["snippet"] })
  if (resPlaylist.data.items && resPlaylist.data.items.length > 0) {
    const playlist = resPlaylist.data.items[0].snippet
    playlistDetails["title"] = playlist?.title
    playlistDetails["channel"] = playlist?.channelTitle
  } else {
    return null
  }

  const resItems = await yt.playlistItems.list({ playlistId: id, part: ["snippet"] })
  if (resItems && resItems.data.pageInfo) {
    playlistDetails["videoCount"] = resItems.data.pageInfo.totalResults
  }

  return playlistDetails
}

const Page = async ({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<ReactElement> => {
  const id = filterPlaylistId(searchParams)
  const playlist = await getPlaylistDetails(id as string)
  return (
    <main className="flex flex-col items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mt-40 max-w-2xl w-full px-4 md:px-6">
        <div className="space-y-4 text-center">
          <PlayTimeText />
        </div>
        <div className="mt-8 flex items-center space-x-4">
          <Input
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary"
            placeholder="YouTube playlist URL or ID"
            type="text"
            defaultValue={searchParams.url}
          />
          <Button className="rounded-md bg-primary px-6 py-2 text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-primary/50">
            Search
          </Button>
        </div>
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
              <Link href="/playlist">
                <Button className="mr-2" variant="outline">
                View Playlist
                </Button>
              </Link>
              <Button className="mr-2" variant="outline">
                Download Playlist
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Page
