import { Button } from "../atoms/Button"
import { NewsletterForm } from "../molecules/NewsletterForm"

export const NewsletterCard = ({ page }) => {
  const newsletterBlock = page.blocks.find(
    (block) => block.blockName === "genesis-custom-blocks/newsletter"
  )

  const { etichetta, titolo, descrizione } = newsletterBlock.attrs

  return (
    <div className="o-newsletter">
      <div className="m-newsletter-text-wrapper">
        <h3 className="a-newsletter-label">{etichetta}</h3>
        <h2 className="a-newsletter-title">{titolo}</h2>
        <p className="a-newsletter-desc">{descrizione}</p>
      </div>

      <NewsletterForm />
    </div>
  )
}