import styles from './Navigation.module.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navigation() {
  // const location = useLocation();
  // const currentPath = location.pathname;
  return (
    <nav className={styles.navigation}>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
      >
        Home
      </NavLink>
      <NavLink 
        to="/uncontrolled-form" 
        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
      >
        Uncontrolled Form
      </NavLink>
      <NavLink 
        to="/controlled-form" 
        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
      >
        Controlled Form
      </NavLink>
      
    </nav>
  );
}
