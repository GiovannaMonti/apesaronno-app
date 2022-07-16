import { Button } from "../atoms/Button"

export const PageSubtitle = ({ page }) => {
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
          <p className="a-page-subtitle p-big">{sottotitolo}</p>

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
