import React from 'react';
import { format } from 'date-fns';
import styles from '../styles/dashboard.module.css';
import NotificationBell from './NotificationBell';
import ThemeToggle from './ThemeToggle';

function Header({ userName }) {
    return (
        <header className={styles.header}>
            <div>
                <h1>Welcome, {userName}</h1>
                <p>{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
            </div>
            <ThemeToggle />
            <NotificationBell />
        </header>
    );
}

export default Header;