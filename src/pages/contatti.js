/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import { fetchSinglePage } from "../utils/fetch"
import { useEffect } from "react"
import AOS from "aos"
import { AOS_CONFIG } from "../utils/aos"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { ContactForm } from "../components/molecules/ContactForm"
import { CookieConsent } from "../components/organisms/CookieBanner"
import { IS_COURTESY_PAGE } from "../constants"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(115),
    },
    revalidate: 10,
  }
}

export default function Contatti({ page }) {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  return (
    <>
      {!IS_COURTESY_PAGE && <Menu />}
      <div className="p-contatti">
        <Head>
          <title>{page.title.rendered} | A.P.E. Saronno</title>
          <meta
            name="description"
            content="Associazione proprietà edilizia. Da oltre 40 anni al fianco dei piccoli proprietari di casa."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {!IS_COURTESY_PAGE && (
          <>
            <main>
              <CookieConsent />

              <section className="m-page-intro">
                <h1 data-aos="fade">{page.title.rendered}</h1>
                <PageSubtitle page={page} />
              </section>

              <ContactForm />

              <section className="m-contacts-wrapper">
                <div className="m-phone-email">
                  <div className="m-phone" data-aos="fade">
                    <h4>Telefono</h4>
                    <div>
                      <p>{page.acf.telefono}</p>
                      <p>{page.acf.apertura_segreteria}</p>
                    </div>
                  </div>

                  <div className="m-email" data-aos="fade" data-aos-delay="200">
                    <h4>E-mail</h4>
                    <p>
                      <a href={`mailto: ${page.acf["e-mail"]}`}>
                        {page.acf["e-mail"]}
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              <NewsletterCard page={page} />
            </main>

            <Footer page={page} />
          </>
        )}

        {IS_COURTESY_PAGE && (
          <main className="m-courtesy-content">
            <h2>Sito in costruzione.</h2>
            <p className="link">Saremo online presto!</p>
          </main>
        )}
      </div>
    </>
  )
}
