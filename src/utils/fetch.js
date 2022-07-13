import { WP_REST } from "./url"

export async function fetchMenuItems() {
  const src = await fetch(`${WP_REST}/menu`)
  const resp = await src.json()
  return resp
}

export async function fetchSinglePage(id) {
  const src = await fetch(`${WP_REST}/pages/${id}`)
  const resp = await src.json()
  return resp
}