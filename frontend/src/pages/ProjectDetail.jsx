import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ProjectDetail.module.css';
import ProjectSkills from '../components/ProjectSkills';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectName } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${encodeURIComponent(projectName)}`
        );
        setProjectData(response.data.project);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Error fetching project data: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (projectName) {
      fetchProject();
    } else {
      setError('No project name provided');
      setLoading(false);
    }
  }, [projectName]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!projectData) {
    return <div className={styles.error}>No project data available</div>;
  }

  // Convert escaped HTML from extended_description into real HTML
  const formattedDescription = projectData.extended_description
    ? projectData.extended_description
        .replace(/\\u003C/g, '<')
        .replace(/\\u003E/g, '>')
        .replace(/\\u0026/g, '&')
    : '';

  // Construct the full image URL
  const imageUrl = projectData.image 
    ? `http://127.0.0.1:8000${projectData.image}`
    : null;

  return (
    <div className={`${styles.container} ${styles.vscodeTheme}`}>
      <h1 className={styles.title}>{projectData.name}</h1>

      {imageUrl && (
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={projectData.name}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.content}>
        {/* Render the project description as HTML */}
        <div
          className={styles.extendedDescription}
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />

        {/* Skills / Technologies */}
        {projectData.skills && projectData.skills.length > 0 && (
          <div className={styles.skillsSection}>
            <h2>Technologies & Skills</h2>
            <ProjectSkills skills={projectData.skills} />
          </div>
        )}

        {/* Source Code */}
        {projectData.source_code ? (
          <div className={styles.sourceCode}>
            <h2>Source Code</h2>
            <a
              href={projectData.source_code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sourceLink}
            >
              View Repository
            </a>
          </div>
        ) : (
          <div className={styles.sourceCode}>
            <h2>Source Code</h2>
            <p>Not available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
