import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  const adminAuth = localStorage.getItem('adminAuth');
  const adminRole = localStorage.getItem('adminRole');
  
  // Check token, adminAuth flag, and ADMIN role
  if (!token || !adminAuth || adminRole !== 'ADMIN') {
    // Clear stale admin data if role doesn't match
    if (adminRole && adminRole !== 'ADMIN') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminUsername');
      localStorage.removeItem('adminRole');
    }
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
}
