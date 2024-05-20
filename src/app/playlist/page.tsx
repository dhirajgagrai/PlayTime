import { FC, ReactElement } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckIcon, TrashIcon } from "lucide-react"

const Page: FC = (): ReactElement => (
  <main className="flex flex-col h-screen">
    <div className="bg-gray-100 p-8 overflow-y-auto h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-3">
          <div>
            <div className="text-2xl font-bold">Playlist Name</div>
            <div className="text-gray-500">Total videos: 20</div>
            <div className="flex gap-2 mt-4">
              <Button className="text-gray-400 hover:text-gray-900 w-auto" size="icon" variant="ghost">
                  Delete
              </Button>
              <Button className="text-gray-400 hover:text-gray-900 w-auto" size="icon" variant="ghost">
                  Watched
              </Button>
            </div>
          </div>
          <div className="text-4xl font-bold">
            <span>12h</span>
            <span className="text-2xl">/</span>
            <span>24h</span>
          </div>
        </div>
        <Progress className="mb-6" value={50} />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox id="video-1" />
              <div>
                <div className="font-medium">Video Title</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Mark as watched</span>
              </Button>
              <div className="text-gray-500">3h 30m</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox id="video-2" />
              <div>
                <div className="font-medium">Video Title</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Mark as watched</span>
              </Button>
              <div className="text-gray-500">3h 30m</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox id="video-3" />
              <div>
                <div className="font-medium">Video Title</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button className="text-gray-400 hover:text-gray-900" size="icon" variant="ghost">
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Mark as watched</span>
              </Button>
              <div className="text-gray-500">3h 30m</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
)

export default Page
