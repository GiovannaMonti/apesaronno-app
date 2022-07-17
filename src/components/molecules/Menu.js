/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react"
import useSize from "@react-hook/size"
import { slide as MobileMenu } from "react-burger-menu"
import Link from "next/link"

import { MenuLinks } from "./MenuLinks"
import { fetchMenuItems } from "../../utils/fetch"

import { MENU_MOBILE_STYLES } from "../../utils/MenuMobileStyles"
import { Hamburger } from "../atoms/Hamburger"
import { CloseButton } from "../atoms/CloseButton"

export const Menu = () => {
  const [menuItems, setMenuItems] = useState(null)

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  function toggleMenu() {
    setIsOpenMenu(!isOpenMenu)
  }

  const containerRef = useRef(null)
  const [containerWidth] = useSize(containerRef)

  useEffect(() => {
    ;(async function () {
      const menu = await fetchMenuItems()

      setMenuItems(menu)
    })()
  }, [])

  return (
    <div ref={containerRef}>
      {containerWidth >= 835 && (
        <nav className="m-navigation">
          <Link href="/">
            <img src="/assets/logo.svg" alt="logo"></img>
          </Link>
          <MenuLinks menuItems={menuItems} />
        </nav>
      )}

      {containerWidth < 835 && (
        <nav className="m-navigation">
          <div className="m-menu-bar">
            <Link href="/">
              <img src="/assets/logo.svg" alt="logo"></img>
            </Link>
            <span className="a-menu-icon" onClick={() => toggleMenu()}>
              <Hamburger />
            </span>
          </div>

          <MobileMenu
            right
            width="100%"
            styles={MENU_MOBILE_STYLES}
            isOpen={isOpenMenu}
            customBurgerIcon={false}
            customCrossIcon={false}
          >
            <div className="m-menu-items">
              <span className="a-close-icon" onClick={() => toggleMenu()}>
                <CloseButton />
              </span>

              <MenuLinks menuItems={menuItems} />
            </div>
          </MobileMenu>
        </nav>
      )}
    </div>
  )
}
