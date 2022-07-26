import Link from "next/link"
import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import { useEffect } from "react"

import { ArrowRight } from "../atoms/ArrowRight"
import { Button } from "../atoms/Button"

import "aos/dist/aos.css"

export const SimpleList = ({ list, color }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 500,
      easing: "ease",
    })
    AOS.refresh()
  }, [])

  const { titolo, elenco, bottone } = list
  const localUrl = bottone?.replace("https://data.apesaronno.it", "")

  return (
    <div className="m-simple-list" style={{ color: color }}>
      <h3
        className="a-title"
        style={{ borderBottomColor: `${color}` }}
        data-aos="fade-left"
      >
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
        {elenco?.map((item, index) => (
          <li
            key={item.elemento}
            data-aos="smooth-fade-up"
            data-aos-delay={100 * index}
          >
            {item.elemento}
          </li>
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
