import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiPhone } from 'react-icons/fi'
import { DIRECTIONS_URL, MAP_EMBED, OFFICE, PHONE_DISPLAY, PHONE_HREF } from '../../data/site'
import styles from './Contact.module.css'

// Open or closed right now, in Pahrump time (not the visitor's time)
function getOfficeStatus() {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: OFFICE.timeZone,
    }).format(new Date()),
  )
  const open = hour >= OFFICE.opensAt && hour < OFFICE.closesAt
  return { open, text: open ? 'Open now · closes 7 pm' : 'Closed now · opens 8 am' }
}

export default function Contact() {
  const [status, setStatus] = useState(getOfficeStatus)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  // Re-check once a minute so the status flips at 8 am / 7 pm
  useEffect(() => {
    const timer = setInterval(() => setStatus(getOfficeStatus()), 60000)
    return () => clearInterval(timer)
  }, [])

  const update = (key) => (event) => setForm((previous) => ({ ...previous, [key]: event.target.value }))

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <h2 id="contact-title" className={styles.title}>
          Call or Visit
        </h2>

        <div className={styles.columns}>
          {/* ---------- Call ---------- */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Call</h3>
            <a href={PHONE_HREF} className={styles.phone}>
              <FiPhone aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <h4 className={styles.label}>Office Hours</h4>
            <p className={styles.status}>
              <span className={`${styles.dot} ${status.open ? styles.dotOpen : ''}`} aria-hidden="true" />
              {status.text}
            </p>
            <p className={styles.hours}>Open daily 8:00 am – 7:00 pm</p>
            <p className={styles.note}>
              Appointments outside office hours available upon request. Just call!
            </p>
          </div>

          {/* ---------- Visit ---------- */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Visit</h3>
            <h4 className={styles.office}>{OFFICE.name}</h4>
            <address className={styles.address}>
              {OFFICE.street}
              <br />
              {OFFICE.city}
            </address>

            <div className={styles.mapFrame}>
              <iframe
                className={styles.map}
                src={MAP_EMBED}
                title="Map of the Ridge Realty Group office in Pahrump"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
              Get directions <FiArrowUpRight aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* ---------- Message form ---------- */}
        <div className={styles.formBlock}>
          <p className={styles.or}>Or</p>
          <h3 className={styles.formTitle}>Send Message</h3>

          {sent ? (
            <p className={styles.thanks} role="status">
              Thanks — Marci will be in touch.
            </p>
          ) : (
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault()
                setSent(true)
              }}
            >
              <label className={styles.field} htmlFor="contact-name">
                <span>Name</span>
                <input id="contact-name" type="text" autoComplete="name" value={form.name} onChange={update('name')} />
              </label>

              <label className={styles.field} htmlFor="contact-email">
                <span>
                  Email<span aria-hidden="true">*</span>
                </span>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                />
              </label>

              <label className={`${styles.field} ${styles.full}`} htmlFor="contact-message">
                <span>Message</span>
                <textarea id="contact-message" rows="5" value={form.message} onChange={update('message')} />
              </label>

              <button type="submit" className={`${styles.submit} ${styles.full}`}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}