import { FC, ReactElement } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import Link from "next/link"

const Page: FC = (): ReactElement => (
  <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="max-w-2xl w-full px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">PlayTime</h1>
      </div>
      <div className="mt-8 flex items-center space-x-4">
        <Input
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary"
          placeholder="Paste YouTube playlist URL or ID"
          type="text"
        />
        <Button className="rounded-md bg-primary px-6 py-2 text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-primary dark:hover:bg-primary/90 dark:focus:ring-primary/50">
            Search
        </Button>
      </div>
      <div className="mt-8">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Playlist Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium">Title</h3>
                <p className="text-gray-500 dark:text-gray-400">Vercel Playlist: Introducing the Frontend Cloud</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Video Count</h3>
                <p className="text-gray-500 dark:text-gray-400">24</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Total Duration</h3>
                <p className="text-gray-500 dark:text-gray-400">2 hours 15 minutes</p>
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

export default Page
