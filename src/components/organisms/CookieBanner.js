import { useState, useEffect } from "react"
import Cookies from "js-cookie"

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true"
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

export const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true)

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true"
    setCookieConsentIsTrue(consentIsTrue)
  }, [])

  const onClick = (e) => {
    e.preventDefault()
    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      })
      setCookieConsentIsTrue(true)
    }
  }

  if (cookieConsentIsTrue) {
    return null
  }

  return (
    <section
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        padding: "1rem 1.25rem",
        backgroundColor: "#edf2f7",
        borderTop: "1px solid #e2e8f0",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0.75rem 1.25rem",
          marginBottom: "0.75rem",
          backgroundColor: "#edf2f7",
          borderRadius: "0.25rem",
        }}
      >
        <div style={{ flexGrow: 1, color: "#2d3748" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: "500" }}>
            Questo sito usa servizi che utilizzano cookies per fornire una
            migliore esperienza e analizzare il traffico. Consulta la nostra{" "}
            <a
              href="https://www.apesaronno.it/privacy-policy"
              style={{
                color: "#4a5568",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Privacy Policy
            </a>{" "}
            per saperne di più.
          </p>
        </div>
        <button
          className={`a-button a-button--red a-button--small link`}
          style={{ color: "#ce6c47", alignSelf: "flex-end" }}
          onClick={onClick}
        >
          Accetto
        </button>
      </div>
    </section>
  )
}
