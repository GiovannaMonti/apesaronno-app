import Head from "next/head"
import sanitizeHtml from "sanitize-html"

import { Menu } from "../../components/molecules/Menu"
import { Footer } from "../../components/organisms/Footer"

import { formatDate } from "../../utils/date"
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
  console.log("post: ", post)

  const blocks = post.blocks

  const paragraphs = blocks?.filter(
    (block) => block.blockName === "core/paragraph"
  )

  const headings = blocks?.filter((block) => block.blockName === "core/heading")

  return (
    <>
      <Menu />
      <div className="p-article">
        <Head>
          <title>{post.title.rendered} | A.P.E. Saronno</title>
          <meta
            name="description"
            content="Associazione proprietà edilizia. Da oltre 40 anni al fianco dei piccoli proprietari di casa."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>{post.title.rendered}</h1>

          <section className="m-article-content-wrapper">
            <span className="a-publish-date link">{formatDate(post.date)}</span>

            <div className="m-article-content">
              {blocks &&
                blocks.map((block, index) => {
                  if (block.blockName === "core/paragraph")
                    return <p key={index}>{block.attrs.content}</p>
                  else if (block.blockName === "core/heading")
                    return (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(block.rendered),
                        }}
                      ></div>
                    )
                  return null
                })}
            </div>
          </section>
          {}
        </main>

        <Footer page={post} />
      </div>
    </>
  )
}
