import { FiSearch } from 'react-icons/fi'
import background from '../../assets/images/search-bg.jpg'
import styles from './SearchBand.module.css'

const SEGMENTS = [
  { field: 'location', label: 'Location', value: 'Pahrump, NV' },
  { field: 'type', label: 'Type', value: 'Any type' },
  { field: 'price', label: 'Price', value: 'Any price' },
]

export default function SearchBand({ onOpenSearch }) {
  return (
    <section id="listings" className={styles.section} aria-labelledby="search-title">
      <img className={styles.background} src={background} alt="" loading="lazy" decoding="async" />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <h2 id="search-title" className={styles.title}>
          Find Your Dream Home
        </h2>
        <p className={styles.prompt}>Where in Pahrump do you want to live?</p>

        <div className={styles.pill}>
          {SEGMENTS.map((segment) => (
            <button
              key={segment.field}
              type="button"
              className={styles.segment}
              onClick={() => onOpenSearch(segment.field)}
            >
              <span className={styles.segmentLabel}>{segment.label}</span>
              <span className={styles.segmentValue}>{segment.value}</span>
            </button>
          ))}
          <button type="button" className={styles.searchButton} onClick={() => onOpenSearch()}>
            <FiSearch aria-hidden="true" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </section>
  )
}