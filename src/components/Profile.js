// src/components/Profile.js
import React from 'react';
import { Container, Card, CardContent, Typography, Avatar, Box, Chip, Divider, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Profile = ({ user, userRole, handleLogout }) => {
  const getRoleIcon = () => {
    switch(userRole) {
      case 'youth': return '🧒';
      case 'caregiver': return '👪';
      case 'chw': return '👩‍⚕️';
      case 'worker': return '💼';
      default: return '🌟';
    }
  };

  const getRoleColor = () => {
    switch(userRole) {
      case 'youth': return '#667eea';
      case 'caregiver': return '#4CAF50';
      case 'chw': return '#2196F3';
      case 'worker': return '#FF9800';
      default: return '#9C27B0';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pb: 10, pt: 2 }}>
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ 
          background: `linear-gradient(135deg, ${getRoleColor()} 0%, ${getRoleColor()}dd 100%)`, 
          height: 120,
          position: 'relative'
        }} />
        
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -6, mb: 2 }}>
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              fontSize: 48,
              bgcolor: 'white',
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              {getRoleIcon()}
            </Avatar>
          </Box>
          
          <Typography variant="h5" textAlign="center" gutterBottom>
            {user?.email?.split('@')[0]}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Chip 
              label={userRole?.toUpperCase()} 
              sx={{ 
                bgcolor: getRoleColor(), 
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }} 
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <EmailIcon sx={{ color: '#667eea' }} />
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CalendarTodayIcon sx={{ color: '#667eea' }} />
            <Typography color="text.secondary">Joined {new Date().toLocaleDateString()}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <BadgeIcon sx={{ color: '#667eea' }} />
            <Typography color="text.secondary">Account verified ✓</Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Your Progress
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4" color="#4CAF50">3</Typography>
              <Typography variant="caption" color="text.secondary">Assessments</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4" color="#667eea">12</Typography>
              <Typography variant="caption" color="text.secondary">Journal Entries</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', flex: 1 }}>
              <Typography variant="h4" color="#FF9800">7</Typography>
              <Typography variant="caption" color="text.secondary">Activities Done</Typography>
            </Box>
          </Box>
          
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleLogout}
            sx={{ 
              bgcolor: '#f44336', 
              '&:hover': { bgcolor: '#d32f2f' },
              borderRadius: 3,
              py: 1.5
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
