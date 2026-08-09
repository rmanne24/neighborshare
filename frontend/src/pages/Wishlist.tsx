import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, Compass, Star, MapPin } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Wishlist: React.FC = () => {
  const { currentUser, wishlist, items, toggleWishlist } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  // Filter items in wishlist
  const wishlistedItems = items.filter(item => wishlist.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Wishlist</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Monitor availability of items you saved for future projects</p>
      </div>

      {wishlistedItems.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-premium max-w-lg mx-auto mt-8 flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
            <Heart size={28} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Your Wishlist is empty</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
              Save items you might need later while browsing the marketplace.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistedItems.map(item => {
            const isAvailableNow = item.status === 'Available';

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden flex flex-col justify-between h-full group relative"
              >
                
                {/* Image & Heart icon */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={18} className="fill-red-500 text-red-500" />
                  </button>
                  
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={item.status} type="item" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-primary-600 uppercase tracking-wider">
                      <span>{item.category}</span>
                      {isAvailableNow && (
                        <span className="text-[10px] text-emerald-600 font-extrabold normal-case bg-emerald-50 px-1.5 py-0.5 rounded">
                          Available now
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                      <span className="flex items-center gap-0.5">
                        <MapPin size={12} />
                        {item.distance}m
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto shrink-0">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Rate</span>
                      <span className="text-sm font-extrabold text-slate-800">
                        {item.sharingType === 'Free' ? (
                          <span className="text-emerald-600 font-black">FREE</span>
                        ) : (
                          <span>₹{item.dailyRate}/day</span>
                        )}
                      </span>
                    </div>

                    <Link
                      to={`/items/${item.id}`}
                      className="px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                    >
                      Borrow
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
