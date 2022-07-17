import Head from "next/head"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { TextSlider } from "../components/organisms/TextSlider"
import { ContactCard } from "../components/molecules/ContactCard"
import { EventSection } from "../components/organisms/EventSection"
import { ArticleSection } from "../components/organisms/ArticleSection"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"

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

  const IS_COURTESY_PAGE = true
  return (
    <>
      {!IS_COURTESY_PAGE && <Menu />}
      <div className="p-home">
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
              <section className="m-page-intro">
                <h1>{page.title.rendered}</h1>
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
