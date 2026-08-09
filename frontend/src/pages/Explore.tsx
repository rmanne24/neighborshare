import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ITEM_CATEGORIES } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';

export const Explore: React.FC = () => {
  const { items } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || '';

  // Filter and Search states
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [maxDistance, setMaxDistance] = useState(5000); // 5km limit
  const [sortBy, setSortBy] = useState('recommended');

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync search query from URL when it changes
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  // Handle resets
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setStatusFilter('All');
    setTypeFilter('All');
    setConditionFilter('All');
    setMaxDistance(5000);
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filter items
  const filteredItems = items.filter(item => {
    // 1. Text Search query matching title or description
    if (searchQuery.trim()) {
      const matchText = searchQuery.toLowerCase();
      const nameMatch = item.name.toLowerCase().includes(matchText);
      const descMatch = item.description.toLowerCase().includes(matchText);
      if (!nameMatch && !descMatch) return false;
    }

    // 2. Category
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }

    // 3. Status
    if (statusFilter !== 'All' && item.status !== statusFilter) {
      return false;
    }

    // 4. Free vs Paid type
    if (typeFilter !== 'All' && item.sharingType !== typeFilter) {
      return false;
    }

    // 5. Condition
    if (conditionFilter !== 'All' && item.condition !== conditionFilter) {
      return false;
    }

    // 6. Max Distance limit
    if (item.distance > maxDistance) {
      return false;
    }

    return true;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'nearest') {
      return a.distance - b.distance;
    }
    if (sortBy === 'highest_rated') {
      return b.rating - a.rating;
    }
    if (sortBy === 'recently_added') {
      // Sort by id descending (assuming newer items have larger timestamps/ids)
      return b.id.localeCompare(a.id);
    }
    // 'recommended' - default sort (rating high, then distance low)
    return b.rating - a.rating || a.distance - b.distance;
  });

  // Category change wrapper to sync URL
  const handleCategorySelect = (catName: string) => {
    const nextCat = selectedCategory === catName ? '' : catName;
    setSelectedCategory(nextCat);
    
    // Sync URL search params
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (nextCat) params.category = nextCat;
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore items near you</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Browse what neighbors are sharing in your local grid</p>
      </div>

      {/* Search and Quick Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // sync URL
              setSearchParams(e.target.value ? { search: e.target.value, ...(selectedCategory && { category: selectedCategory }) } : { ...(selectedCategory && { category: selectedCategory }) });
            }}
            placeholder="Search items by name, keywords..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
          />
        </div>

        {/* Buttons for Mobile filter drawer and sorting */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-sm font-semibold rounded-xl"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
          
          <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-xl px-3 py-2 text-sm shrink-0">
            <ArrowUpDown size={14} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-slate-700 focus:outline-none text-xs"
            >
              <option value="recommended">Recommended</option>
              <option value="nearest">Nearest First</option>
              <option value="highest_rated">Highest Rated</option>
              <option value="recently_added">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Marketplace Area */}
      <div className="flex gap-6 items-start">
        
        {/* LEFT COLUMN: Sidebar Filters (Desktop Only) */}
        <aside className="hidden lg:block w-64 bg-white border border-slate-100 p-5 rounded-2xl shadow-premium space-y-6 shrink-0 sticky top-36">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <span className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal size={14} />
              Filters
            </span>
            <button 
              onClick={handleClearFilters}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              Reset All
            </button>
          </div>

          {/* Categories select list */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</h3>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {ITEM_CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                    selectedCategory === cat.name 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</h3>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Available', 'Reserved', 'Borrowed'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    statusFilter === status 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Sharing Type */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sharing Type</h3>
            <div className="flex gap-2">
              {['All', 'Free', 'Paid'].map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border text-center transition-colors ${
                    typeFilter === type 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Condition</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {['All', 'New', 'Excellent', 'Good', 'Fair'].map(cond => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`py-1 rounded-lg text-xs font-semibold border text-center transition-colors ${
                    conditionFilter === cond 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Limit */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Distance</span>
              <span className="text-slate-700 font-semibold lowercase font-mono">
                {maxDistance >= 1000 ? `${(maxDistance/1000).toFixed(1)}km` : `${maxDistance}m`}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-primary-600 bg-slate-100 rounded-lg cursor-pointer h-1.5"
            />
          </div>

        </aside>

        {/* RIGHT COLUMN: Grid Items list */}
        <main className="flex-1 w-full">
          {sortedItems.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-premium max-w-lg mx-auto mt-8 flex flex-col items-center gap-4">
              <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                <Tag size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">No items yet</h3>
                <p className="text-sm text-slate-400 mt-2 max-w-xs mx-auto">
                  We couldn't find any items matching your active search or filters.
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="mt-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* MOBILE DRAWER FILTERS */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fade-in">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white h-full ml-auto shadow-2xl p-5 border-l border-slate-100 justify-between animate-slide-in">
            <div className="space-y-5 overflow-y-auto pb-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">Filters</span>
                <button onClick={() => setShowMobileFilters(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              {/* Reset */}
              <button 
                onClick={() => {
                  handleClearFilters();
                  setShowMobileFilters(false);
                }} 
                className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-1.5 px-3 rounded-lg w-full text-center"
              >
                Clear All Filter Params
              </button>

              {/* Categories */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categories</h3>
                <div className="flex flex-wrap gap-1">
                  {ITEM_CATEGORIES.map(cat => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        selectedCategory === cat.name 
                          ? 'bg-primary-50 border-primary-500 text-primary-700' 
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Available', 'Reserved', 'Borrowed'].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                        statusFilter === status 
                          ? 'bg-primary-600 border-primary-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sharing Type */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sharing Type</h3>
                <div className="flex gap-2">
                  {['All', 'Free', 'Paid'].map(type => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border text-center transition-colors ${
                        typeFilter === type 
                          ? 'bg-primary-600 border-primary-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Distance</span>
                  <span className="text-slate-700 font-semibold lowercase font-mono">
                    {maxDistance >= 1000 ? `${(maxDistance/1000).toFixed(1)}km` : `${maxDistance}m`}
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-primary-600 bg-slate-100 rounded-lg cursor-pointer h-1.5"
                />
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl text-sm mt-auto"
            >
              Apply Filters ({sortedItems.length} items)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
