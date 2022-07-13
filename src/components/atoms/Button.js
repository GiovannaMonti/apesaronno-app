import Link from "next/link"

export const Button = ({ label, url, color, size, isSubmit }) => {
  const localUrl = url?.replace("https://data.apesaronno.it", "")

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`a-button a-button--${color} a-button--${size} link`}
    >
      {!isSubmit ? <Link href={localUrl}>{label}</Link> : <a>{label}</a>}
    </button>
  )
}
