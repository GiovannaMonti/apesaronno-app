import { useState, useEffect } from "react"

import { fetchArticles } from "../../utils/fetch"
import { ArticleCard } from "../molecules/ArticleCard"

export const ArticleSection = () => {
  const [latestArticles, setLatestArticles] = useState(null)

  useEffect(() => {
    ;(async function () {
      const articleList = await fetchArticles()

      setLatestArticles(articleList.slice(0, 4))
    })()
  }, [])

  const isArticlesListEmpty = latestArticles?.length === 0

  return (
    <section className="o-article-section">
      <h2 className="a-section-title">News</h2>

      <div className="m-latest-articles">
        {!isArticlesListEmpty && (
          <div className="first-row">
            {latestArticles?.slice(0, 2).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        {!isArticlesListEmpty && (
          <div className="second-row">
            {latestArticles?.slice(2, 4).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        {isArticlesListEmpty && (
          <div className="a-no-articles">
            <p className="link">Al momento non ci sono articoli.</p>
          </div>
        )}
      </div>
    </section>
  )
}
