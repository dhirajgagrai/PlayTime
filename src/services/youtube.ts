import { youtube_v3 } from "@googleapis/youtube"

export interface PlaylistDetails {
  title: string | null | undefined
  videoCount: number | null | undefined
  videos: youtube_v3.Schema$PlaylistItem[]
}

export interface PlaylistOverview {
  title: string | null | undefined
  channel: string | null | undefined
  videoCount: number | null | undefined
}

const yt = new youtube_v3.Youtube({ auth: process.env.YT_API_KEY })

export default yt
