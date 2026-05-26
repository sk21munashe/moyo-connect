// src/components/BottomNav.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';

const BottomNav = ({ currentPage, setCurrentPage }) => {
  const handleChange = (event, newValue) => {
    setCurrentPage(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        maxWidth: 600,
        margin: '0 auto',
        zIndex: 1000,
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentPage}
        onChange={handleChange}
        sx={{
          '& .Mui-selected': {
            color: '#667eea',
          },
          '& .MuiBottomNavigationAction-root': {
            color: '#999',
            '&:hover': {
              color: '#667eea',
            },
          },
        }}
      >
        <BottomNavigationAction label="Home" value="dashboard" icon={<HomeIcon />} />
        <BottomNavigationAction label="Explore" value="explore" icon={<ExploreIcon />} />
        <BottomNavigationAction label="Assessment" value="assessment" icon={<AssessmentIcon />} />
        <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;