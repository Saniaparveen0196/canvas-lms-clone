import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, courseModules } from '../data/courses';
import { assignments } from '../data/assignments';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Box,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Videocam as VideocamIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import styles from '../styles/courseDetail.module.css';
import { useSidebar } from '../context/SidebarContext';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const course = courses.find(c => c.id === parseInt(id));
  const { desktopOpen } = useSidebar();

  if (!course) {
    return (
      <div className={styles.notFound}>
        <Typography variant="h4">Course not found</Typography>
        <Link to="/" className={styles.backLink}>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className={styles.courseDetail}>
      <Sidebar />
      <main className={`${styles.mainContent} ${desktopOpen ? styles.desktopOpen : ''}`}>
        <Header userName="John Doe" />

        <Breadcrumbs
          items={[
            { text: 'Dashboard', link: '/' },
            { text: course.title }
          ]}
        />

        {/* Course Header */}
        <div className={styles.courseHeader}>
          <div className={styles.courseInfo}>
            <Typography variant="h4" className={styles.courseTitle}>
              {course.title}
            </Typography>
            <Typography variant="subtitle1" className={styles.instructor}>
              Instructor: {course.instructor}
            </Typography>

            <div className={styles.progressContainer}>
              <Typography variant="body2">Progress: {course.progress}%</Typography>
              <LinearProgress
                variant="determinate"
                value={course.progress}
                className={styles.progressBar}
              />
            </div>

            <div className={styles.courseMeta}>
              <Chip label={`Course ID: ${course.id}`} size="small" />
              <Chip
                label={course.progress >= 100 ? 'Completed' : 'In Progress'}
                color={course.progress >= 100 ? 'success' : 'primary'}
                size="small"
              />
            </div>
          </div>

          <div className={styles.courseColor} style={{ backgroundColor: course.color }}>
            {/* Optional Course Image */}
            {/* Uncomment below if course.image exists */}
            {/* {course.image && (
              <img
                src={course.image}
                alt="Course Icon"
                style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover' }}
              />
            )} */}
          </div>
        </div>

        {/* Tab Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Assignments" />
            <Tab label="Grades" />
            <Tab label="Resources" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 0 && (
            <div className={styles.overviewTab}>
              <Typography variant="h5" gutterBottom>
                Course Overview
              </Typography>
              <Typography paragraph>
                This course covers the fundamental concepts and techniques of {course.title}.
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Course Modules
              </Typography>
              {courseModules.map((module) => (
                <Accordion key={module.id} className={styles.moduleAccordion}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={styles.moduleTitle}>
                      Module {module.id}: {module.title}
                    </Typography>
                    <Typography className={styles.moduleStatus}>
                      {module.completed ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <RadioButtonUncheckedIcon color="action" fontSize="small" />
                      )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={styles.moduleContent}>
                      {module.items.map((item) => (
                        <div key={item.id} className={styles.moduleItem}>
                          <div className={styles.itemIcon}>
                            {item.type === 'video' && <VideocamIcon color="primary" />}
                            {item.type === 'reading' && <MenuBookIcon color="primary" />}
                            {item.type === 'assignment' && <AssignmentIcon color="primary" />}
                          </div>
                          <div className={styles.itemDetails}>
                            <Typography>{item.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {item.duration && `${item.duration} min`}
                              {item.pages && `${item.pages} pages`}
                            </Typography>
                          </div>
                          <div className={styles.itemStatus}>
                            {item.completed ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <RadioButtonUncheckedIcon color="action" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div className={styles.assignmentsTab}>
              <Typography variant="h5" gutterBottom>
                Assignments
              </Typography>
              <Table className={styles.assignmentsTable}>
                <TableHead>
                  <TableRow>
                    <TableCell>Assignment</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Chip
                          label={assignment.status}
                          color={
                            assignment.status === 'Completed'
                              ? 'success'
                              : assignment.status === 'Pending'
                              ? 'warning'
                              : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{assignment.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 2 && (
            <div className={styles.gradesTab}>
              <Typography variant="h5" gutterBottom>
                Grades
              </Typography>
              <div className={styles.gradeSummary}>
                <Typography variant="h6">
                  Current Grade: <strong>85% (B)</strong>
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  className={styles.gradeProgress}
                />
              </div>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Grade Breakdown
              </Typography>
              <Table className={styles.gradesTable}>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Assignments</TableCell>
                    <TableCell>40%</TableCell>
                    <TableCell>82%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quizzes</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>88%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Projects</TableCell>
                    <TableCell>30%</TableCell>
                    <TableCell>85%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Participation</TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>95%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 3 && (
            <div className={styles.resourcesTab}>
              <Typography variant="h5" gutterBottom>
                Course Resources
              </Typography>
              <Typography paragraph>
                Additional materials and resources for this course will be posted here.
              </Typography>
              <div className={styles.resourceList}>
                <div className={styles.resourceItem}>
                  <Typography variant="h6">Syllabus</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Course syllabus and schedule
                  </Typography>
                </div>
                <div className={styles.resourceItem}>
                  <Typography variant="h6">Textbook</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Required reading materials
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
