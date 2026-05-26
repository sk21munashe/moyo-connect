// src/Explore.js
import React, { useState } from 'react';

function Explore() {
  const [activeTab, setActiveTab] = useState('conditions');
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  // Mental health conditions affecting Zimbabwean youth
  const conditions = [
    {
      id: 1,
      name: "Depression",
      localName: "Kushushikana mwoyo",
      prevalence: "High",
      symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Changes in sleep/appetite", "Feelings of worthlessness"],
      description: "Depression is more than just feeling sad. It's a persistent condition that affects how you think, feel, and handle daily activities.",
      warningSigns: "Withdrawal from friends, dropping grades, irritability, talking about feeling hopeless",
      helpSeeking: "Talk to a school counselor, CHW, or call our helpline. Treatment works and recovery is possible.",
      icon: "😔"
    },
    {
      id: 2,
      name: "Anxiety Disorders",
      localName: "Kutya/Kushushikana",
      prevalence: "Very High",
      symptoms: ["Excessive worry", "Racing thoughts", "Panic attacks", "Avoidance of situations", "Physical tension"],
      description: "Anxiety involves intense, excessive, and persistent worry about everyday situations. It can cause rapid heartbeat, sweating, and difficulty concentrating.",
      warningSigns: "Frequent stomachaches, avoiding school/social events, needing constant reassurance",
      helpSeeking: "Breathing exercises, talking to someone you trust, and professional help can make a big difference.",
      icon: "😰"
    },
    {
      id: 3,
      name: "Post-Traumatic Stress (PTSD)",
      localName: "Kukuvara mupfungwa",
      prevalence: "High (due to economic stress, loss)",
      symptoms: ["Flashbacks", "Nightmares", "Hypervigilance", "Avoidance of reminders", "Emotional numbness"],
      description: "PTSD can develop after experiencing or witnessing traumatic events like loss of a loved one, violence, or accidents.",
      warningSigns: "Startled easily, angry outbursts, difficulty sleeping, avoiding places/people",
      helpSeeking: "Trauma-focused therapy is very effective. Reach out to a CHW for support.",
      icon: "🌧️"
    },
    {
      id: 4,
      name: "Substance Use",
      localName: "Kushandisa zvinodhaka",
      prevalence: "Growing concern",
      symptoms: ["Increased tolerance", "Withdrawal symptoms", "Loss of control", "Neglecting responsibilities", "Continued use despite problems"],
      description: "Substance use includes alcohol, cannabis, glue, and prescription medications used in harmful ways.",
      warningSigns: "Changes in friends, secretive behavior, money missing, declining performance",
      helpSeeking: "Recovery is possible with support. Talk to a CHW confidentially.",
      icon: "🍺"
    },
    {
      id: 5,
      name: "Eating Disorders",
      localName: "Matambudziko ekudya",
      prevalence: "Increasing (social media pressure)",
      symptoms: ["Preoccupation with weight", "Restrictive eating", "Binge eating", "Purging behaviors", "Distorted body image"],
      description: "Eating disorders involve unhealthy relationships with food and body image, often driven by anxiety and control issues.",
      warningSigns: "Skipping meals, excessive exercise, wearing baggy clothes, weight fluctuations",
      helpSeeking: "Early intervention is crucial. Professional help can restore healthy eating patterns.",
      icon: "🍽️"
    },
    {
      id: 6,
      name: "Self-Harm",
      localName: "Kuzvikuvadza",
      prevalence: "Concerning among adolescents",
      symptoms: ["Unexplained cuts/burns", "Wearing long sleeves in heat", "Hiding sharp objects", "Emotional distress before/after"],
      description: "Self-harm is often a way to cope with overwhelming emotions, not necessarily a suicide attempt.",
      warningSigns: "Scars, fresh wounds, blood stains on clothing, isolation",
      helpSeeking: "You're not alone. Reach out immediately to a CHW, counselor, or crisis line.",
      icon: "🩹"
    },
    {
      id: 7,
      name: "Suicidal Thoughts",
      localName: "Kufunga kuzviuraya",
      prevalence: "Critical concern",
      symptoms: ["Talking about being a burden", "Saying goodbye", "Giving away possessions", "Hopelessness", "Researching methods"],
      description: "Suicidal thoughts are a medical emergency. They are often linked to depression, trauma, or overwhelming circumstances.",
      warningSigns: "Verbal statements about death, sudden calmness after depression, reckless behavior",
      helpSeeking: "IMMEDIATE HELP NEEDED. Call our crisis helpline: 0800-123-456. You matter and help is available.",
      icon: "🆘"
    },
    {
      id: 8,
      name: "Grief & Loss",
      localName: "Kusuruvara/Shungu",
      prevalence: "Very high (orphans, loss of family)",
      symptoms: ["Deep sadness", "Yearning for the deceased", "Guilt", "Anger", "Difficulty accepting loss"],
      description: "Grief is a natural response to loss. In Zimbabwe, many youth have lost parents or siblings.",
      warningSigns: "Prolonged inability to function, self-destructive behavior, intense bitterness",
      helpSeeking: "Grief groups, talking with elders, and counseling can help you navigate loss.",
      icon: "🕊️"
    },
    {
      id: 9,
      name: "Academic Stress",
      localName: "Kushushikana nezvidzidzo",
      prevalence: "Very high during exam periods",
      symptoms: ["Procrastination", "Difficulty concentrating", "Physical symptoms before exams", "Sleep problems", "Perfectionism"],
      description: "Pressure to perform well in school can cause significant stress and anxiety.",
      warningSigns: "Avoiding school, crying over grades, extreme fear of failure",
      helpSeeking: "Balance study with rest, talk to teachers, and don't tie your worth to grades.",
      icon: "📚"
    },
    {
      id: 10,
      name: "Cyberbullying",
      localName: "Kushungurudzwa pa internet",
      prevalence: "Increasing with social media use",
      symptoms: ["Anxiety when phone buzzes", "Avoiding social media", "Sudden school avoidance", "Low self-esteem"],
      description: "Online harassment, spreading rumors, or exclusion through digital platforms.",
      warningSigns: "Deleting social media accounts, secretive about online activity, sadness after using phone",
      helpSeeking: "Save evidence, block bullies, report to platforms, and talk to a trusted adult.",
      icon: "📱"
    }
  ];

  // WHO-recommended tools and activities
  const toolsAndActivities = [
    {
      id: 1,
      name: "Breathing Exercise (Box Breathing)",
      organization: "WHO",
      duration: "5 minutes",
      difficulty: "Easy",
      steps: [
        "Inhale for 4 seconds",
        "Hold for 4 seconds",
        "Exhale for 4 seconds",
        "Hold for 4 seconds",
        "Repeat 5-10 times"
      ],
      benefits: "Reduces anxiety, calms nervous system, improves focus",
      icon: "🌬️",
      videoUrl: "https://www.youtube.com/embed/3y6x6W5e8Fc"
    },
    {
      id: 2,
      name: "Gratitude Journaling",
      organization: "Harvard Health",
      duration: "10 minutes daily",
      difficulty: "Easy",
      steps: [
        "Get a notebook",
        "Write 3 things you're grateful for today",
        "Write why each thing matters",
        "Do this daily, ideally before bed"
      ],
      benefits: "Increases happiness, reduces depression, improves sleep",
      icon: "🙏",
      audioUrl: "https://example.com/gratitude-meditation.mp3"
    },
    {
      id: 3,
      name: "5-4-3-2-1 Grounding Technique",
      organization: "Anxiety Canada",
      duration: "3 minutes",
      difficulty: "Easy",
      steps: [
        "Acknowledge 5 things you see",
        "Acknowledge 4 things you can touch",
        "Acknowledge 3 things you hear",
        "Acknowledge 2 things you can smell",
        "Acknowledge 1 thing you can taste"
      ],
      benefits: "Stops panic attacks, reduces dissociation, brings you to present moment",
      icon: "👣"
    },
    {
      id: 4,
      name: "Progressive Muscle Relaxation",
      organization: "APA (American Psychological Association)",
      duration: "15 minutes",
      difficulty: "Medium",
      steps: [
        "Tense your toes for 5 seconds",
        "Relax them for 10 seconds",
        "Move up to feet, legs, stomach, hands, arms, shoulders, face",
        "Notice the difference between tension and relaxation",
        "Practice daily"
      ],
      benefits: "Reduces physical anxiety, improves sleep, decreases headaches",
      icon: "💪"
    },
    {
      id: 5,
      name: "Thought Record (CBT)",
      organization: "Beck Institute",
      duration: "10 minutes",
      difficulty: "Medium",
      steps: [
        "Identify a distressing situation",
        "Rate your emotion (1-10)",
        "Write automatic negative thoughts",
        "Find evidence that challenges those thoughts",
        "Create a balanced thought",
        "Re-rate your emotion"
      ],
      benefits: "Breaks negative thought patterns, reduces depression, increases self-awareness",
      icon: "🧠"
    },
    {
      id: 6,
      name: "Mindfulness Body Scan",
      organization: "Mindful.org / WHO",
      duration: "20 minutes",
      difficulty: "Medium",
      steps: [
        "Lie down comfortably",
        "Close your eyes",
        "Focus on your breath",
        "Slowly scan attention from toes to head",
        "Notice sensations without judgment",
        "If mind wanders, gently return"
      ],
      benefits: "Reduces stress, improves concentration, helps with chronic pain",
      icon: "🧘"
    },
    {
      id: 7,
      name: "Behavioral Activation",
      organization: "WHO (Problem Management Plus)",
      duration: "Daily practice",
      difficulty: "Medium",
      steps: [
        "List activities you used to enjoy",
        "Schedule one small activity today",
        "Do it even if you don't feel motivated",
        "Notice how you feel afterward",
        "Gradually add more activities"
      ],
      benefits: "Treats depression, increases energy, restores pleasure in life",
      icon: "📅"
    },
    {
      id: 8,
      name: "Sleep Hygiene Routine",
      organization: "CDC / WHO",
      duration: "Nightly routine",
      difficulty: "Easy",
      steps: [
        "Go to bed same time each night",
        "No screens 1 hour before bed",
        "Create a calming bedtime routine",
        "Keep bedroom dark and cool",
        "Avoid caffeine after 2pm",
        "Get morning sunlight"
      ],
      benefits: "Improves mental health, memory, immune function",
      icon: "😴"
    }
  ];

  // Learning resources (videos, audios, articles)
  const learningResources = [
    {
      id: 1,
      title: "What is Depression? (Video)",
      type: "video",
      source: "WHO",
      duration: "4:32",
      description: "Animated explanation of depression, symptoms, and treatment options",
      url: "https://www.youtube.com/embed/5Sqe7qTqFgE",
      language: "English with Shona subtitles"
    },
    {
      id: 2,
      title: "Coping with Anxiety (Audio Guide)",
      type: "audio",
      source: "Mental Health Foundation",
      duration: "15:00",
      description: "Guided meditation for anxiety relief",
      language: "English",
      content: "Listen to this guided audio when feeling anxious or before sleep."
    },
    {
      id: 3,
      title: "Understanding Self-Harm (Article)",
      type: "article",
      source: "Childline Zimbabwe",
      readTime: "8 min",
      description: "Why young people self-harm and how to get help",
      language: "English",
      content: "Self-harm is often a coping mechanism, not attention-seeking. Learn the signs and how to support someone."
    },
    {
      id: 4,
      title: "Teen Mental Health in Zimbabwe (Video)",
      type: "video",
      source: "Zimbabwe Mental Health Association",
      duration: "12:15",
      description: "Local experts discuss mental health challenges faced by Zimbabwean youth",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      language: "English and Shona"
    },
    {
      id: 5,
      title: "Stress Management Techniques (Audio)",
      type: "audio",
      source: "WHO",
      duration: "20:00",
      description: "Complete stress management audio course",
      language: "English",
      content: "Learn practical techniques to manage daily stress."
    },
    {
      id: 6,
      title: "How to Support a Friend (Article)",
      type: "article",
      source: "ZimYouth Health",
      readTime: "10 min",
      description: "What to say and do when a friend is struggling",
      language: "English",
      content: "Active listening, avoiding judgment, knowing when to involve an adult."
    },
    {
      id: 7,
      title: "Bullying and Mental Health (Video)",
      type: "video",
      source: "UNICEF Zimbabwe",
      duration: "8:45",
      description: "Impact of bullying on mental health and how to respond",
      language: "English, Shona, Ndebele",
      url: "https://www.youtube.com/embed/6mYw5Dl3bUw"
    },
    {
      id: 8,
      title: "Building Resilience (Audio Series)",
      type: "audio",
      source: "Harvard's Center on the Developing Child",
      duration: "30:00",
      description: "How to build emotional resilience in challenging times",
      language: "English",
      content: "Learn the science of resilience and practical daily practices."
    },
    {
      id: 9,
      title: "Kushungurudzwa muZimbabwe (Article in Shona)",
      type: "article",
      source: "Local CHW Network",
      readTime: "12 min",
      description: "Understanding depression in Shona culture",
      language: "Shona",
      content: "Chirevo chezvinoitwa nemweya yako kana wakashushikana uye nzira dzekubatsira."
    },
    {
      id: 10,
      title: "Traditional vs Modern Mental Health Care (Video)",
      type: "video",
      source: "Africa Mental Health Foundation",
      duration: "15:30",
      description: "Integrating traditional healers and modern therapy in Zimbabwe",
      language: "English with Shona translation",
      url: "https://www.youtube.com/embed/HgqRjq7LLqY"
    },
    {
      id: 11,
      title: "Peer Support Guide (PDF Download)",
      type: "article",
      source: "WHO Youth Mental Health First Aid",
      readTime: "20 min",
      description: "How to provide mental health first aid to peers",
      language: "English",
      content: "Recognize signs, listen non-judgmentally, encourage professional help."
    }
  ];

  // Format for rendering
  const renderConditionsList = () => (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>🧠 Mental Health Conditions</h2>
        <p style={styles.sectionSubtitle}>Understanding what you or your friends might be experiencing</p>
      </div>
      
      {selectedCondition ? (
        <div style={styles.detailView}>
          <button onClick={() => setSelectedCondition(null)} style={styles.backButton}>
            ← Back to all conditions
          </button>
          <div style={styles.conditionDetail}>
            <div style={styles.conditionHeader}>
              <span style={styles.conditionIcon}>{selectedCondition.icon}</span>
              <div>
                <h2 style={styles.conditionName}>{selectedCondition.name}</h2>
                <p style={styles.localName}>{selectedCondition.localName}</p>
              </div>
            </div>
            <div style={styles.infoCard}>
              <strong>📊 Prevalence in Zimbabwe:</strong> {selectedCondition.prevalence}
            </div>
            <div style={styles.infoCard}>
              <strong>📋 Common Symptoms:</strong>
              <ul>
                {selectedCondition.symptoms.map((symptom, i) => (
                  <li key={i}>{symptom}</li>
                ))}
              </ul>
            </div>
            <div style={styles.infoCard}>
              <strong>⚠️ Warning Signs:</strong>
              <p>{selectedCondition.warningSigns}</p>
            </div>
            <div style={styles.infoCard}>
              <strong>💡 What Helps:</strong>
              <p>{selectedCondition.helpSeeking}</p>
            </div>
            <div style={styles.infoCard}>
              <strong>📖 More About This Condition:</strong>
              <p>{selectedCondition.description}</p>
            </div>
            <button 
              onClick={() => alert(`Need help with ${selectedCondition.name}? Call our helpline: 0800-123-456`)}
              style={styles.helpButton}
            >
              Need Help Now?
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.grid}>
          {conditions.map(condition => (
            <div key={condition.id} style={styles.conditionCard} onClick={() => setSelectedCondition(condition)}>
              <div style={styles.conditionCardIcon}>{condition.icon}</div>
              <h3 style={styles.conditionCardTitle}>{condition.name}</h3>
              <p style={styles.conditionCardDesc}>{condition.localName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderToolsAndActivities = () => (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>🛠️ Tools & Activities</h2>
        <p style={styles.sectionSubtitle}>Evidence-based practices recommended by WHO and global health organizations</p>
      </div>
      
      {selectedActivity ? (
        <div style={styles.detailView}>
          <button onClick={() => setSelectedActivity(null)} style={styles.backButton}>
            ← Back to all activities
          </button>
          <div style={styles.activityDetail}>
            <div style={styles.activityHeader}>
              <span style={styles.activityIcon}>{selectedActivity.icon}</span>
              <div>
                <h2 style={styles.activityName}>{selectedActivity.name}</h2>
                <p style={styles.activityOrg}>By: {selectedActivity.organization}</p>
              </div>
            </div>
            <div style={styles.activityMeta}>
              <span>⏱️ {selectedActivity.duration}</span>
              <span>📊 {selectedActivity.difficulty}</span>
            </div>
            <div style={styles.infoCard}>
              <strong>✨ Benefits:</strong>
              <p>{selectedActivity.benefits}</p>
            </div>
            <div style={styles.infoCard}>
              <strong>📝 How to do it:</strong>
              <ol>
                {selectedActivity.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            <button 
              onClick={() => {
                if (selectedActivity.audioUrl) {
                  alert(`Playing audio meditation for ${selectedActivity.name} (would open audio player)`);
                } else {
                  alert(`Let's practice ${selectedActivity.name} together!\n\nFollow the steps above. Take your time.`);
                }
              }}
              style={styles.startButton}
            >
              Start This Activity →
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.grid}>
          {toolsAndActivities.map(activity => (
            <div key={activity.id} style={styles.activityCard} onClick={() => setSelectedActivity(activity)}>
              <div style={styles.activityCardIcon}>{activity.icon}</div>
              <h3 style={styles.activityCardTitle}>{activity.name}</h3>
              <p style={styles.activityCardOrg}>{activity.organization}</p>
              <p style={styles.activityCardDuration}>⏱️ {activity.duration}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderLearningHub = () => (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>📚 Learning Hub</h2>
        <p style={styles.sectionSubtitle}>Videos, audios, and articles to deepen your understanding</p>
      </div>
      
      {selectedResource ? (
        <div style={styles.detailView}>
          <button onClick={() => setSelectedResource(null)} style={styles.backButton}>
            ← Back to resources
          </button>
          <div style={styles.resourceDetail}>
            <div style={styles.resourceHeader}>
              <span style={styles.resourceTypeIcon}>
                {selectedResource.type === 'video' && '🎬'}
                {selectedResource.type === 'audio' && '🎧'}
                {selectedResource.type === 'article' && '📖'}
              </span>
              <div>
                <h2 style={styles.resourceTitle}>{selectedResource.title}</h2>
                <p style={styles.resourceMeta}>
                  {selectedResource.source} • {selectedResource.duration || selectedResource.readTime}
                </p>
              </div>
            </div>
            <div style={styles.infoCard}>
              <strong>🌍 Language:</strong> {selectedResource.language}
            </div>
            <div style={styles.infoCard}>
              <strong>📝 Description:</strong>
              <p>{selectedResource.description}</p>
            </div>
            {selectedResource.type === 'video' && selectedResource.url && (
              <div style={styles.videoContainer}>
                <iframe 
                  src={selectedResource.url} 
                  title={selectedResource.title}
                  style={styles.videoIframe}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {selectedResource.type === 'audio' && (
              <div style={styles.audioContainer}>
                <div style={styles.audioPlayer}>
                  <span style={styles.audioIcon}>🎵</span>
                  <p>Audio player would load here in production</p>
                  <button style={styles.playButton}>▶️ Play Audio</button>
                </div>
              </div>
            )}
            {selectedResource.type === 'article' && (
              <div style={styles.articleContent}>
                <p>{selectedResource.content}</p>
                <button style={styles.readMoreButton}>Read Full Article →</button>
              </div>
            )}
            <button 
              onClick={() => alert(`Share "${selectedResource.title}" with a friend?`)}
              style={styles.shareButton}
            >
              📤 Share this resource
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={styles.resourceFilters}>
            <button style={{...styles.filterButton, background: '#667eea', color: 'white'}}>All</button>
            <button style={styles.filterButton}>🎬 Videos</button>
            <button style={styles.filterButton}>🎧 Audios</button>
            <button style={styles.filterButton}>📖 Articles</button>
          </div>
          <div style={styles.resourceGrid}>
            {learningResources.map(resource => (
              <div key={resource.id} style={styles.resourceCard} onClick={() => setSelectedResource(resource)}>
                <div style={styles.resourceType}>
                  {resource.type === 'video' && '🎬'}
                  {resource.type === 'audio' && '🎧'}
                  {resource.type === 'article' && '📖'}
                </div>
                <h4 style={styles.resourceCardTitle}>{resource.title}</h4>
                <p style={styles.resourceCardSource}>{resource.source}</p>
                <p style={styles.resourceCardDuration}>{resource.duration || resource.readTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Explore</h1>
        <p style={styles.subtitle}>Learn, understand, and grow on your mental health journey</p>
      </div>

      <div style={styles.tabBar}>
        <button 
          onClick={() => setActiveTab('conditions')} 
          style={{...styles.tab, ...(activeTab === 'conditions' ? styles.activeTab : {})}}
        >
          🧠 Conditions
        </button>
        <button 
          onClick={() => setActiveTab('tools')} 
          style={{...styles.tab, ...(activeTab === 'tools' ? styles.activeTab : {})}}
        >
          🛠️ Tools & Activities
        </button>
        <button 
          onClick={() => setActiveTab('learn')} 
          style={{...styles.tab, ...(activeTab === 'learn' ? styles.activeTab : {})}}
        >
          📚 Learning Hub
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'conditions' && renderConditionsList()}
        {activeTab === 'tools' && renderToolsAndActivities()}
        {activeTab === 'learn' && renderLearningHub()}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    opacity: 0.9,
  },
  tabBar: {
    display: 'flex',
    background: 'white',
    borderBottom: '1px solid #e0e0e0',
    padding: '0 20px',
  },
  tab: {
    flex: 1,
    padding: '15px',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#666',
    transition: 'all 0.3s',
  },
  activeTab: {
    color: '#667eea',
    borderBottom: '3px solid #667eea',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionHeader: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '10px',
  },
  sectionSubtitle: {
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  conditionCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  conditionCardIcon: {
    fontSize: '48px',
    marginBottom: '10px',
  },
  conditionCardTitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '5px',
  },
  conditionCardDesc: {
    color: '#666',
    fontSize: '0.9rem',
  },
  activityCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  activityCardIcon: {
    fontSize: '40px',
    marginBottom: '10px',
  },
  activityCardTitle: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '5px',
  },
  activityCardOrg: {
    color: '#667eea',
    fontSize: '0.85rem',
    marginBottom: '5px',
  },
  activityCardDuration: {
    color: '#999',
    fontSize: '0.8rem',
  },
  resourceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  resourceCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  resourceType: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  resourceCardTitle: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '5px',
  },
  resourceCardSource: {
    color: '#667eea',
    fontSize: '0.8rem',
    marginBottom: '5px',
  },
  resourceCardDuration: {
    color: '#999',
    fontSize: '0.75rem',
  },
  resourceFilters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 16px',
    background: '#f0f0f0',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    color: '#666',
  },
  detailView: {
    background: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '20px',
    padding: 0,
  },
  conditionDetail: {
    marginTop: '10px',
  },
  conditionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  conditionIcon: {
    fontSize: '60px',
  },
  conditionName: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '5px',
  },
  localName: {
    color: '#667eea',
    fontStyle: 'italic',
  },
  infoCard: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  helpButton: {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
  },
  activityDetail: {
    marginTop: '10px',
  },
  activityHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
  },
  activityIcon: {
    fontSize: '50px',
  },
  activityName: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '5px',
  },
  activityOrg: {
    color: '#667eea',
  },
  activityMeta: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    color: '#666',
  },
  startButton: {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
  },
  resourceDetail: {
    marginTop: '10px',
  },
  resourceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  resourceTypeIcon: {
    fontSize: '50px',
  },
  resourceTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '5px',
  },
  resourceMeta: {
    color: '#666',
    fontSize: '0.9rem',
  },
  videoContainer: {
    margin: '20px 0',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  videoIframe: {
    width: '100%',
    height: '315px',
  },
  audioContainer: {
    margin: '20px 0',
    padding: '20px',
    background: '#f0f0f0',
    borderRadius: '12px',
    textAlign: 'center',
  },
  audioIcon: {
    fontSize: '40px',
  },
  playButton: {
    marginTop: '10px',
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  articleContent: {
    margin: '20px 0',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '12px',
  },
  readMoreButton: {
    marginTop: '15px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  shareButton: {
    background: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
  },
};

export default Explore;