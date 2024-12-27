import React, { useMemo } from "react";
import styles from "../styles/ProjectCard.module.css";

const ProjectCard = ({ project }) => {
  const imageUrl = project.image
    ? `http://127.0.0.1:8000${project.image}`
    : "/placeholder.jpg";
  const truncatedDescription =
    project.description.length > 200
      ? `${project.description.slice(0, 200)}...`
      : project.description;

  const renderTags = useMemo(() => {
    let totalLength = 0;
    const visibleTags = [];

    for (const tag of project.tags) {
      if (totalLength + tag.length > 70) break;
      totalLength += tag.length;
      visibleTags.push(tag);
    }

    return (
      <div className={styles.tags}>
        {visibleTags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
        {totalLength < project.tags.join("").length && (
          <span className={styles.tag}>...</span>
        )}
      </div>
    );
  }, [project.tags]);

  return (
    <div className={styles.card}>
      <img
        style={{ borderRadius: "20px" }}
        src={imageUrl}
        height={300}
        width={600}
        alt={project.name}
      />
      <div className={styles.content}>
        <h3>{project.name}</h3>
        <p>{truncatedDescription}</p>
        {project.description.length > 200 && (
          <button className={styles.readMore}>View Project</button>
        )}
        {renderTags}
        <div className={styles.cta}>
          {project.source_code && (
            <a
              href={project.source_code}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.underline}
            >
              Source Code
            </a>
          )}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.underline}
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
