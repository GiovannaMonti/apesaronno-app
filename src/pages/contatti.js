/* eslint-disable @next/next/no-img-element */
import Head from "next/head"
import { fetchSinglePage } from "../utils/fetch"

import { Menu } from "../components/molecules/Menu"
import { PageSubtitle } from "../components/molecules/PageSubtitle"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { ContactForm } from "../components/molecules/ContactForm"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(115),
    },
    revalidate: 10,
  }
}

export default function Contatti({ page }) {
  // console.log("page: ", page)
  return (
    <>
      <Menu />
      <div className="p-contatti">
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

          <ContactForm />

          <section className="m-contacts-wrapper">
            <div className="m-phone-email">
              <div className="m-phone">
                <h4>Telefono</h4>
                <div>
                  <p>{page.acf.telefono}</p>
                  <p>{page.acf.apertura_segreteria}</p>
                </div>
              </div>

              <div className="m-email">
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
      </div>
    </>
  )
}
