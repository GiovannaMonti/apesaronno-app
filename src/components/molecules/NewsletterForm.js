// todo https://leerob.io/blog/mailchimp-next-js

import { useRef } from "react"
import { Button } from "../atoms/Button"

export const NewsletterForm = () => {
  const inputEl = useRef(null)

  const subscribe = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={subscribe}>
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
    </form>
  )
}
