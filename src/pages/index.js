import Head from "next/head"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { WP_REST } from "../utils/url"

export async function getStaticProps() {
  const src = await fetch(WP_REST + "/pages/147")
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

  return (
    <>
      <Menu />
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
          <PageSubtitle page={page} />
        </main>
      </div>
    </>
  )
}
