import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Phone, Calendar, Star, Package, Check, Award } from 'lucide-react';
import { RatingStars } from '../components/RatingStars';

export const Profile: React.FC = () => {
  const { currentUser, items, reviews } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter items owned by current user
  const userItems = items.filter(item => item.ownerId === currentUser.id);

  // User reviews (reviews of type 'user' written about this user)
  const userReviews = reviews.filter(r => r.type === 'user');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Details card */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium flex flex-col md:flex-row gap-6 items-start">
        
        {/* Avatar */}
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border border-slate-200"
        />

        {/* Profile details */}
        <div className="flex-1 space-y-3 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-1.5 leading-tight">
                {currentUser.name}
                {currentUser.trustedMember && (
                  <ShieldCheck size={20} className="text-primary-600 fill-primary-50 shrink-0" />
                )}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-1">{currentUser.neighborhood}</p>
            </div>
            
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100 text-xs font-bold w-fit">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{currentUser.rating.toFixed(1)} Rating</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Calendar size={14} className="text-slate-400" />
            <span>Member since {currentUser.joinedDate}</span>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 pt-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
              <Check size={10} />
              <span>Email Verified</span>
            </div>
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
              currentUser.verifiedPhone 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <Check size={10} />
              <span>Phone {currentUser.verifiedPhone ? 'Verified' : 'Unverified'}</span>
            </div>
            {currentUser.trustedMember && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-[10px] font-bold border border-primary-100">
                <Award size={10} />
                <span>Trusted Member</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Stats Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Items Listed', value: currentUser.itemsSharedCount },
          { label: 'Successful Borrows', value: currentUser.successfulBorrows },
          { label: 'Successful Lends', value: currentUser.successfulLends },
          { label: 'On-time Returns', value: `${currentUser.onTimeReturnRate}%` }
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-slate-100 p-4 rounded-xl shadow-premium text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <span className="block text-xl font-black text-slate-800 mt-1">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium space-y-2">
        <h3 className="font-bold text-slate-800 text-base">About</h3>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {currentUser.about}
        </p>
      </div>

      {/* Two columns: Listed items & Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: User Listings */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-2">
            <h3 className="font-bold text-slate-800 text-base">Listed Items ({userItems.length})</h3>
            <Link to="/my-items" className="text-xs font-bold text-primary-600 hover:underline">Manage</Link>
          </div>
          
          {userItems.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">You haven't listed any items yet.</p>
          ) : (
            <div className="space-y-3">
              {userItems.map(item => (
                <Link
                  key={item.id}
                  to={`/items/${item.id}`}
                  className="flex gap-3 items-center p-2 border border-slate-50 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <img src={item.images[0]} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-[9px] text-slate-400 font-semibold">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right: Community Reviews */}
        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-premium space-y-4">
          <h3 className="font-bold text-slate-800 text-base border-b border-slate-50 pb-2">
            Reviews from Neighbors ({userReviews.length})
          </h3>

          {userReviews.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6 font-medium">No ratings left by other members yet.</p>
          ) : (
            <div className="space-y-4 divide-y divide-slate-50">
              {userReviews.map(rev => (
                <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <img src={rev.reviewerAvatar} alt={rev.reviewerName} className="h-6 w-6 rounded-full object-cover" />
                      <span className="font-bold text-slate-800">{rev.reviewerName}</span>
                    </div>
                    <RatingStars rating={rev.rating} showNumber={false} size={10} />
                  </div>
                  <p className="text-xs text-slate-500 italic font-medium pl-8">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
