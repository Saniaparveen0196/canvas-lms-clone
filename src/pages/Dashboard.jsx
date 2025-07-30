import React, { useState, useEffect } from 'react';
import { courses } from '../data/courses';
import { todos } from '../data/todos';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import TodoItem from '../components/TodoItem';
import CalendarWidget from '../components/CalendarWidget';
import styles from '../styles/dashboard.module.css';
import { useSidebar } from '../context/SidebarContext';

const Dashboard = () => {
  const userName = "John Doe";
  const [todosState, setTodosState] = useState(todos);
  const { desktopOpen } = useSidebar();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleToggleTodo = (id, completed) => {
    setTodosState(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodosState(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={`${styles.mainContent} ${desktopOpen ? styles.desktopOpen : ''}`}>
        <Header userName={userName} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button onClick={toggleDarkMode} className={styles.themeToggle}>
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <section className={styles.courseSection}>
          <h2>Your Courses</h2>
          <div className={styles.courseGrid}>
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section className={styles.todoSection}>
          <h2>To-Do</h2>
          <div className={styles.todoList}>
            {todosState.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        </section>

        <section className={styles.calendarSection}>
          <h2>Upcoming Events</h2>
          <CalendarWidget />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
