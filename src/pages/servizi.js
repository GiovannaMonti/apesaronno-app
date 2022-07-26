import Head from "next/head"
import AOS from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { SimpleList } from "../components/molecules/SimpleList"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"

import { fetchSinglePage } from "../utils/fetch"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(105),
    },
    revalidate: 10,
  }
}

export default function Servizi({ page }) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    })
    AOS.refresh()
  }, [])

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
            <h1 data-aos="fade">{page.title.rendered}</h1>
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

          <NewsletterCard page={page} />
        </main>
        <Footer page={page} />
      </div>
    </>
  )
}
