import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Package, Plus, Trash2, Edit3, Eye, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const MyItems: React.FC = () => {
  const { currentUser, items, transactions, users, deleteItem } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'All' | 'Available' | 'Reserved' | 'Borrowed' | 'Unavailable'>('All');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter items owned by the current user
  const myItems = items.filter(item => item.ownerId === currentUser.id);

  // Filter items based on active tab
  const tabFilteredItems = myItems.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const handleDeleteTrigger = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedItemId) {
      deleteItem(selectedItemId);
      setIsDeleteOpen(false);
      setSelectedItemId(null);
    }
  };

  const getBorrowerDetails = (itemId: string) => {
    // Find active or upcoming transaction for this item
    const tx = transactions.find(t => t.itemId === itemId && t.status !== 'Completed' && t.status !== 'Returned');
    if (tx) {
      const borrower = users.find(u => u.id === tx.borrowerId);
      return {
        name: borrower?.name || 'Neighbor',
        avatar: borrower?.avatar,
        txId: tx.id,
        returnDate: tx.endDate
      };
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Items</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage, edit, and track items you are sharing with neighbors</p>
        </div>
        <Link
          to="/items/new"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
        >
          <Plus size={16} />
          List an Item
        </Link>
      </div>

      {/* Tabs list */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1.5 border-b border-slate-100 scrollbar-none">
        {(['All', 'Available', 'Reserved', 'Borrowed', 'Unavailable'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors shrink-0 ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:bg-slate-150 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid or Empty state */}
      {myItems.length === 0 ? (
        /* Overall Empty State (no items listed ever) */
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-premium max-w-lg mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
            <Package size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">No items yet</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
              “Your garage could be someone else's toolbox.” Share something sitting unused!
            </p>
          </div>
          <Link
            to="/items/new"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
          >
            List Your First Item
          </Link>
        </div>
      ) : tabFilteredItems.length === 0 ? (
        /* Tab specific empty state */
        <div className="text-center py-12 text-slate-400 text-sm font-medium">
          No items found under status "{activeTab}".
        </div>
      ) : (
        /* Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tabFilteredItems.map(item => {
            const borrower = getBorrowerDetails(item.id);
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden flex flex-col justify-between h-full group"
              >
                {/* Visual Cover */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={item.status} type="item" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-[9px] font-bold text-primary-600 uppercase tracking-wider">{item.category} • {item.condition}</span>
                    <h3 className="font-bold text-slate-800 text-base mt-1 line-clamp-1">{item.name}</h3>
                    
                    {/* pricing */}
                    <p className="text-xs font-bold text-slate-600 mt-1">
                      {item.sharingType === 'Free' ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        <span>₹{item.dailyRate}/day <span className="text-[10px] text-slate-400 font-normal">(Deposit: ₹{item.securityDeposit})</span></span>
                      )}
                    </p>

                    {/* Borrower info if currently reserved or borrowed */}
                    {borrower && (
                      <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={borrower.avatar} alt={borrower.name} className="h-6 w-6 rounded-full" />
                          <div>
                            <p className="font-bold text-slate-700">{borrower.name}</p>
                            <p className="text-[10px] text-slate-400">Return: {borrower.returnDate}</p>
                          </div>
                        </div>
                        <Link to={`/transactions/${borrower.txId}`} className="text-[10px] text-primary-600 font-bold hover:underline shrink-0">
                          Timeline →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2 border-t border-slate-50 pt-3 mt-auto shrink-0">
                    <Link
                      to={`/items/${item.id}`}
                      className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye size={14} className="text-slate-400" />
                      View
                    </Link>
                    
                    <Link
                      to={`/items/${item.id}/edit`}
                      className="flex-1 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit3 size={14} className="text-slate-400" />
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteTrigger(item.id)}
                      className="p-2 border border-red-150 hover:bg-red-50 text-red-600 rounded-xl transition-colors shrink-0"
                      aria-label="Delete item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        title="Delete Listing"
        message="Are you sure you want to delete this item? This will cancel any pending borrow requests for it. This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedItemId(null);
        }}
      />

    </div>
  );
};
