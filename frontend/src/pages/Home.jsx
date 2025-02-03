import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Illustration from '../components/Illustration';
import styles from '../styles/HomePage.module.css';

/**
 * HomePage Component
 */
const HomePage = () => {
  // State to store person data fetched from backend
  const [person, setPerson] = useState(null);

  // State to store which part of the name to highlight in red
  const [highlightIndex, setHighlightIndex] = useState(null);

  // Fetch person data from backend on component mount
  useEffect(() => {
    const fetchPersonData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get_person');
        if (response.ok) {
          const data = await response.json();
          setPerson(data);

          // Split the name into parts and randomly select one to highlight
          const nameParts = data.name.split(' ');
          if (nameParts.length === 3) {
            const randomIndex = Math.floor(Math.random() * 3); // 0, 1, or 2
            setHighlightIndex(randomIndex);
          }
        } else {
          console.error('Failed to fetch person data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching person data:', error);
      }
    };

    fetchPersonData();
  }, []);

  // Helper function to remove 'https://www.' from URLs for display
  const formatUrlDisplay = (url = '') => {
    return url.replace(/^https?:\/\/(www\.)?/, '');
  };

  // If person data is not yet loaded, show a loading state
  if (!person) {
    return (
      <div className={styles.container}>
        <div className={styles.foreground}>
          <div className={styles.content}>
            <h1 className={styles.name}>Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  // Split the name into parts
  const nameParts = person.name.split(' '); // ["Ahmed", "Abdelaziz", "Seif"]

  return (
    <div className={styles.container}>
      <div className={styles.foreground}>
        <div className={styles.content}>
          {/* Render the name with one part highlighted in red */}
          <h1 className={styles.name}>
            {nameParts.map((part, index) => (
              <span key={index} style={index === highlightIndex ? { color: 'red' } : {}}>
                {part} {index < nameParts.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          {/* Render the title fetched from backend */}
          <h6 className={styles.bio}>{person.title}</h6>

          {/* Optional: Background text can remain as is or be dynamic */}
          <div className={styles.background}>
            {/* You can choose to make this dynamic or keep it static */}
          </div>

          {/* Buttons */}
          <Link to="/projects">
            <button className={styles.button}>Click me to see what I can do</button>
          </Link>
          <Link to="/contact">
            <button className={styles.outlined}>Contact Me</button>
          </Link>
        </div>

        

        {/* Existing Illustration Component */}
        <Illustration className={styles.illustration} />
        {/* Display the image fetched from backend */}
        {person.image && (
          <img
          src={`http://127.0.0.1:8000${person.image}`}
            alt={`${person.name}'s profile`}
            className={styles.profileImage} // Add a new CSS class for styling
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
