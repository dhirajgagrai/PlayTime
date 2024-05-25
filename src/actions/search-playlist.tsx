"use server"

import { RedirectType, redirect } from "next/navigation"

const searchPlaylist = async (formData: FormData): Promise<RedirectType | undefined> => {
  const q = formData.get("q") as string
  if (q) {
    return redirect(`/search?q=${q}`)
  }
}

export default searchPlaylist
