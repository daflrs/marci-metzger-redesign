import { useCallback, useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useDialog } from '../../hooks/useDialog'
import {
  BATH_OPTIONS,
  BEDROOM_OPTIONS,
  MAX_PRICES,
  MIN_PRICES,
  PROPERTY_TYPES,
  SORT_OPTIONS,
  formatPrice,
} from '../../data/search'
import styles from './SearchModal.module.css'

const INITIAL_FILTERS = {
  location: 'Pahrump, NV',
  type: '',
  sort: 'Newest',
  beds: '',
  baths: '',
  minPrice: '',
  maxPrice: '',
}

const FIELD_IDS = {
  location: 'search-location',
  type: 'search-type',
  price: 'search-min-price',
}

// Turns the chosen filters into one readable line, e.g. "Land · 3+ beds · $250K–$400K · Pahrump, NV"
function summarize(filters) {
  const parts = []
  if (filters.type) parts.push(filters.type)
  if (filters.beds === 'studio') parts.push('Studio')
  else if (filters.beds) parts.push(`${filters.beds}+ beds`)
  if (filters.baths) parts.push(`${filters.baths}+ baths`)

  const min = Number(filters.minPrice)
  const max = Number(filters.maxPrice)
  if (min && max) parts.push(`${formatPrice(min)}–${formatPrice(max)}`)
  else if (min) parts.push(`from ${formatPrice(min)}`)
  else if (max) parts.push(`up to ${formatPrice(max)}`)

  parts.push(filters.location.trim() || 'Pahrump, NV')
  return parts.join(' · ')
}

function Select({ id, label, value, onChange, children, className = '' }) {
  return (
    <label className={`${styles.field} ${className}`} htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  )
}

export default function SearchModal({ isOpen, initialField, onClose }) {
  const dialogRef = useRef(null)
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [step, setStep] = useState('form') // 'form' → 'results' → 'thanks'
  const [email, setEmail] = useState('')

  // Close, then reset to the form once the fade-out has finished
  const handleClose = useCallback(() => {
    onClose()
    setTimeout(() => {
      setStep('form')
      setEmail('')
    }, 400)
  }, [onClose])

  useDialog(isOpen, handleClose, dialogRef)

  // Focus the field the visitor clicked in the search band
  useEffect(() => {
    if (!isOpen) return
    const id = FIELD_IDS[initialField] ?? FIELD_IDS.location
    document.getElementById(id)?.focus({ preventScroll: true })
  }, [isOpen, initialField])

  // The thank-you message closes itself
  useEffect(() => {
    if (step !== 'thanks') return
    const timer = setTimeout(handleClose, 2500)
    return () => clearTimeout(timer)
  }, [step, handleClose])

  const update = (key) => (event) => {
    const value = event.target.value
    setFilters((previous) => {
      const next = { ...previous, [key]: value }
      // Never allow a max price at or below the min price
      if (key === 'minPrice' && next.maxPrice && Number(next.maxPrice) <= Number(value)) {
        next.maxPrice = ''
      }
      return next
    })
  }

  const maxOptions = MAX_PRICES.filter((price) => !filters.minPrice || price > Number(filters.minPrice))

  return (
    <div className={`${styles.root} ${isOpen ? styles.open : ''}`}>
      <div className={styles.backdrop} onClick={handleClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        inert={!isOpen}
      >
        <div className={styles.head}>
          <h2 id="search-modal-title" className={styles.title}>
            Search Listings
          </h2>
          <button type="button" className={styles.close} aria-label="Close search" onClick={handleClose}>
            <FiX aria-hidden="true" />
          </button>
        </div>

        {step === 'form' && (
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault()
              setStep('results')
            }}
          >
            <label className={`${styles.field} ${styles.full}`} htmlFor="search-location">
              <span>Location</span>
              <input
                id="search-location"
                type="text"
                value={filters.location}
                onChange={update('location')}
                autoComplete="off"
              />
            </label>

            <Select id="search-type" label="Type" value={filters.type} onChange={update('type')}>
              <option value="">Any Type</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>

            <Select id="search-sort" label="Sort By" value={filters.sort} onChange={update('sort')}>
              {SORT_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>

            <Select id="search-beds" label="Bedrooms" value={filters.beds} onChange={update('beds')}>
              {BEDROOM_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select id="search-baths" label="Baths" value={filters.baths} onChange={update('baths')}>
              {BATH_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select id="search-min-price" label="Min Price" value={filters.minPrice} onChange={update('minPrice')}>
              <option value="">No Min</option>
              {MIN_PRICES.map((price) => (
                <option key={price} value={price}>
                  {formatPrice(price)}
                </option>
              ))}
            </Select>

            <Select id="search-max-price" label="Max Price" value={filters.maxPrice} onChange={update('maxPrice')}>
              <option value="">No Max</option>
              {maxOptions.map((price) => (
                <option key={price} value={price}>
                  {formatPrice(price)}
                  {price === 1000000 ? '+' : ''}
                </option>
              ))}
            </Select>

            <button type="submit" className={`${styles.submit} ${styles.full}`}>
              Search Now
            </button>
          </form>
        )}

        {step === 'results' && (
          <form
            className={styles.results}
            onSubmit={(event) => {
              event.preventDefault()
              setStep('thanks')
            }}
          >
            <p className={styles.summary}>
              Homes matching
              <strong>{summarize(filters)}</strong>
            </p>
            <label className={styles.field} htmlFor="search-email">
              <span>Your email</span>
              <input
                id="search-email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <button type="submit" className={styles.submit}>
              Send Me Listings
            </button>
          </form>
        )}

        {step === 'thanks' && (
          <p className={styles.thanks} role="status" tabIndex={-1} autoFocus>
            Thanks — Marci will be in touch.
          </p>
        )}
      </div>
    </div>
  )
}