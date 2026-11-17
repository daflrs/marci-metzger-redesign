import { FiPhone } from 'react-icons/fi'
import FramedImage from '../FramedImage/FramedImage'
import portrait from '../../assets/images/marci-portrait.jpg'
import { PHONE_DISPLAY, PHONE_HREF } from '../../data/site'
import styles from './MeetMarci.module.css'

const CREDENTIALS = [
  'Since 1995',
  'Licensed Broker (WA)',
  'REALTOR®',
  'Chamber of Commerce member',
  'Mountain Falls, Pahrump',
]

export default function MeetMarci() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Meet Marci</p>

        <figure className={styles.quote}>
          <blockquote className={styles.quoteText}>
            <p>I love that small-town feeling that our community offers.</p>
          </blockquote>
          <figcaption className={styles.quoteBy}>Marci, on life in Pahrump</figcaption>
        </figure>

        <div className={styles.grid}>
          <FramedImage
            className={styles.portrait}
            src={portrait}
            alt="Portrait of Marci Metzger"
            width="1632"
            height="2449"
          />

          <div className={styles.text}>
            <h2 id="about-title" className={styles.name}>
              Marci Metzger
            </h2>
            <p className={styles.tagline}>Realtor for nearly three decades</p>
            <p className={styles.bio}>
              Marci has guided buyers and sellers since 1995. She began her career as a REALTOR® in
              Washington State, where she became a licensed Broker, and now calls Southern Nevada
              home, living in the Mountain Falls community and helping clients across the Pahrump
              area.
            </p>

            <ul className={styles.credentials} aria-label="Credentials">
              {CREDENTIALS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <a href={PHONE_HREF} className={styles.phone}>
              <FiPhone aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}