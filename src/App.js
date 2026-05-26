// src/App.js - Material UI Version
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Paper, Avatar, Typography, IconButton, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import YouthAssessment from './YouthAssessment';
import Explore from './Explore';
import BottomNav from './components/BottomNav';
import Profile from './components/Profile';
import { onAuthChange, logOut } from './firebase';

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
  },
  shape: {
    borderRadius: 12,
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

  const runScreener = () => {
    let score = 0;
    Object.values(screenerAnswers).forEach(ans => score += parseInt(ans) || 0);
    let result = score <= 2 ? 'Minimal symptoms 🟢' : 
                 score <= 4 ? 'Mild symptoms 🟡' : 
                 score <= 6 ? 'Moderate symptoms 🟠' : 
                 'Severe symptoms - Get help 🔴';
    setScreenerResult({ score, result });
    
    if (score >= 6) alert('🚨 SAFETY ALERT: Please reach out to a CHW');
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ width: 50, height: 50, border: '5px solid rgba(255,255,255,0.3)', borderTop: '5px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
            <Typography sx={{ color: 'white' }}>Loading MoyoConnect...</Typography>
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
          <Container maxWidth="sm" sx={{ pb: 10, pt: 2 }}>
            {/* Header */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">Hello, {user?.email?.split('@')[0]}! 👋</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Role: {userRole}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>{userRole === 'youth' ? '🧒' : userRole === 'caregiver' ? '👪' : userRole === 'chw' ? '👩‍⚕️' : '💼'}</Avatar>
              </Box>
            </Paper>

            {/* Mood Check */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" gutterBottom>How are you feeling today?</Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                {['😢', '😐', '🙂', '😊', '🤩'].map((emoji, i) => (
                  <IconButton 
                    key={i} 
                    onClick={() => setMood(i+1)}
                    sx={{ 
                      fontSize: 32, 
                      bgcolor: mood === i+1 ? '#667eea' : '#f0f0f0',
                      '&:hover': { bgcolor: mood === i+1 ? '#764ba2' : '#e0e0e0' }
                    }}
                  >
                    {emoji}
                  </IconButton>
                ))}
              </Box>
            </Paper>

            {/* Journal */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Quick Journal</Typography>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What's on your mind today?"
                rows={3}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit', marginBottom: '10px' }}
              />
              <button onClick={saveJournalEntry} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Save Entry 💾</button>
            </Paper>

            {/* Crisis Button */}
            <button onClick={() => alert('Crisis Helpline: 0800-123-456')} style={{ background: '#f44336', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', width: '100%', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              🚨 I Need Help Now
            </button>
          </Container>
        );
    }
  };

  // If assessment was triggered from nav
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