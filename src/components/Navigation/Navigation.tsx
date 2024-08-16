import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to="/">Main</Link>
      <Link className={styles.link} to="/first-form">First Form</Link>
      <Link className={styles.link} to="/second-form">Second Form</Link>
    </nav>
  );
}
