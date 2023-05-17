import { getPageBySlug, getSlugs } from "../../utils/fetch"
import Head from "next/dist/shared/lib/head"
import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import { useEffect } from "react"
import "aos/dist/aos.css"

import { Menu } from "../../components/molecules/Menu"
import { PageSubtitle } from "../../components/molecules/PageSubtitle"
import { AccordionCard } from "../../components/molecules/AccordionCard"
import { Calendar } from "../../components/molecules/Calendar"
import { Footer } from "../../components/organisms/Footer"
import { CookieConsent } from "../../components/organisms/CookieBanner"
import { IS_COURTESY_PAGE } from "../../constants"

export async function getStaticPaths() {
  const paths = await getSlugs("pages")

  return {
    paths,
    fallback: "blocking",
  }
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.slug)

  return {
    props: {
      page,
    },
    revalidate: 10, // seconds
  }
}

export default function Servizio({ page }) {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
    AOS.refresh()
  }, [])

  return (
    <>
      {!IS_COURTESY_PAGE && <Menu />}
      <div className="p-servizio">
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

              {page.acf.accordion && <AccordionCard page={page} />}

              {page.acf.programma && (
                <section className="m-calendar-section">
                  <Calendar page={page} />
                </section>
              )}
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
