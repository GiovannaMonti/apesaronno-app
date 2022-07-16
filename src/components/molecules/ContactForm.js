import { useState } from "react"
import { Button } from "../atoms/Button"

export const ContactForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name,
      email,
      message,
    }

    fetch("/api/contact", {
      method: "post",
      body: JSON.stringify(data),
    })

    console.log(data)
  }

  return (
    <section className="o-contact-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="message">Messaggio</label>
        <textarea
          id="message"
          type="text"
          rows="4"
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button label="Invia" color="red" size="small" isSubmit={true} />
      </form>
    </section>
  )
}
