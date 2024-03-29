import Head from "next/head"
import { useState, useEffect } from "react"
import { sortBy } from "lodash"
import AOS from "aos"
import { AOS_CONFIG } from "../utils/aos"
import "aos/dist/aos.css"

import { Menu } from "../components/molecules/Menu"
import { EventCard } from "../components/molecules/EventCard"
import { NewsletterCard } from "../components/organisms/NewsletterCard"
import { Footer } from "../components/organisms/Footer"
import { CookieConsent } from "../components/organisms/CookieBanner"

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

      AOS.init(AOS_CONFIG)
      AOS.refresh()
    })()
  }, [])

  const isEventsListEmpty = upcomingEvents?.length === 0

  return (
    <>
      <Menu />
      <div className="p-eventi">
        <Head>
          <title>{`${page.title.rendered} | A.P.E. Saronno`}</title>
          <meta
            name="description"
            content="Da sempre organizziamo eventi di divulgazione aperti al pubblico sulle principali novità in ambito edilizio."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <CookieConsent />
          <h1 data-aos="fade">{page.title.rendered}</h1>

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
                {upcomingEvents?.map((event, index) => (
                  <div
                    key={event.slug}
                    data-aos="smooth-fade-up"
                    data-aos-delay={index * 100}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
            {isEventsListEmpty && (
              <div className="a-no-events">
                <p className="link" style={{ minWidth: "40vw" }}>
                  Al momento non ci sono eventi in programma.
                </p>
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
