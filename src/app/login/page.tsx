'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './actions';
import styles from './page.module.css';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(password);
      
      if (result.success) {
        router.push('/admin');
        router.refresh(); // Force refresh to ensure layout picks up auth state
      } else {
        setError(result.error || 'Autenticación fallida');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <h1>INÉS PIERES</h1>
          <p>Panel de Administración</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña de acceso</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••••••"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={isLoading || !password}>
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Lock size={18} />
                Ingresar al panel
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
