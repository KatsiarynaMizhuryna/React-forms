import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/uncontrolled-form"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Uncontrolled Form
      </NavLink>
      <NavLink
        to="/controlled-form"
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        Controlled Form
      </NavLink>
    </nav>
  );
}
