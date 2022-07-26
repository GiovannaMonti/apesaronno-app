import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import { useEffect } from "react"

import { NewsletterForm } from "../molecules/NewsletterForm"

import "aos/dist/aos.css"

export const NewsletterCard = ({ page }) => {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  const newsletterBlock = page.blocks.find(
    (block) => block.blockName === "genesis-custom-blocks/newsletter"
  )

  const { etichetta, titolo, descrizione } = newsletterBlock?.attrs || null

  return (
    <>
      {newsletterBlock && (
        <div className="o-newsletter">
          <div className="m-newsletter-text-wrapper" data-aos="smooth-fade-up">
            <h3 className="a-newsletter-label">{etichetta}</h3>
            <h2 className="a-newsletter-title">{titolo}</h2>
            <p className="a-newsletter-desc">{descrizione}</p>
          </div>

          <NewsletterForm />
        </div>
      )}
    </>
  )
}
