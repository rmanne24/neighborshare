import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Inbox, Upload, Package, ClipboardList, Check, X, ArrowUpRight, Plus, Compass } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Dashboard: React.FC = () => {
  const { 
    currentUser, items, requests, transactions, users,
    approveRequest, rejectRequest 
  } = useApp();
  
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter listings
  const userItems = items.filter(i => i.ownerId === currentUser.id);
  
  // Filter active borrowings
  const activeBorrowings = transactions.filter(t => 
    t.borrowerId === currentUser.id && 
    (t.status === 'Active' || t.status === 'Overdue')
  );

  // Filter active lendings
  const activeLendings = transactions.filter(t => 
    t.ownerId === currentUser.id && 
    (t.status === 'Active' || t.status === 'Overdue')
  );

  // Filter pending requests received by user for their items
  const pendingRequests = requests.filter(r => {
    const item = items.find(i => i.id === r.itemId);
    return item?.ownerId === currentUser.id && r.status === 'Pending';
  });

  // Recommended items near user (from other users)
  const recommendations = items
    .filter(i => i.ownerId !== currentUser.id && i.status === 'Available')
    .slice(0, 3);

  // Quick stats calculations
  const stats = [
    { label: 'Items Listed', value: userItems.length, icon: Package, color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Currently Borrowing', value: activeBorrowings.length, icon: Inbox, color: 'bg-blue-50 text-blue-700' },
    { label: 'Currently Lent', value: activeLendings.length, icon: Upload, color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Pending Requests', value: pendingRequests.length, icon: ClipboardList, color: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Profile Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Here's what's happening in your neighborhood.</p>
        </div>
        
        {/* Quick action triggers */}
        <div className="flex items-center gap-2">
          <Link 
            to="/explore" 
            className="flex items-center gap-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl bg-white shadow-sm"
          >
            <Compass size={14} />
            Explore
          </Link>
          <Link 
            to="/items/new" 
            className="flex items-center gap-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow"
          >
            <Plus size={14} />
            List an Item
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-premium flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
                <span className="block text-2xl font-black text-slate-900 mt-1">{s.value}</span>
              </div>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Left & Right Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT/CENTER COLUMN: Borrowing, Lending, and Requests */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Currently Borrowing */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-premium p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h2 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                <Inbox size={18} className="text-primary-600" />
                Currently Borrowing
              </h2>
              <Link to="/borrowing" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-0.5">
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            {activeBorrowings.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 font-medium">
                You're not borrowing anything yet. Explore available tools nearby!
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {activeBorrowings.map(tx => {
                  const item = items.find(i => i.id === tx.itemId);
                  return (
                    <div key={tx.id} className="py-3 first:pt-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={item?.images[0]} alt={item?.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{item?.name}</h3>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Return Date: {tx.endDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={tx.status} type="transaction" />
                        <Link 
                          to={`/transactions/${tx.id}`}
                          className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold rounded-lg"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Currently Lent */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-premium p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h2 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                <Upload size={18} className="text-indigo-600" />
                Currently Lent
              </h2>
              <Link to="/lending" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-0.5">
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            {activeLendings.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 font-medium">
                No items currently lent out. List more items to help your community!
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {activeLendings.map(tx => {
                  const item = items.find(i => i.id === tx.itemId);
                  const borrower = users.find(u => u.id === tx.borrowerId);
                  return (
                    <div key={tx.id} className="py-3 first:pt-0 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={item?.images[0]} alt={item?.name} className="h-10 w-10 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{item?.name}</h3>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Borrowed by {borrower?.name.split(' ')[0]} • Return: {tx.endDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={tx.status} type="transaction" />
                        <Link 
                          to={`/transactions/${tx.id}`}
                          className="px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold rounded-lg"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pending Requests Received */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-premium p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h2 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                <ClipboardList size={18} className="text-amber-600" />
                Pending Requests Received
              </h2>
              <Link to="/requests" className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-0.5">
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 font-medium">
                No pending requests. You're all caught up!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map(req => {
                  const borrower = users.find(u => u.id === req.borrowerId);
                  const item = items.find(i => i.id === req.itemId);
                  return (
                    <div key={req.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2.5">
                          <img src={borrower?.avatar} alt={borrower?.name} className="h-8 w-8 rounded-full" />
                          <div>
                            <p className="text-xs font-bold text-slate-800">
                              {borrower?.name} <span className="font-medium text-slate-500">wants to borrow</span> {item?.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{req.startDate} to {req.endDate}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{req.createdAt.split('T')[0]}</span>
                      </div>
                      
                      <p className="text-xs text-slate-600 italic bg-white p-2.5 border border-slate-100 rounded-lg">
                        "{req.message}"
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => approveRequest(req.id)}
                          className="flex-1 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1"
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() => rejectRequest(req.id)}
                          className="flex-1 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-lg flex items-center justify-center gap-1"
                        >
                          <X size={14} />
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Recommendations & Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions Board */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-premium p-6 space-y-3">
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
              Quick Shortcuts
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/items/new"
                className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-center text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
              >
                + List a New Item
              </Link>
              <Link
                to="/community"
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-center text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Post Community Request
              </Link>
            </div>
          </div>

          {/* Recommended for You */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-premium p-6 space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm border-b border-slate-50 pb-2">
              Recommended for you
            </h3>
            
            <div className="space-y-4">
              {recommendations.map(rec => {
                const owner = users.find(u => u.id === rec.ownerId);
                return (
                  <Link
                    key={rec.id}
                    to={`/items/${rec.id}`}
                    className="group flex gap-3 items-center hover:bg-slate-50 p-2 rounded-xl transition-colors border border-transparent hover:border-slate-50"
                  >
                    <img src={rec.images[0]} alt={rec.name} className="h-14 w-14 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-800 text-xs line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {rec.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{rec.category} • {rec.distance}m</p>
                      <p className="text-[10px] font-bold text-primary-600 mt-1">
                        {rec.sharingType === 'Free' ? 'FREE' : `₹${rec.dailyRate}/day`}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
