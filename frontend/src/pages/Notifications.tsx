import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle2, XCircle, Clock, Info, Check } from 'lucide-react';

export const Notifications: React.FC = () => {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleNotificationClick = (id: string, relatedId?: string, type?: string) => {
    markNotificationRead(id);
    if (relatedId) {
      if (type === 'request_received') {
        navigate('/requests');
      } else if (type === 'request_approved' || type === 'due_reminder') {
        // Go to transaction details
        navigate(`/transactions/${relatedId}`);
      } else {
        navigate('/requests');
      }
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'request_received':
        return <Bell size={18} className="text-amber-500" />;
      case 'request_approved':
        return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'request_rejected':
        return <XCircle size={18} className="text-red-500" />;
      case 'due_reminder':
        return <Clock size={18} className="text-blue-500" />;
      default:
        return <Info size={18} className="text-slate-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Notifications</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Review alerts regarding your approvals, due schedules, and community activity</p>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          <Check size={14} />
          Mark All as Read
        </button>
      </div>

      {/* Notifications list */}
      {notifications.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-premium">
          <p className="text-sm text-slate-400 font-semibold">You have no notifications yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-premium divide-y divide-slate-100">
          {notifications.map(notif => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif.id, notif.relatedId, notif.type)}
              className={`p-4 flex gap-4 items-start cursor-pointer hover:bg-slate-50 transition-colors ${
                !notif.isRead ? 'bg-primary-50/20 font-medium' : ''
              }`}
            >
              {/* Left type icon */}
              <div className="shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-100 mt-0.5">
                {getIcon(notif.type)}
              </div>
              
              {/* Mid text */}
              <div className="flex-1 space-y-1">
                <p className="text-xs sm:text-sm text-slate-700 leading-normal">{notif.text}</p>
                <span className="text-[10px] text-slate-400 font-semibold block">
                  {new Date(notif.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })} at{' '}
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Unread indicator */}
              {!notif.isRead && (
                <span className="shrink-0 h-2 w-2 rounded-full bg-primary-600 self-center" />
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
