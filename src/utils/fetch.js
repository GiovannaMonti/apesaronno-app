import { WP_REST } from "./url"

// Set custom user agent to avoid 403 Forbidden error on fetch
const headers = new Headers({
  "User-Agent": "Mozilla/5.0",
})

export async function fetchMenuItems() {
  const src = await fetch(`${WP_REST}/menu`, { headers: headers })
  const resp = await src.json()
  return resp
}

export async function fetchPages() {
  const src = await fetch(`${WP_REST}/pages/`, { headers: headers })
  const resp = await src.json()
  return [...resp]
}

export async function fetchSinglePage(id) {
  const src = await fetch(`${WP_REST}/pages/${id}`, { headers: headers })
  const resp = await src.json()
  return resp
}

export async function fetchEvents() {
  const src = await fetch(`${WP_REST}/eventi/?per_page=15`, {
    headers: headers,
  })
  const resp = await src.json()
  return resp
}

export async function fetchArticles() {
  const src = await fetch(`${WP_REST}/posts/?per_page=15`, { headers: headers })
  const resp = await src.json()
  return resp
}

export async function getArticleBySlug(slug) {
  const posts = await fetchArticles()
  const postArray = posts.filter((post) => post.slug == slug)
  const post = postArray.length > 0 ? postArray[0] : null
  return post
}

export async function getPageBySlug(slug) {
  const pages = await fetchPages()
  const pagesArray = pages.filter((page) => page.slug == slug)
  const page = pagesArray.length > 0 ? pagesArray[0] : null
  return page
}

export async function getSlugs(type) {
  let elements = []
  switch (type) {
    case "posts":
      elements = await fetchArticles()
      break
    case "pages":
      elements = await fetchPages()
      break
  }
  const elementsIds = elements.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    }
  })
  return elementsIds
}
