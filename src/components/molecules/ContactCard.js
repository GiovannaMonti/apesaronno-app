import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import { useEffect } from "react"
import "aos/dist/aos.css"
import { Button } from "../atoms/Button"

export const ContactCard = ({ page }) => {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  const card = page.blocks.find(
    (block) => block.blockName === "genesis-custom-blocks/card-contattaci"
  )

  const { titolo, descrizione, bottone: url } = card?.attrs || {}

  return (
    <>
      {card && (
        <section className="m-contact-card" data-aos="smooth-fade-up">
          <div className="m-card-wrapper">
            <h3>{titolo}</h3>
            <p>{descrizione}</p>
            <Button label="Contattaci" url={url} color="red" size="small" />
          </div>
        </section>
      )}
    </>
  )
}
