import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, LinearProgress, Button } from '@mui/material';
import styles from '../styles/dashboard.module.css';

const CourseCard = ({ course }) => {
  return (
    <Card 
      className={styles.courseCard} 
      style={{ borderLeft: `5px solid ${course.color}` }}
      component={Link}
      to={`/courses/${course.id}`}
      sx={{
        textDecoration: 'none',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" className={styles.courseTitle}>
          {course.title}
        </Typography>
        <Typography color="textSecondary" className={styles.courseInstructor}>
          {course.instructor}
        </Typography>
        <div className={styles.progressContainer}>
          <Typography variant="body2" color="textSecondary">
            Progress: {course.progress}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={course.progress} 
            className={styles.progressBar}
          />
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
          component={Link}
          to={`/courses/${course.id}`}
        >
          View Course
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;