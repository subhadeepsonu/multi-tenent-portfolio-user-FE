import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import ProjectPage from './pages/projects';
import SkillsPage from './pages/skills';
import ExperiencePage from './pages/experience';
import DashboardLayout from './components/dashBoard/DashBoard';
import { Toaster } from 'sonner';
import ProtectedRoute from './lib/ProtectedRoute';
import SettingsPage from './pages/settings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/dashboard" element={<DashboardLayout />} >
            <Route path="projects" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
            <Route path="skills" element={<ProtectedRoute><SkillsPage /></ProtectedRoute>} />
            <Route path="experience" element={<ProtectedRoute><ExperiencePage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
