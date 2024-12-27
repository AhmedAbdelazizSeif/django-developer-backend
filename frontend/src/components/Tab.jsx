import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Tab.module.css';

const Tab = ({ icon, filename, path }) => {
  const location = useLocation();

  return (
    <Link to={path}>
      <div
        className={`${styles.tab} ${
          location.pathname === path ? styles.active : ''
        }`}
      >
        <img src={icon} alt={filename} height={18} width={18} />
        <p>{filename}</p>
      </div>
    </Link>
  );
};

export default Tab;
