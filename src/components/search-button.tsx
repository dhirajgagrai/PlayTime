"use client"

import { ReactElement } from "react"
import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const LoadingSpinner = ({
  size = 24,
  className,
  ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

const SearchButton = (): ReactElement => {
  const { pending } = useFormStatus()
  return (
    <Button
      className="w-24 rounded-md bg-primary px-6 py-2 text-white shadow-sm transition-colors hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90"
      type="submit"
    >{pending ? <LoadingSpinner /> : `Search`}</Button>
  )
}

export default SearchButton
