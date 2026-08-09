import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-xl shadow-premium border transition-all duration-300 transform translate-y-0 opacity-100 bg-white ${
            toast.type === 'success' ? 'border-emerald-200' :
            toast.type === 'error' ? 'border-red-200' : 'border-blue-200'
          }`}
        >
          <div className="shrink-0">
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
            {toast.type === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
          </div>
          
          <div className="flex-1 text-sm font-medium text-slate-800">
            {toast.message}
          </div>
          
          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-slate-400 hover:text-slate-600 rounded-lg p-0.5 hover:bg-slate-50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
