import { WP_REST } from "./url"

export async function fetchMenuItems() {
  const src = await fetch(WP_REST + "/menu")
  const resp = await src.json()
  return resp
}
