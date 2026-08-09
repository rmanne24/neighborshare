import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Search, PlusCircle, MessageSquare, Menu, X, 
  Package, Inbox, Upload, ClipboardList, Heart, Bell, LogOut, User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentUser, logoutUser, notifications, requests } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const unreadNotifs = notifications.filter(n => !n.isRead).length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false);
    navigate('/');
  };

  const handleMenuClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-40 px-2 shadow-lg shrink-0">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            `flex flex-col items-center justify-center flex-1 h-full text-slate-500 transition-colors ${
              isActive ? 'text-primary-600 font-semibold' : ''
            }`
          }
        >
          <Home size={20} />
          <span className="text-[10px] mt-0.5">Home</span>
        </NavLink>

        <NavLink 
          to="/explore"
          className={({ isActive }) => 
            `flex flex-col items-center justify-center flex-1 h-full text-slate-500 transition-colors ${
              isActive ? 'text-primary-600 font-semibold' : ''
            }`
          }
        >
          <Search size={20} />
          <span className="text-[10px] mt-0.5">Explore</span>
        </NavLink>

        <NavLink 
          to="/items/new"
          className={({ isActive }) => 
            `flex flex-col items-center justify-center flex-1 h-full text-slate-500 transition-colors ${
              isActive ? 'text-primary-600 font-semibold' : ''
            }`
          }
        >
          <PlusCircle size={22} className="text-primary-600" />
          <span className="text-[10px] mt-0.5 text-primary-600 font-semibold">List Item</span>
        </NavLink>

        <NavLink 
          to="/community"
          className={({ isActive }) => 
            `flex flex-col items-center justify-center flex-1 h-full text-slate-500 transition-colors ${
              isActive ? 'text-primary-600 font-semibold' : ''
            }`
          }
        >
          <MessageSquare size={20} />
          <span className="text-[10px] mt-0.5">Community</span>
        </NavLink>

        <button 
          onClick={() => setIsOpen(true)}
          className={`flex flex-col items-center justify-center flex-1 h-full text-slate-500 relative transition-colors ${
            isOpen ? 'text-primary-600 font-semibold' : ''
          }`}
        >
          <Menu size={20} />
          <span className="text-[10px] mt-0.5">Menu</span>
          {(unreadNotifs + pendingRequests) > 0 && (
            <span className="absolute top-2 right-6 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      </div>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in">
          
          {/* Overlay backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full ml-auto shadow-2xl p-5 border-l border-slate-100 justify-between animate-slide-in">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <span className="font-extrabold text-slate-800 text-base">Menu</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer User Info */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="h-10 w-10 rounded-full" />
                <div>
                  <h4 className="font-bold text-sm text-slate-800">{currentUser.name}</h4>
                  <p className="text-[10px] text-slate-500">{currentUser.neighborhood.split(',')[0]}</p>
                </div>
              </div>

              {/* Navigation list */}
              <nav className="space-y-1">
                {[
                  { label: 'Profile', path: '/profile', icon: User },
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
                  { 
                    label: 'Notifications', 
                    path: '/notifications', 
                    icon: Bell, 
                    badge: unreadNotifs > 0 ? unreadNotifs : undefined 
                  },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleMenuClick(item.path)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Icon size={18} className={isActive ? 'text-primary-700' : 'text-slate-400'} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout button */}
            <div className="border-t border-slate-100 pt-4 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut size={18} className="text-red-500" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
