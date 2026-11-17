import { useEffect, useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import FramedImage from '../FramedImage/FramedImage'
import living from '../../assets/images/services-1.jpg'
import house from '../../assets/images/services-2.jpg'
import handshake from '../../assets/images/services-3.jpg'
import styles from './Services.module.css'

const SERVICES = [
  {
    title: 'Real Estate Done Right',
    text: "Nervous about your property adventure? Don’t be. Whether you’re getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!",
    image: living,
    alt: 'Bright, modern living room',
    cta: { label: 'Talk to Marci', href: '#contact' },
  },
  {
    title: 'Commercial & Residential',
    text: 'Large or small, condo or mansion, we can find it and get at the price that’s right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars.',
    image: house,
    alt: 'Single-family home with a green lawn',
    cta: { label: 'Browse properties', action: 'search' },
  },
  {
    title: 'Rely on Expertise',
    text: 'If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.',
    image: handshake,
    alt: 'An agent and client shaking hands over a desk',
    cta: { label: 'Ask about financing', href: '#contact' },
  },
]

export default function Services({ onOpenSearch }) {
  const [active, setActive] = useState(0)
  const itemRefs = useRef([])

  // Whichever service crosses the middle of the screen becomes active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    itemRefs.current.forEach((element) => element && observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.inner}>
        <h2 id="services-title" className={styles.title}>
          Our Services
        </h2>

        <div className={styles.layout}>
          {/* Desktop: one photo that stays put and changes with the text */}
          <div className={styles.sticky} aria-hidden="true">
            <div className={styles.frame}>
              {SERVICES.map((service, i) => (
                <img
                  key={service.title}
                  src={service.image}
                  alt=""
                  className={`${styles.stickyImage} ${i === active ? styles.visible : ''}`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>

          <ol className={styles.list}>
            {SERVICES.map((service, i) => (
              <li
                key={service.title}
                ref={(element) => {
                  itemRefs.current[i] = element
                }}
                data-index={i}
                className={`${styles.item} ${i === active ? styles.current : ''}`}
              >
                {/* Mobile + tablet portrait: each service shows its own photo */}
                <FramedImage className={styles.inlineImage} src={service.image} alt={service.alt} />

                <span className={styles.number} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className={styles.itemTitle}>{service.title}</h3>
                <p className={styles.itemText}>{service.text}</p>

                {service.cta.action === 'search' ? (
                  <button type="button" className={styles.link} onClick={() => onOpenSearch()}>
                    {service.cta.label} <FiArrowRight aria-hidden="true" />
                  </button>
                ) : (
                  <a href={service.cta.href} className={styles.link}>
                    {service.cta.label} <FiArrowRight aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}