import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL } from "./constants"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getTextUrl = ({ count, type }: { count: number; type: string }) =>
  `${API_URL}text/${type}/${count}`

export const getPhotoUrl = ({
  width,
  height,
  imageId,
}: {
  width: number
  height: number
  imageId: number
}) => {
  const baseUrl = `${API_URL}photos/${width}/${height}`

  return imageId > 0 ? `${baseUrl}?image_id=${imageId}` : baseUrl
}
