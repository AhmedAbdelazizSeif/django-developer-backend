// src/pages/GithubPage.jsx
import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const GithubPage = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use an array with exactly 2 or 5 colors
  const theme = {
    dark: [
      '#161B22',
      '#0e4429',
      '#006d32',
      '#26a641',
      '#39d353',
    ],
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const backendURL = 'http://a-seif.zapto.org:8000/api/github';

        // Fetch User Data
        const userRes = await fetch(`${backendURL}/user/`);
        if (!userRes.ok) {
          throw new Error(`Error fetching user data: ${userRes.status} ${userRes.statusText}`);
        }
        const userData = await userRes.json();
        setUser(userData);

        // Fetch Repositories
        const repoRes = await fetch(`${backendURL}/repos/`);
        if (!repoRes.ok) {
          throw new Error(`Error fetching repositories: ${repoRes.status} ${repoRes.statusText}`);
        }
        const repoData = await repoRes.json();
        setRepos(repoData);
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Failed to load user data.</div>;
  }

  return (
    <>
      <div className={styles.user}>
        <div>
          <img
            src={user.avatar_url}
            className={styles.avatar}
            alt={user.login}
            width={50}
            height={50}
          />
          <h3 className={styles.username}>{user.login}</h3>
        </div>
        <div>
          <h3>{user.public_repos} repos</h3>
        </div>
        <div>
          <h3>{user.followers} followers</h3>
        </div>
      </div>
      <div className={styles.container}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className={styles.contributions}>
        <GitHubCalendar
          username={user.login}
          theme={theme}
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export default GithubPage;
