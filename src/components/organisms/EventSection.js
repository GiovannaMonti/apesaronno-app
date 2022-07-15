import { useState, useEffect } from "react"

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
        .reverse()

      setUpcomingEvents(upcomingEventList)
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
          upcomingEvents?.map((event) => (
            <EventCard key={event.title.rendered} event={event} />
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
