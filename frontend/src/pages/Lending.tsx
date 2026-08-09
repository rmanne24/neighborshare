import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Upload, Calendar, User, MessageSquare, Eye } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Lending: React.FC = () => {
  const { currentUser, transactions, items, users, showToast } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter transactions where user is owner
  const myLends = transactions.filter(t => t.ownerId === currentUser.id);

  const handleMessageClick = (borrowerName: string) => {
    showToast(`Chat with ${borrowerName} would open here in the full app.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lending</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Track items you have lent out to neighbors and monitor returns</p>
      </div>

      {myLends.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-premium max-w-lg mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
            <Upload size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">No items lent yet</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
              Neighbors haven't requested your items yet, or you haven't approved any request.
            </p>
          </div>
          <Link
            to="/my-items"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            Manage My Items
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myLends.map(tx => {
            const item = items.find(i => i.id === tx.itemId);
            const borrower = users.find(u => u.id === tx.borrowerId);

            return (
              <div 
                key={tx.id}
                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-premium flex flex-col justify-between gap-4 transition-premium hover:shadow-premium-hover"
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
                    
                    {/* Borrower info */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <User size={12} className="text-slate-400" />
                      <span>Borrower: <strong className="font-semibold text-slate-700">{borrower?.name}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Dates info */}
                <div className="border-t border-slate-50 pt-3 text-xs flex justify-between items-center">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px] flex items-center gap-1">
                    <Calendar size={12} />
                    Borrowing Dates
                  </span>
                  <span className="font-bold text-slate-700">{tx.startDate} to {tx.endDate}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/transactions/${tx.id}`}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye size={14} className="text-slate-400" />
                    View Timeline
                  </Link>

                  <button
                    onClick={() => handleMessageClick(borrower?.name || 'Neighbor')}
                    className="flex-1 py-2 border border-primary-200 text-primary-700 hover:bg-primary-50 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare size={14} />
                    Message Borrower
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
