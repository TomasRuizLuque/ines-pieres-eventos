'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isOverContact, setIsOverContact] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const contacto = document.getElementById('contacto');
      let overContact = false;
      if (contacto) {
        const rect = contacto.getBoundingClientRect();
        if (rect.top <= 80) {
          overContact = true;
        }
      }
      setIsOverContact(overContact);
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tarea 5: Ir arriba fluido al hacer clic en el logo
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Si usamos Next.js router podríamos también pushear temporalmente, pero window.scrollTo es más limpio
    window.history.pushState(null, '', '/')
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${isOverContact ? styles.overContact : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/" onClick={scrollToTop}>
            <Image
              src={scrolled ? "/images/Logos Ines Pieres/4.png" : "/images/Logos Ines Pieres/3.png"}
              alt="Inés Pieres Logo"
              width={180}
              height={99}
              style={{ objectFit: 'contain' }}
              priority
            />
          </a>
        </div>
        <nav className={styles.nav}>
          <a href="#trabajos">Nuestros Trabajos</a>
          <a href="#historia">Historia</a>
          <a href="#contacto" className={styles.cta}>Contacto</a>
        </nav>
      </div>
    </header>
  )
}
