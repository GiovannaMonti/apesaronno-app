import Head from "next/head"
import AOS from "aos"
import { AOS_CONFIG } from "../utils/aos"
import { useEffect } from "react"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { SimpleList } from "../components/molecules/SimpleList"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { CookieConsent } from "../components/organisms/CookieBanner"

import { fetchSinglePage } from "../utils/fetch"
import { IS_COURTESY_PAGE } from "../constants"

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
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  const serviceList = page.acf.lista

  return (
    <>
      {!IS_COURTESY_PAGE && <Menu />}
      <div className="p-servizi">
        <Head>
          <title>{`${page.title.rendered} | A.P.E. Saronno`}</title>
          <meta
            name="description"
            content="I nostri professionisti offrono servizi in tutti gli ambiti dell'edilizia, dalla consulenza legale alla stesura dei contratti di locazione."
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
