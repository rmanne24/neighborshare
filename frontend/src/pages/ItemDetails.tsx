import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Calendar, ShieldCheck, Mail, Phone, ChevronRight, User as UserIcon, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RatingStars } from '../components/RatingStars';
import { StatusBadge } from '../components/StatusBadge';
import { BorrowRequestModal } from '../components/BorrowRequestModal';

export const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, users, reviews, wishlist, toggleWishlist, currentUser } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const item = items.find(i => i.id === id);
  if (!item) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 bg-white border border-slate-100 rounded-2xl shadow-premium">
        <h2 className="text-xl font-bold text-slate-800">Item not found</h2>
        <p className="text-sm text-slate-500 mt-2">The listing you are looking for does not exist or has been removed.</p>
        <Link to="/explore" className="mt-4 inline-block px-5 py-2 bg-primary-600 text-white text-xs font-bold rounded-xl shadow hover:bg-primary-700">
          Back to Explore
        </Link>
      </div>
    );
  }

  // Find owner & reviews
  const owner = users.find(u => u.id === item.ownerId);
  const itemReviews = reviews.filter(r => r.itemId === item.id && r.type === 'item');
  const isWishlisted = wishlist.includes(item.id);
  const isOwner = currentUser?.id === item.ownerId;

  const handleRequestClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb path */}
      <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold tracking-wide">
        <Link to="/explore" className="hover:text-primary-600 transition-colors">Explore</Link>
        <ChevronRight size={12} />
        <Link to={`/explore?category=${encodeURIComponent(item.category)}`} className="hover:text-primary-600 transition-colors">{item.category}</Link>
        <ChevronRight size={12} />
        <span className="text-slate-600 truncate">{item.name}</span>
      </div>

      {/* Main product view */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Image Gallery & Reviews */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Main Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 shadow border border-slate-100">
            <img 
              src={item.images[0]} 
              alt={item.name} 
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 z-10">
              <StatusBadge status={item.status} type="item" />
            </div>
          </div>

          {/* Item details info card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-premium space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-primary-600 uppercase">
                <span>{item.category}</span>
                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                <span className="text-slate-500 lowercase px-1.5 py-0.5 rounded bg-slate-100 font-medium">{item.condition} condition</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {item.name}
              </h1>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-50 pb-3">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-slate-400" />
                  {item.distance === 0 ? 'Located with you' : `${item.distance}m away in ${owner?.neighborhood.split(',')[0]}`}
                </span>
                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                <RatingStars rating={item.rating} reviewsCount={item.reviewsCount} />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1.5">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            {/* Date ranges info */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <div className="h-10 w-10 rounded-lg bg-white border border-slate-150 flex items-center justify-center text-slate-500 shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Availability Period</p>
                <p className="text-xs font-semibold text-slate-700">
                  {item.availableFrom} to {item.availableTo}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-premium space-y-4">
            <h3 className="font-extrabold text-slate-800 text-base border-b border-slate-50 pb-2">
              Reviews ({itemReviews.length})
            </h3>
            
            {itemReviews.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No reviews listed for this item yet. Borrow and be the first to review!</p>
            ) : (
              <div className="space-y-4 divide-y divide-slate-50">
                {itemReviews.map(rev => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="h-7 w-7 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">{rev.reviewerName}</p>
                          <p className="text-[10px] text-slate-400">{rev.date}</p>
                        </div>
                      </div>
                      <RatingStars rating={rev.rating} showNumber={false} size={12} />
                    </div>
                    <p className="text-xs font-medium text-slate-600 pl-9 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Pricing & Booking Card, Owner Card */}
        <div className="space-y-6">
          
          {/* Pricing & Booking CTA Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-150 shadow-premium-hover space-y-5 sticky top-24">
            
            {/* Price tags */}
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Borrow Rate</span>
              <span className="text-2xl font-black text-slate-900">
                {item.sharingType === 'Free' ? (
                  <span className="text-emerald-600 font-black">FREE</span>
                ) : (
                  <span>₹{item.dailyRate}<span className="text-sm font-normal text-slate-400">/day</span></span>
                )}
              </span>
            </div>

            {/* Deposit info */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-500 space-y-1.5">
              <div className="flex justify-between font-medium">
                <span>Security Deposit:</span>
                <span className="font-semibold text-slate-700 font-mono">₹{item.securityDeposit}</span>
              </div>
              <p className="text-[10px] text-slate-400">
                * Fully refundable deposit held to ensure item care and returned on time.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-2">
              {isOwner ? (
                <Link
                  to={`/items/${item.id}/edit`}
                  className="block w-full py-3 bg-secondary-500 hover:bg-secondary-600 text-center text-white font-bold text-sm rounded-xl shadow-md transition-premium"
                >
                  Edit Listing Details
                </Link>
              ) : item.status !== 'Available' ? (
                <button
                  disabled
                  className="w-full py-3 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed border border-slate-200"
                >
                  Currently Borrowed/Reserved
                </button>
              ) : (
                <button
                  onClick={handleRequestClick}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-premium"
                >
                  Request to Borrow
                </button>
              )}

              {/* Wishlist Toggle Button */}
              <button
                onClick={() => toggleWishlist(item.id)}
                className={`w-full py-2.5 border rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                  isWishlisted 
                    ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Heart size={14} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                {isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
              </button>
            </div>
            
          </div>

          {/* Owner details card */}
          {owner && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-premium space-y-4">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider text-slate-400">
                Shared by neighbor
              </h3>
              
              <div className="flex gap-3 items-center">
                <img 
                  src={owner.avatar} 
                  alt={owner.name} 
                  className="h-12 w-12 rounded-full object-cover border border-slate-150" 
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                    {owner.name}
                    {owner.trustedMember && (
                      <ShieldCheck size={16} className="text-primary-600 fill-primary-100" />
                    )}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-400">Member since {owner.joinedDate}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 border-y border-slate-50 py-3 text-center">
                <div>
                  <span className="block text-xs font-bold text-slate-800">{owner.itemsSharedCount}</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">listed</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">{owner.successfulLends}</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">lent</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">{owner.rating}★</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">rating</span>
                </div>
              </div>

              {/* Trust verifications list */}
              <div className="space-y-2 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-emerald-500" />
                  <span>Email verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className={owner.verifiedPhone ? "text-emerald-500" : "text-slate-300"} />
                  <span>Phone {owner.verifiedPhone ? "verified" : "not verified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-primary-500" />
                  <span>95% Response rate</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                "{owner.about}"
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Borrow Request Modal injection */}
      <BorrowRequestModal 
        item={item} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
