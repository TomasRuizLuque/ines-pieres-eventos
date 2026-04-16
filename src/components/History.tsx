import Image from 'next/image'
import styles from './History.module.css'

export default function History() {
  return (
    <section id="historia" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageInner}>
            <Image 
              src="/images/ines-profile.jpg" 
              alt="Inés Pieres" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <div className={styles.decorativeBlock}></div>
        </div>
        
        <div className={styles.content}>
          <span className={styles.label}>Nuestra Historia</span>
          <h2 className={styles.title}>Creando Emociones</h2>
          <p className={styles.body}>
            Soy Inés, y mi pasión es transformar espacios en ambientes donde se respiran emociones.
            Creo firmemente en la sutileza de los detalles y en el poder del diseño floral para contar historias.
          </p>
          <p className={styles.body}>
            Con años de experiencia en decoración y paisajismo, mi objetivo es que cada evento sea el reflejo 
            auténtico de quienes lo celebran, aportando calidez, elegancia y un toque orgánico que evoca la naturaleza.
          </p>
          <div className={styles.signature}>
            <span>Inés Pieres</span>
          </div>
        </div>
      </div>
    </section>
  )
}
