import Head from "next/head"
import AOS from "aos"
import { AOS_CONFIG } from "../utils/aos"
import { useEffect } from "react"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { TextSlider } from "../components/organisms/TextSlider"
import { ContactCard } from "../components/molecules/ContactCard"
import { EventSection } from "../components/organisms/EventSection"
import { ArticleSection } from "../components/organisms/ArticleSection"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { CookieConsent } from "../components/organisms/CookieBanner"
import { IS_COURTESY_PAGE } from "../constants"

import { fetchSinglePage } from "../utils/fetch"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(147),
    },
    revalidate: 10,
  }
}

export default function Home({ page }) {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  return (
    <>
      {!IS_COURTESY_PAGE && <Menu />}
      <div className="p-home">
        <Head>
          <title>{`${page.title.rendered} | A.P.E. Saronno`}</title>
          <meta
            name="description"
            content="Associazione proprietà edilizia. Dal 1973 al fianco dei proprietari di case."
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

              <TextSlider page={page} />

              <ContactCard page={page} />

              <EventSection />

              <ArticleSection />

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
