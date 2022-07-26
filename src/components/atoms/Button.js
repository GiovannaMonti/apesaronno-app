import AOS from "aos"
import { AOS_CONFIG } from "../../utils/aos"
import { useEffect } from "react"
import "aos/dist/aos.css"
import Link from "next/link"

export const Button = ({ label, url, color, size, isSubmit }) => {
  useEffect(() => {
    AOS.init(AOS_CONFIG)
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
