// frontend/src/pages/SingleArticlePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
// Import additional languages as needed
import styles from '../styles/SingleArticlePage.module.css';

const SingleArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setArticle(data);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [article, language]);

  if (!article) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const titleToShow = language === 'en' ? article.name : article.name_ara;
  const descriptionToShow =
    language === 'en' ? article.description : article.description_ara;

  return (
    <div className={styles.container}>
      <div className={styles.articleWrapper}>
        <h1 className={styles.title}>{titleToShow}</h1>
        <span className={styles.date}>{article.created_at}</span>

        {article.image && (
          <img
            src={`http://127.0.0.1:8000${article.image}`}
            alt={article.name}
            className={styles.articleImage}
          />
        )}

        <div className={styles.switchContainer}>
          <button
            onClick={() => setLanguage('en')}
            className={language === 'en' ? styles.switchActive : styles.switchBtn}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={language === 'ar' ? styles.switchActive : styles.switchBtn}
          >
            عربي
          </button>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: descriptionToShow }}
          style={{
            textAlign: language === 'ar' ? 'right' : 'left',
            direction: language === 'ar' ? 'rtl' : 'ltr',
          }}
        />
      </div>
    </div>
  );
};

export default SingleArticlePage;
