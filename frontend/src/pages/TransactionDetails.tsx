import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Calendar, ShieldCheck, MapPin, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { TransactionTimeline } from '../components/TransactionTimeline';
import { RatingStars } from '../components/RatingStars';

export const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    currentUser, transactions, items, users, 
    confirmPickup, confirmReturn, showToast 
  } = useApp();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewType, setReviewType] = useState<'item' | 'user'>('item');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const tx = transactions.find(t => t.id === id);
  if (!tx) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 bg-white border border-slate-100 rounded-2xl shadow-premium">
        <h2 className="text-xl font-bold text-slate-800">Transaction not found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested transaction record does not exist.</p>
        <Link to="/dashboard" className="mt-4 inline-block px-5 py-2 bg-primary-600 text-white text-xs font-bold rounded-xl shadow">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const item = items.find(i => i.id === tx.itemId);
  
  const isBorrower = currentUser.id === tx.borrowerId;
  const isOwner = currentUser.id === tx.ownerId;
  
  const partnerId = isBorrower ? tx.ownerId : tx.borrowerId;
  const partnerUser = users.find(u => u.id === partnerId);

  const handlePickup = () => {
    confirmPickup(tx.id);
  };

  const handleReturnDirect = () => {
    // Shorthand return if no review input is needed immediately
    confirmReturn(tx.id);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please type a comment for the review.', 'error');
      return;
    }

    confirmReturn(tx.id, {
      rating,
      comment: comment.trim(),
      ratingType: reviewType
    });
    
    setComment('');
  };

  const totalCost = tx.totalPrice;
  const grandTotal = totalCost + tx.securityDeposit;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back link */}
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transaction Details</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Transaction ID: <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">{tx.id}</span></p>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-50 rounded-full text-xs font-semibold text-primary-700 w-fit shrink-0">
          <Sparkles size={12} />
          <span>Hyperlocal Borrow</span>
        </div>
      </div>

      {/* Visual Timeline component */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium">
        <h3 className="font-bold text-slate-800 text-sm mb-4">Transaction Stage</h3>
        <TransactionTimeline currentStatus={tx.status} isOverdue={tx.status === 'Overdue'} />
      </div>

      {/* Main grids: left specs & right contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left columns: Item & Cost summary */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Item details review */}
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-premium flex gap-4">
            <img src={item?.images[0]} alt={item?.name} className="h-16 w-16 rounded-xl object-cover border border-slate-100 shrink-0" />
            <div>
              <span className="text-[9px] font-bold text-primary-600 uppercase tracking-wider">{item?.category}</span>
              <h3 className="font-bold text-slate-800 text-base mt-0.5">{item?.name}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {item?.sharingType === 'Free' ? 'Free borrow' : `Rate: ₹${item?.dailyRate}/day`}
              </p>
            </div>
          </div>

          {/* Cost details */}
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-premium space-y-3">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">Financial Summary</h3>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Rental fee:</span>
                <span className="font-semibold text-slate-800 font-mono">₹{totalCost}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Refundable deposit:</span>
                <span className="font-semibold text-slate-800 font-mono">₹{tx.securityDeposit}</span>
              </div>
              
              <div className="flex justify-between text-sm font-bold text-slate-800 border-t border-dashed border-slate-100 pt-2">
                <span>Total Amount:</span>
                <span className="text-primary-600 text-base font-mono">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Interactive Action Forms based on status */}
          <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium space-y-4">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">Actions</h3>

            {/* UPCOMING status (Approve state waiting for pickup) */}
            {tx.status === 'Upcoming' && (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3.5 rounded-xl text-xs flex gap-2 font-medium leading-relaxed">
                  <AlertCircle size={18} className="shrink-0 text-blue-600" />
                  <span>
                    <strong>Handover confirmation:</strong> Ensure you meet in a safe public spot. Once the borrower picks up the item, click the button below to mark it as borrowed.
                  </span>
                </div>
                <button
                  onClick={handlePickup}
                  className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-colors"
                >
                  Confirm Item Pickup
                </button>
              </div>
            )}

            {/* ACTIVE/OVERDUE status (Currently borrowed) */}
            {(tx.status === 'Active' || tx.status === 'Overdue') && (
              <div className="space-y-3">
                {tx.status === 'Overdue' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex gap-2 font-bold animate-pulse-subtle">
                    <AlertCircle size={18} className="shrink-0 text-red-600" />
                    <span>Warning: The return schedule has passed. Please return the item immediately.</span>
                  </div>
                )}
                
                {isBorrower ? (
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500 font-medium">
                      Returned the item back to {partnerUser?.name}? Click below to initiate the return verification.
                    </div>
                    <button
                      onClick={handleReturnDirect}
                      className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-colors"
                    >
                      Mark as Returned
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-medium text-center py-2">
                    Waiting for borrower ({partnerUser?.name}) to return the item.
                  </div>
                )}
              </div>
            )}

            {/* RETURNED status (Initiates the review form) */}
            {tx.status === 'Returned' && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl text-xs flex gap-2 font-medium">
                  <AlertCircle size={18} className="shrink-0 text-emerald-600" />
                  <span>
                    {isOwner 
                      ? 'The borrower marked the item as returned. Inspect the item, then submit a review to release deposit.' 
                      : 'You have returned the item. Please write a review while the owner confirms receipt.'}
                  </span>
                </div>

                <form onSubmit={handleReviewSubmit} className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-800">How was your experience?</h4>
                  
                  {/* Select review type */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setReviewType('item')}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        reviewType === 'item' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      Review the Item Condition
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewType('user')}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        reviewType === 'user' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      Review {partnerUser?.name}
                    </button>
                  </div>

                  {/* Stars select */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-slate-500 mr-2">Stars:</span>
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`text-lg transition-transform hover:scale-110 ${
                          num <= rating ? 'text-amber-400' : 'text-slate-200'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  {/* Comment */}
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={
                      reviewType === 'item' 
                        ? 'Did the item work as described? Any tips for other neighbors...'
                        : `How was communication, handover, and promptness with ${partnerUser?.name}...`
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs h-20 focus:outline-none focus:border-primary-500"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow"
                  >
                    {isOwner ? 'Confirm Receipt & Submit Review' : 'Submit Review'}
                  </button>
                </form>
              </div>
            )}

            {/* COMPLETED status */}
            {tx.status === 'Completed' && (
              <div className="text-center py-6 text-xs text-slate-400 font-semibold flex flex-col items-center gap-2">
                <span className="text-xl">🎉</span>
                <span>This transaction has been completed and finalized. Thank you for sharing!</span>
              </div>
            )}

          </div>

        </div>

        {/* Right columns: partner card & meetup directions */}
        <div className="space-y-6">
          
          {/* Partner user profile */}
          {partnerUser && (
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-premium space-y-4">
              <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
                {isBorrower ? 'Owner details' : 'Borrower details'}
              </h3>
              
              <div className="flex gap-3 items-center">
                <img src={partnerUser.avatar} alt={partnerUser.name} className="h-10 w-10 rounded-full border border-slate-150" />
                <div>
                  <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1">
                    {partnerUser.name}
                    {partnerUser.trustedMember && (
                      <ShieldCheck size={14} className="text-primary-600 fill-primary-50" />
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{partnerUser.neighborhood.split(',')[0]}</p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 border-t border-slate-50 pt-3 text-center text-xs">
                <div className="border-r border-slate-50 pr-2">
                  <span className="block font-bold text-slate-800">{partnerUser.rating}★</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">rating</span>
                </div>
                <div className="pl-2">
                  <span className="block font-bold text-slate-800">{partnerUser.successfulBorrows + partnerUser.successfulLends}</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">borrows/lends</span>
                </div>
              </div>

              {/* Chat action */}
              <button
                onClick={() => showToast(`Simulated message box with ${partnerUser.name}`, 'info')}
                className="w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <MessageSquare size={14} className="text-slate-400" />
                Message {partnerUser.name.split(' ')[0]}
              </button>
            </div>
          )}

          {/* Meetup / location helper */}
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-premium space-y-3">
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-slate-400">
              Meetup Location
            </h3>
            
            <div className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed font-medium">
              <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p>Coordinates default to the Owner's listing neighborhood:</p>
                <strong className="text-slate-800 block mt-1">{partnerUser?.neighborhood || 'Indiranagar, Bangalore'}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
