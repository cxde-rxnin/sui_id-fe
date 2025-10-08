import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/dashboard/Home';
import GetCredential from './pages/dashboard/GetCredential';
import MyCredentials from './pages/dashboard/MyCredentials';
import AccessContent from './pages/dashboard/AccessContent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/dashboard" 
        element={<DashboardLayout />}
      >
        <Route path="home" element={<Home />} />
        <Route path="get-credential" element={<GetCredential />} />
        <Route path="my-credentials" element={<MyCredentials />} />
        <Route path="access-content" element={<AccessContent />} />
      </Route>
    </Routes>
  );
}

export default App;