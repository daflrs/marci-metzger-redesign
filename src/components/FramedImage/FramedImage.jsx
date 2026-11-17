import styles from './FramedImage.module.css'

export default function FramedImage({ className = '', alt, ...imgProps }) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <img className={styles.image} alt={alt} loading="lazy" decoding="async" {...imgProps} />
    </div>
  )
}