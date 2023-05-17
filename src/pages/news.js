import Head from "next/head"
import { useState, useEffect } from "react"
import AOS from "aos"
import { AOS_CONFIG } from "../utils/aos"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { SimpleList } from "../components/molecules/SimpleList"
import { ArticleCard } from "../components/molecules/ArticleCard"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { CookieConsent } from "../components/organisms/CookieBanner"

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

    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  const isArticlesListEmpty = articles?.length === 0
  const archives = page.acf.lista
  const archiveLinks = archives
    .map((archive) => archive.elenco)
    .map((el) => el[0].elemento)

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
          <CookieConsent />

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

          {archives.length > 0 && (
            <section className="o-archive">
              <h2>Archivio Storico</h2>

              <div className="m-list-wrapper">
                {archives.map((archive, index) => (
                  <SimpleList
                    key={archive.titolo}
                    list={{
                      ...archive,
                      elenco: [
                        {
                          elemento: (
                            <a
                              style={{ textDecoration: "underline" }}
                              href={archiveLinks[index]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Vai all'archivio
                            </a>
                          ),
                        },
                      ],
                    }}
                    color="#454B66"
                  />
                ))}
              </div>
            </section>
          )}

          <NewsletterCard page={page} />
        </main>

        <Footer page={page} />
      </div>
    </>
  )
}
