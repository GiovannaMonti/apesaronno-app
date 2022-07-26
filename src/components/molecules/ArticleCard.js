import Link from "next/link"
import sanitizeHtml from "sanitize-html"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export const ArticleCard = ({ article }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    })
    AOS.refresh()
  }, [])

  const { title, date, slug, excerpt } = article

  const articleDateTime = new Date(Date.parse(date))

  const day = articleDateTime.getDate()
  const month = articleDateTime.toLocaleString("it-IT", { month: "long" })
  const year = articleDateTime.getFullYear()

  return (
    <div className="m-article-card" data-aos="fade">
      <div className="m-article-info">
        <div className="a-date link">
          {day} {month} {year}
        </div>
        <Link href={`/news/${slug}`}>
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
