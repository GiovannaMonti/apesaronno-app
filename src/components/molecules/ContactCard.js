import { Button } from "../atoms/Button"

export const ContactCard = ({ page }) => {
  const card = page.blocks.find(
    (block) => block.blockName === "genesis-custom-blocks/card-contattaci"
  )

  const { titolo, descrizione, bottone: url } = card.attrs

  return (
    <section className="m-contact-card">
      <div className="m-card-wrapper">
        <h3>{titolo}</h3>
        <p>{descrizione}</p>
        <Button label="Contattaci" url={url} color="red" size="small" />
      </div>
    </section>
  )
}
