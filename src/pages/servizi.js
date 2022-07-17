import Head from "next/head"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { SimpleList } from "../components/molecules/SimpleList"
import { Footer } from "../components/organisms/Footer"

import { fetchSinglePage } from "../utils/fetch"

export async function getStaticProps() {
  const page = await fetchSinglePage(105)

  return {
    props: {
      page,
    },
    revalidate: 10,
  }
}

export default function Servizi({ page }) {
  // console.log(page)

  const serviceList = page.acf.lista

  return (
    <>
      <Menu />
      <div className="p-servizi">
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

          <section className="o-elenco-servizi">
            {serviceList.length > 0 &&
              serviceList.map((service) => (
                <SimpleList
                  key={service.titolo}
                  list={service}
                  color="#FEFAF8"
                />
              ))}
          </section>

          <Footer page={page} />
        </main>
      </div>
    </>
  )
}
