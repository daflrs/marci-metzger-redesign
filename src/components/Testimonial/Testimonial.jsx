import { FaStar } from 'react-icons/fa6'
import { FiArrowUpRight } from 'react-icons/fi'
import { CASE_STUDY, QUOTES, YELP } from '../../data/testimonials'
import styles from './Testimonial.module.css'

export default function Testimonial() {
  return (
    <section className={styles.section} aria-labelledby="stories-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Client Stories</p>
        <h2 id="stories-title" className={styles.title}>
          One weekend. Two homes. Closed early.
        </h2>

        <ol className={styles.steps}>
          {CASE_STUDY.steps.map((step, index) => (
            <li key={step.label} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                0{index + 1}
              </span>
              <h3 className={styles.stepLabel}>{step.label}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>

        <figure className={styles.feature}>
          <blockquote className={styles.featureQuote}>
            <p>{CASE_STUDY.quote}</p>
          </blockquote>
          <figcaption className={styles.byline}>
            {CASE_STUDY.name} · {CASE_STUDY.place} · via Yelp
          </figcaption>
        </figure>

        <div className={styles.quotes}>
          {QUOTES.map((item) => (
            <figure key={item.name} className={styles.quoteCard}>
              <blockquote className={styles.quote}>
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className={styles.byline}>
                {item.name} · {item.place} · via Yelp
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.rating}>
          <span className={styles.stars} aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} />
            ))}
          </span>
          <span>
            {YELP.rating} on Yelp · {YELP.count} reviews
          </span>
          <a href={YELP.href} target="_blank" rel="noopener noreferrer" className={styles.ratingLink}>
            Read all reviews on Yelp <FiArrowUpRight aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}