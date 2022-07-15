import Link from "next/link"
import sanitizeHtml from "sanitize-html"

export const ArticleCard = ({ article }) => {
  const { title, date, slug, excerpt } = article

  const articleDateTime = new Date(Date.parse(date))

  const day = articleDateTime.getDate()
  const month = articleDateTime.toLocaleString("it-IT", { month: "long" })
  const year = articleDateTime.getFullYear()

  return (
    <div className="m-article-card">
      <div className="m-article-info">
        <div className="a-date link">
          {day} {month} {year}
        </div>
        <Link href={`/articoli/${slug}`}>
          <h3>{title.rendered}</h3>
        </Link>
      </div>

      <div className="a-excerpt">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(excerpt.rendered),
          }}
        ></div>
      </div>
    </div>
  )
}
