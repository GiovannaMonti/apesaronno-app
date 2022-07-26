import Head from "next/head"
import { useState, useEffect } from "react"

import { Menu } from "../components/molecules/Menu"
import { ArticleCard } from "../components/molecules/ArticleCard"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"

import { fetchSinglePage, fetchArticles } from "../utils/fetch"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(189),
    },
    revalidate: 10,
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
          <h1 data-aos="fade">{page.title.rendered}</h1>

          <section className="o-article-section">
            {!isArticlesListEmpty && (
              <div className="m-articles">
                {articles?.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
            {isArticlesListEmpty && (
              <div className="a-no-articles">
                <p className="link">Al momento non ci sono articoli.</p>
              </div>
            )}
          </section>

          <NewsletterCard page={page} />
        </main>

        <Footer page={page} />
      </div>
    </>
  )
}
