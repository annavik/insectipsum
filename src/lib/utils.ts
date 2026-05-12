import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL } from "./constants"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getTextUrl = ({ count, type }: { count: number; type: string }) =>
  `${API_URL}text/${type}/${count}`

export const getPhotoUrl = ({
  width,
  height,
}: {
  width: number
  height: number
}) => `${API_URL}photos/${width}/${height}`
