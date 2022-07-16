export const Calendar = ({ page }) => {
  const calendarItems = page.acf.programma

  return (
    <div className="m-calendar">
      <h5 className="a-calendar-header">Calendario</h5>

      <div className="m-calendar-items">
        {calendarItems.map((item) => {
          const { giorno_e_ora, servizi } = item
          return (
            <div key={giorno_e_ora} className="m-calendar-item">
              <p className="link">{giorno_e_ora}</p>
              <ul className="m-list">
                {servizi.map((el) => (
                  <p key={el.servizio}>{el.servizio}</p>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
