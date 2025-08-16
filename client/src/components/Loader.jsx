import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000); // 3 seconds loading

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loader">
      <h1>Welcome to LearnSphere</h1>
      <p>Loading your learning experience...</p>
    </div>
  );
};

export default Loader;