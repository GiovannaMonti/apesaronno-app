// todo https://leerob.io/blog/mailchimp-next-js

import { useRef, useState } from "react"
import { Button } from "../atoms/Button"

export const NewsletterForm = () => {
  const inputEl = useRef(null)
  const [message, setMessage] = useState("")

  const subscribeUser = async (e) => {
    e.preventDefault()

    // this is where your mailchimp request is made

    const res = await fetch("/api/subscribeUser", {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),

      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
    })

    const { error } = await res.json()

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error)

      return
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = ""
    setMessage("Iscrizione avvenuta con successo!")
  }

  return (
    <form onSubmit={subscribeUser}>
      <label className="link" htmlFor="email-input">
        E-mail
      </label>
      <input
        id="email-input"
        name="email"
        placeholder="La tua e-mail"
        ref={inputEl}
        required
        type="email"
      />

      <Button label="Iscriviti" color="white" size="default" isSubmit={true} />

      {message && <div className="m-subscribe-success link">{message}</div>}
    </form>
  )
}
