export const PageSubtitle = ({ page }) => {
  const pageSubtitle = page.blocks.find(
    (block) =>
      block.blockName === "genesis-custom-blocks/sottotitolo-pagina-e-bottone"
  )

  const { sottotitolo, bottone } = pageSubtitle.attrs

  return (
    <section className="m-page-intro">
      <h1>{page.title.rendered}</h1>
      <p className="a-page-subtitle p-big">{sottotitolo}</p>

      {bottone && (
        <button className="a-button">
          <a href={bottone}>Scopri i servizi</a>
        </button>
      )}
    </section>
  )
}
