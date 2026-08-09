import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { ToastContainer } from './components/Toast';

// Pages
import { Landing } from './pages/Landing';
import { Explore } from './pages/Explore';
import { ItemDetails } from './pages/ItemDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { MyItems } from './pages/MyItems';
import { AddItem } from './pages/AddItem';
import { Borrowing } from './pages/Borrowing';
import { Lending } from './pages/Lending';
import { Requests } from './pages/Requests';
import { Wishlist } from './pages/Wishlist';
import { Community } from './pages/Community';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { TransactionDetails } from './pages/TransactionDetails';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useApp();
  const location = useLocation();

  // Pages where sidebar layout should NOT be displayed
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isLandingPage = location.pathname === '/';
  
  // Show sidebar and bottom mobile nav only for authenticated users on workspace pages
  const showSidebar = currentUser && !isAuthPage && !isLandingPage;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Show top header for all views except authentication views */}
      {!isAuthPage && <Navbar />}
      
      <div className="flex-1 flex flex-col lg:flex-row w-full relative">
        {showSidebar && <Sidebar />}
        <main className={`flex-grow w-full ${showSidebar ? 'pb-20 lg:pb-8' : ''}`}>
          {children}
        </main>
      </div>

      {showSidebar && <MobileNav />}
      <ToastContainer />
    </div>
  );
};

// Route wrapper for pages requiring user authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useApp();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Workspace Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-items" 
          element={
            <ProtectedRoute>
              <MyItems />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/items/new" 
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/items/:id/edit" 
          element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/borrowing" 
          element={
            <ProtectedRoute>
              <Borrowing />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lending" 
          element={
            <ProtectedRoute>
              <Lending />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/requests" 
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/community" 
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/transactions/:id" 
          element={
            <ProtectedRoute>
              <TransactionDetails />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
