import { useEffect, useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useInView } from '../../hooks/useInView'
import styles from './GetItSold.module.css'

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function CountUp({ to, decimals = 0, prefix = '', suffix = '', start }) {
  // Reduced-motion visitors see the final number straight away
  const [value, setValue] = useState(() => (prefersReducedMotion() ? to : 0))

  useEffect(() => {
    if (!start || prefersReducedMotion()) return
    const duration = 1800
    const startTime = performance.now()
    let frame

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(to * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, to])

  return (
    <span aria-hidden="true">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function GetItSold({ onOpenSearch }) {
  const statsRef = useRef(null)
  const statsVisible = useInView(statsRef)

  return (
    <section className={styles.section} aria-labelledby="sold-title">
      <div className={styles.inner}>
        {/* ---------- Proof ---------- */}
        <div className={styles.proof}>
          <div className={styles.intro}>
            <h2 id="sold-title" className={styles.title}>
              Get It Sold
            </h2>
            <h3 className={styles.label}>Top Residential Sales Last 5 Years</h3>
            <p className={styles.copy}>
              Our team works hard every day to grow and learn, so that we may continue to excel in
              our market. Our clients deserve our best, &amp; we want to make sure our best is better
              every year.
            </p>
          </div>

          <dl className={styles.stats} ref={statsRef}>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Clients helped in 2021</dt>
              <dd className={styles.statValue}>
                <span className={styles.statPrefix}>Nearly</span>
                <CountUp to={90} start={statsVisible} />
                <span className="sr-only">90</span>
              </dd>
            </div>
            <div className={styles.stat}>
              <dt className={styles.statLabel}>Closed in sales in 2021</dt>
              <dd className={styles.statValue}>
                <CountUp to={28.5} decimals={1} prefix="$" suffix="M" start={statsVisible} />
                <span className="sr-only">$28.5 million</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* ---------- Two paths ---------- */}
        <div className={styles.paths}>
          <article className={styles.path}>
            <p className={styles.pathEyebrow}>Selling?</p>
            <h3 className={styles.pathTitle}>Don&rsquo;t Just List It&hellip;</h3>
            <p className={styles.pathCopy}>
              Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of
              every possible buyer, getting you top dollar for your home.
            </p>
            <a href="#contact" className={styles.pathLink}>
              Talk to Marci about selling <FiArrowRight aria-hidden="true" />
            </a>
          </article>

          <article className={styles.path}>
            <p className={styles.pathEyebrow}>Buying?</p>
            <h3 className={styles.pathTitle}>Guide to Buyers</h3>
            <p className={styles.pathCopy}>
              Nobody knows the market like we do. Enjoy having a pro at your service. Market
              analysis, upgrades lists, contractors on speed dial, &amp; more!
            </p>
            <button type="button" className={styles.pathLink} onClick={() => onOpenSearch()}>
              Start your search <FiArrowRight aria-hidden="true" />
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}