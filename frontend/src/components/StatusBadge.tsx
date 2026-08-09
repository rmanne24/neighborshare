import React from 'react';

type BadgeType = 'item' | 'request' | 'transaction';

interface StatusBadgeProps {
  status: string;
  type: BadgeType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  const getStyles = () => {
    if (type === 'item') {
      switch (status) {
        case 'Available':
          return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Reserved':
          return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Borrowed':
          return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'Unavailable':
          return 'bg-red-50 text-red-700 border-red-200';
        default:
          return 'bg-slate-50 text-slate-700 border-slate-200';
      }
    }
    
    if (type === 'request') {
      switch (status) {
        case 'Pending':
          return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'Approved':
          return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Rejected':
          return 'bg-red-50 text-red-700 border-red-200';
        case 'Cancelled':
          return 'bg-slate-50 text-slate-600 border-slate-200';
        default:
          return 'bg-slate-50 text-slate-600 border-slate-200';
      }
    }
    
    // type === 'transaction'
    switch (status) {
      case 'Upcoming':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Overdue':
        return 'bg-red-100 text-red-700 border-red-300 animate-pulse';
      case 'Returned':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStyles()}`}>
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
        status === 'Available' || status === 'Approved' || status === 'Completed' ? 'bg-emerald-500' :
        status === 'Reserved' || status === 'Pending' || status === 'Upcoming' ? 'bg-amber-500' :
        status === 'Borrowed' || status === 'Active' ? 'bg-blue-500' :
        status === 'Returned' ? 'bg-indigo-500' : 'bg-red-500'
      }`} />
      {status}
    </span>
  );
};
