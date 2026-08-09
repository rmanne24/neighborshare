import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { Item, mockUsers } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { RatingStars } from './RatingStars';
import { StatusBadge } from './StatusBadge';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(item.id);
  
  // Find owner details
  const owner = mockUsers.find(u => u.id === item.ownerId);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item.id);
  };

  return (
    <Link 
      to={`/items/${item.id}`}
      className="group flex flex-col bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-100 overflow-hidden transition-premium h-full"
    >
      {/* Image Gallery / Cover */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 shrink-0">
        <img 
          src={item.images[0]} 
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badges on Image */}
        <div className="absolute top-3 left-3 z-10">
          <StatusBadge status={item.status} type="item" />
        </div>
        
        {/* Wishlist Heart */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-md hover:bg-white text-slate-400 hover:text-red-500 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={`transition-transform duration-300 active:scale-125 ${
              isWishlisted ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Distance Indicator */}
        <div className="absolute bottom-3 left-3 bg-slate-900/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[10px] font-medium flex items-center gap-1">
          <MapPin size={10} />
          {item.distance === 0 ? 'Owner (Self)' : `${item.distance}m away`}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-primary-600 uppercase tracking-wider mb-1">
            <span>{item.category}</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 lowercase font-medium">{item.condition}</span>
          </div>
          
          <h3 className="font-bold text-slate-800 text-base line-clamp-1 group-hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
          
          <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
            <span>by {owner?.name.split(' ')[0]}</span>
            <RatingStars rating={item.rating} reviewsCount={item.reviewsCount} />
          </div>
        </div>

        {/* Bottom Price Details */}
        <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-auto shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Rate</span>
            <span className="text-base font-bold text-slate-900">
              {item.sharingType === 'Free' ? (
                <span className="text-emerald-600 font-extrabold">FREE</span>
              ) : (
                <span>₹{item.dailyRate}<span className="text-xs font-normal text-slate-400">/day</span></span>
              )}
            </span>
          </div>
          
          <span className="text-xs text-primary-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
            Borrow Now →
          </span>
        </div>
      </div>
    </Link>
  );
};
