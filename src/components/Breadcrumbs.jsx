import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../styles/courseDetail.module.css';

const Breadcrumbs = ({ items }) => {
  const location = useLocation();
  
  return (
    <MuiBreadcrumbs 
      aria-label="breadcrumb" 
      className={styles.breadcrumbs}
      separator="›"
    >
      <Link to="/" className={styles.breadcrumbLink}>
        <HomeIcon fontSize="small" />
      </Link>
      {items.map((item, index) => (
        index === items.length - 1 || !item.link ? (
          <Typography key={index} color="textPrimary">
            {item.text}
          </Typography>
        ) : (
          <Link key={index} to={item.link} className={styles.breadcrumbLink}>
            {item.text}
          </Link>
        )
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;