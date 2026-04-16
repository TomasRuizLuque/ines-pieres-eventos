'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  // Comienza vacío para que "nada más que eso" se muestre
  const [contactType, setContactType] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>¡Hablemos de tu evento!</h2>
          <p className={styles.subtitle}>Queremos conocer tu idea, tu estilo y lo que soñás para ese día. Completá el formulario y te vamos a contactar pronto para acompañarte en el proceso.</p>
        </div>
        
        <div className={styles.formBox}>
          {status === 'success' ? (
            <div className={styles.successMessage}>
              <h3>¡Gracias por escribirnos!</h3>
              <p>Hemos recibido tus datos correctamente. Nos contactaremos muy pronto para hablar.</p>
              <button type="button" onClick={() => {setStatus('idle'); setContactType('');}} className={styles.submitBtn}>Volver</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              
              <div className={styles.inputGroup}>
                <label htmlFor="tipoCotizacion">Tipo de Contacto</label>
                <select id="tipoCotizacion" name="tipoCotizacion" required value={contactType} onChange={(e) => setContactType(e.target.value)}>
                  {contactType === '' && <option value="" disabled hidden>Selecciona una opción</option>}
                  <option value="presupuesto">Solicitud de Presupuesto para Evento</option>
                  <option value="proveedor">Me gustaría ser proveedor</option>
                  <option value="otro">Otro Motivo</option>
                </select>
              </div>

              {/* OPCION 1: Presupuesto */}
              {contactType === 'presupuesto' && (
                <div className={styles.formSection}>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="nombreCompleto">Nombre Completo *</label>
                      <input type="text" id="nombreCompleto" name="nombreCompleto" required placeholder="Tu nombre" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="nombresNovios">Nombre de los Novios *</label>
                      <input type="text" id="nombresNovios" name="nombresNovios" required placeholder="Nombres de los novios" />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email *</label>
                      <input type="email" id="email" name="email" required placeholder="tu@email.com" />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="telefono">Teléfono *</label>
                      <input type="tel" id="telefono" name="telefono" required placeholder="+54 9 11 1234-5678" />
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="fecha">Fecha del Evento *</label>
                      <input type="date" id="fecha" name="fecha" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="cantidadPersonas">Cantidad de Personas *</label>
                      <input type="number" id="cantidadPersonas" name="cantidadPersonas" required placeholder="100" />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="lugar">Lugar del Evento *</label>
                    <input type="text" id="lugar" name="lugar" required placeholder="Salón, finca, etc." />
                  </div>

                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label>¿Es con ceremonia?</label>
                      <div className={styles.radioGroup}>
                        <label><input type="radio" name="ceremonia" value="si" /> Sí</label>
                        <label><input type="radio" name="ceremonia" value="no" defaultChecked /> No</label>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Formato cocktail o formal?</label>
                      <div className={styles.radioGroup}>
                        <label><input type="radio" name="formato" value="cocktail" /> Cocktail</label>
                        <label><input type="radio" name="formato" value="formal" defaultChecked /> Formal</label>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="estilo">Estilo Deseado</label>
                    <select id="estilo" name="estilo">
                      <option value="">Selecciona un estilo</option>
                      <option value="clasico">Clásico</option>
                      <option value="moderno">Moderno</option>
                      <option value="vintage">Vintage/Romántico</option>
                      <option value="campestre">Campestre/Rústico</option>
                      <option value="boho">Boho</option>
                      <option value="sofisticado">Sofisticado</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="presupuesto">Presupuesto destinado para ambientación *</label>
                    <select id="presupuesto" name="presupuesto" required>
                      <option value="">Selecciona un rango</option>
                      <option value="7M-10M">$7.000.000 a $10.000.000</option>
                      <option value="10M-15M">$10.000.000 a $15.000.000</option>
                      <option value="+15M">+ de $15.000.000</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="inspiracion">Enlaces de inspiraciones</label>
                    <textarea id="inspiracion" name="inspiracion" rows={3} placeholder="Comparte enlaces de tus pins de Pinterest, posts de Instagram o cualquier otra referencia visual que te inspire"></textarea>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="adjuntos">Archivos Adjuntos (Fotos, imágenes de inspiración, etc.)</label>
                    <input type="file" id="adjuntos" name="adjuntos" multiple accept="image/*" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="mensajeAdicional1">Mensaje Adicional (Opcional)</label>
                    <textarea id="mensajeAdicional1" name="mensajeAdicional" rows={3} placeholder="Cuéntanos más sobre tu evento..."></textarea>
                  </div>
                  
                  <button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Formulario'}
                  </button>
                </div>
              )}

              {/* OPCION 2: Proveedor */}
              {contactType === 'proveedor' && (
                <div className={styles.formSection}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="nombreProv">Nombre Completo</label>
                    <input type="text" id="nombreProv" name="nombreCompleto" placeholder="Tu nombre" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="empresa">Empresa</label>
                    <input type="text" id="empresa" name="empresa" placeholder="Nombre de tu empresa" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="servicio">Tipo de Servicio</label>
                    <input type="text" id="servicio" name="servicio" placeholder="Catering, fotografía, música..." required />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="telProv">Teléfono</label>
                      <input type="tel" id="telProv" name="telefono" placeholder="+54 9 11 1234-5678" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="emailProv">Email</label>
                      <input type="email" id="emailProv" name="email" placeholder="tu@email.com" required />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="web">Sitio Web o Redes Sociales (Opcional)</label>
                    <input type="url" id="web" name="web" placeholder="https://..." />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="msgProv">Mensaje (Opcional)</label>
                    <textarea id="msgProv" name="mensaje" rows={4} placeholder="Cuéntanos más sobre tus servicios..."></textarea>
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Formulario'}
                  </button>
                </div>
              )}

              {/* OPCION 3: Otro Motivo */}
              {contactType === 'otro' && (
                <div className={styles.formSection}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="nombreOtro">Nombre Completo</label>
                    <input type="text" id="nombreOtro" name="nombreCompleto" placeholder="Tu nombre" required />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="telOtro">Teléfono</label>
                      <input type="tel" id="telOtro" name="telefono" placeholder="+54 9 11 1234-5678" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="emailOtro">Email</label>
                      <input type="email" id="emailOtro" name="email" placeholder="tu@email.com" required />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="msgOtro">Mensaje</label>
                    <textarea id="msgOtro" name="mensaje" rows={4} placeholder="Escribe tu mensaje..." required></textarea>
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                    {status === 'submitting' ? 'Enviando...' : 'Enviar Formulario'}
                  </button>
                </div>
              )}

            </form>
          )}
        </div>
      </div>
    </section>
  )
}
