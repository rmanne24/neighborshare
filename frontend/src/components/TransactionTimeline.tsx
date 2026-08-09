import React from 'react';
import { Check } from 'lucide-react';

interface TransactionTimelineProps {
  currentStatus: 'Upcoming' | 'Active' | 'Overdue' | 'Returned' | 'Completed';
  isOverdue?: boolean;
}

export const TransactionTimeline: React.FC<TransactionTimelineProps> = ({ currentStatus, isOverdue = false }) => {
  const steps = [
    { label: 'REQUESTED', key: 'requested' },
    { label: 'APPROVED', key: 'approved' },
    { label: 'PICKED UP', key: 'picked_up' },
    { label: 'BORROWED', key: 'borrowed' },
    { label: 'RETURNED', key: 'returned' },
    { label: 'COMPLETED', key: 'completed' }
  ];

  // Determine current active step index
  const getCurrentStepIndex = () => {
    switch (currentStatus) {
      case 'Upcoming':
        return 1; // APPROVED
      case 'Active':
      case 'Overdue':
        return 3; // BORROWED (Picked up is step 2, which leads to active borrowing)
      case 'Returned':
        return 4; // RETURNED
      case 'Completed':
        return 5; // COMPLETED
      default:
        return 0;
    }
  };

  const activeIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-4">
      {/* Desktop Horizontal Timeline */}
      <div className="hidden sm:flex items-center justify-between w-full relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary-500 -translate-y-1/2 z-0 transition-all duration-500" 
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;
          const isUpcoming = idx > activeIndex;

          return (
            <div key={step.label} className="relative z-10 flex flex-col items-center">
              {/* Dot */}
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all duration-300 ${
                  isCompleted ? 'bg-primary-500 border-primary-500 text-white' :
                  isActive ? (isOverdue ? 'bg-red-500 border-red-500 text-white animate-pulse' : 'bg-white border-primary-600 text-primary-600') :
                  'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {isCompleted ? <Check size={14} /> : idx + 1}
              </div>
              
              {/* Label */}
              <span 
                className={`text-[10px] font-bold tracking-wider mt-2 transition-colors ${
                  isCompleted ? 'text-primary-600' :
                  isActive ? (isOverdue ? 'text-red-600' : 'text-slate-800') :
                  'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="flex sm:hidden flex-col gap-4 pl-4 relative border-l-2 border-slate-100 ml-3">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;

          return (
            <div key={step.label} className="flex items-center gap-3 relative">
              {/* Indicator dot */}
              <div 
                className={`absolute -left-[25px] h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted ? 'bg-primary-500 border-primary-500' :
                  isActive ? (isOverdue ? 'bg-red-500 border-red-500 animate-pulse' : 'bg-white border-primary-600') :
                  'bg-white border-slate-200'
                }`}
              />
              
              {/* Label */}
              <span 
                className={`text-xs font-bold tracking-wider transition-colors ${
                  isCompleted ? 'text-primary-600' :
                  isActive ? (isOverdue ? 'text-red-600' : 'text-slate-800') :
                  'text-slate-400'
                }`}
              >
                {step.label}
                {isActive && isOverdue && <span className="text-[10px] text-red-500 font-normal ml-2">(Overdue)</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
