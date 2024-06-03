import { type ClassValue, clsx } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const formatSecToDuration = (dSecs: number, strictCheck: boolean = true): string => {
  if (strictCheck && !dSecs) {
    return "NA"
  }
  const d = moment.duration(dSecs, "seconds")
  if (dSecs > 3600) {
    const hrs = d.months() * 31 + d.days() * 24 + d.hours()
    if (hrs >= 10) {
      return `${hrs}h ${d.minutes()}m`
    }
    return `${hrs}h ${d.minutes()}m ${d.seconds()}s`
  }
  return `${d.minutes()}m ${d.seconds()}s`
}
