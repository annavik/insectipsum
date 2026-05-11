import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = import.meta.env.VITE_API_URL ?? "/"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTextUrl({ count, type }: { count: number; type: string }) {
  return `${API_URL}text/${type}/${count}`
}

export function getPhotoUrl({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return `${API_URL}photos/${width}/${height}`
}
