import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import './styles/global.css';
import { ThemeContextProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <ThemeContextProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </ThemeContextProvider>
    
  );
}

export default App;
