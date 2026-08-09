import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Item, BorrowRequest, Transaction, Review, CommunityRequest, Notification
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  items: Item[];
  requests: BorrowRequest[];
  transactions: Transaction[];
  reviews: Review[];
  communityRequests: CommunityRequest[];
  notifications: Notification[];
  wishlist: string[];
  toasts: ToastMessage[];
  loading: boolean;
  
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  
  createBorrowRequest: (itemId: string, startDate: string, endDate: string, purpose: string, message: string) => Promise<boolean>;
  approveRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
  confirmPickup: (transactionId: string) => Promise<void>;
  confirmReturn: (transactionId: string, review?: { rating: number; comment: string; ratingType: 'item' | 'user' }) => Promise<void>;
  
  addItem: (item: Omit<Item, 'id' | 'ownerId' | 'distance' | 'status' | 'rating' | 'reviewsCount' | 'images'> & { imageFiles?: string[] }) => Promise<void>;
  editItem: (itemId: string, updatedFields: Partial<Item>) => Promise<void>;
  deleteItem: (itemId: string) => Promise<void>;
  
  createCommunityRequest: (title: string, category: string, requiredDates: string, description: string, location: string) => Promise<void>;
  lendForCommunityRequest: (communityRequestId: string) => Promise<void>;
  
  toggleWishlist: (itemId: string) => Promise<void>;
  markNotificationRead: (notificationId: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  
  loginUser: (email: string) => Promise<boolean>;
  logoutUser: () => void;
  registerUser: (name: string, email: string, neighborhood: string) => Promise<void>;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://api-2cb9-5000.prg1.zerops.app');

const customFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let url = input;
  if (typeof url === 'string' && url.startsWith('/api') && API_BASE) {
    url = `${API_BASE}${url}`;
  }
  return window.fetch(url, init);
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fetch = customFetch;
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ns_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [requests, setRequests] = useState<BorrowRequest[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [communityRequests, setCommunityRequests] = useState<CommunityRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper: call API and retrieve latest data lists
  const refreshAllData = async () => {
    try {
      const itemsRes = await fetch('/api/items');
      if (itemsRes.ok) {
        const data = await itemsRes.json();
        setItems(data);
      }

      const requestsRes = await fetch('/api/requests');
      if (requestsRes.ok) {
        const data = await requestsRes.json();
        setRequests(data);
      }

      const txsRes = await fetch('/api/transactions');
      if (txsRes.ok) {
        const data = await txsRes.json();
        setTransactions(data);
      }

      const usersRes = await fetch('/api/users');
      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data);
      }

      const commRes = await fetch('/api/community');
      if (commRes.ok) {
        const data = await commRes.json();
        setCommunityRequests(data);
      }

      if (currentUser) {
        const wishRes = await fetch(`/api/wishlist/${currentUser.id}`);
        if (wishRes.ok) {
          const data = await wishRes.json();
          setWishlist(data);
        }

        const notRes = await fetch(`/api/notifications/${currentUser.id}`);
        if (notRes.ok) {
          const data = await notRes.json();
          setNotifications(data);
        }

        // Keep current user updated
        const profileRes = await fetch(`/api/users/${currentUser.id}`);
        if (profileRes.ok) {
          const updatedUser = await profileRes.json();
          setCurrentUser(updatedUser);
          localStorage.setItem('ns_current_user', JSON.stringify(updatedUser));
        }
      }
    } catch (e) {
      console.error('Error refreshing backend data:', e);
    }
  };

  // Run on mount and whenever user logs in/out
  useEffect(() => {
    refreshAllData();
  }, [currentUser?.id]);

  // Sync current user to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ns_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ns_current_user');
    }
  }, [currentUser]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // API Call: Create Borrow Request
  const createBorrowRequest = async (itemId: string, startDate: string, endDate: string, purpose: string, message: string): Promise<boolean> => {
    if (!currentUser) {
      showToast('You must be logged in to request items.', 'error');
      return false;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, borrowerId: currentUser.id, startDate, endDate, purpose, message })
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to submit request.', 'error');
        setLoading(false);
        return false;
      }

      showToast('Borrow request sent successfully!', 'success');
      await refreshAllData();
      setLoading(false);
      return true;
    } catch (error) {
      showToast('Server connection failed.', 'error');
      setLoading(false);
      return false;
    }
  };

  // API Call: Approve Request
  const approveRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/requests/${requestId}/approve`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast('Borrow request approved!', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to approve request.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Reject Request
  const rejectRequest = async (requestId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/requests/${requestId}/reject`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast('Borrow request declined.', 'info');
        await refreshAllData();
      } else {
        showToast('Failed to reject request.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Confirm Pickup
  const confirmPickup = async (transactionId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transactions/${transactionId}/pickup`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast('Handover confirmed! Item is now marked as borrowed.', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to confirm pickup.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Confirm Return & Submit Review
  const confirmReturn = async (transactionId: string, review?: { rating: number; comment: string; ratingType: 'item' | 'user' }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transactions/${transactionId}/return`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: review?.rating,
          comment: review?.comment,
          ratingType: review?.ratingType,
          reviewerId: currentUser?.id
        })
      });
      if (res.ok) {
        showToast('Item successfully returned and completed!', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to complete return.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Add Item
  const addItem = async (itemData: Omit<Item, 'id' | 'ownerId' | 'distance' | 'status' | 'rating' | 'reviewsCount' | 'images'> & { imageFiles?: string[] }) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...itemData,
          ownerId: currentUser.id,
          images: itemData.imageFiles
        })
      });
      if (res.ok) {
        showToast('Your item has been listed successfully!', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to list item.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Edit Item
  const editItem = async (itemId: string, updatedFields: Partial<Item>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        showToast('Item details updated successfully!', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to edit item.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Delete Item
  const deleteItem = async (itemId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showToast('Item deleted successfully.', 'info');
        await refreshAllData();
      } else {
        showToast('Failed to delete item.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Create Community Request
  const createCommunityRequest = async (title: string, category: string, requiredDates: string, description: string, location: string) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, requiredDates, description, location, posterId: currentUser.id })
      });
      if (res.ok) {
        showToast('Community request posted successfully!', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to post request.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Offer to Lend for Community Request
  const lendForCommunityRequest = async (communityRequestId: string) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/community/${communityRequestId}/offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id })
      });
      if (res.ok) {
        showToast('Offer to lend sent to neighbor!', 'success');
        await refreshAllData();
      } else {
        showToast('Failed to submit offer.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  // API Call: Toggle Wishlist
  const toggleWishlist = async (itemId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/wishlist/${currentUser.id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.action === 'added') {
          showToast('Saved to Wishlist!', 'success');
        } else {
          showToast('Removed from Wishlist.', 'info');
        }
        await refreshAllData();
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
  };

  // API Call: Mark Notification Read
  const markNotificationRead = async (notificationId: string) => {
    try {
      const res = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST'
      });
      if (res.ok) {
        await refreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // API Call: Mark All Notifications Read
  const markAllNotificationsRead = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/notifications/user/${currentUser.id}/read-all`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast('All notifications marked as read.', 'info');
        await refreshAllData();
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
  };

  // Auth API: Login
  const loginUser = async (email: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        showToast(`Welcome back, ${user.name}!`, 'success');
        setLoading(false);
        return true;
      } else {
        showToast('Invalid email address.', 'error');
        setLoading(false);
        return false;
      }
    } catch (error) {
      showToast('Server connection failed.', 'error');
      setLoading(false);
      return false;
    }
  };

  // Auth: Logout
  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('ns_current_user');
    showToast('Logged out successfully.', 'info');
  };

  // Auth API: Register
  const registerUser = async (name: string, email: string, neighborhood: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, neighborhood })
      });

      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        showToast(`Account created! Welcome, ${name}!`, 'success');
      } else {
        showToast('Failed to create account.', 'error');
      }
    } catch (e) {
      showToast('Network error.', 'error');
    }
    setLoading(false);
  };

  return (
    <AppContext.Provider value={{
      currentUser, users, items, requests, transactions, reviews, communityRequests, notifications, wishlist, toasts, loading,
      showToast, dismissToast,
      createBorrowRequest, approveRequest, rejectRequest, confirmPickup, confirmReturn,
      addItem, editItem, deleteItem,
      createCommunityRequest, lendForCommunityRequest,
      toggleWishlist, markNotificationRead, markAllNotificationsRead,
      loginUser, logoutUser, registerUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
