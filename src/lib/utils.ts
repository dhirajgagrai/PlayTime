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
    return `${d.hours()}h ${d.minutes()}m ${d.seconds()}s`
  } else {
    return `${d.minutes()}m ${d.seconds()}s`
  }
}
