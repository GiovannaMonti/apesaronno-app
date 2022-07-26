import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import { useEffect } from "react"

import { Button } from "../atoms/Button"

import "aos/dist/aos.css"

export const PageSubtitle = ({ page }) => {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  const pageSubtitle = page.blocks.find(
    (block) =>
      block.blockName ===
        "genesis-custom-blocks/sottotitolo-pagina-e-bottone" ||
      block.blockName === "genesis-custom-blocks/sottotitolo-pagina"
  )

  const { sottotitolo, bottone } = pageSubtitle?.attrs || ""

  return (
    <>
      {pageSubtitle && (
        <>
          <p className="a-page-subtitle p-big" data-aos="smooth-fade-up">
            {sottotitolo}
          </p>

          {bottone && (
            <Button
              label="Scopri i servizi"
              url={bottone}
              color="red"
              size="default"
            />
          )}
        </>
      )}
    </>
  )
}
