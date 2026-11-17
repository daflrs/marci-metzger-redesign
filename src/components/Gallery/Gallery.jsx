import { useCallback, useEffect, useRef, useState } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import Lightbox from '../Lightbox/Lightbox'
import { GALLERY } from '../../data/gallery'
import { useInView } from '../../hooks/useInView'
import styles from './Gallery.module.css'

const ROTATE_EVERY = 7000

export default function Gallery() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, threshold: 0.3 })

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const count = GALLERY.length
  const current = GALLERY[index]

  // Rotate only while visible, not paused, not being hovered/focused,
  // not behind the lightbox, and never for reduced-motion visitors
  const rotating = inView && !paused && !interacting && !lightboxOpen && !reducedMotion

  useEffect(() => {
    if (!rotating) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_EVERY)
    return () => clearInterval(timer)
  }, [rotating, count])

  const openAt = (i) => {
    setIndex(i)
    setLightboxOpen(true)
  }

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  return (
    <section id="gallery" ref={sectionRef} className={styles.section} aria-labelledby="gallery-title">
      <div className={styles.inner}>
        <h2 id="gallery-title" className={styles.title}>
          Photo Gallery
        </h2>

        <div
          className={styles.grid}
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocus={() => setInteracting(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false)
          }}
        >
          <div className={styles.stageWrap}>
            <button
              type="button"
              className={styles.stage}
              onClick={() => openAt(index)}
              aria-label={`Enlarge photo: ${current.alt}`}
            >
              {GALLERY.map((photo, i) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt=""
                  className={`${styles.stageImage} ${i === index ? styles.visible : ''}`}
                  loading="lazy"
                  decoding="async"
                />
              ))}
              <span className={styles.stageCaption}>{current.place}</span>
            </button>
          </div>

          {GALLERY.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={`${styles.tile} ${i === index ? styles.active : ''}`}
              onClick={() => openAt(i)}
              aria-label={`Enlarge photo: ${photo.alt}`}
            >
              <img src={photo.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}

          <div className={styles.info}>
            <p className={styles.infoPlace}>{current.place}</p>
            <p className={styles.counter}>
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
            {!reducedMotion && (
              <button type="button" className={styles.pause} onClick={() => setPaused((p) => !p)}>
                {paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}
                {paused ? 'Play slideshow' : 'Pause slideshow'}
              </button>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        photos={GALLERY}
        index={index}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={setIndex}
      />
    </section>
  )
}