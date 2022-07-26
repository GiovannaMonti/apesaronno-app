import { useState, useEffect } from "react"
import { Button } from "../atoms/Button"
import axios from "axios"
import AOS from "aos"
import "aos/dist/aos.css"

export const ContactForm = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-in-out",
    })
    AOS.refresh()
  }, [])

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  })

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      })
      setInputs({
        name: "",
        email: "",
        message: "",
      })
    } else {
      setStatus({
        info: { error: true, msg: msg },
      })
    }
  }

  const handleOnChange = (e) => {
    e.persist()
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }))
    axios({
      method: "POST",
      url: "https://formspree.io/f/xayvryzz",
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(true, "Grazie, il tuo messaggio è stato inviato.")
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error)
      })
  }

  return (
    <section className="o-contact-form" data-aos="smooth-fade-up">
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          onChange={handleOnChange}
          value={inputs.email}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          name="_replyto"
          onChange={handleOnChange}
          value={inputs.email}
          required
        />

        <label htmlFor="message">Messaggio</label>
        <textarea
          id="message"
          type="text"
          rows="4"
          onChange={handleOnChange}
          required
          value={inputs.message}
        />

        <Button
          label={!status.submitting ? "Invia" : "Invio..."}
          color="red"
          size="small"
          isSubmit={true}
        />

        {status.info.error && (
          <div className="m-form-error link">
            Siamo spiacenti, si è verificato un errore.
          </div>
        )}
        {!status.info.error && status.info.msg && (
          <p className="m-form-success link">{status.info.msg}</p>
        )}
      </form>
    </section>
  )
}
