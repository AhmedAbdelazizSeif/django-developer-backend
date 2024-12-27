import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import RepoCard from '../components/RepoCard';
import styles from '../styles/GithubPage.module.css';

const GithubPage = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const theme = {
    level0: '#161B22',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  };

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userRes = await fetch(
          `https://api.github.com/users/${process.env.REACT_APP_GITHUB_USERNAME}`,
          {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
            },
          }
        );
        const userData = await userRes.json();
        setUser(userData);

        const repoRes = await fetch(
          `https://api.github.com/users/${process.env.REACT_APP_GITHUB_USERNAME}/repos?per_page=100`,
          {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GITHUB_API_KEY}`,
            },
          }
        );
        let repoData = await repoRes.json();
        repoData = repoData
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        setRepos(repoData);
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
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
          username={process.env.REACT_APP_GITHUB_USERNAME}
          theme={theme}
          hideColorLegend
          hideMonthLabels
        />
      </div>
    </>
  );
};

export default GithubPage;
