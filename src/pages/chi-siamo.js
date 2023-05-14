/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import { fetchSinglePage } from "../utils/fetch"
import { useEffect } from "react"
import AOS from "aos"
import { AOS_CONFIG } from "../utils/aos"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { SimpleList } from "../components/molecules/SimpleList"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { CookieConsent } from "../components/organisms/CookieBanner"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(113),
    },
    revalidate: 10,
  }
}

export default function ChiSiamo({ page }) {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  const paragraphs = page.blocks.filter(
    (block) => block.blockName === "genesis-custom-blocks/paragrafo-grande"
  )

  const peopleList = page.acf.lista

  return (
    <>
      <Menu />
      <div className="p-chi-siamo">
        <Head>
          <title>{page.title.rendered} | A.P.E. Saronno</title>
          <meta
            name="description"
            content="Associazione proprietà edilizia. Da oltre 40 anni al fianco dei piccoli proprietari di casa."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <CookieConsent />

          <h1 data-aos="fade">{page.title.rendered}</h1>

          <section className="m-description">
            <img
              align="left"
              className="a-featured-image"
              src={page.fimg_url}
              alt="saronno"
            />

            {paragraphs.map((p, index) => (
              <p key={index} className="p-big-serif" data-aos="fade">
                {p.attrs.testo}
              </p>
            ))}
          </section>

          <section className="o-people">
            <h2>Il Consiglio Direttivo</h2>

            <div className="m-list-wrapper">
              {peopleList.length > 0 &&
                peopleList.map((people) => (
                  <SimpleList
                    key={people.titolo}
                    list={people}
                    color="#454B66"
                  />
                ))}
            </div>
          </section>

          <NewsletterCard page={page} />
        </main>

        <Footer page={page} />
      </div>
    </>
  )
}
