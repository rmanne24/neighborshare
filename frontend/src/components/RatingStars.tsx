import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showNumber?: boolean;
  reviewsCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16, showNumber = true, reviewsCount }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const starsArray = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {starsArray.map(index => {
          const isFilled = index < fullStars || (index === fullStars && hasHalf);
          return (
            <Star
              key={index}
              size={size}
              className={`${
                isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
              }`}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-slate-600 ml-1">
          {rating.toFixed(1)}
          {reviewsCount !== undefined && (
            <span className="text-slate-400 font-normal"> ({reviewsCount})</span>
          )}
        </span>
      )}
    </div>
  );
};
