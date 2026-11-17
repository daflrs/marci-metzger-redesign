import { useCallback, useEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { useDialog } from '../../hooks/useDialog'
import styles from './Lightbox.module.css'

export default function Lightbox({ photos, index, isOpen, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const touchStartX = useRef(null)
  const count = photos.length
  const photo = photos[index]

  useDialog(isOpen, onClose, dialogRef)

  const go = useCallback(
    (step) => onNavigate((index + step + count) % count),
    [index, count, onNavigate],
  )

  // Left/right arrow keys
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, go])

  return (
    <div className={`${styles.root} ${isOpen ? styles.open : ''}`}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        inert={!isOpen}
        onClick={(event) => {
          // Clicking the dark area (not the photo or buttons) closes it
          if (event.target === event.currentTarget) onClose()
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return
          const distance = event.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1)
          touchStartX.current = null
        }}
      >
        <button type="button" className={styles.close} aria-label="Close photo viewer" onClick={onClose}>
          <FiX aria-hidden="true" />
        </button>

        <figure className={styles.figure}>
          <img key={photo.src} src={photo.src} alt={photo.alt} className={styles.image} />
          <figcaption className={styles.caption}>
            <span>{photo.place}</span>
            <span aria-live="polite">
              {index + 1} / {count}
            </span>
          </figcaption>
        </figure>

        <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-label="Previous photo" onClick={() => go(-1)}>
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next photo" onClick={() => go(1)}>
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}