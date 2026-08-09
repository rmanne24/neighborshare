import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MessageSquare, MapPin, Calendar, Plus, X, Tag, Send, Check } from 'lucide-react';
import { ITEM_CATEGORIES } from '../data/mockData';

export const Community: React.FC = () => {
  const { currentUser, communityRequests, createCommunityRequest, lendForCommunityRequest } = useApp();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [requiredDates, setRequiredDates] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Indiranagar, Bangalore');
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !category || !requiredDates.trim() || !description.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    createCommunityRequest(title, category, requiredDates, description, location);
    
    // Reset Form
    setTitle('');
    setCategory('');
    setRequiredDates('');
    setDescription('');
    setShowForm(false);
  };

  const handleLendOffer = (crId: string) => {
    lendForCommunityRequest(crId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">What do you need?</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Can't find an item in the marketplace? Post a community request card below</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors shrink-0"
        >
          <Plus size={16} />
          Post a Request
        </button>
      </div>

      {/* Slide-over or inline request creator panel */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden transform scale-100 animate-scale-in">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-primary-600" />
                Post Community Request
              </h2>
              <button 
                onClick={() => setShowForm(false)} 
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-xl text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  What do you need? *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Need a camping tent / sewing machine..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none"
                    required
                  >
                    <option value="">Select category...</option>
                    {ITEM_CATEGORIES.map(cat => (
                      <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Required Dates *
                  </label>
                  <input
                    type="text"
                    value={requiredDates}
                    onChange={(e) => setRequiredDates(e.target.value)}
                    placeholder="Aug 15–16 or 'Next weekend'"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Description / Context *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why you need this, how you will handle it, or details about the item specifications..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm h-24 focus:outline-none focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Your Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary-700"
                >
                  Post Request
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Open board listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityRequests.map(req => {
          const hasUserOffered = req.offers.some(o => o.userId === currentUser.id);
          const isMyRequest = req.posterId === currentUser.id;

          return (
            <div 
              key={req.id} 
              className="bg-white p-5 rounded-2xl shadow-premium border border-slate-100 flex flex-col justify-between h-full gap-4 hover:border-slate-200 transition-colors"
            >
              
              <div>
                {/* Header */}
                <div className="flex justify-between items-start text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1">
                    <Tag size={10} />
                    {req.category}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MapPin size={10} />
                    {req.location.split(',')[0]} • {req.distance}m
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 text-base">{req.title}</h3>
                
                <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed line-clamp-4">
                  {req.description}
                </p>

                {/* Dates required */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider text-[9px] bg-slate-50 p-2 rounded-xl border border-slate-100/50">
                  <Calendar size={12} className="text-slate-400" />
                  Needed: <span className="font-bold text-slate-700 normal-case ml-1">{req.requiredDates}</span>
                </div>
              </div>

              {/* Bottom footer: poster profile and offer button */}
              <div className="border-t border-slate-50 pt-4 mt-auto flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <img src={req.posterAvatar} alt={req.postedBy} className="h-7 w-7 rounded-full border border-slate-200" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{req.postedBy.split(' ')[0]}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-semibold">Poster</p>
                  </div>
                </div>

                {isMyRequest ? (
                  <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2.5 py-1.5 rounded-full font-bold">
                    My Request
                  </span>
                ) : hasUserOffered ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1.5 rounded-full font-bold">
                    <Check size={10} />
                    Offer Sent!
                  </span>
                ) : (
                  <button
                    onClick={() => handleLendOffer(req.id)}
                    className="px-3.5 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1"
                  >
                    <Send size={10} />
                    I Can Lend This
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
