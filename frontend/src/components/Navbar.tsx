import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User as UserIcon, LogOut, Heart, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentUser, notifications, logoutUser, markNotificationRead } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNotificationClick = (id: string) => {
    markNotificationRead(id);
    setShowNotifDropdown(false);
    navigate('/notifications');
  };

  const handleLogout = () => {
    logoutUser();
    setShowProfileDropdown(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-sm shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            NeighbourShare
          </span>
        </Link>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you need today?"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm bg-slate-50 focus:outline-none focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
          />
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-4 shrink-0">
          
          {currentUser ? (
            <>
              {/* Add Item Quick Button */}
              <Link 
                to="/items/new" 
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-premium"
              >
                <PlusCircle size={16} />
                <span>List an Item</span>
              </Link>

              {/* Notifications Center */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifDropdown(!showNotifDropdown);
                    setShowProfileDropdown(false);
                  }}
                  className="p-2 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-50 relative transition-colors"
                >
                  <Bell size={20} />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-scale-in">
                    <div className="p-3 border-b border-slate-50 bg-slate-50 flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">Notifications</span>
                      <Link to="/notifications" onClick={() => setShowNotifDropdown(false)} className="text-xs text-primary-600 font-semibold hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-400">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.slice(0, 5).map(notif => (
                          <div 
                            key={notif.id} 
                            onClick={() => handleNotificationClick(notif.id)}
                            className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer text-xs ${
                              !notif.isRead ? 'bg-primary-50/20 font-medium' : ''
                            }`}
                          >
                            <p className="text-slate-700 line-clamp-2">{notif.text}</p>
                            <span className="text-[10px] text-slate-400 block mt-1">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileDropdown(!showProfileDropdown);
                    setShowNotifDropdown(false);
                  }}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition-colors"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </button>
                
                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-scale-in">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <p className="font-bold text-sm text-slate-800 line-clamp-1">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <UserIcon size={16} className="text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setShowProfileDropdown(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <Heart size={16} className="text-slate-400" />
                        My Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-full hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-sm hover:shadow transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
