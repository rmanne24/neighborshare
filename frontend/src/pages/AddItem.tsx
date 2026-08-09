import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ITEM_CATEGORIES } from '../data/mockData';
import { ChevronLeft, Info, Image as ImageIcon, ShieldAlert, Sparkles } from 'lucide-react';

export const AddItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, items, addItem, editItem } = useApp();

  const isEditMode = !!id;

  // Local Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState<'New' | 'Excellent' | 'Good' | 'Fair'>('Excellent');
  const [sharingType, setSharingType] = useState<'Free' | 'Paid'>('Free');
  const [dailyRate, setDailyRate] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(1000);
  const [availableFrom, setAvailableFrom] = useState('2026-08-09');
  const [availableTo, setAvailableTo] = useState('2026-12-31');
  const [imageUrl, setImageUrl] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (isEditMode && id) {
      const itemToEdit = items.find(i => i.id === id);
      if (itemToEdit) {
        // Check ownership
        if (itemToEdit.ownerId !== currentUser.id) {
          navigate('/dashboard');
          return;
        }
        setName(itemToEdit.name);
        setCategory(itemToEdit.category);
        setDescription(itemToEdit.description);
        setCondition(itemToEdit.condition);
        setSharingType(itemToEdit.sharingType);
        setDailyRate(itemToEdit.dailyRate);
        setSecurityDeposit(itemToEdit.securityDeposit);
        setAvailableFrom(itemToEdit.availableFrom);
        setAvailableTo(itemToEdit.availableTo);
        setImageUrl(itemToEdit.images[0] || '');
      } else {
        navigate('/my-items');
      }
    }
  }, [id, isEditMode, items, currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !category || !description.trim() || !availableFrom || !availableTo) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const start = new Date(availableFrom);
    const end = new Date(availableTo);
    if (end < start) {
      setErrorMsg('Available To date must be on or after Available From date.');
      return;
    }

    const imageArray = imageUrl.trim() ? [imageUrl.trim()] : undefined;

    if (isEditMode && id) {
      editItem(id, {
        name,
        category,
        description,
        condition,
        sharingType,
        dailyRate: sharingType === 'Free' ? 0 : Number(dailyRate),
        securityDeposit: Number(securityDeposit),
        availableFrom,
        availableTo,
        images: imageArray
      });
      navigate('/my-items');
    } else {
      addItem({
        name,
        category,
        description,
        condition,
        sharingType,
        dailyRate: sharingType === 'Free' ? 0 : Number(dailyRate),
        securityDeposit: Number(securityDeposit),
        availableFrom,
        availableTo,
        imageFiles: imageArray
      });
      navigate('/my-items');
    }
  };

  // Image Presets for testing
  const presets = [
    { label: 'Cordless Drill', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80' },
    { label: 'Air Fryer', url: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&auto=format&fit=crop&q=80' },
    { label: 'Projector', url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80' },
    { label: 'Garden Tools', url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back Link */}
      <Link 
        to="/my-items" 
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to My Items
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEditMode ? 'Edit Item Listing' : 'List an Item'}
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          {isEditMode 
            ? 'Modify the availability, pricing, or description of your item' 
            : 'Fill in details below to share your item with verified nearby neighbors'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-100 p-6 rounded-2xl shadow-premium">
        
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-shake">
            <ShieldAlert size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SECTION 1: BASIC INFORMATION */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider text-slate-400 border-b border-slate-50 pb-2">
            1. Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Item Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Bosch 18V Cordless Drill"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary-500"
                required
              >
                <option value="">Select a category...</option>
                {ITEM_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary-500"
                required
              >
                <option value="New">New (Unopened/Never used)</option>
                <option value="Excellent">Excellent (Like new, minimal scratches)</option>
                <option value="Good">Good (Working fine, shows signs of usage)</option>
                <option value="Fair">Fair (Well used, but fully operational)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                Owner Location
                <span className="text-[10px] font-normal text-slate-400 lowercase">(derived)</span>
              </label>
              <input
                type="text"
                value={currentUser?.neighborhood || ''}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-500 cursor-not-allowed focus:outline-none"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how it works, what accessories are included, and what instructions the borrower should follow..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm h-28 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        {/* SECTION 2: SHARING TYPE & PRICING */}
        <div className="space-y-4 pt-4 border-t border-slate-50">
          <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider text-slate-400 border-b border-slate-50 pb-2">
            2. Pricing &amp; Terms
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Sharing Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSharingType('Free');
                    setDailyRate(0);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    sharingType === 'Free'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Free / Lend
                </button>
                
                <button
                  type="button"
                  onClick={() => setSharingType('Paid')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                    sharingType === 'Paid'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Paid Rent
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${sharingType === 'Free' ? 'text-slate-300' : 'text-slate-500'}`}>
                Daily Rate (INR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  disabled={sharingType === 'Free'}
                  placeholder="0"
                  className={`w-full pl-7 pr-3 py-2 border rounded-xl text-sm focus:outline-none ${
                    sharingType === 'Free' 
                      ? 'bg-slate-100 text-slate-400 border-slate-150 cursor-not-allowed' 
                      : 'bg-white border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                Security Deposit (INR) *
                <span className="text-[9px] text-slate-400 font-normal lowercase">(refundable)</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  min="0"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                  placeholder="1000"
                  className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: AVAILABILITY & IMAGES */}
        <div className="space-y-4 pt-4 border-t border-slate-50">
          <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider text-slate-400 border-b border-slate-50 pb-2">
            3. Availability &amp; Images
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Available From
              </label>
              <input
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Available To
              </label>
              <input
                type="date"
                value={availableTo}
                onChange={(e) => setAvailableTo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Image selection */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Item Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste an Unsplash image URL or click a preset below..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Presets buttons */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Preset Images:</span>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setImageUrl(p.url)}
                    className={`px-3 py-1.5 border text-xs font-bold rounded-lg transition-colors ${
                      imageUrl === p.url 
                        ? 'bg-primary-50 border-primary-500 text-primary-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview image panel */}
            {imageUrl.trim() && (
              <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm">
                <img src={imageUrl.trim()} alt="Item Preview" className="h-full w-full object-cover" />
                <div className="absolute bottom-2 right-2 bg-slate-900/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                  <Sparkles size={10} />
                  Live Preview
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTONS */}
        <div className="flex gap-4 border-t border-slate-100 pt-5">
          <Link
            to="/my-items"
            className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 text-center text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
          >
            {isEditMode ? 'Save Changes' : 'List Item Now'}
          </button>
        </div>

      </form>

    </div>
  );
};
