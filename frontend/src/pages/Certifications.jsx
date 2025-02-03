// src/pages/Certifications.jsx
import React, { useState, useEffect } from 'react';
import styles from '../styles/Certifications.module.css';

const Certifications = () => {
  // State to store the fetched certificates
  const [certificates, setCertificates] = useState([]);
  // State to track which certificate is selected for the modal
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Fetch the certificates from your backend API (without trailing slash)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/certificates')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
      })
      .catch((error) =>
        console.error('Error fetching certificates:', error)
      );
  }, []);

  // Open the modal overlay for a given certificate
  const openModal = (cert) => {
    setSelectedCertificate(cert);
  };

  // Close the modal overlay
  const closeModal = () => {
    setSelectedCertificate(null);
  };

  // Open the certificate URL in a new browser tab
  const viewCertificate = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.container}>
      <h1>Certifications</h1>
      <ul className={styles.certList}>
        {certificates.map((cert) => (
          <li
            key={cert.id}
            className={styles.certItem}
            onClick={() => openModal(cert)}
          >
            {cert.small_image && (
              <img
                src={'http://127.0.0.1:8000' + cert.small_image}
                alt={cert.title}
                className={styles.thumb}
              />
            )}
            <div className={styles.certInfo}>
              <h2>{cert.title}</h2>
              <p>
                Acquired: {cert.acquired_at}
                {cert.expires_at && ` | Expires: ${cert.expires_at}`}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Overlay */}
      {selectedCertificate && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
          >
            <img
              src={'http://127.0.0.1:8000' + selectedCertificate.image}
              alt={selectedCertificate.title}
              className={styles.certImage}
            />

            {/* Provider Information */}
            {selectedCertificate.provider && (
              <div className={styles.providerInfo}>
                <p>
                  Provided by:{' '}
                  {selectedCertificate.provider_url ? (
                    <a
                      href={selectedCertificate.provider_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedCertificate.provider}
                    </a>
                  ) : (
                    selectedCertificate.provider
                  )}
                </p>
              </div>
            )}

            <div className={styles.modalButtons}>
              <button
                onClick={() =>
                  viewCertificate(selectedCertificate.cert_url)
                }
              >
                View Certificate
              </button>
              <button onClick={closeModal} className={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;
