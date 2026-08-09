import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ClipboardList, Check, X, Calendar, User as UserIcon } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Requests: React.FC = () => {
  const { 
    currentUser, requests, items, users,
    approveRequest, rejectRequest 
  } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'Received' | 'Sent'>('Received');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter requests
  const sentRequests = requests.filter(r => r.borrowerId === currentUser.id);
  const receivedRequests = requests.filter(r => {
    const item = items.find(i => i.id === r.itemId);
    return item?.ownerId === currentUser.id;
  });

  const activeRequests = activeTab === 'Received' ? receivedRequests : sentRequests;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Requests</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Manage inbound proposals from neighbors and track your outbound requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-100 pb-1.5 overflow-x-auto scrollbar-none">
        {(['Received', 'Sent'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            {tab === 'Received' 
              ? `Received Requests (${receivedRequests.filter(r => r.status === 'Pending').length} pending)` 
              : `Sent Requests (${sentRequests.length})`}
          </button>
        ))}
      </div>

      {/* List */}
      {activeRequests.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-premium max-w-lg mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
            <ClipboardList size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">No requests yet</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto font-medium">
              {activeTab === 'Received'
                ? "You haven't received any borrow requests from your neighbors yet."
                : "You haven't submitted any borrow requests yet."}
            </p>
          </div>
          {activeTab === 'Sent' && (
            <Link
              to="/explore"
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Explore Items to Borrow
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {activeRequests.map(req => {
            const item = items.find(i => i.id === req.itemId);
            
            // If Received: show borrower details. If Sent: show owner details.
            const contactId = activeTab === 'Received' ? req.borrowerId : (item?.ownerId || '');
            const contactUser = users.find(u => u.id === contactId);

            return (
              <div 
                key={req.id} 
                className="bg-white p-5 rounded-2xl shadow-premium border border-slate-100 space-y-4 hover:border-slate-200 transition-colors"
              >
                
                {/* User header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-3 items-center">
                    <img src={contactUser?.avatar} alt={contactUser?.name} className="h-9 w-9 rounded-full object-cover border border-slate-150" />
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">
                        {activeTab === 'Received' ? 'Borrower: ' : 'Owner: '}
                        {contactUser?.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Rating: {contactUser?.rating} ★ • {contactUser?.neighborhood.split(',')[0]}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <StatusBadge status={req.status} type="request" />
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{req.createdAt.split('T')[0]}</span>
                  </div>
                </div>

                {/* Requested Item */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item?.images[0]} alt={item?.name} className="h-9 w-9 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-800">{item?.name}</p>
                      <p className="text-[10px] text-slate-400">{item?.category}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {req.totalCost === 0 ? (
                      <span className="text-emerald-600 font-extrabold">FREE</span>
                    ) : (
                      <span className="font-bold text-slate-800 font-mono">₹{req.totalCost}</span>
                    )}
                    <p className="text-[9px] text-slate-400">Deposit: ₹{req.securityDeposit}</p>
                  </div>
                </div>

                {/* Date specs & Message */}
                <div className="text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold uppercase tracking-wider text-[9px]">
                    <Calendar size={12} />
                    Requested term: <strong className="font-bold text-slate-800 normal-case ml-1">{req.startDate} to {req.endDate}</strong>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Borrower Message / Purpose:</p>
                    <p className="bg-slate-50/50 p-3 border border-slate-100 rounded-xl italic text-slate-600 leading-relaxed font-medium">
                      {req.purpose && <strong>Purpose: {req.purpose}<br /></strong>}
                      "{req.message || 'No additional message.'}"
                    </p>
                  </div>
                </div>

                {/* Buttons (For Inbound Pending Requests) */}
                {activeTab === 'Received' && req.status === 'Pending' && (
                  <div className="flex gap-2 pt-2 border-t border-slate-50">
                    <button
                      onClick={() => approveRequest(req.id)}
                      className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Check size={14} />
                      Approve Request
                    </button>
                    <button
                      onClick={() => rejectRequest(req.id)}
                      className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                    >
                      <X size={14} />
                      Reject Request
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
