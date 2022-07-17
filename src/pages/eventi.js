import Head from "next/head"
import { useState, useEffect } from "react"
import { sortBy } from "lodash"

import { Menu } from "../components/molecules/Menu"
import { EventCard } from "../components/molecules/EventCard"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"

import { fetchSinglePage, fetchEvents } from "../utils/fetch"

export async function getStaticProps() {
  return {
    props: {
      page: await fetchSinglePage(187),
    },
    revalidate: 10,
  }
}

export default function Eventi({ page }) {
  const [upcomingEvents, setUpcomingEvents] = useState(null)

  useEffect(() => {
    ;(async function () {
      const eventList = await fetchEvents()

      const upcomingEventList = eventList
        .filter((event) => {
          return Date.parse(event.acf.data_evento) >= Date.parse(new Date())
        })
        .map((item) => ({ ...item, date: item.acf.data_evento }))

      const sortedEventList = sortBy(upcomingEventList, ["date"])
      setUpcomingEvents(sortedEventList)
    })()
  }, [])

  const isEventsListEmpty = upcomingEvents?.length === 0

  // console.log("page: ", page)
  return (
    <>
      <Menu />
      <div className="p-eventi">
        <Head>
          <title>{page.title.rendered} | A.P.E. Saronno</title>
          <meta
            name="description"
            content="Associazione proprietà edilizia. Da oltre 40 anni al fianco dei piccoli proprietari di casa."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>{page.title.rendered}</h1>

          <section className="o-event-section">
            <div className="m-desc">
              <h3>Prossimi Eventi</h3>
              <p>
                I nostri convegni e appuntamenti periodici per informare la
                cittadinanza sulle principali questioni legate al mondo
                dell’edilizia e non solo.
              </p>
            </div>
            {!isEventsListEmpty && (
              <div className="m-events">
                {upcomingEvents?.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            )}
          </section>

          <NewsletterCard page={page} />
        </main>

        <Footer page={page} />
      </div>
    </>
  )
}
