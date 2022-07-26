import { useState, useEffect } from "react"
import { sortBy } from "lodash"
import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import "aos/dist/aos.css"

import { Button } from "../atoms/Button"
import { fetchEvents } from "../../utils/fetch"
import { EventCard } from "../molecules/EventCard"

export const EventSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(null)

  useEffect(() => {
    ;(async function () {
      const eventList = await fetchEvents()

      const upcomingEventList = eventList
        .filter((event) => {
          return Date.parse(event.acf.data_evento) >= Date.parse(new Date())
        })
        .map((item) => ({ ...item, date: item.acf.data_evento }))

      const sortedEventList = sortBy(upcomingEventList, ["date"]).slice(0, 2)
      setUpcomingEvents(sortedEventList)

      AOS.init({
        once: true,
        duration: 800,
        easing: "ease-in-out",
      })
      AOS.refresh()
    })()
  }, [])

  const isUpcomingEventsEmpty = upcomingEvents?.length === 0

  return (
    <section className="o-event-section">
      <div className="m-event-section-info">
        <h2 className="a-section-title">Eventi</h2>
        <p>
          Organizziamo convegni e incontri periodici aperti a chiunque voglia
          formarsi su questioni legate al mondo dell’edilizia.
        </p>
        <Button
          label="Tutti gli eventi"
          url="/eventi"
          color="red"
          size="default"
        />
      </div>

      <div className="m-upcoming-events">
        <h3>Prossimi Eventi</h3>
        {!isUpcomingEventsEmpty &&
          upcomingEvents?.map((event, index) => (
            <div
              key={event.title.rendered}
              data-aos="smooth-fade-up"
              data-aos-delay={index * 200}
            >
              <EventCard event={event} />
            </div>
          ))}
        {isUpcomingEventsEmpty && (
          <div className="a-no-events">
            <p className="link">Al momento non ci sono eventi in programma.</p>
          </div>
        )}
      </div>
    </section>
  )
}
