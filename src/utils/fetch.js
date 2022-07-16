import { WP_REST } from "./url"

export async function fetchMenuItems() {
  const src = await fetch(`${WP_REST}/menu`)
  const resp = await src.json()
  return resp
}

export async function fetchPages() {
  const src = await fetch(`${WP_REST}/pages/`)
  const resp = await src.json()
  return [...resp]
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
  const src = await fetch(`${WP_REST}/posts/?per_page=15`)
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
