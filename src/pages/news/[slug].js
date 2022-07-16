import { getArticleBySlug, getSlugs } from "../../utils/fetch"

export async function getStaticPaths() {
  const paths = await getSlugs("posts")

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const post = await getArticleBySlug(params.slug)

  return {
    props: {
      post,
    },
    revalidate: 10, // seconds
  }
}

export default function Article({ post }) {
  return (
    <div className="p-article">
      <h1 className="text-center pb-5">{post.title.rendered}</h1>
    </div>
  )
}
