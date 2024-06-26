import { ReactElement } from "react"

import searchPlaylist from "@/actions/search-playlist"

import { Input } from "@/components/ui/input"
import SearchButton from "@/components/search-button"

const Search = (): ReactElement => {
  return (
    <form action={searchPlaylist} className="flex items-center">
      <Input
        className="mr-4 flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
        placeholder="Paste YouTube playlist URL or ID"
        type="text"
        name="q"
        autoComplete="off"
      />
      <SearchButton />
    </form>
  )
}
  
export default Search
