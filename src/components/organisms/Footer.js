import { Logo } from "../atoms/Logo"

export const Footer = ({ page }) => {
  const blocks = page.acf

  const mappa = blocks.mappa
  const nomeSocieta = blocks.nome_societa
  const indirizzo = blocks.indirizzo
  const citta = blocks.citta
  const cap = blocks.cap
  const telefono = blocks.telefono
  const orariApertura = blocks.apertura_segreteria
  const email = blocks["e-mail"]
  const partitaIva = blocks.partita_iva

  const currentYear = new Date().getFullYear()

  return (
    <div className="o-footer">
      <div className="a-map">
        <iframe
          src={mappa}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="o-footer-info">
        <div className="m-owner-info">
          <Logo fill="#FEFAF8" />
          <p className="a-name p-small">{nomeSocieta}</p>
          <p className="a-address p-small">{indirizzo}</p>
          <p className="a-city-cap p-small">
            {cap}, {citta}
          </p>
        </div>

        <div className="m-contact-info">
          <div className="a-phone">
            <p className="link">Telefono</p>
            <p className="p-small">{telefono}</p>
            <p className="p-small">{orariApertura}</p>
          </div>

          <div className="a-email">
            <p className="link">E-mail</p>
            <a className="p-small" href={`mailto: ${email}`}>
              {email}
            </a>
          </div>
        </div>
      </div>

      <div className="a-copyright">
        <p className="p-small">
          Copyright © {currentYear} {nomeSocieta}
        </p>
        <p className="p-small">P. IVA {partitaIva}</p>
        <p className="p-small">
          {indirizzo} - {cap} {citta}
        </p>
      </div>
    </div>
  )
}
