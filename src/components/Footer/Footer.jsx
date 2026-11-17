import { FiArrowUp } from 'react-icons/fi'
import ridge from '../../assets/images/logo-ridge.png'
import eho from '../../assets/images/logo-eho.png'
import realtor from '../../assets/images/logo-realtor.jpg'
import chamber from '../../assets/images/logo-chamber.jpg'
import { SOCIALS } from '../../data/site'
import styles from './Footer.module.css'

const AFFILIATIONS = [
  { src: ridge, alt: 'The Ridge Realty Group' },
  { src: eho, alt: 'Equal Housing Opportunity' },
  { src: realtor, alt: 'REALTOR®, member of the National Association of REALTORS®' },
  { src: chamber, alt: 'Pahrump Valley Chamber of Commerce' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <ul className={styles.logos} aria-label="Affiliations">
          {AFFILIATIONS.map((logo) => (
            <li key={logo.alt}>
              <img src={logo.src} alt={logo.alt} className={styles.logo} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>

        <div className={styles.bar}>
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} Marci Metzger. All Rights Reserved.
          </p>

          <ul className={styles.socials} aria-label="Social media">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <a href="#top" className={styles.top}>
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}