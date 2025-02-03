import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ChevronRight from '../components/icons/ChevronRight';
import styles from '../styles/Explorer.module.css';

const explorerItems = [
    {
        name: 'home.md',
        path: '/',
        icon: 'markdown_icon.svg',
    },
    {
        name: 'about.py',
        path: '/about',
        icon: 'python.svg',
    },
    {
        name: 'contact.sh',
        path: '/contact',
        icon: 'bash.svg',
    },
    {
        name: 'projects.js',
        path: '/projects',
        icon: 'js_icon.svg',
    },
    {
        name: 'articles.json',
        path: '/articles',
        icon: 'json_icon.svg',
    },
    {
        name: 'github.md',
        path: '/github',
        icon: 'markdown_icon.svg',
    },
    {
        name: 'certificates.pem',
        path: '/certifications',
        icon: 'cert.svg',
    },
];

const Explorer = () => {
    const [portfolioOpen, setPortfolioOpen] = useState(true);

    return (
        <div className={styles.explorer}>
            <p className={styles.title}>Explorer</p>
            <div>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    id="portfolio-checkbox"
                    checked={portfolioOpen}
                    onChange={() => setPortfolioOpen(!portfolioOpen)}
                />
                <label htmlFor="portfolio-checkbox" className={styles.heading}>
                    <ChevronRight
                        className={styles.chevron}
                        style={portfolioOpen ? {transform: 'rotate(90deg)'} : {}}
                    />
                    Portfolio
                </label>
                <div
                    className={styles.files}
                    style={portfolioOpen ? {display: 'block'} : {display: 'none'}}
                >
                    {explorerItems.map((item) => (
                        <Link to={item.path} key={item.name}>
                            <div className={styles.file}>
                                <img
                                    src={`/${item.icon}`}
                                    alt={item.name}
                                    height={18}
                                    width={18}
                                />
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Explorer;
