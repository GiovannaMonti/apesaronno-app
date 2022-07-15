import { CalendarIcon } from "../atoms/CalendarIcon"
import { MapIcon } from "../atoms/MapIcon"

export const EventCard = ({ event }) => {
  const {
    data_evento: date,
    location_evento: location,
    citta_evento: city,
  } = event.acf

  const eventDateTime = new Date(Date.parse(date))

  const day = eventDateTime.getDate()
  const month = eventDateTime.toLocaleString("it-IT", { month: "long" })

  const eventTimeFormatted = `${eventDateTime.getHours()}:${
    eventDateTime.getMinutes() < 10 ? "0" : ""
  }${eventDateTime.getMinutes()}`

  return (
    <div className="m-event-card">
      <div className="a-date">
        <span className="a-day">{day}</span>
        <span className="a-month">{month}</span>
      </div>

      <div className="m-event-info">
        <h3 className="a-event-title">{event.title.rendered}</h3>

        <div className="m-place-and-time">
          <p className="a-time">
            <CalendarIcon /> Ore {eventTimeFormatted}
          </p>
          <p className="a-place">
            <MapIcon />
            {location}, {city}
          </p>
        </div>
      </div>
    </div>
  )
}
