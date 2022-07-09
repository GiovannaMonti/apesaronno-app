import Head from "next/head"
import { WP_REST } from "../utils/url"

export async function getStaticProps() {
  const src = await fetch(WP_REST + "/pages/2")
  const resp = await src.json()
  const page = resp

  return {
    props: {
      page,
    },
  }
}

export default function Home({ page }) {
  console.log(page)

  const pageSubtitle = page.blocks.find(
    (block) =>
      block.blockName === "genesis-custom-blocks/sottotitolo-pagina-e-bottone"
  )

  return (
    <div>
      <Head>
        <title>{page.title.rendered} | A.P.E. Saronno</title>
        <meta
          name="description"
          content="Associazione proprietà edilizia. Da oltre 40 anni al fianco dei piccoli proprietari di casa."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="m-page-intro">
          <h1>{page.title.rendered}</h1>
          <p className="a-page-subtitle">{pageSubtitle.attrs.sottotitolo}</p>
          <button className="a-button">
            <a href={pageSubtitle.attrs.bottone}>Scopri i servizi</a>
          </button>
        </section>
      </main>

      <footer></footer>
    </div>
  )
}
