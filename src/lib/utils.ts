import { type ClassValue, clsx } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatHrToDuration = (dHours: number): string => {
  if (!dHours) {
    return "NA"
  }
  if (dHours > 1) {
    const d = new Date(0, 0)
    d.setSeconds(+dHours * 60 * 60)
    return `${d.getHours()}h ${d.getMinutes()}m ${d.getSeconds()}s`
  } else {
    const d = moment.duration(dHours, "hours")
    return `${d.minutes()}m ${d.seconds()}s`
  }
}
