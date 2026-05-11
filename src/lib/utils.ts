import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const BASE_URL = import.meta.env.BASE_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTextUrl({ count, type }: { count: number; type: string }) {
  return `${BASE_URL}text/${type}/${count}`
}

export function getPhotoUrl({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return `${BASE_URL}photos/${width}/${height}`
}
