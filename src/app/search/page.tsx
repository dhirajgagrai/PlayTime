import Link from "next/link"
import { ReactElement } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import Logo from "@/components/logo"
import Search from "@/components/search"
import Social from "@/components/social"

import yt, { PlaylistOverview } from "@/services/youtube"

const YT_URLS = [
  "https://www.youtube.com/",
  "https://youtube.com/",
  "http://www.youtube.com/",
  "http://youtube.com/",
  "www.youtube.com/",
  "youtube.com/",
]

const filterPlaylistId = (params: { [key: string]: string | undefined }): string => {
  const validURL = YT_URLS.some((url) => params.q?.startsWith(url))
  if (validURL) {
    if (params.list) {
      return params.list as string
    } else if (params.q) {
      const searchString = (params.q as string).substring(params.q.indexOf("?"))
      const list = new URLSearchParams(searchString).get("list")
      return list as string
    }
  } else if (!(params.q?.startsWith("http://") || params.q?.startsWith("https://"))) {
    return params.q as string
  }

  return ""
}

const getPlaylistOverview = async (id: string): Promise<PlaylistOverview | null> => {
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
  searchParams: { [key: string]: string | undefined };
}): Promise<ReactElement> => {
  const id = filterPlaylistId(searchParams)
  const playlist = id ? await getPlaylistOverview(id) : null
  return (
    <main className="flex flex-col items-center justify-between h-dvh">
      <div className="mt-10 md:mt-20 max-w-2xl w-full px-4 md:px-6">
        <Logo />
        <Search />
        <div className="my-8">
          {
            playlist != null ?
              <Card className="p-1">
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
                <CardFooter className="flex justify-center md:justify-end">
                  <Link href={`/playlist?id=${id}`} target="_blank">
                    <Button className="mr-2" variant="outline">View Playlist</Button>
                  </Link>
                </CardFooter>
              </Card>
              :
              <Alert>
                <AlertTitle>Not Found</AlertTitle>
                <AlertDescription>
                  URL or ID provided for the playlist is invalid.
                </AlertDescription>
              </Alert>
          }
        </div>
      </div>
      <Social />
    </main>
  )
}

export default Page
