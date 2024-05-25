import { ReactElement } from "react"
import { useFormStatus } from "react-dom"

import searchPlaylist from "@/actions/search-playlist"

import { Input } from "@/components/ui/input"
import SearchButton from "@/components/search-button"

const Search = (props: { value?: string }): ReactElement => {
  return (
    <form action={searchPlaylist} className="mt-8 flex items-center">
      <Input
        className="mr-4 flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-primary"
        placeholder="Paste YouTube playlist URL or ID"
        type="text"
        name="q"
        autoComplete="off"
        defaultValue={props.value}
      />
      <SearchButton />
    </form>
  )
}
  
export default Search
