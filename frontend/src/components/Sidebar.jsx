import {NavLink} from 'react-router-dom';
import FilesIcon from './icons/FilesIcon';
import GithubIcon from './icons/GithubIcon';
import CodeIcon from './icons/CodeIcon';
import PencilIcon from './icons/PencilIcon';
import MailIcon from './icons/MailIcon';
import AccountIcon from './icons/AccountIcon';
import SettingsIcon from './icons/SettingsIcon';
import Cert from './icons/Cert';
import styles from '../styles/Sidebar.module.css';

const sidebarTopItems = [
    {
        Icon: FilesIcon,
        path: '/',
    },
    {
        Icon: GithubIcon,
        path: '/github',
    },
    {
        Icon: CodeIcon,
        path: '/projects',
    },
    {
        Icon: Cert,
        path: '/certifications',
    },
    {
        Icon: PencilIcon,
        path: '/articles',
    },
    {
        Icon: MailIcon,
        path: '/contact',
    },

];

const sidebarBottomItems = [
    {
        Icon: AccountIcon,
        path: '/about',
    },
    {
        Icon: SettingsIcon,
        path: '/settings',
    },
];

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                {sidebarTopItems.map(({Icon, path}) => (
                    <NavLink
                        to={path}
                        key={path}
                        className={({isActive}) =>
                            `${styles.iconContainer} ${isActive ? styles.active : ''}`
                        }
                    >
                        <Icon
                            fill={({isActive}) =>
                                isActive ? 'rgb(225, 228, 232)' : 'rgb(106, 115, 125)'
                            }
                            className={styles.icon}
                        />
                    </NavLink>
                ))}
            </div>
            <div className={styles.sidebarBottom}>
                {sidebarBottomItems.map(({Icon, path}) => (
                    <NavLink
                        to={path}
                        key={path}
                        className={({isActive}) =>
                            `${styles.iconContainer} ${isActive ? styles.active : ''}`
                        }
                    >
                        <Icon
                            fill={({isActive}) =>
                                isActive ? 'rgb(225, 228, 232)' : 'rgb(106, 115, 125)'
                            }
                            className={styles.icon}
                        />
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;
