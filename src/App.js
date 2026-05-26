// src/App.js - Material UI Version
import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Container, 
  Paper, 
  Avatar, 
  Typography, 
  IconButton 
} from '@mui/material';
import Login from './Login';
import YouthAssessment from './YouthAssessment';
import Explore from './Explore';
import BottomNav from './components/BottomNav';
import Profile from './components/Profile';
import { onAuthChange, logOut } from './firebase';

// 1. App Theme Configuration
const theme = createTheme({
  palette: {
    primary: { main: '#1A365D' },     // Brand Deep Navy
    secondary: { main: '#70A643' },   // Brand Leaf Green
    background: { default: '#FAFAFA' } // Clean Dashboard Slate
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});

export default function App() {
  // 2. Core App State
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [mood, setMood] = useState(null);
  const [journalText, setJournalText] = useState('');

  // 3. Simple Authentication Observer hook
  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const saveJournalEntry = () => {
    if (!journalText.trim()) return;
    alert(`Journal Saved: "${journalText}"`);
    setJournalText('');
  };

  // 4. Content Navigation Handler
  const renderContent = () => {
    if (!user) return <Login />;

    switch (currentPage) {
      case 'explore':
        return <Explore />;
      case 'assessment':
        return <YouthAssessment onBack={() => setCurrentPage('home')} />;
      case 'profile':
        return <Profile user={user} onLogOut={logOut} />;
      
      // THE NEW FULLY-LOADED DASHBOARD CASE
      case 'home':
      default:
        const dailyInsight = "Taking just 3 deep breaths can instantly reset your nervous system. Remember to pause today.";

        const recentActivities = [
          { id: 1, date: "Yesterday, 4:15 PM", mood: "😊", text: "Had a great productive session finishing up the dashboard layout." },
          { id: 2, date: "May 24, 10:30 AM", mood: "😐", text: "Feeling a bit overwhelmed with assignments, but making progress." }
        ];

        const resources = [
          { id: 1, title: "Managing Exam & Project Stress", readTime: "3 min read", icon: "🧠", color: "#EBF4FF" },
          { id: 2, title: "How to Build a Healthy Daily Routine", readTime: "5 min read", icon: "📅", color: "#F0FDF4" },
          { id: 3, title: "Grounding Techniques for Anxiety", readTime: "4 min read", icon: "🌱", color: "#FFF5F5" }
        ];

        return (
          <Container maxWidth="sm" sx={{ pb: 10, pt: 2 }}>
            
            {/* 1. Header & Greeting */}
            <Paper sx={{ p: 3, mb: 2, background: 'linear-gradient(135deg, #1A365D 0%, #2A4D7C 100%)', color: 'white', border: 'none', borderRadius: '14px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>Hello, {user?.email?.split('@')[0]}! 👋</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85, color: '#f0fdf4', fontWeight: 500 }}>Portal: Youth Survey</Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#70A643', color: 'white' }}>🧒</Avatar>
              </Box>
            </Paper>

            {/* 2. Streak & Progress Ribbons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Paper sx={{ flex: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderRadius: '12px', borderColor: '#E2E8F0' }}>
                <Typography sx={{ fontSize: 22 }}>🔥</Typography>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 700, color: '#1A365D', lineHeight: 1.2 }}>5 Days</Typography>
                  <Typography variant="caption" sx={{ color: '#718096' }}>Current Streak</Typography>
                </Box>
              </Paper>

              <Paper sx={{ flex: 1, p: 1.5, borderRadius: '12px', borderColor: '#E2E8F0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#718096' }}>Weekly Goal</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#70A643' }}>60%</Typography>
                </Box>
                <Box sx={{ width: '100%', height: '6px', bgcolor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <Box sx={{ width: '60%', height: '100%', bgcolor: '#70A643', borderRadius: '3px' }} />
                </Box>
              </Paper>
            </Box>

            {/* 3. Daily Insight Card */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: '#FAFAFA', borderColor: '#E2E8F0', borderLeft: '4px solid #1A365D', borderRadius: '4px 14px 14px 4px' }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <Typography sx={{ fontSize: 20 }}>💡</Typography>
                <Box>
                  <Typography variant="caption" sx={{ color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily Insight</Typography>
                  <Typography variant="body2" sx={{ color: '#2D3748', mt: 0.5, lineHeight: 1.5 }}>
                    {dailyInsight}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* 4. Mood Check Card */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: '14px', borderColor: '#E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1A365D' }} gutterBottom>How are you feeling today?</Typography>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mt: 1.5 }}>
                {['😢', '😐', '🙂', '😊', '🤩'].map((emoji, i) => (
                  <IconButton 
                    key={i} 
                    onClick={() => setMood(i+1)}
                    sx={{ 
                      fontSize: 28, 
                      bgcolor: mood === i+1 ? '#EBF4FF' : '#F7FAFC',
                      border: mood === i+1 ? '2px solid #1A365D' : '1px solid #E2E8F0',
                      transition: 'all 0.2s ease',
                      '&:hover': { bgcolor: mood === i+1 ? '#EBF4FF' : '#EDF2F7' }
                    }}
                  >
                    {emoji}
                  </IconButton>
                ))}
              </Box>
            </Paper>

            {/* 5. Core Feature: 4-Quadrant Survey Grid */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1A365D', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Assessments</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 4 }}>
              <Paper onClick={() => setCurrentPage('assessment')} sx={{ p: 2, bgcolor: '#EBF4FF', borderColor: '#BFDBFE', cursor: 'pointer', borderRadius: '14px', '&:hover': { boxShadow: 2 } }}>
                <Box sx={{ fontSize: 24, mb: 1 }}>🧒</Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2B6CB0' }}>Youth & Adolescents</Typography>
              </Paper>

              <Paper sx={{ p: 2, bgcolor: '#F0FDF4', borderColor: '#BBF7D0', cursor: 'pointer', borderRadius: '14px', '&:hover': { boxShadow: 2 } }}>
                <Box sx={{ fontSize: 24, mb: 1 }}>👪</Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#48BB78' }}>Parents & Caregivers</Typography>
              </Paper>

              <Paper sx={{ p: 2, bgcolor: '#FFF5F5', borderColor: '#FECACA', cursor: 'pointer', borderRadius: '14px', '&:hover': { boxShadow: 2 } }}>
                <Box sx={{ fontSize: 24, mb: 1 }}>👩‍⚕️</Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#C53030' }}>Community & NGO</Typography>
              </Paper>

              <Paper sx={{ p: 2, bgcolor: '#FAF5FF', borderColor: '#E9D5FF', cursor: 'pointer', borderRadius: '14px', '&:hover': { boxShadow: 2 } }}>
                <Box sx={{ fontSize: 24, mb: 1 }}>💼</Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#6B46C1' }}>Workers & Employers</Typography>
              </Paper>
            </Box>

            {/* 6. Resource Center (Horizontal Scroll Carousel) */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1A365D', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Helpful Resources</Typography>
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, mb: 4, '::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {resources.map((resource) => (
                <Paper 
                  key={resource.id} 
                  sx={{ p: 2, minWidth: '220px', maxWidth: '220px', bgcolor: '#FAFAFA', borderRadius: '12px', borderColor: '#E2E8F0', cursor: 'pointer', '&:hover': { borderColor: '#1A365D' } }}
                >
                  <Box sx={{ width: '40px', height: '40px', bgcolor: resource.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', mb: 1.5 }}>
                    {resource.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2D3748', height: '40px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: 1.3 }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#718096', display: 'block', mt: 1 }}>
                    {resource.readTime}
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* 7. Quick Journal Card */}
            <Paper sx={{ p: 2, mb: 4, borderRadius: '14px', borderColor: '#E2E8F0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1A365D' }} gutterBottom>Quick Journal</Typography>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What's on your mind today?"
                rows={3}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #E2E8F0', 
                  borderRadius: '10px', 
                  fontFamily: 'inherit', 
                  marginBottom: '12px',
                  outlineColor: '#1A365D',
                  backgroundColor: '#FAFAFA'
                }}
              />
              <button onClick={saveJournalEntry} style={{ background: '#70A643', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '14px' }}>
                Save Entry 💾
              </button>
            </Paper>

            {/* 8. Recent Activity Feed */}
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1A365D', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Recent Activity</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {recentActivities.map((activity) => (
                <Paper key={activity.id} sx={{ p: 2, borderRadius: '12px', borderColor: '#E2E8F0', bgcolor: '#FAFAFA' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 500 }}>{activity.date}</Typography>
                    <Box sx={{ bgcolor: '#EDF2F7', px: 1, py: 0.5, borderRadius: '6px', fontSize: '13px', fontWeight: 600 }}>
                      Mood: {activity.mood}
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#4A5568', lineHeight: 1.4 }}>
                    "{activity.text}"
                  </Typography>
                </Paper>
              ))}
            </Box>

            {/* 9. Safety Net Button */}
            <button onClick={() => alert('Crisis Helpline: 0800-123-456')} style={{ background: '#FFF5F5', color: '#C53030', border: '2px solid #C53030', padding: '14px', borderRadius: '12px', width: '100%', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              🚨 I Need Help Now
            </button>
          </Container>
        );
    }
  };

  // 5. Main Component Wrapper Layout
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 7 }}>
        {renderContent()}
        {user && <BottomNav value={currentPage} onChange={setCurrentPage} />}
      </Box>
    </ThemeProvider>
  );
}
