import { getPageBySlug, getSlugs } from "../../utils/fetch"
import Head from "next/dist/shared/lib/head"

import { Menu } from "../../components/molecules/Menu"
import { PageSubtitle } from "../../components/molecules/PageSubtitle"
import { Footer } from "../../components/organisms/Footer"

export async function getStaticPaths() {
  const paths = await getSlugs("posts")

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
  return (
    <>
      <Menu />
      <div className="p-servizio">
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
        </main>

        <Footer page={page} />
      </div>
    </>
  )
}
