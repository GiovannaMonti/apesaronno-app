import { useState } from "react"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react" // import from 'keen-slider/react.es' for to get an ES module

import { Button } from "../atoms/Button"

export const TextSlider = ({ page }) => {
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
                  <h2>{titolo}</h2>
                  <p>{descrizione}</p>
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
