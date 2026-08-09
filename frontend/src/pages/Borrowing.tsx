import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Inbox, Calendar, AlertTriangle, User, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Borrowing: React.FC = () => {
  const { currentUser, transactions, items, users } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'Active' | 'Upcoming' | 'Returned'>('Active');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter transactions where user is borrower
  const myBorrows = transactions.filter(t => t.borrowerId === currentUser.id);

  // Group by tab
  const tabFilteredBorrows = myBorrows.filter(t => {
    if (activeTab === 'Active') {
      return t.status === 'Active' || t.status === 'Overdue';
    }
    if (activeTab === 'Upcoming') {
      return t.status === 'Upcoming';
    }
    // Returned/Completed
    return t.status === 'Returned' || t.status === 'Completed';
  });

  const getRemainingDaysText = (endDateStr: string, status: string) => {
    if (status === 'Completed' || status === 'Returned') return 'Returned';
    
    const today = new Date('2026-08-09'); // Preset current local date
    const end = new Date(endDateStr);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? 'day' : 'days'}`;
    }
    if (diffDays === 0) {
      return 'Due today';
    }
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} remaining`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Borrowing</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Track items you have borrowed or are scheduled to pickup</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-100 pb-1.5 overflow-x-auto scrollbar-none">
        {(['Active', 'Upcoming', 'Returned'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            {tab === 'Active' ? 'Active Borrows' : tab === 'Upcoming' ? 'Upcoming Pickups' : 'History / Returned'}
          </button>
        ))}
      </div>

      {/* Lists */}
      {tabFilteredBorrows.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-premium max-w-lg mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
            <Inbox size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">You're not borrowing anything yet</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
              Save money and avoid clutter. Find a tool or household item nearby!
            </p>
          </div>
          <Link
            to="/explore"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            Explore Items
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tabFilteredBorrows.map(tx => {
            const item = items.find(i => i.id === tx.itemId);
            const owner = users.find(u => u.id === tx.ownerId);
            
            const daysText = getRemainingDaysText(tx.endDate, tx.status);
            const isOverdue = daysText.startsWith('Overdue');

            return (
              <div 
                key={tx.id}
                className={`bg-white border p-5 rounded-2xl shadow-premium flex flex-col justify-between gap-4 transition-premium hover:shadow-premium-hover ${
                  isOverdue ? 'border-red-200 bg-red-50/10' : 'border-slate-100'
                }`}
              >
                
                {/* Upper Info */}
                <div className="flex gap-4 items-start">
                  <img src={item?.images[0]} alt={item?.name} className="h-16 w-16 rounded-xl object-cover border border-slate-100 shrink-0" />
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">{item?.category}</span>
                      <StatusBadge status={tx.status} type="transaction" />
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-base mt-1 line-clamp-1">{item?.name}</h3>
                    
                    {/* Owner details */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <User size={12} className="text-slate-400" />
                      <span>Owner: <strong className="font-semibold text-slate-700">{owner?.name}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Dates & Warnings */}
                <div className="border-y border-slate-50 py-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px] flex items-center gap-1">
                      <Calendar size={12} />
                      Rental Term
                    </span>
                    <span className="font-bold text-slate-700">{tx.startDate} to {tx.endDate}</span>
                  </div>

                  {/* Overdue alert */}
                  {isOverdue && (
                    <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl p-2.5 flex items-center gap-2 text-xs font-bold animate-pulse-subtle">
                      <AlertTriangle size={16} />
                      <span>{daysText}</span>
                    </div>
                  )}

                  {!isOverdue && tx.status !== 'Completed' && tx.status !== 'Returned' && (
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500 bg-slate-50 p-2 rounded-xl">
                      <span>Time Remaining:</span>
                      <span className="text-primary-700 font-bold">{daysText}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    to={`/transactions/${tx.id}`}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs text-center flex items-center justify-center gap-1"
                  >
                    View Status Details
                    <ChevronRight size={14} />
                  </Link>

                  {/* If active, option to mark as returned (goes to review flow) */}
                  {(tx.status === 'Active' || tx.status === 'Overdue') && (
                    <Link
                      to={`/transactions/${tx.id}`}
                      className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs text-center shadow-sm"
                    >
                      Mark as Returned
                    </Link>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
