import AOS from "aos"
import { useState, useEffect } from "react"
import "aos/dist/aos.css"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

import { Button } from "../atoms/Button"

export const TextSlider = ({ page }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    })
    AOS.refresh()
  }, [])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const slides = page.acf.slide
  const etichetta = page.acf.etichetta_slider

  return (
    <div className="o-slider">
      <div className="m-navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide) => {
            const { titolo, descrizione, bottone: url } = slide
            return (
              <div key={titolo} className="m-slide-wrapper">
                <h5>{etichetta}</h5>
                <div className="keen-slider__slide m-slide">
                  <h2 data-aos="fade">{titolo}</h2>
                  <p data-aos="smooth-fade-up">{descrizione}</p>
                  <Button
                    label="Vai al servizio"
                    url={url}
                    color="white"
                    size="small"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {loaded && instanceRef.current && (
        <div className="m-dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"a-dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}
    </div>
  )
}
