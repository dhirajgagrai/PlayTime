import { type ClassValue, clsx } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const formatHrToDuration = (dHours: number, strictCheck: boolean = true): string => {
  if (strictCheck && !dHours) {
    return "NA"
  }
  const d = moment.duration(dHours, "hours")
  if (dHours > 1) {
    return `${d.hours()}h ${d.minutes()}m ${d.seconds()}s`
  } else {
    return `${d.minutes()}m ${d.seconds()}s`
  }
}
