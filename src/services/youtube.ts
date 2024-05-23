import { youtube_v3 } from "@googleapis/youtube"

const yt = new youtube_v3.Youtube({ auth: process.env.YT_API_KEY })

export default yt
