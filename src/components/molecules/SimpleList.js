import Link from "next/link"
import { ArrowRight } from "../atoms/ArrowRight"
import { Button } from "../atoms/Button"

export const SimpleList = ({ list, color }) => {
  const { titolo, elenco, bottone } = list
  const localUrl = bottone?.replace("https://data.apesaronno.it", "")

  return (
    <div className="m-simple-list" style={{ color: color }}>
      <h3 className="a-title" style={{ borderBottomColor: `${color}` }}>
        {titolo}
        {bottone && (
          <div className="display-desktop">
            <Link href={localUrl}>
              <span className="link">
                Vai al servizio <ArrowRight />
              </span>
            </Link>
          </div>
        )}
      </h3>

      <ul>
        {elenco?.map((item) => (
          <li key={item.elemento}>{item.elemento}</li>
        ))}
      </ul>

      {bottone && (
        <div className="a-button display-mobile">
          <Button
            label="Vai al servizio"
            url={bottone}
            color="white"
            size="small"
          />
        </div>
      )}
    </div>
  )
}
