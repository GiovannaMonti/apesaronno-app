import { useState, useEffect } from "react"
import { fetchMenuItems } from "../../utils/fetch"

export const Menu = () => {
  const [menuItems, setMenuItems] = useState(null)

  useEffect(() => {
    ;(async function () {
      const menu = await fetchMenuItems()

      setMenuItems(menu)
    })()
  }, [])

  return (
    <nav>
      {menuItems?.map((item) => {
        const { title, url } = item
        return (
          <a key={title} href={url}>
            {title}
          </a>
        )
      })}
    </nav>
  )
}
