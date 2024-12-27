import React from 'react';
import { Link } from 'react-router-dom';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.background}>
          <h1>I BUILD</h1>
          <h1>WEBSITES</h1>
        </div> */}
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Ahmed Abdelaziz <span style={{ color: 'red' }}>Seif</span></h1>
            <h6 className={styles.bio}>Data Scientist | Backend Developer</h6>
            <Link to="/projects">
              <button className={styles.button}>Click me to what I can do</button>
            </Link>
            <Link to="/contact">
              <button className={styles.outlined}>Contact Me</button>
            </Link>
          </div>
          <Illustration className={styles.illustration} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
