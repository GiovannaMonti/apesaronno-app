import { Button } from "../atoms/Button"

export const PageSubtitle = ({ page }) => {
  const pageSubtitle = page.blocks.find(
    (block) =>
      block.blockName === "genesis-custom-blocks/sottotitolo-pagina-e-bottone"
  )

  const { sottotitolo, bottone } = pageSubtitle.attrs

  return (
    <>
      <p className="a-page-subtitle p-big">{sottotitolo}</p>

      {bottone && <Button url={bottone} color="red" size="default" />}
    </>
  )
}
