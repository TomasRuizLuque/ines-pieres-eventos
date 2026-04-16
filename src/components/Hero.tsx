'use client'

import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const BWORDS = ['Casamientos', 'Eventos Corporativos', 'Cumpleaños', 'Momentos Únicos']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % BWORDS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Transformando tus
          <br />
          <span className={styles.dynamicWord} key={wordIndex}>
            {BWORDS[wordIndex]}
          </span>
        </h1>
        <p className={styles.subtitle}>
          Ambientación elegante y profesional. Creamos experiencias memorables.
        </p>
        <a href="#trabajos" className={styles.scrollBtn}>
          Descubrir más
        </a>
      </div>
    </section>
  )
}
