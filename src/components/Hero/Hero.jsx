import { FiChevronDown } from 'react-icons/fi'
import heroImage from '../../assets/images/hero-mountain-falls.jpg'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.image}
        src={heroImage}
        alt="Mountain Falls in Pahrump, Nevada"
        width="2560"
        height="1700"
        fetchPriority="high"
      />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>Marci Metzger — The Ridge Realty Group</p>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleInner}>Pahrump Realtor</span>
        </h1>
      </div>

      <a href="#about" className={styles.cue}>
        <span>Meet Marci</span>
        <span className={styles.cueCircle} aria-hidden="true">
          <FiChevronDown />
        </span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </section>
  )
}