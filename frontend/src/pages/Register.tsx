import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, MapPin, ShieldAlert } from 'lucide-react';

export const Register: React.FC = () => {
  const { registerUser, currentUser } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [neighborhood, setNeighborhood] = useState('Indiranagar, Bangalore');
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword || !neighborhood.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setErrorMsg('You must agree to the Terms of Service.');
      return;
    }

    registerUser(name.trim(), email.trim(), neighborhood.trim());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-stretch bg-slate-50">
      
      {/* Form column */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96 space-y-8">
          
          <div>
            <span className="text-3xl">🤝</span>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <ShieldAlert size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <User size={12} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Mail size={12} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <MapPin size={12} />
                  Neighborhood
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Indiranagar, Bangalore"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lock size={12} />
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lock size={12} />
                    Confirm
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start text-xs font-semibold mt-1">
                <label className="flex items-start gap-2 text-slate-500 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 border-slate-300 mt-0.5" 
                  />
                  <span>
                    I agree to the{' '}
                    <span className="text-primary-600 hover:underline">Terms of Service</span> and{' '}
                    <span className="text-primary-600 hover:underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
              >
                Create Account
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Decorative right column */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary-950 via-slate-900 to-secondary-950 items-center justify-center p-12 text-white">
        <div className="max-w-md space-y-6 relative z-10">
          <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-bold">🤝</div>
          <h2 className="text-4xl font-extrabold tracking-tight">Join NeighborShare</h2>
          <p className="text-slate-400 font-medium leading-relaxed text-sm">
            Save money, cut storage clutter, and build friendly connections with people right next door. Listing items takes less than 2 minutes!
          </p>
          
          <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-medium text-slate-300">
            <p>✓ Access to 12+ product categories</p>
            <p>✓ Hyperlocal maps showing walk distances</p>
            <p>✓ Secured security deposits</p>
            <p>✓ Build neighbor credibility score</p>
          </div>
        </div>

        {/* Background shapes */}
        <div className="absolute top-1/4 -left-16 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />
      </div>

    </div>
  );
};
