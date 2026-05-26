// src/App.js - Material UI Version
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Paper, Avatar, Typography, IconButton } from '@mui/material';
import Login from './Login';
import YouthAssessment from './YouthAssessment';
import Explore from './Explore';
import BottomNav from './components/BottomNav';
import Profile from './components/Profile';
import { onAuthChange, logOut } from './firebase';

// Create custom theme matching image_c0a59a.jpg & image_c0a1c1.png
const theme = createTheme({
  palette: {
    primary: {
      main: '#1A365D', // Deep Navy Blue from logo text
    },
    secondary: {
      main: '#70A643', // Leaf Green from logo accent
    },
    background: {
      default: '#F7FAFC', // Very soft grey/white page background
    },
    // Adding custom category palettes for reference
    categories: {
      youth: { bg: '#EBF4FF', text: '#2B6CB0' },       // Light Blue
      caregiver: { bg: '#F0FDF4', text: '#48BB78' },   // Light Green
      chw: { bg: '#FFF5F5', text: '#C53030' },         // Light Rose (Community Health Worker)
      employer: { bg: '#FAF5FF', text: '#6B46C1' },    // Light Purple
    }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    }
  },
  shape: {
    borderRadius: 16, // Smoother rounded corners matching the UI images
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mood, setMood] = useState(3);
  const [journalText, setJournalText] = useState('');
  const [screenerAnswers, setScreenerAnswers] = useState({});
  const [screenerResult, setScreenerResult] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const savedRole = localStorage.getItem(`moyo_role_${firebaseUser.email}`);
        if (savedRole) {
          setUserRole(savedRole);
          if (savedRole === 'youth') {
            const lastAssessment = localStorage.getItem('moyo_last_assessment');
            const needsAssessment = !lastAssessment || (Date.now() - new Date(JSON.parse(lastAssessment)?.date).getTime() > 7 * 24 * 60 * 60 * 1000);
            setShowAssessment(needsAssessment);
          }
        }
      } else {
        setUser(null);
        setUserRole(null);
        setShowAssessment(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    if (role === 'youth') {
      const lastAssessment = localStorage.getItem('moyo_last_assessment');
      const needsAssessment = !lastAssessment || (Date.now() - new Date(JSON.parse(lastAssessment)?.date).getTime() > 7 * 24 * 60 * 60 * 1000);
      setShowAssessment(needsAssessment);
    }
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setUserRole(null);
    setShowAssessment(false);
    setCurrentPage('dashboard');
  };

  const handleAssessmentComplete = (result) => {
    setShowAssessment(false);
    const assessmentData = {
      date: new Date().toISOString(),
      result: result
    };
    localStorage.setItem('moyo_last_assessment', JSON.stringify(assessmentData));
  };

  const saveJournalEntry = () => {
    alert('Journal saved! 🌟 Mood: ' + mood);
    setJournalText('');
  };

  // Dynamic background style helper based on current active user role
  const getRoleStyles = (role) => {
    switch(role) {
      case 'youth': return theme.palette.categories.youth;
      case 'caregiver': return theme.palette.categories.caregiver;
      case 'chw': return theme.palette.categories.chw;
      default: return theme.palette.categories.employer;
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#FFFFFF' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ width: 50, height: 50, border: '5px solid #E2E8F0', borderTop: '5px solid #1A365D', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
            <Typography sx={{ color: '#1A365D', fontWeight: 600 }}>Loading MoyoConnect...</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (!user || !userRole) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  if (userRole === 'youth' && showAssessment) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <YouthAssessment onComplete={handleAssessmentComplete} userEmail={user?.email} />
      </ThemeProvider>
    );
  }

  const renderContent = () => {
    const roleConfig = getRoleStyles(userRole);

    switch(currentPage) {
      case 'explore':
        return <Explore />;
      case 'profile':
        return <Profile user={user} userRole={userRole} handleLogout={handleLogout} />;
      case 'assessment':
        setShowAssessment(true);
        return null;
      default:
        return (
          <Container maxWidth="sm" sx={{ pb: 10, pt: 3 }}>
            
            {/* Header Module Styled like Category Cards in image_c0a59a.jpg */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 4, 
                backgroundColor: roleConfig.bg, 
                color: roleConfig.text,
                border: '1px solid rgba(0,0,0,0.02)'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#1A365D' }}>
                    Hello, {user?.email?.split('@')[0]}! 👋
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, textTransform: 'capitalize', fontWeight: 600 }}>
                    Portal: {userRole} Survey
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#1A365D', fontSize: '1.2rem' }}>
                  {userRole === 'youth' ? '🧒' : userRole === 'caregiver' ? '👪' : userRole === 'chw' ? '👩‍⚕️' : '💼'}
                </Avatar>
              </Box>
            </Paper>

            {/* Mood Check Module - Following image_c0a1c1.png clean frame layout */}
            <Paper elevation={0} sx={{ p: 2.5, mb: 3, border: '1px solid #E2E8F0', borderRadius: 4 }}>
              <Typography variant="subtitle1" sx={{ color: '#1A365D', fontWeight: 600, mb: 2 }}>
                How are you feeling today?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                {['😢', '😐', '🙂', '😊', '🤩'].map((emoji, i) => (
                  <IconButton 
                    key={i} 
                    onClick={() => setMood(i+1)}
                    sx={{ 
                      fontSize: 28, 
                      bgcolor: mood === i+1 ? roleConfig.bg : '#F7FAFC',
                      border: mood === i+1 ? `1px solid ${roleConfig.text}` : '1px solid #E2E8F0',
                      transition: '0.2s ease',
                      '&:hover': { bgcolor: mood === i+1 ? roleConfig.bg : '#EDF2F7' }
                    }}
                  >
                    {emoji}
                  </IconButton>
                ))}
              </Box>
            </Paper>

            {/* Journal Module - Matching clean line input design */}
            <Paper elevation={0} sx={{ p: 2.5, mb: 3, border: '1px solid #E2E8F0', borderRadius: 4 }}>
              <Typography variant="subtitle1" sx={{ color: '#1A365D', fontWeight: 600, mb: 1.5 }}>
                Quick Journal
              </Typography>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What's on your mind today?"
                rows={4}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #E2E8F0', 
                  borderRadius: '12px', 
                  fontFamily: 'inherit', 
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#F7FAFC',
                  marginBottom: '14px' 
                }}
              />
              <button 
                onClick={saveJournalEntry} 
                style={{ 
                  background: '#70A643', // Clean Brand Green
                  color: 'white', 
                  border: 'none', 
                  padding: '10px 22px', 
                  borderRadius: '12px', 
                  fontWeight: '600',
                  cursor: 'pointer' 
                }}
              >
                Save Entry 💾
              </button>
            </Paper>

            {/* Crisis Assistance Frame */}
            <button 
              onClick={() => alert('Crisis Helpline: 0800-123-456')} 
              style={{ 
                background: '#C53030', // Deep Red matching the layout constraints
                color: 'white', 
                border: 'none', 
                padding: '14px', 
                borderRadius: '12px', 
                width: '100%', 
                fontSize: '16px', 
                fontWeight: 'bold', 
                cursor: 'pointer', 
                marginTop: '5px',
                boxShadow: '0 4px 12px rgba(197, 48, 48, 0.2)'
              }}
            >
              🚨 I Need Help Now
            </button>
          </Container>
        );
    }
  };

  if (currentPage === 'assessment') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <YouthAssessment onComplete={handleAssessmentComplete} userEmail={user?.email} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ pb: 7 }}>
        {renderContent()}
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Box>
    </ThemeProvider>
  );
}

// Add animation style
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default App;
