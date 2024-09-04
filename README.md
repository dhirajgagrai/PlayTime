# PlayTime

This app calculates the total watch time of YouTube playlists, with additional features to remove videos and check the duration of the watched videos.

## Getting Started

This project uses [pnpm](https://pnpm.io/) for package management.

- Clone this repository.
- Get API key for [YouTube Data API v3](https://console.cloud.google.com/marketplace/product/google/youtube.googleapis.com).
- Create `.env.local` file and set the API key from above for `YT_API_KEY`.

```
YT_API_KEY=your_api_key
```

Refer to this for getting API key: [developers.google.com/youtube/v3/getting-started#intro](https://developers.google.com/youtube/v3/getting-started#intro)

- Install packages and run development server:

```bash
pnpm install
pnpm dev
```

## License (MIT)

See [./LICENSE](./LICENSE) for the full license.
