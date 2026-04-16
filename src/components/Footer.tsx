import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/images/Hojas PNG/2.png" alt="" className={styles.plantLeft} />
      <img src="/images/Hojas PNG/2.png" alt="" className={styles.plantRight} />
      
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Image
            src="/images/Logos Ines Pieres/1.png"
            alt="Inés Pieres Eventos"
            width={320}
            height={176}
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        <div className={styles.links}>
          <a href="mailto:eventos@inespieres.com" className={styles.linkItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            eventos@inespieres.com
          </a>
          <a href="https://www.instagram.com/inespieres.eventos/" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            @inespieres.eventos
          </a>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} Inés Pieres Eventos - Todos los derechos reservados</p>
      </div>
    </footer>
  )
}
