import Head from "next/head"
import { useState, useEffect } from "react"

import { Menu } from "../components/molecules/Menu"
import { ArticleCard } from "../components/molecules/ArticleCard"
import { Footer } from "../components/organisms/Footer"

import { fetchSinglePage, fetchArticles } from "../utils/fetch"

export async function getStaticProps() {
  const page = await fetchSinglePage(189)

  return {
    props: {
      page,
    },
  }
}

export default function News({ page }) {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    ;(async function () {
      const articleList = await fetchArticles()

      setArticles(articleList)
    })()
  }, [])

  const isArticlesListEmpty = articles?.length === 0

  console.log("page: ", page)
  return (
    <>
      <Menu />
      <div className="p-news">
        <Head>
          <title>{page.title.rendered} | A.P.E. Saronno</title>
          <meta
            name="description"
            content="Associazione proprietà edilizia. Da oltre 40 anni al fianco dei piccoli proprietari di casa."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>{page.title.rendered}</h1>

          <section className="o-article-section">
            {!isArticlesListEmpty && (
              <div className="m-articles">
                {articles?.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </section>
        </main>

        <Footer page={page} />
      </div>
    </>
  )
}
