import React, { useState } from 'react';
import { Badge, IconButton, Popover, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBell = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New assignment posted in Web Development', time: '2 hours ago' },
    { id: 2, text: 'Grade updated for Data Structures Quiz', time: '1 day ago' },
    { id: 3, text: 'Instructor message: Project feedback', time: '3 days ago' }
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <div>
      <IconButton 
        aria-describedby={id} 
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: 300 }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem key={notification.id} divider>
                <ListItemText 
                  primary={notification.text}
                  secondary={notification.time}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default NotificationBell;