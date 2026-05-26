// src/components/AnimatedStep.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, Typography, Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AnimatedStep = ({ activity, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (activeStep === activity.steps.length - 1) {
      setCompleted(true);
      onComplete && onComplete();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ borderRadius: 4, background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)', color: 'white' }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, mb: 2 }} />
            </motion.div>
            <Typography variant="h5" gutterBottom>
              Great job! 🎉
            </Typography>
            <Typography variant="body1">
              You've completed {activity.name}
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 3, bgcolor: 'white', color: '#4CAF50', '&:hover': { bgcolor: '#f5f5f5' } }}
              onClick={() => setCompleted(false)}
            >
              Try Another Activity
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: '#667eea', p: 2 }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            {activity.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Step {activeStep + 1} of {activity.steps.length}
          </Typography>
        </Box>
        
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4, overflowX: 'auto' }}>
            {activity.steps.map((step, index) => (
              <Step key={index} completed={index < activeStep}>
                <StepLabel>{index + 1}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <motion.div
            key={activeStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
              {activity.steps[activeStep]}
            </Typography>
            
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                💡 Tip: Take your time with this step. There's no rush.
              </Typography>
            </Box>
          </motion.div>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ color: '#667eea' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              sx={{ bgcolor: '#667eea', '&:hover': { bgcolor: '#764ba2' } }}
            >
              {activeStep === activity.steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedStep;