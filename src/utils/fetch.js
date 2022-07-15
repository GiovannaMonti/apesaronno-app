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

export async function fetchEvents() {
  const src = await fetch(`${WP_REST}/eventi/`)
  const resp = await src.json()
  return resp
}

export async function fetchArticles() {
  const src = await fetch(`${WP_REST}/posts/`)
  const resp = await src.json()
  return resp
}
