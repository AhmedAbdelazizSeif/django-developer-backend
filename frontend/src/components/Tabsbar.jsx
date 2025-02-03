import Tab from './Tab';
import styles from '../styles/Tabsbar.module.css';

const Tabsbar = () => {
    return (
        <div className={styles.tabs}>
            <Tab icon="/markdown_icon.svg" filename="home.md" path="/"/>
            <Tab icon="/python.svg" filename="about.py" path="/about"/>
            <Tab icon="/bash.svg" filename="contact.sh" path="/contact"/>
            <Tab icon="/js_icon.svg" filename="projects.js" path="/projects"/>
            <Tab icon="/json_icon.svg" filename="articles.json" path="/articles"/>
            <Tab icon="/markdown_icon.svg" filename="github.md" path="/github"/>
            <Tab icon="/cert.svg" filename="certificates.pem" path="/certifications"/>
        </div>
    );
};

export default Tabsbar;
