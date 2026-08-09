import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Item } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface BorrowRequestModalProps {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}

export const BorrowRequestModal: React.FC<BorrowRequestModalProps> = ({ item, isOpen, onClose }) => {
  const { createBorrowRequest } = useApp();
  
  // Set default dates based on current local date (2026-08-09)
  const todayStr = '2026-08-09';
  const tomorrowStr = '2026-08-10';

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');
  const [days, setDays] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end >= start) {
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        setDays(diffDays);
        setErrorMsg('');
      } else {
        setDays(0);
        setErrorMsg('End date must be on or after start date.');
      }
    }
  }, [startDate, endDate]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (days <= 0) {
      setErrorMsg('Invalid dates selected.');
      return;
    }

    if (!purpose.trim()) {
      setErrorMsg('Please specify the purpose of borrowing.');
      return;
    }

    const success = await createBorrowRequest(item.id, startDate, endDate, purpose, message);
    if (success) {
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    // Reset state and close
    setIsSuccess(false);
    setStartDate(todayStr);
    setEndDate(tomorrowStr);
    setPurpose('');
    setMessage('');
    onClose();
  };

  const estimatedCost = item.sharingType === 'Free' ? 0 : item.dailyRate * days;
  const total = estimatedCost + item.securityDeposit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform scale-100 transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            {!isSuccess ? `Request to Borrow` : `Request Sent!`}
          </h2>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          /* Success State View */
          <div className="p-6 text-center flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-800">Request sent successfully 🎉</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                We have notified <strong>{item.ownerId === 'user_0' ? 'you' : 'the owner'}</strong>. You will receive an alert once the request is approved or rejected.
              </p>
            </div>
            
            <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-left text-xs text-slate-600 mt-2 space-y-1">
              <p><strong>Item:</strong> {item.name}</p>
              <p><strong>Dates:</strong> {startDate} to {endDate} ({days} days)</p>
              {item.sharingType !== 'Free' && <p><strong>Estimated Cost:</strong> ₹{estimatedCost} (Paid on approval)</p>}
              <p><strong>Security Deposit:</strong> ₹{item.securityDeposit} (Refundable)</p>
            </div>

            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow transition-colors w-full"
            >
              Done
            </button>
          </div>
        ) : (
          /* Input Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Brief item review */}
            <div className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              <img src={item.images[0]} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.sharingType === 'Free' ? 'Free to borrow' : `₹${item.dailyRate}/day`}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ShieldAlert size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Date Selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar size={12} />
                  Start Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Calendar size={12} />
                  End Date
                </label>
                <input
                  type="date"
                  min={startDate || todayStr}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                What will you use it for? *
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">Select a purpose...</option>
                <option value="Home repair / DIY project">Home repair / DIY project</option>
                <option value="Gardening activity">Gardening activity</option>
                <option value="Family gathering / Event decoration">Family gathering / Event decoration</option>
                <option value="Camping or outdoors trip">Camping or outdoors trip</option>
                <option value="Kitchen backup / Party cooking">Kitchen backup / Party cooking</option>
                <option value="Hobby crafting or sewing project">Hobby crafting or sewing project</option>
                <option value="Photography or filming assignment">Photography or filming assignment</option>
                <option value="Cleaning job">Cleaning job</option>
                <option value="Education or research work">Education or research work</option>
              </select>
            </div>

            {/* Message to Owner */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Message to Owner (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Include details about pickup timing, or any questions about the item..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm h-20 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Cost Breakdowns */}
            <div className="border-t border-slate-100 pt-4 mt-2 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Borrowing duration:</span>
                <span className="font-semibold text-slate-800">{days} {days === 1 ? 'day' : 'days'}</span>
              </div>
              
              {item.sharingType === 'Paid' && (
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Rental Cost (₹{item.dailyRate} × {days} days):</span>
                  <span className="font-semibold text-slate-800">₹{estimatedCost}</span>
                </div>
              )}
              
              <div className="flex justify-between text-xs text-slate-600">
                <span>Security Deposit (Fully Refundable):</span>
                <span className="font-semibold text-slate-800 font-mono">₹{item.securityDeposit}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-slate-800 border-t border-dashed border-slate-100 pt-2">
                <span>Total Amount:</span>
                <span className="text-primary-600 text-base font-mono">₹{total}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-md transition-colors text-sm"
              >
                Send Borrow Request
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
