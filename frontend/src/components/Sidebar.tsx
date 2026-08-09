import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Search, Package, Inbox, Upload, ClipboardList, Heart, MessageSquare, Bell, LogOut, Settings, User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentUser, notifications, requests, logoutUser } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const unreadNotifs = notifications.filter(n => !n.isRead).length;
  // Received pending requests
  const pendingRequests = requests.filter(r => {
    // Find item owner
    return r.status === 'Pending';
  }).length; // For simplicity, check all pending requests user can act on

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Explore', path: '/explore', icon: Search },
    { label: 'My Items', path: '/my-items', icon: Package },
    { label: 'Borrowing', path: '/borrowing', icon: Inbox },
    { label: 'Lending', path: '/lending', icon: Upload },
    { 
      label: 'Requests', 
      path: '/requests', 
      icon: ClipboardList,
      badge: pendingRequests > 0 ? pendingRequests : undefined
    },
    { label: 'Wishlist', path: '/wishlist', icon: Heart },
    { label: 'Community', path: '/community', icon: MessageSquare },
    { 
      label: 'Notifications', 
      path: '/notifications', 
      icon: Bell,
      badge: unreadNotifs > 0 ? unreadNotifs : undefined
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-4 justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16">
      
      {/* Navigation Links */}
      <nav className="space-y-1 flex-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-premium ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-primary-700' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile bottom footer */}
      <div className="border-t border-slate-100 pt-4 mt-auto space-y-1 shrink-0">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="h-9 w-9 rounded-full object-cover border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.neighborhood.split(',')[0]}</p>
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
        >
          <LogOut size={18} className="text-red-500" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};
