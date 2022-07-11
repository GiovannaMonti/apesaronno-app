import Head from "next/head"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { TextSlider } from "../components/organisms/TextSlider"

import { fetchSinglePage } from "../utils/fetch"

export async function getStaticProps() {
  const page = await fetchSinglePage(147)

  return {
    props: {
      page,
    },
  }
}

export default function Home({ page }) {
  console.log(page)

  return (
    <>
      <Menu />
      <div className="p-home">
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
            <PageSubtitle page={page} />
          </section>

          <TextSlider page={page} />
        </main>
      </div>
    </>
  )
}
