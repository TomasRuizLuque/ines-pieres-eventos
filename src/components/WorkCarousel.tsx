'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './WorkCarousel.module.css'

const works = [
  { src: '/images/casamiento-1.jpg', title: 'Casamiento en Estancia', type: 'Casamiento' },
  { src: '/images/casamiento-agos-manu.jpg', title: 'Agos & Manu', type: 'Casamiento' },
  { src: '/images/evento-corporativo.jpg', title: 'Gala de Fin de Año', type: 'Corporativo' },
  { src: '/images/event-1.jpg', title: 'Atardecer', type: 'Social' },
  { src: '/images/celebracion-intima.jpg', title: 'Celebración Íntima', type: 'Social' },
  { src: '/images/event-2.jpg', title: 'Ambientación Floral', type: 'Detalle' },
]

export default function WorkCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 10)
    }
  }

  const stopScrolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startScrollingLeft = () => {
    stopScrolling()
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -4, behavior: 'auto' })
        if (scrollRef.current.scrollLeft <= 0) {
          stopScrolling()
        }
      }
    }, 16)
  }

  const startScrollingRight = () => {
    stopScrolling()
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 4, behavior: 'auto' })
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth) {
          stopScrolling()
        }
      }
    }, 16)
  }

  useEffect(() => {
    checkScroll() // eval on mount
  }, [])

  return (
    <section id="trabajos" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Trabajos</h2>
          <p className={styles.subtitle}>
            Cada evento cuenta una historia única. Descubrí cómo diseñamos ambientes mágicos que despiertan emociones y se convierten en recuerdos inolvidables.
          </p>
        </div>
        
        <div className={styles.carouselWrapper}>
          {showLeftArrow && (
            <button 
              className={`${styles.carouselArrow} ${styles.arrowLeft}`} 
              onPointerDown={startScrollingLeft}
              onPointerUp={stopScrolling}
              onPointerLeave={stopScrolling}
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          )}
          
          <div className={styles.carouselContainer} ref={scrollRef} onScroll={checkScroll}>
            {works.map((work, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image 
                  src={work.src} 
                  alt={work.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw"
                />
              </div>
              <div className={styles.cardOverlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.cardType}>{work.type}</span>
                  <h3 className={styles.cardTitle}>{work.title}</h3>
                </div>
              </div>
            </div>
          ))}
          </div>

          <button 
            className={`${styles.carouselArrow} ${styles.arrowRight}`} 
            onPointerDown={startScrollingRight}
            onPointerUp={stopScrolling}
            onPointerLeave={stopScrolling}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

