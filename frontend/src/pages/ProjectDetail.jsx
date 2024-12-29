import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
      console.log('Fetching project:', projectName);
      try {
        setLoading(true);
        const response = await axios.get(
          `http://a-seif.zapto.org:8000/api/projects/${encodeURIComponent(projectName)}`
        );
        console.log('Response received:', response.data);
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
      console.log('No project name provided');
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

  // Parse the HTML string for extended description
  const formattedDescription = projectData.extended_description
    ? projectData.extended_description
        .replace(/\\u003C/g, '<')
        .replace(/\\u003E/g, '>')
        .replace(/\\u0026/g, '&')
    : '';

  // Construct the full image URL
  const imageUrl = projectData.image 
    ? `http://a-seif.zapto.org:8000${projectData.image}`
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
        <SyntaxHighlighter 
          language="markdown"
          style={dracula}
          className={styles.codeBlock}
          customStyle={{
            padding: '20px',
            borderRadius: '8px',
            margin: '20px 0'
          }}
        >
          {formattedDescription}
        </SyntaxHighlighter>

        {projectData.skills && projectData.skills.length > 0 && (
          <div className={styles.skillsSection}>
            <h2>Technologies & Skills</h2>
            <ProjectSkills skills={projectData.skills} />
          </div>
        )}

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