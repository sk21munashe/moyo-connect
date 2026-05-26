// src/YouthAssessment.js
import React, { useState } from 'react';

function YouthAssessment({ onComplete, userEmail }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showBotherPopup, setShowBotherPopup] = useState(false);
  const [currentAnswerValue, setCurrentAnswerValue] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 1,
      text: "During the past two weeks, how often have you felt cheerful and in good spirits?",
      category: "WHO-5 Well-Being",
      options: [
        { value: 0, label: "None of the time", emoji: "😔" },
        { value: 1, label: "Some of the time", emoji: "😐" },
        { value: 2, label: "Less than half the time", emoji: "🙁" },
        { value: 3, label: "More than half the time", emoji: "🙂" },
        { value: 4, label: "Most of the time", emoji: "😊" },
        { value: 5, label: "All of the time", emoji: "😄" }
      ]
    },
    {
      id: 2,
      text: "How often have you felt nervous, anxious, or on edge?",
      category: "GAD-2 (Anxiety)",
      options: [
        { value: 0, label: "Not at all", emoji: "😌" },
        { value: 1, label: "Several days", emoji: "😟" },
        { value: 2, label: "More than half the days", emoji: "😰" },
        { value: 3, label: "Nearly every day", emoji: "😫" }
      ]
    },
    {
      id: 3,
      text: "How often have you had little interest or pleasure in doing things you usually enjoy?",
      category: "PHQ-2 (Depression)",
      options: [
        { value: 0, label: "Not at all", emoji: "👍" },
        { value: 1, label: "Several days", emoji: "👎" },
        { value: 2, label: "More than half the days", emoji: "😔" },
        { value: 3, label: "Nearly every day", emoji: "💔" }
      ]
    },
    {
      id: 4,
      text: "How often do you have trouble sleeping?",
      category: "Sleep Assessment",
      options: [
        { value: 0, label: "Never", emoji: "😴" },
        { value: 1, label: "Sometimes", emoji: "😕" },
        { value: 2, label: "Often", emoji: "😫" },
        { value: 3, label: "Always", emoji: "🥱" }
      ]
    },
    {
      id: 5,
      text: "How often do you feel that difficulties are piling up so high that you cannot overcome them?",
      category: "Stress & Coping",
      options: [
        { value: 0, label: "Never", emoji: "💪" },
        { value: 1, label: "Rarely", emoji: "🤔" },
        { value: 2, label: "Sometimes", emoji: "😥" },
        { value: 3, label: "Very often", emoji: "😢" }
      ]
    },
    {
      id: 6,
      text: "How often have you felt that you have someone to turn to for support when needed?",
      category: "Social Support",
      options: [
        { value: 0, label: "Never", emoji: "😞" },
        { value: 1, label: "Sometimes", emoji: "🤝" },
        { value: 2, label: "Often", emoji: "👨‍👩‍👧" },
        { value: 3, label: "Always", emoji: "❤️" }
      ]
    },
    {
      id: 7,
      text: "During the past two weeks, have you felt that life is worth living?",
      category: "Safety & Hope",
      options: [
        { value: 0, label: "Never", emoji: "🌧️" },
        { value: 1, label: "Rarely", emoji: "☁️" },
        { value: 2, label: "Sometimes", emoji: "⛅" },
        { value: 3, label: "Often", emoji: "☀️" },
        { value: 4, label: "Always", emoji: "🌟" }
      ]
    }
  ];

  const getFeedbackMessage = (question, value) => {
    const messages = {
      1: [
        "💡 It's important to notice your feelings. Small steps can help boost your mood.",
        "💡 What activities usually bring you joy? Try to do one today.",
        "💡 You're doing okay. Let's build on this positive foundation.",
        "💡 That's wonderful! What's working well in your life right now?",
        "💡 Amazing! Keep doing what makes you feel good.",
        "💡 Fantastic! You have great emotional resilience."
      ],
      2: [
        "💡 It's normal to feel calm. Great self-awareness!",
        "💡 Some anxiety is normal. Would you like to learn some calming techniques?",
        "💡 You've noticed your anxiety. That's the first step to managing it.",
        "💡 Please consider talking to someone you trust about these feelings."
      ],
      3: [
        "💡 Great that you're finding pleasure in activities!",
        "💡 Sometimes interest fluctuates. What usually makes you happy?",
        "💡 This is worth paying attention to. Small steps can help.",
        "💡 Please know that help is available. You don't have to feel this way alone."
      ],
      4: [
        "💡 Great that you're sleeping well! Sleep is very important.",
        "💡 Occasional sleep issues are common. Try a relaxing bedtime routine.",
        "💡 Sleep affects everything. Consider tracking your sleep patterns.",
        "💡 Chronic sleep issues can be helped. Please reach out to a CHW."
      ],
      5: [
        "💡 You're handling challenges well! That takes real strength.",
        "💡 Everyone faces difficulties. You've got this.",
        "💡 When things feel overwhelming, break them into smaller steps.",
        "💡 It's okay to ask for help. You don't have to face everything alone."
      ],
      6: [
        "💡 We all need connection. Let's find ways to build your support system.",
        "💡 Support can come in many forms. Even one trusted person helps a lot.",
        "💡 Having support makes such a difference. That's wonderful!",
        "💡 What a blessing! Consider how you can support others too."
      ],
      7: [
        "💡 Thank you for being honest. This is important to discuss. You matter.",
        "💡 Sometimes life feels difficult. Please talk to someone who cares about you.",
        "💡 There are good days and bad days. Hold on to hope.",
        "💡 That's good to hear. What gives you purpose in life?",
        "💡 That's beautiful! Life is truly precious. Thank you for sharing."
      ]
    };
    const questionMessages = messages[question.id] || ["💡 Thank you for sharing honestly."];
    const index = Math.min(value, questionMessages.length - 1);
    return questionMessages[index];
  };

  const handleAnswer = (value) => {
    setCurrentAnswerValue(value);
    const feedback = getFeedbackMessage(questions[currentQuestion], value);
    setCurrentFeedback(feedback);
    
    // Save answer
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value
    });
    
    // Show the bother popup with feedback
    setShowBotherPopup(true);
  };

  const handleBotherResponse = (botherLevel) => {
    setShowBotherPopup(false);
    
    // Save the bother level with the answer
    const updatedAnswers = {
      ...answers,
      [`${questions[currentQuestion].id}_bother`]: botherLevel
    };
    setAnswers(updatedAnswers);
    
    // Move to next question or complete
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswerValue(null);
      setCurrentFeedback('');
    } else {
      calculateResults(updatedAnswers);
    }
  };

  const calculateResults = (finalAnswers) => {
    const answersToUse = finalAnswers || answers;
    
    const wellBeingScore = answersToUse[1] || 0;
    const anxietyScore = answersToUse[2] || 0;
    const depressionScore = answersToUse[3] || 0;
    const sleepScore = answersToUse[4] || 0;
    const stressScore = answersToUse[5] || 0;
    const supportScore = answersToUse[6] || 0;
    const safetyScore = answersToUse[7] || 0;
    
    const totalScore = wellBeingScore + anxietyScore + depressionScore + sleepScore + stressScore + supportScore + safetyScore;
    const maxScore = 5 + 3 + 3 + 3 + 3 + 3 + 4;
    
    let riskLevel = "";
    let recommendation = "";
    let color = "";
    
    if (totalScore <= 10) {
      riskLevel = "Low Risk";
      recommendation = "You're doing well! Continue your healthy habits and check in regularly.";
      color = "#4CAF50";
    } else if (totalScore <= 15) {
      riskLevel = "Mild Concern";
      recommendation = "Some areas need attention. Try our wellness activities and check in again in 2 weeks.";
      color = "#FFC107";
    } else if (totalScore <= 20) {
      riskLevel = "Moderate Concern";
      recommendation = "We recommend speaking with a Community Health Worker (CHW) for additional support.";
      color = "#FF9800";
    } else {
      riskLevel = "High Risk - Immediate Attention Needed";
      recommendation = "Please reach out to a CHW or call our crisis helpline at 0800-123-456 immediately. You are not alone.";
      color = "#f44336";
    }
    
    if (totalScore > 20 || safetyScore <= 1) {
      alert("🚨 SAFETY ALERT: Your responses indicate you may need immediate support.\n\nPlease call 0800-123-456 for immediate help.");
    }
    
    setResult({
      totalScore,
      maxScore,
      riskLevel,
      recommendation,
      color,
      scores: {
        wellBeing: wellBeingScore,
        anxiety: anxietyScore,
        depression: depressionScore,
        sleep: sleepScore,
        stress: stressScore,
        support: supportScore,
        safety: safetyScore
      }
    });
    
    setAssessmentComplete(true);
    
    const assessmentData = {
      date: new Date().toISOString(),
      answers: answersToUse,
      result: { totalScore, riskLevel, recommendation },
      userEmail
    };
    
    const previous = localStorage.getItem('moyo_assessments');
    const assessments = previous ? JSON.parse(previous) : [];
    assessments.push(assessmentData);
    localStorage.setItem('moyo_assessments', JSON.stringify(assessments));
  };

  const handleComplete = () => {
    onComplete(result);
  };

  if (assessmentComplete && result) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, borderTop: `5px solid ${result.color}` }}>
          <h1 style={styles.completeTitle}>Assessment Complete ✓</h1>
          
          <div style={styles.resultSection}>
            <h2>Your Mental Health Snapshot</h2>
            <div style={{ ...styles.riskBadge, background: result.color }}>
              {result.riskLevel}
            </div>
            
            <div style={styles.scoreDisplay}>
              <span style={styles.scoreNumber}>{result.totalScore}</span>
              <span style={styles.scoreMax}>/{result.maxScore}</span>
            </div>
            
            <div style={styles.recommendationBox}>
              <p style={styles.recommendationText}>{result.recommendation}</p>
            </div>
          </div>
          
          <button onClick={handleComplete} style={styles.continueButton}>
            Continue to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div style={styles.container}>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.questionCount}>Question {currentQuestion + 1} of {questions.length}</span>
          <span style={styles.category}>{currentQ.category}</span>
        </div>
        
        <h2 style={styles.question}>{currentQ.text}</h2>
        
        <div style={styles.optionsContainer}>
          {currentQ.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              style={styles.optionButton}
            >
              <span style={styles.optionEmoji}>{option.emoji}</span>
              <span style={styles.optionLabel}>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Slide-up Popup with Feedback + Bother Question */}
      {showBotherPopup && currentAnswerValue !== null && (
        <div style={styles.popupOverlay}>
          <div style={{...styles.popup, ...styles.slideUpPopup}}>
            <div style={styles.popupEmoji}>
              {currentQ.options[currentAnswerValue]?.emoji}
            </div>
            
            <div style={styles.feedbackSection}>
              <p style={styles.feedbackText}>{currentFeedback}</p>
            </div>
            
            <div style={styles.divider}></div>
            
            <h3 style={styles.botherTitle}>How much does this bother you?</h3>
            
            <div style={styles.botherOptions}>
              <button onClick={() => handleBotherResponse('extremely')} style={styles.botherButton}>
                <span style={styles.botherEmojiIcon}>😫</span>
                <span>Extremely</span>
              </button>
              <button onClick={() => handleBotherResponse('considerably')} style={styles.botherButton}>
                <span style={styles.botherEmojiIcon}>😟</span>
                <span>Considerably</span>
              </button>
              <button onClick={() => handleBotherResponse('slightly')} style={styles.botherButton}>
                <span style={styles.botherEmojiIcon}>😐</span>
                <span>Slightly</span>
              </button>
              <button onClick={() => handleBotherResponse('not_at_all')} style={styles.botherButton}>
                <span style={styles.botherEmojiIcon}>😌</span>
                <span>Not at all</span>
              </button>
            </div>
            
            <button onClick={() => handleBotherResponse('not_at_all')} style={styles.skipButton}>
              Skip this question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    maxWidth: '700px',
    height: '8px',
    background: 'rgba(255,255,255,0.3)',
    borderRadius: '4px',
    marginBottom: '30px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#4CAF50',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f0f0',
  },
  questionCount: {
    color: '#667eea',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  category: {
    color: '#999',
    fontSize: '14px',
  },
  question: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '30px',
    lineHeight: '1.4',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  optionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    background: '#f8f9fa',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  optionEmoji: {
    fontSize: '24px',
  },
  optionLabel: {
    fontSize: '16px',
    color: '#333',
    fontWeight: '500',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    background: 'white',
    borderRadius: '30px 30px 0 0',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  slideUpPopup: {
    animation: 'slideUp 0.4s ease',
  },
  popupEmoji: {
    fontSize: '60px',
    marginBottom: '15px',
  },
  feedbackSection: {
    background: '#f0f7ff',
    padding: '15px',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  feedbackText: {
    fontSize: '15px',
    color: '#2c5282',
    lineHeight: '1.5',
    margin: 0,
  },
  divider: {
    height: '1px',
    background: '#e0e0e0',
    margin: '20px 0',
  },
  botherTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '20px',
  },
  botherOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px',
  },
  botherButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px 20px',
    background: '#f8f9fa',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  botherEmojiIcon: {
    fontSize: '24px',
  },
  skipButton: {
    width: '100%',
    padding: '10px',
    background: 'transparent',
    color: '#999',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  completeTitle: {
    fontSize: '28px',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: '30px',
  },
  resultSection: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  riskBadge: {
    display: 'inline-block',
    padding: '8px 20px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  scoreDisplay: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  scoreNumber: {
    fontSize: '64px',
    color: '#333',
  },
  scoreMax: {
    fontSize: '24px',
    color: '#999',
  },
  recommendationBox: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '20px',
  },
  recommendationText: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.5',
  },
  continueButton: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(styleSheet);

export default YouthAssessment;