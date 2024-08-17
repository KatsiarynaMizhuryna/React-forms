import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to="/">Main</Link>
      <Link className={styles.link} to="/uncontrolled-form">Uncontrolled Form</Link>
      <Link className={styles.link} to="/controlled-form">Controlled Form</Link>
    </nav>
  );
}
