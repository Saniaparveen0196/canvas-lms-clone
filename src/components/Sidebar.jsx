import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  School as CoursesIcon,
  CalendarToday as CalendarIcon,
  Mail as InboxIcon,
  Help as HelpIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Divider,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false); // New state for desktop toggle

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Courses', icon: <CoursesIcon />, path: '/courses' },
    { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
    { text: 'Inbox', icon: <InboxIcon />, path: '/inbox' },
    { text: 'Help', icon: <HelpIcon />, path: '/help' }
  ];

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDesktopToggle}
        className={styles.menuButton}
        sx={{ 
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <MenuIcon />
      </IconButton>
      
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className={styles.mobileDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="persistent"
        open={desktopOpen}
        className={styles.desktopDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#2c3e50',
            color: 'white'
          },
        }}
      >
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDesktopToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.text} 
              disablePadding
              component={Link}
              to={item.path}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;