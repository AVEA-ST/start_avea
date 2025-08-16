import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=JD',
    joinDate: 'January 2024',
    timezone: 'UTC-5'
  });
  const [learningGoals, setLearningGoals] = useState([
    { id: 1, goal: 'Complete React Fundamentals', targetDate: '2024-03-15', progress: 85 },
    { id: 2, goal: 'Learn Python Basics', targetDate: '2024-04-01', progress: 45 },
    { id: 3, goal: 'Get AWS Certified', targetDate: '2024-05-15', progress: 20 }
  ]);
  const [recentCertificates, setRecentCertificates] = useState([
    { id: 1, name: 'JavaScript Fundamentals', date: '2024-02-15', image: 'https://via.placeholder.com/80x60/10b981/ffffff?text=JS' },
    { id: 2, name: 'HTML & CSS Mastery', date: '2024-01-20', image: 'https://via.placeholder.com/80x60/f59e0b/ffffff?text=HC' },
    { id: 3, name: 'Git Version Control', date: '2024-01-10', image: 'https://via.placeholder.com/80x60/8b5cf6/ffffff?text=Git' }
  ]);

  const userStats = {
    totalCourses: 12,
    completedCourses: 8,
    inProgress: 3,
    totalHours: 156,
    certificates: 6,
    streak: 15
  };

  const enrolledCourses = [
    {
      id: 1,
      title: 'React Fundamentals',
      progress: 85,
      lastAccessed: '2 days ago',
      nextLesson: 'State Management',
      image: 'https://via.placeholder.com/100x60/3b82f6/ffffff?text=React'
    },
    {
      id: 2,
      title: 'Python for Beginners',
      progress: 45,
      lastAccessed: '1 week ago',
      nextLesson: 'Functions and Methods',
      image: 'https://via.placeholder.com/100x60/10b981/ffffff?text=Python'
    },
    {
      id: 3,
      title: 'AWS Cloud Basics',
      progress: 20,
      lastAccessed: '3 days ago',
      nextLesson: 'EC2 Instances',
      image: 'https://via.placeholder.com/100x60/f59e0b/ffffff?text=AWS'
    }
  ];

  const recentActivity = [
    { type: 'completed', course: 'JavaScript Basics', time: '2 hours ago' },
    { type: 'started', course: 'React Fundamentals', time: '1 day ago' },
    { type: 'achievement', course: 'Python Certificate', time: '3 days ago' },
    { type: 'quiz', course: 'AWS Quiz', score: '85%', time: '1 week ago' }
  ];

  const achievements = [
    { name: 'First Course', icon: '🎯', description: 'Completed your first course', earned: true, date: '2024-01-15' },
    { name: 'Week Warrior', icon: '🔥', description: '7-day learning streak', earned: true, date: '2024-02-01' },
    { name: 'Quiz Master', icon: '🧠', description: 'Scored 90%+ on 5 quizzes', earned: true, date: '2024-02-10' },
    { name: 'Certificate Collector', icon: '🏆', description: 'Earned 5 certificates', earned: false, progress: 3 },
    { name: 'Study Streak', icon: '📚', description: '30-day learning streak', earned: false, progress: 15 },
    { name: 'Course Explorer', icon: '🔍', description: 'Enrolled in 10 different categories', earned: false, progress: 6 }
  ];

  const addLearningGoal = () => {
    const newGoal = {
      id: Date.now(),
      goal: prompt('Enter your learning goal:'),
      targetDate: prompt('Enter target date (YYYY-MM-DD):'),
      progress: 0
    };
    if (newGoal.goal && newGoal.targetDate) {
      setLearningGoals(prev => [...prev, newGoal]);
    }
  };

  const updateGoalProgress = (goalId, newProgress) => {
    setLearningGoals(prev => 
      prev.map(goal => 
        goal.id === goalId ? { ...goal, progress: Math.min(100, Math.max(0, newProgress)) } : goal
      )
    );
  };

  const deleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setLearningGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  const downloadCertificate = (certificate) => {
    alert(`Downloading certificate: ${certificate.name}`);
    // In a real app, this would trigger a download
  };

  const getDaysUntilTarget = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Welcome back, {userProfile.name}! 👋
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-base)' }}>
                Member since {userProfile.joinDate} • {userProfile.timezone}
              </p>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-lg)' }}>
            Continue your learning journey where you left off
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
            color: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', marginBottom: '0.25rem' }}>
              {userStats.totalCourses}
            </h3>
            <p style={{ opacity: 0.9 }}>Total Courses</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, var(--success-color), #059669)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', marginBottom: '0.25rem' }}>
              {userStats.completedCourses}
            </h3>
            <p style={{ opacity: 0.9 }}>Completed</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, var(--accent-color), #d97706)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', marginBottom: '0.25rem' }}>
              {userStats.streak}
            </h3>
            <p style={{ opacity: 0.9 }}>Day Streak</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, var(--info-color), #2563eb)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: '700', marginBottom: '0.25rem' }}>
              {userStats.totalHours}h
            </h3>
            <p style={{ opacity: 0.9 }}>Total Hours</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            {['overview', 'courses', 'achievements', 'activity', 'goals', 'certificates'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1rem 1.5rem',
                  border: 'none',
                  background: 'none',
                  color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : 'none',
                  fontWeight: activeTab === tab ? '600' : '500',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            {/* Enrolled Courses */}
            <div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Continue Learning
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {enrolledCourses.map(course => (
                  <div key={course.id} style={{
                    display: 'flex',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)',
                    padding: '1rem',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {course.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>
                        Next: {course.nextLesson}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: '10px', height: '8px' }}>
                          <div style={{ 
                            width: `${course.progress}%`, 
                            background: 'var(--primary-color)', 
                            height: '100%', 
                            borderRadius: '10px' 
                          }}></div>
                        </div>
                        <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                                         <button 
                       onClick={() => navigate(`/course/${course.id}`)}
                       className="form-button" 
                       style={{ padding: '0.5rem 1rem', fontSize: 'var(--font-size-sm)' }}
                     >
                       Continue
                     </button>
                   </div>
                 ))}
               </div>
             </div>

            {/* Recent Activity */}
            <div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Recent Activity
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentActivity.map((activity, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius)'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--font-size-sm)',
                      background: activity.type === 'completed' ? 'var(--success-color)' :
                                activity.type === 'started' ? 'var(--primary-color)' :
                                activity.type === 'achievement' ? 'var(--accent-color)' : 'var(--info-color)',
                      color: 'white'
                    }}>
                      {activity.type === 'completed' ? '✓' : 
                       activity.type === 'started' ? '▶' : 
                       activity.type === 'achievement' ? '🏆' : '📝'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {activity.type === 'completed' ? `Completed ${activity.course}` :
                         activity.type === 'started' ? `Started ${activity.course}` :
                         activity.type === 'achievement' ? `Earned ${activity.course}` :
                         `Scored ${activity.score} on ${activity.course}`}
                      </p>
                      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-light)' }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

                 {activeTab === 'achievements' && (
           <div>
             <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
               Your Achievements
             </h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
               {achievements.map((achievement, index) => (
                 <div key={index} style={{
                   background: 'var(--bg-primary)',
                   border: '1px solid var(--border-color)',
                   borderRadius: 'var(--border-radius)',
                   padding: '1.5rem',
                   textAlign: 'center',
                   position: 'relative',
                   opacity: achievement.earned ? 1 : 0.6
                 }}>
                   <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{achievement.icon}</div>
                   <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                     {achievement.name}
                   </h3>
                   <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1rem' }}>
                     {achievement.description}
                   </p>
                   {achievement.earned ? (
                     <div style={{ color: 'var(--success-color)', fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>
                       ✓ Earned on {achievement.date}
                     </div>
                   ) : (
                     <div style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-sm)' }}>
                       Progress: {achievement.progress || 0}%
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </div>
         )}

         {activeTab === 'goals' && (
           <div>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
               <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)' }}>
                 Learning Goals
               </h2>
               <button onClick={addLearningGoal} className="form-button" style={{ padding: '0.5rem 1rem' }}>
                 + Add Goal
               </button>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {learningGoals.map(goal => (
                 <div key={goal.id} style={{
                   background: 'var(--bg-primary)',
                   border: '1px solid var(--border-color)',
                   borderRadius: 'var(--border-radius)',
                   padding: '1.5rem'
                 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                     <div style={{ flex: 1 }}>
                       <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                         {goal.goal}
                       </h3>
                       <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                         Target: {goal.targetDate} ({getDaysUntilTarget(goal.targetDate)} days left)
                       </p>
                     </div>
                     <button 
                       onClick={() => deleteGoal(goal.id)}
                       style={{
                         background: 'none',
                         border: 'none',
                         color: 'var(--danger-color)',
                         cursor: 'pointer',
                         fontSize: '1.2rem'
                       }}
                     >
                       🗑️
                     </button>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: '10px', height: '8px' }}>
                       <div style={{ 
                         width: `${goal.progress}%`, 
                         background: 'var(--primary-color)', 
                         height: '100%', 
                         borderRadius: '10px' 
                       }}></div>
                     </div>
                     <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', minWidth: '40px' }}>
                       {goal.progress}%
                     </span>
                     <input
                       type="range"
                       min="0"
                       max="100"
                       value={goal.progress}
                       onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                       style={{ width: '100px' }}
                     />
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}

         {activeTab === 'certificates' && (
           <div>
             <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
               Your Certificates
             </h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
               {recentCertificates.map(certificate => (
                 <div key={certificate.id} style={{
                   background: 'var(--bg-primary)',
                   border: '1px solid var(--border-color)',
                   borderRadius: 'var(--border-radius)',
                   padding: '1.5rem',
                   textAlign: 'center'
                 }}>
                   <img 
                     src={certificate.image} 
                     alt={certificate.name}
                     style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--border-radius)', marginBottom: '1rem' }}
                   />
                   <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                     {certificate.name}
                   </h3>
                   <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1rem' }}>
                     Earned on {certificate.date}
                   </p>
                   <button 
                     onClick={() => downloadCertificate(certificate)}
                     className="form-button"
                     style={{ padding: '0.5rem 1rem', fontSize: 'var(--font-size-sm)' }}
                   >
                     Download Certificate
                   </button>
                 </div>
               ))}
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default Dashboard;
