import { useState, useEffect } from "react"
import Link from "next/link"
import { fetchMenuItems } from "../../utils/fetch"

import { Logo } from "../atoms/Logo"

export const Menu = () => {
  const [menuItems, setMenuItems] = useState(null)

  useEffect(() => {
    ;(async function () {
      const menu = await fetchMenuItems()

      setMenuItems(menu)
    })()
  }, [])

  return (
    <nav className="m-navigation">
      <Logo fill="#59534F" />
      <div className="m-links-container">
        {menuItems?.map((item) => {
          const { title, url } = item
          const localUrl = url?.replace("https://data.apesaronno.it", "")

          return (
            <Link key={title} href={localUrl}>
              <span className="link">{title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
