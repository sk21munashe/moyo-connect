// src/Login.js
import React, { useState } from 'react';
import { signIn, signUp, resetPassword } from './firebase';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('youth');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showReset, setShowReset] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
        const savedRole = localStorage.getItem(`moyo_role_${email}`);
        if (savedRole) {
          onLogin(savedRole);
        } else {
          onLogin('youth');
        }
      } else {
        await signUp(email, password);
        localStorage.setItem(`moyo_role_${email}`, role);
        localStorage.setItem('moyo_current_user', email);
        alert(`Welcome to MoyoConnect! 🎉\n\nYou've signed up as a ${role}.`);
        onLogin(role);
      }
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Try again or click "Forgot Password".');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        default:
          setError(err.message);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    
    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => setShowReset(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (showReset) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🌍 MoyoConnect</h1>
          <h2 style={styles.subtitle}>Reset Password</h2>
          <p style={styles.text}>Enter your email to receive a reset link.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}
          <button onClick={handleResetPassword} style={styles.button}>
            Send Reset Email
          </button>
          <button onClick={() => setShowReset(false)} style={styles.linkButton}>
            ← Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌍 MoyoConnect</h1>
        <p style={styles.tagline}>Your mental health companion</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
              />
              
              <div style={styles.roleContainer}>
                <label style={styles.label}>I am a:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.select}>
                  <option value="youth">🧒 Youth (10-24 years)</option>
                  <option value="caregiver">👪 Caregiver (Parent/Guardian)</option>
                  <option value="chw">👩‍⚕️ Community Health Worker</option>
                  <option value="worker">💼 Worker (Employee)</option>
                </select>
              </div>
            </>
          )}
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div style={styles.divider}>
          <span style={styles.dividerText}>or</span>
        </div>
        
        <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
          {isLogin ? 'Create New Account' : 'Already have an account? Login'}
        </button>
        
        {isLogin && (
          <button onClick={() => setShowReset(true)} style={styles.forgotButton}>
            Forgot Password?
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '2.5rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
  },
  tagline: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    background: 'white',
  },
  roleContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: '500',
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  switchButton: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  forgotButton: {
    width: '100%',
    padding: '10px',
    background: 'transparent',
    color: '#999',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  linkButton: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: '#667eea',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  error: {
    color: '#f44336',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  success: {
    color: '#4CAF50',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  divider: {
    textAlign: 'center',
    margin: '20px 0',
    position: 'relative',
  },
  dividerText: {
    background: 'white',
    padding: '0 10px',
    color: '#999',
    fontSize: '14px',
  },
};

export default Login;