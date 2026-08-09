import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Sparkles, TrendingUp, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ITEM_CATEGORIES } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';

export const Landing: React.FC = () => {
  const { items, communityRequests, currentUser } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Grab first 4 available items for "Popular Near You"
  const popularItems = items.filter(item => item.status === 'Available').slice(0, 4);

  // Grab first 3 community requests
  const recentCommunityRequests = communityRequests.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50/30 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-100/60 text-primary-700 text-xs font-bold animate-pulse-subtle border border-primary-200">
            <Sparkles size={12} />
            <span>Connecting neighbors across Bangalore</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
            Why buy it when your<br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              neighbor has it?
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Borrow tools, equipment, and everyday items from people around you. Save money, reduce waste, and build a stronger community.
          </p>

          {/* Hero Search Box */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full border border-slate-200 shadow-premium focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all mt-4">
            <div className="flex-1 flex items-center pl-3">
              <Search className="text-slate-400 mr-2.5 shrink-0" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you need today? Try 'cordless drill' or 'projector'"
                className="w-full text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800"
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm rounded-xl sm:rounded-full shadow-md hover:shadow-lg transition-premium shrink-0"
            >
              Explore Items
            </button>
          </form>

          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link 
              to="/explore" 
              className="px-6 py-3 text-sm font-bold border border-slate-200 bg-white rounded-xl shadow-sm hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-premium"
            >
              Browse Marketplace
            </Link>
            <Link 
              to={currentUser ? "/items/new" : "/login"} 
              className="px-6 py-3 text-sm font-bold bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl shadow-md transition-premium"
            >
              List an Item
            </Link>
          </div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-primary-100/30 blur-3xl" />
        <div className="absolute top-1/4 -right-20 h-72 w-72 rounded-full bg-secondary-100/20 blur-3xl" />
      </section>

      {/* 2. Popular Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Popular Categories</h2>
          <p className="text-sm text-slate-500 font-medium">Browse shared items sorted by common groups</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {ITEM_CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.name}
              to={`/explore?category=${encodeURIComponent(cat.name)}`}
              className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-slate-100 shadow-premium hover:shadow-premium-hover transition-premium text-center"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform duration-300 group-hover:-translate-y-1 ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="font-bold text-sm text-slate-800 group-hover:text-primary-600 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Popular Near You */}
      <section className="py-16 bg-slate-50 border-y border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Popular Near You</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">Available items borrowed frequently in your area</p>
            </div>
            <Link to="/explore" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
              View All Items →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. People are looking for... */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">People are looking for...</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Lend your sitting unused tools to help these neighbors</p>
          </div>
          <Link to="/community" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-0.5">
            View Request Board →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCommunityRequests.map((req) => (
            <div key={req.id} className="bg-white p-5 rounded-2xl shadow-premium border border-slate-100 flex flex-col justify-between h-full gap-4 hover:border-primary-100 hover:shadow-premium-hover transition-premium">
              <div>
                <div className="flex items-center justify-between mb-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>{req.category}</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {req.location.split(',')[0]}
                  </span>
                </div>
                
                <h3 className="font-bold text-slate-800 text-base">{req.title}</h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{req.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <img src={req.posterAvatar} alt={req.postedBy} className="h-6 w-6 rounded-full" />
                  <span className="text-xs font-semibold text-slate-600">{req.postedBy.split(' ')[0]}</span>
                </div>
                <Link
                  to="/community"
                  className="px-3.5 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold rounded-full transition-colors"
                >
                  I Can Lend This
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Trust and Impact Statistics */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Small steps make a huge collective difference.
            </h2>
            <p className="text-slate-300 leading-relaxed font-medium">
              NeighborShare helps community members reduce consumption, meet verified nearby residents, and enjoy access over ownership. Join our hyperlocal movement!
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-primary-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Trust &amp; Verification First</h4>
                  <p className="text-xs text-slate-400">All members have verified phone numbers/emails and community ratings.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="shrink-0 h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-primary-400">
                  <HeartHandshake size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Hyperlocal Networks</h4>
                  <p className="text-xs text-slate-400">Borrow within walking distance to avoid delivery waits and carbon cost.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur hover:bg-white/10 transition-colors">
              <span className="block text-3xl sm:text-4xl font-black text-secondary-400 font-mono">3,821</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">items shared</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur hover:bg-white/10 transition-colors">
              <span className="block text-3xl sm:text-4xl font-black text-secondary-400 font-mono">7,421</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">successful borrows</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur hover:bg-white/10 transition-colors">
              <span className="block text-3xl sm:text-4xl font-black text-secondary-400 font-mono">₹8.4L</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">estimated savings</span>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur hover:bg-white/10 transition-colors">
              <span className="block text-3xl sm:text-4xl font-black text-secondary-400 font-mono">1,284</span>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mt-2">active neighbors</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. End CTA */}
      <section className="py-20 text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50/50 via-white to-secondary-50/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Have something sitting unused?<br />Share it with your neighbors.
          </h2>
          <p className="text-slate-600 font-medium max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            From drills and camping gear to baking tins and books, convert your idle storage into local community goodwill and extra cash.
          </p>
          <div className="pt-4">
            <Link
              to={currentUser ? "/items/new" : "/login"}
              className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-premium"
            >
              List Your First Item
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
