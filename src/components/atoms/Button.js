import AOS from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"
import Link from "next/link"

export const Button = ({ label, url, color, size, isSubmit }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    })
    AOS.refresh()
  }, [])

  const localUrl = url?.replace("https://data.apesaronno.it", "")

  return (
    <button
      data-aos="smooth-fade-up"
      data-aos-delay="200"
      type={isSubmit ? "submit" : "button"}
      className={`a-button a-button--${color} a-button--${size} link`}
    >
      {!isSubmit ? <Link href={localUrl}>{label}</Link> : <a>{label}</a>}
    </button>
  )
}
