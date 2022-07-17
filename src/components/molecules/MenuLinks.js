import Link from "next/link"
import { useRouter } from "next/router"

export const MenuLinks = ({ menuItems }) => {
  const router = useRouter()

  return (
    <div className="m-links-container">
      {menuItems?.map((item) => {
        const { title, url } = item
        const localUrl = url?.replace("https://data.apesaronno.it", "")

        return (
          <Link key={title} href={localUrl}>
            <span
              className={
                `${router.asPath}/` === localUrl ? "active link" : "link"
              }
            >
              {title}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
