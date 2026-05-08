import Sidebar from './Sidebar';
import styles from './layout.module.css';
import { logout } from '@/app/login/actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminLayout}>
      <Sidebar logoutAction={logout} />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
