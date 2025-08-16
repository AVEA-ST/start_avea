import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const mockCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'John Smith',
      category: 'Web Development',
      level: 'Beginner',
      duration: '20 hours',
      rating: 4.8,
      students: 15420,
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=React',
      description: 'Learn React from scratch and build real-world applications',
      tags: ['React', 'JavaScript', 'Frontend'],
      language: 'English',
      certificate: true,
      lifetimeAccess: true
    },
    {
      id: 2,
      title: 'Python for Data Science',
      instructor: 'Sarah Johnson',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '35 hours',
      rating: 4.9,
      students: 23450,
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Python',
      description: 'Master Python programming for data analysis and machine learning',
      tags: ['Python', 'Data Science', 'Machine Learning'],
      language: 'English',
      certificate: true,
      lifetimeAccess: true
    },
    {
      id: 3,
      title: 'AWS Cloud Practitioner',
      instructor: 'Mike Davis',
      category: 'Cloud Computing',
      level: 'Beginner',
      duration: '15 hours',
      rating: 4.7,
      students: 18920,
      price: 69.99,
      originalPrice: 99.99,
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=AWS',
      description: 'Get AWS certified and master cloud computing fundamentals',
      tags: ['AWS', 'Cloud Computing', 'DevOps'],
      language: 'English',
      certificate: true,
      lifetimeAccess: true
    },
    {
      id: 4,
      title: 'Cybersecurity Fundamentals',
      instructor: 'Lisa Chen',
      category: 'Cybersecurity',
      level: 'Beginner',
      duration: '25 hours',
      rating: 4.6,
      students: 12580,
      price: 99.99,
      originalPrice: 149.99,
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Security',
      description: 'Learn essential cybersecurity concepts and best practices',
      tags: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
      language: 'English',
      certificate: true,
      lifetimeAccess: true
    },
    {
      id: 5,
      title: 'Machine Learning with TensorFlow',
      instructor: 'David Wilson',
      category: 'AI & Machine Learning',
      level: 'Advanced',
      duration: '40 hours',
      rating: 4.9,
      students: 18750,
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=ML',
      description: 'Build and deploy machine learning models with TensorFlow',
      tags: ['Machine Learning', 'TensorFlow', 'AI'],
      language: 'English',
      certificate: true,
      lifetimeAccess: true
    },
    {
      id: 6,
      title: 'iOS App Development',
      instructor: 'Emma Thompson',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '30 hours',
      rating: 4.8,
      students: 16230,
      price: 119.99,
      originalPrice: 169.99,
      image: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=iOS',
      description: 'Create stunning iOS applications with Swift and SwiftUI',
      tags: ['iOS', 'Swift', 'Mobile Development'],
      language: 'English',
      certificate: true,
      lifetimeAccess: true
    }
  ];

  useEffect(() => {
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      let matchesPrice = true;
      if (selectedPrice === 'free') matchesPrice = course.price === 0;
      else if (selectedPrice === 'under50') matchesPrice = course.price < 50;
      else if (selectedPrice === '50to100') matchesPrice = course.price >= 50 && course.price <= 100;
      else if (selectedPrice === 'over100') matchesPrice = course.price > 100;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
    setIsLoading(false);
  }, [searchQuery, selectedCategory, selectedLevel, selectedPrice, sortBy, courses]);

  const categories = ['all', 'Web Development', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'AI & Machine Learning', 'Mobile Development'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const priceRanges = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' }
  ];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const toggleWishlist = (courseId) => {
    setWishlist(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Cart removed for free courses

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSortBy('popular');
  };

  const submitSearch = (value) => {
    const term = (value ?? searchQuery).trim();
    if (!term) return;
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="text-center mb-8">
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Find Your Perfect Course
          </h1>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Discover thousands of courses from top instructors
          </p>
        </div>

        <div className="search-container" style={{ 
          background: 'var(--bg-primary)', 
          padding: '2rem', 
          borderRadius: 'var(--border-radius)', 
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ width: '100%' }}
            />
            <button onClick={() => submitSearch()} className="form-button" style={{ width: '100%' }}>Search</button>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
              style={{ width: '100%' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="form-input"
              style={{ width: '100%' }}
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
            <select 
              value={selectedPrice} 
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="form-input"
              style={{ width: '100%' }}
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={clearFilters} className="btn-secondary" style={{ maxWidth: '200px' }}>
              Clear Filters
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)' }}>
            {isLoading ? 'Searching...' : `${filteredCourses.length} courses found`}
          </h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Cart removed for free courses */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="form-input" 
                style={{ width: 'auto', padding: '0.5rem' }}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {recentSearches.map(term => (
              <button key={term} onClick={() => { setSearchQuery(term); submitSearch(term); }} className="btn-secondary" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                {term}
              </button>
            ))}
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}>
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card" style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={course.image} 
                  alt={course.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                {/* Price/discount ribbon removed for free access */}
                <button
                  onClick={() => toggleWishlist(course.id)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlist.includes(course.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  fontWeight: '700', 
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }} onClick={() => navigate(`/course/${course.id}`)}>
                  {course.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>
                  by {course.instructor}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: '1rem', lineHeight: '1.4' }}>
                  {course.description}
                </p>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--border-radius)',
                      fontSize: 'var(--font-size-xs)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-color)', fontWeight: '600' }}>★ {course.rating}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      ({course.students.toLocaleString()})
                    </span>
                  </div>
                  <span style={{ 
                    background: 'var(--bg-tertiary)', 
                    color: 'var(--text-secondary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--border-radius)',
                    fontSize: 'var(--font-size-sm)'
                  }}>
                    {course.level}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                    ⏱ {course.duration}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-color)', fontWeight: 700 }}>
                    Free
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="form-button" 
                    style={{ flex: 1, padding: '0.75rem', fontSize: 'var(--font-size-sm)' }}
                  >
                    Enroll Free
                  </button>
                  <button 
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="btn-secondary" 
                    style={{ padding: '0.75rem', fontSize: 'var(--font-size-sm)' }}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && !isLoading && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              No courses found
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Try adjusting your search criteria or browse our popular courses
            </p>
            <button onClick={clearFilters} className="form-button" style={{ maxWidth: '200px' }}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
