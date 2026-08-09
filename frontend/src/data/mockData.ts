export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  neighborhood: string;
  rating: number;
  joinedDate: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  trustedMember: boolean;
  itemsSharedCount: number;
  successfulBorrows: number;
  successfulLends: number;
  onTimeReturnRate: number;
  about: string;
}

export interface Review {
  id: string;
  itemId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  type: 'item' | 'user';
}

export interface Item {
  id: string;
  name: string;
  category: string;
  condition: 'New' | 'Excellent' | 'Good' | 'Fair';
  description: string;
  ownerId: string;
  distance: number; // in meters (e.g. 500)
  sharingType: 'Free' | 'Paid';
  dailyRate: number; // in INR
  securityDeposit: number; // in INR
  status: 'Available' | 'Reserved' | 'Borrowed' | 'Unavailable';
  images: string[];
  availableFrom: string;
  availableTo: string;
  rating: number;
  reviewsCount: number;
}

export interface BorrowRequest {
  id: string;
  itemId: string;
  borrowerId: string;
  startDate: string;
  endDate: string;
  purpose: string;
  message: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  createdAt: string;
  totalCost: number;
  securityDeposit: number;
}

export interface Transaction {
  id: string;
  requestId: string;
  itemId: string;
  borrowerId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Active' | 'Overdue' | 'Returned' | 'Completed';
  pickupConfirmed: boolean;
  returnConfirmed: boolean;
  totalPrice: number;
  securityDeposit: number;
}

export interface CommunityRequest {
  id: string;
  title: string;
  category: string;
  requiredDates: string;
  description: string;
  location: string;
  distance: number;
  postedBy: string;
  posterId: string;
  posterAvatar: string;
  createdAt: string;
  offers: {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    status: 'Pending' | 'Accepted' | 'Declined';
  }[];
}

export interface Notification {
  id: string;
  userId: string;
  text: string;
  type: 'request_received' | 'request_approved' | 'request_rejected' | 'due_reminder' | 'item_available';
  createdAt: string;
  isRead: boolean;
  relatedId?: string;
}

// 20 Mock Users
export const mockUsers: User[] = [
  {
    id: 'user_0', // Demo User
    name: 'XYZ Manne',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'xyz.manne@example.com',
    neighborhood: 'Indiranagar, Bangalore',
    rating: 4.9,
    joinedDate: 'Jan 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 4,
    successfulBorrows: 8,
    successfulLends: 12,
    onTimeReturnRate: 98,
    about: 'Tech enthusiast and active community organizer. Love home gardening, baking bread, and sharing tools to reduce environmental footprint.'
  },
  {
    id: 'user_1',
    name: 'Rahul Sharma',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'rahul.sharma@example.com',
    neighborhood: 'Koramangala, Bangalore',
    rating: 4.7,
    joinedDate: 'Mar 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 6,
    successfulBorrows: 4,
    successfulLends: 9,
    onTimeReturnRate: 95,
    about: 'DIY woodworker and hobby mechanic. Happy to lend power tools and offer advice on furniture building!'
  },
  {
    id: 'user_2',
    name: 'Ananya Iyer',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'ananya.iyer@example.com',
    neighborhood: 'Indiranagar, Bangalore',
    rating: 4.8,
    joinedDate: 'Feb 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 3,
    successfulBorrows: 6,
    successfulLends: 4,
    onTimeReturnRate: 100,
    about: 'Nature lover and amateur shutterbug. Sharing my camping equipment and camera accessories with responsible neighbors.'
  },
  {
    id: 'user_3',
    name: 'Arjun Mehta',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'arjun.mehta@example.com',
    neighborhood: 'HSR Layout, Bangalore',
    rating: 4.6,
    joinedDate: 'May 2025',
    verifiedEmail: true,
    verifiedPhone: false,
    trustedMember: false,
    itemsSharedCount: 5,
    successfulBorrows: 3,
    successfulLends: 5,
    onTimeReturnRate: 90,
    about: 'Electronics nerd and smart-home builder. Happy to share test devices, soldering kits, and gaming tech.'
  },
  {
    id: 'user_4',
    name: 'Priya Patel',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'priya.patel@example.com',
    neighborhood: 'Jayanagar, Bangalore',
    rating: 4.9,
    joinedDate: 'Jun 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 8,
    successfulBorrows: 15,
    successfulLends: 22,
    onTimeReturnRate: 100,
    about: 'Baker, decorator, and party planner. I have a lot of event supplies, standard kitchen aids, and decoration equipment.'
  },
  {
    id: 'user_5',
    name: 'Karthik Rao',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'karthik.rao@example.com',
    neighborhood: 'Whitefield, Bangalore',
    rating: 4.5,
    joinedDate: 'Aug 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: false,
    itemsSharedCount: 2,
    successfulBorrows: 2,
    successfulLends: 3,
    onTimeReturnRate: 92,
    about: 'Weekend cyclist and fitness geek. Sharing sports gear that sits in my store room.'
  },
  {
    id: 'user_6',
    name: 'Sneha Reddy',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'sneha.reddy@example.com',
    neighborhood: 'Indiranagar, Bangalore',
    rating: 4.8,
    joinedDate: 'Apr 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 4,
    successfulBorrows: 10,
    successfulLends: 8,
    onTimeReturnRate: 97,
    about: 'Gardening lover. Sharing high quality soil aerators, pruners, lawn tools, and seed starters.'
  },
  {
    id: 'user_7',
    name: 'Aditya Sen',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'aditya.sen@example.com',
    neighborhood: 'Koramangala, Bangalore',
    rating: 4.4,
    joinedDate: 'Jul 2025',
    verifiedEmail: true,
    verifiedPhone: false,
    trustedMember: false,
    itemsSharedCount: 3,
    successfulBorrows: 1,
    successfulLends: 2,
    onTimeReturnRate: 85,
    about: 'Software engineer who loves reading and board games. Check out my books and gaming collections!'
  },
  {
    id: 'user_8',
    name: 'Meera Nair',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'meera.nair@example.com',
    neighborhood: 'Jayanagar, Bangalore',
    rating: 4.9,
    joinedDate: 'Oct 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 7,
    successfulBorrows: 11,
    successfulLends: 16,
    onTimeReturnRate: 99,
    about: 'Eco-conscious mom sharing child development materials, baby carriers, travel cots, and educational games.'
  },
  {
    id: 'user_9',
    name: 'Vikram Singh',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'vikram.singh@example.com',
    neighborhood: 'HSR Layout, Bangalore',
    rating: 4.6,
    joinedDate: 'Nov 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: false,
    itemsSharedCount: 5,
    successfulBorrows: 5,
    successfulLends: 6,
    onTimeReturnRate: 96,
    about: 'Travel blogger and camping expert. Happy to share sturdy tents, hiking poles, and rucksacks.'
  },
  {
    id: 'user_10',
    name: 'Divya Joshi',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'divya.joshi@example.com',
    neighborhood: 'Koramangala, Bangalore',
    rating: 4.7,
    joinedDate: 'Sep 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 4,
    successfulBorrows: 7,
    successfulLends: 5,
    onTimeReturnRate: 94,
    about: 'Crafter and DIY decorator. Sharing sewing machines, paper cutters, and embossing tools.'
  },
  {
    id: 'user_11',
    name: 'Manish Gupta',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'manish.gupta@example.com',
    neighborhood: 'Whitefield, Bangalore',
    rating: 4.3,
    joinedDate: 'Dec 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: false,
    itemsSharedCount: 2,
    successfulBorrows: 4,
    successfulLends: 2,
    onTimeReturnRate: 88,
    about: 'Hobbyist sound engineer and guitarist. Sharing amplifiers, microphones, and cables.'
  },
  {
    id: 'user_12',
    name: 'Kriti Deshmukh',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'kriti.deshmukh@example.com',
    neighborhood: 'Indiranagar, Bangalore',
    rating: 4.9,
    joinedDate: 'Feb 2025',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 5,
    successfulBorrows: 14,
    successfulLends: 18,
    onTimeReturnRate: 100,
    about: 'Food researcher. Willing to share high-performance air fryers, ice cream makers, and sous vide devices.'
  },
  {
    id: 'user_13',
    name: 'Sandeep Varma',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'sandeep.varma@example.com',
    neighborhood: 'HSR Layout, Bangalore',
    rating: 4.7,
    joinedDate: 'Jan 2026',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 3,
    successfulBorrows: 3,
    successfulLends: 4,
    onTimeReturnRate: 95,
    about: 'Loves deep-cleaning projects. Sharing heavy duty steam cleaners and pressure washers.'
  },
  {
    id: 'user_14',
    name: 'Pooja Bhat',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'pooja.bhat@example.com',
    neighborhood: 'Jayanagar, Bangalore',
    rating: 4.8,
    joinedDate: 'Mar 2026',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 4,
    successfulBorrows: 5,
    successfulLends: 7,
    onTimeReturnRate: 98,
    about: 'Avid reader and educator. Proud of my expansive textbook and children’s literature library.'
  },
  {
    id: 'user_15',
    name: 'Varun Das',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'varun.das@example.com',
    neighborhood: 'Whitefield, Bangalore',
    rating: 4.6,
    joinedDate: 'May 2026',
    verifiedEmail: true,
    verifiedPhone: false,
    trustedMember: false,
    itemsSharedCount: 3,
    successfulBorrows: 2,
    successfulLends: 4,
    onTimeReturnRate: 92,
    about: 'Active runner and badminton player. Offering rackets, training ladders, and sports equipment.'
  },
  {
    id: 'user_16',
    name: 'Rohan Hegde',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'rohan.hegde@example.com',
    neighborhood: 'Indiranagar, Bangalore',
    rating: 4.8,
    joinedDate: 'Jun 2026',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 4,
    successfulBorrows: 8,
    successfulLends: 11,
    onTimeReturnRate: 96,
    about: 'Home theater and audio geek. Offering screen projectors, movie night sets, and outdoor speakers.'
  },
  {
    id: 'user_17',
    name: 'Shweta Kulkarni',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'shweta.kulkarni@example.com',
    neighborhood: 'Koramangala, Bangalore',
    rating: 4.7,
    joinedDate: 'Feb 2026',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: false,
    itemsSharedCount: 3,
    successfulBorrows: 6,
    successfulLends: 5,
    onTimeReturnRate: 94,
    about: 'Trekking enthusiast. Sharing my cold weather gear, snow boots, sleeping bags, and torches.'
  },
  {
    id: 'user_18',
    name: 'Abhishek Roy',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'abhishek.roy@example.com',
    neighborhood: 'Jayanagar, Bangalore',
    rating: 4.5,
    joinedDate: 'Apr 2026',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: false,
    itemsSharedCount: 3,
    successfulBorrows: 3,
    successfulLends: 3,
    onTimeReturnRate: 90,
    about: 'Loves standard home repair. Sharing ladders, tool kits, and testing monitors.'
  },
  {
    id: 'user_19',
    name: 'Neha Kapur',
    avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    email: 'neha.kapur@example.com',
    neighborhood: 'Indiranagar, Bangalore',
    rating: 4.9,
    joinedDate: 'Jul 2026',
    verifiedEmail: true,
    verifiedPhone: true,
    trustedMember: true,
    itemsSharedCount: 5,
    successfulBorrows: 15,
    successfulLends: 17,
    onTimeReturnRate: 100,
    about: 'Avid craft maker, knitter, and ceramic painter. Happy to share pottery wheels and knitting supplies.'
  }
];

// 40 Mock Items
export const mockItems: Item[] = [
  // User 0 (XYZ) owns items 0, 1, 2, 3
  {
    id: 'item_0',
    name: 'Epson Home Cinema Projector',
    category: 'Electronics',
    condition: 'Excellent',
    description: 'Full HD 1080p home theater projector. Perfect for movie nights, gaming, or presenting. Comes with a HDMI cable, remote control, and a tripod screen if requested. 3400 lumens brightness ensures it works even with moderate ambient light.',
    ownerId: 'user_0',
    distance: 0,
    sharingType: 'Paid',
    dailyRate: 350,
    securityDeposit: 3000,
    status: 'Borrowed', // Currently borrowed by User 1
    images: ['https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 6
  },
  {
    id: 'item_1',
    name: 'Singer Start 1306 Sewing Machine',
    category: 'Hobbies & Crafts',
    condition: 'Good',
    description: 'Compact, easy-to-use sewing machine with 6 built-in stitches. Great for beginners, mending clothes, or crafting projects. Includes basic sewing threads, needles, and a foot pedal.',
    ownerId: 'user_0',
    distance: 0,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1605367036578-8467104944d1?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 3
  },
  {
    id: 'item_2',
    name: 'High-Pressure Washer (Karcher K2)',
    category: 'Cleaning',
    condition: 'Excellent',
    description: 'Powerful 110-bar pressure washer, ideal for cleaning cars, bikes, patios, and garden walls. Includes spray guns, extension lance, and dirt blaster nozzle. Please handle with care and avoid spraying directly at pets or people.',
    ownerId: 'user_0',
    distance: 0,
    sharingType: 'Paid',
    dailyRate: 200,
    securityDeposit: 2000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-05',
    availableTo: '2026-11-30',
    rating: 4.9,
    reviewsCount: 11
  },
  {
    id: 'item_3',
    name: 'Philips Air Fryer XL',
    category: 'Kitchen',
    condition: 'Excellent',
    description: 'Rapid air technology air fryer with 1.2 kg capacity (fits a small chicken or a big batch of fries!). Fry, bake, grill, and roast with up to 90% less fat. Super easy to clean, non-stick drawer is dishwasher-safe.',
    ownerId: 'user_0',
    distance: 0,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 2000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 8
  },

  // Other users' items
  {
    id: 'item_4',
    name: 'Bosch 18V Cordless Drill',
    category: 'Home & DIY',
    condition: 'Excellent',
    description: 'Heavy duty Bosch cordless drill. Comes with 2 rechargeable batteries, charger, and a complete set of drill bits for wood, masonry, and metal. Perfect for home renovations and flat-pack furniture assembly.',
    ownerId: 'user_1', // Rahul
    distance: 500,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 2500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 12
  },
  {
    id: 'item_5',
    name: 'Canon EOS 1500D DSLR Camera',
    category: 'Photography',
    condition: 'Excellent',
    description: 'Easy-to-use entry-level DSLR camera with 24.1 Megapixel sensor. Supplied with EF-S 18-55mm IS II kit lens, battery, charger, 32GB SD card, and camera bag. Perfect for capturing family gatherings or learning photography basics.',
    ownerId: 'user_2', // Ananya
    distance: 400,
    sharingType: 'Paid',
    dailyRate: 400,
    securityDeposit: 10000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 9
  },
  {
    id: 'item_6',
    name: 'Quechua 3-Person Camping Tent',
    category: 'Camping & Outdoors',
    condition: 'Good',
    description: 'Waterproof, wind-resistant double-roof dome tent. Easy pitch design, sleeps 3 people comfortably. Weighs 3.4kg, pack size is compact. Includes tent pegs, poles, and carrying bag. Must be dried before returning.',
    ownerId: 'user_2', // Ananya
    distance: 400,
    sharingType: 'Paid',
    dailyRate: 150,
    securityDeposit: 1500,
    status: 'Reserved', // Reserved for User 0 (XYZ)
    images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: 'item_7',
    name: 'Falcon Lawn Aerator & Spreader',
    category: 'Gardening',
    condition: 'Good',
    description: 'Manual rolling lawn aerator spikes that loosen compacted soil to let oxygen and water reach roots. Also includes a seed and fertilizer hand-spreader. Essential for gardening spring maintenance.',
    ownerId: 'user_6', // Sneha
    distance: 600,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.5,
    reviewsCount: 4
  },
  {
    id: 'item_8',
    name: 'Catan (5th Edition) Board Game',
    category: 'Hobbies & Crafts',
    condition: 'Excellent',
    description: 'Popular multi-player board game of trading, building, and settling. Fun for 3-4 players. Please ensure all hexes, cards, wooden settlements, roads, cities, and dice are counted and returned carefully.',
    ownerId: 'user_7', // Aditya
    distance: 900,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 8
  },
  {
    id: 'item_9',
    name: 'Aluminum 12-Step Extension Ladder',
    category: 'Home & DIY',
    condition: 'Good',
    description: 'Sturdy, light-weight aluminum folding ladder. Can be used in A-frame position or extended fully up to 12 feet. Has anti-slip rubber pads for stability. Fits in the back of most hatchbacks with seats folded down.',
    ownerId: 'user_18', // Abhishek
    distance: 1200,
    sharingType: 'Paid',
    dailyRate: 100,
    securityDeposit: 1500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1585675124050-02215d2f4720?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 5
  },
  {
    id: 'item_10',
    name: 'Insta360 One X2 Action Camera',
    category: 'Photography',
    condition: 'New',
    description: 'Pocket-sized 360-degree video camera. Captures stunning 5.7K resolution 360 videos with FlowState stabilization. Waterproof up to 10m. Includes invisible selfie stick, bullet-time handle, lens cap, and 64GB card.',
    ownerId: 'user_3', // Arjun
    distance: 1100,
    sharingType: 'Paid',
    dailyRate: 500,
    securityDeposit: 15000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1603509930777-63cb53526ca0?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 5.0,
    reviewsCount: 2
  },
  {
    id: 'item_11',
    name: 'Stand Mixer (KitchenAid Artisan)',
    category: 'Kitchen',
    condition: 'Excellent',
    description: 'Iconic KitchenAid tilt-head stand mixer with 4.8L stainless steel bowl. Easily mixes bread dough, cookie batters, cake mix, and whips cream. Includes wire whip, flat beater, and dough hook. Professional grade.',
    ownerId: 'user_4', // Priya
    distance: 1400,
    sharingType: 'Paid',
    dailyRate: 300,
    securityDeposit: 8000,
    status: 'Borrowed', // Currently borrowed by User 0 (XYZ)
    images: ['https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 'item_12',
    name: 'Yonex Badminton Rackets (Pair)',
    category: 'Sports & Fitness',
    condition: 'Good',
    description: 'Set of two graphite shaft Yonex Astrox rackets, perfect for recreational or intermediate players. Includes 3 nylon shuttlecocks and a protective carrying case. Strings are in good tension.',
    ownerId: 'user_5', // Karthik
    distance: 1600,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 800,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.4,
    reviewsCount: 7
  },
  {
    id: 'item_13',
    name: 'Decathlon Trekking Pole Set',
    category: 'Travel',
    condition: 'Excellent',
    description: 'Pair of shock-absorbing telescopic hiking poles. Adjusts from 100cm to 130cm with quick external locks. High density EVA foam handles with wrist straps. Great for hiking around Nandi Hills or Western Ghats.',
    ownerId: 'user_9', // Vikram
    distance: 1500,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1563299796-17596ed6b017?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 5
  },
  {
    id: 'item_14',
    name: 'Chafing Dishes (Set of 3)',
    category: 'Events & Parties',
    condition: 'Excellent',
    description: 'Professional buffet catering chafing dishes with roll-top lids. 9-liter capacity each, stainless steel construction. Keeps food warm during birthday parties or house warming events. Fuel holders included (fuel not included).',
    ownerId: 'user_4', // Priya
    distance: 1400,
    sharingType: 'Paid',
    dailyRate: 150,
    securityDeposit: 3000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 9
  },
  {
    id: 'item_15',
    name: 'Fender FA-115 Acoustic Guitar',
    category: 'Electronics',
    condition: 'Good',
    description: 'Dreadnought acoustic guitar that offers a full, vibrant tone. Great for campfire jam sessions or practicing at home. Includes guitar tuner, strap, picks, gig bag, and an extra set of steel strings.',
    ownerId: 'user_11', // Manish
    distance: 2200,
    sharingType: 'Paid',
    dailyRate: 120,
    securityDeposit: 2000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 4
  },
  {
    id: 'item_16',
    name: 'Premium Leather Rucksack (65L)',
    category: 'Camping & Outdoors',
    condition: 'Excellent',
    description: 'Heavy duty, water-resistant 65L rucksack with multiple compartments and rain cover. Padded hip belt and shoulder straps for load distribution. Ideal for weekend camping and backpacking travel.',
    ownerId: 'user_9', // Vikram
    distance: 1500,
    sharingType: 'Paid',
    dailyRate: 100,
    securityDeposit: 2500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 10
  },
  {
    id: 'item_17',
    name: 'DeWalt Circular Saw 1200W',
    category: 'Home & DIY',
    condition: 'Good',
    description: 'High-power circular hand saw with 65mm cutting depth. Perfect for clean, straight cuts in plywood, boards, and timber. Comes with dust extraction port and guide fence. Safety goggles must be worn.',
    ownerId: 'user_1', // Rahul
    distance: 500,
    sharingType: 'Paid',
    dailyRate: 200,
    securityDeposit: 4000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 8
  },
  {
    id: 'item_18',
    name: 'Gardening Pruning & Digging Set',
    category: 'Gardening',
    condition: 'Excellent',
    description: 'Premium bypass pruning shears, hand trowel, cultivator, and weeder set with ergonomic soft-grip handles. Includes storage bag. Perfect for repotting plants or small garden flowerbed cleaning.',
    ownerId: 'user_6', // Sneha
    distance: 600,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 'item_19',
    name: 'HP LaserJet Pro M12w Printer',
    category: 'Electronics',
    condition: 'Excellent',
    description: 'Compact wireless black-and-white laser printer. Fast prints, crisp text. Connects via WiFi to print directly from mobile. Great for printing assignments, tickets, or documentation. Paper not included.',
    ownerId: 'user_3', // Arjun
    distance: 1100,
    sharingType: 'Paid',
    dailyRate: 80,
    securityDeposit: 3000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.5,
    reviewsCount: 7
  },
  {
    id: 'item_20',
    name: 'Waffle Maker (Presto Belgian)',
    category: 'Kitchen',
    condition: 'Excellent',
    description: 'Flip Belgian waffle maker for thick, fluffy waffles in minutes. Non-stick grid makes clean up easy. Rotates 180 degrees to evenly spread batter. Makes 7-inch diameter waffles.',
    ownerId: 'user_12', // Kriti
    distance: 300,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 13
  },
  {
    id: 'item_21',
    name: 'Bubble Machine for Parties',
    category: 'Events & Parties',
    condition: 'Excellent',
    description: 'High-output automatic bubble blower machine. Generates hundreds of bubbles per minute. Perfect for kid birthday parties, weddings, or photography background effects. Requires bubble liquid (not included).',
    ownerId: 'user_4', // Priya
    distance: 1400,
    sharingType: 'Paid',
    dailyRate: 100,
    securityDeposit: 1000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 4
  },
  {
    id: 'item_22',
    name: 'Heavy Duty Extension Reel (15m)',
    category: 'Home & DIY',
    condition: 'Good',
    description: '15-meter length heavy duty cable extension drum reel with 4 power sockets. Built-in thermal cutout protection. Sturdy steel stand frame. Very useful for power tools in the backyard, garden, or garage.',
    ownerId: 'user_18', // Abhishek
    distance: 1200,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 8
  },
  {
    id: 'item_23',
    name: 'Telescope (Celestron PowerSeeker)',
    category: 'Electronics',
    condition: 'Excellent',
    description: 'Aperture 70mm astronomical refracting telescope. Great for viewing the Moon and major planets. Setup is quick and tool-free. Includes aluminum tripod, multiple eyepieces, and finderscope.',
    ownerId: 'user_3', // Arjun
    distance: 1100,
    sharingType: 'Paid',
    dailyRate: 250,
    securityDeposit: 6000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 5
  },
  {
    id: 'item_24',
    name: 'Selfie Ring Light with Stand',
    category: 'Photography',
    condition: 'Excellent',
    description: '10-inch desktop/floor ring light with tall extendable tripod stand. Features 3 light color modes (Warm, Cool, Daylight) and 10 brightness levels. Perfect for video calls, webinars, or content creation.',
    ownerId: 'user_2', // Ananya
    distance: 400,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 800,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 16
  },
  {
    id: 'item_25',
    name: 'Clay Clay-Modeling Pottery Wheel',
    category: 'Hobbies & Crafts',
    condition: 'Good',
    description: 'Electric pottery wheel machine for ceramics shaping work. Features a 25cm aluminum alloy wheel. Speed is adjustable up to 300 rpm. Great for weekend crafting, sculpturing, or learning clay throwing.',
    ownerId: 'user_19', // Neha K
    distance: 800,
    sharingType: 'Paid',
    dailyRate: 200,
    securityDeposit: 4000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1565192647048-f997ded87958?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 8
  },
  {
    id: 'item_26',
    name: 'Vaccum Steam Cleaner (Bissell)',
    category: 'Cleaning',
    condition: 'Excellent',
    description: 'Heavy duty upright carpet and upholstery deep steam cleaner. Uses warm water and suction to lift deep dirt, stains, and pet odors. Includes specialized tough stain tools for stairs or car seats.',
    ownerId: 'user_13', // Sandeep
    distance: 700,
    sharingType: 'Paid',
    dailyRate: 250,
    securityDeposit: 5000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 12
  },
  {
    id: 'item_27',
    name: 'Medical Grade Air Purifier',
    category: 'Electronics',
    condition: 'Excellent',
    description: 'HEPA air purifier designed to clean air in rooms up to 500 sq ft. Effectively filters out PM2.5 particles, allergens, dust, smoke, and odors. Perfect for Bangalore pollution/pollen seasons.',
    ownerId: 'user_3', // Arjun
    distance: 1100,
    sharingType: 'Paid',
    dailyRate: 150,
    securityDeposit: 4000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 9
  },
  {
    id: 'item_28',
    name: 'Fjallraven Kanken Backpack',
    category: 'Travel',
    condition: 'Good',
    description: 'Classic durable Vinylon fabric daypack. 16L volume, fits laptop, notebooks, and water bottles. Perfect for light day-travels or short city excursions. Has adjustable canvas shoulder straps.',
    ownerId: 'user_9', // Vikram
    distance: 1500,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.4,
    reviewsCount: 5
  },
  {
    id: 'item_29',
    name: 'Presto Pressure Canner & Cooker',
    category: 'Kitchen',
    condition: 'Good',
    description: '23-quart pressure canner and cooker. Designed for easy, safe home pressure canning of vegetables, meats, and poultry. Doubles as a large capacity pressure cooker for soup, stews, etc.',
    ownerId: 'user_12', // Kriti
    distance: 300,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 2500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.5,
    reviewsCount: 7
  },
  {
    id: 'item_30',
    name: 'Premium Cornhole Board & Bags',
    category: 'Sports & Fitness',
    condition: 'Good',
    description: 'Regulation sized wooden cornhole game set. Includes 2 cornhole boards and 8 weather-resistant bean bags. Great outdoor lawn game for picnics, backyard parties, or community gatherings.',
    ownerId: 'user_5', // Karthik
    distance: 1600,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 4
  },
  {
    id: 'item_31',
    name: 'Saddle Bag for Royal Enfield',
    category: 'Travel',
    condition: 'Excellent',
    description: 'Heavy canvas dual-side motorcycle pannier saddle bags. Fits Royal Enfield Classic, Bullet, or Himalayan models. Expandable, water-resistant. Crucial gear for road trips to Ladakh or Munnar.',
    ownerId: 'user_9', // Vikram
    distance: 1500,
    sharingType: 'Paid',
    dailyRate: 150,
    securityDeposit: 2000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 11
  },
  {
    id: 'item_32',
    name: 'Paper Shredder (Amazon Basics)',
    category: 'Electronics',
    condition: 'Good',
    description: 'Cross-cut paper and credit card shredder. Shreds up to 8 sheets of paper at once. Destroys sensitive documents, bills, and tax forms for security. Has a 4.1 gallon wastebasket box.',
    ownerId: 'user_3', // Arjun
    distance: 1100,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.5,
    reviewsCount: 3
  },
  {
    id: 'item_33',
    name: 'Crimping Tool & Network Tester',
    category: 'Home & DIY',
    condition: 'Excellent',
    description: 'Professional RJ45 RJ11 pass-through ethernet cable crimping tool, along with a LED network cable tester. Essential for custom home ethernet cabling and network diagnostics.',
    ownerId: 'user_1', // Rahul
    distance: 500,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 800,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 10
  },
  {
    id: 'item_34',
    name: 'Electric Hedge Trimmer 450W',
    category: 'Gardening',
    condition: 'Good',
    description: 'Lightweight garden hedge cutter with dual action hardened steel blades. Cuts branches up to 16mm thick. Safety hand guard and dual-handed switch protection. Great for trimming garden bushes.',
    ownerId: 'user_6', // Sneha
    distance: 600,
    sharingType: 'Paid',
    dailyRate: 100,
    securityDeposit: 1500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 6
  },
  {
    id: 'item_35',
    name: 'JBL PartyBox Bluetooth Speaker',
    category: 'Events & Parties',
    condition: 'Excellent',
    description: 'High-volume portable speaker with dynamic light shows. 100W output, deep bass. Connects via Bluetooth or AUX. Has microphone/guitar input for karaoke nights. Splashproof design.',
    ownerId: 'user_16', // Rohan
    distance: 700,
    sharingType: 'Paid',
    dailyRate: 400,
    securityDeposit: 10000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.9,
    reviewsCount: 14
  },
  {
    id: 'item_36',
    name: 'Sling Baby Carrier (Ergonomic)',
    category: 'Travel',
    condition: 'Good',
    description: 'Soft ergonomic baby wrap carrier, suitable for newborns up to 15kg. Provides optimal neck and back support for the baby, while evenly distributing weight across parent shoulders. Fully washable cotton.',
    ownerId: 'user_8', // Meera
    distance: 1300,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 1000,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.7,
    reviewsCount: 7
  },
  {
    id: 'item_37',
    name: 'Complete Crochet Needle Kit',
    category: 'Hobbies & Crafts',
    condition: 'Excellent',
    description: 'Ergonomic crochet hooks set (sizes 2.0mm to 10.0mm). Includes stitching markers, safety pins, tapestry needles, tape measure, and a zip-lock organizing case. Perfect for knitting sweaters or blankets.',
    ownerId: 'user_19', // Neha K
    distance: 800,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc085ff8?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 9
  },
  {
    id: 'item_38',
    name: 'Medical Pulse Oximeter & Monitor',
    category: 'Electronics',
    condition: 'Excellent',
    description: 'Standard fingertip oxygen saturation monitor and heart rate monitor. Accurate, fast readings. Battery operated. Essential for home health tracking.',
    ownerId: 'user_3', // Arjun
    distance: 1100,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 500,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.6,
    reviewsCount: 5
  },
  {
    id: 'item_39',
    name: 'Cambridge English Prep Books',
    category: 'Books & Education',
    condition: 'Good',
    description: 'Set of 4 books for English grammar and vocabulary preparation. Includes explanations, sample question sheets, and keys. Must not write in the book pages with ink.',
    ownerId: 'user_14', // Pooja
    distance: 1400,
    sharingType: 'Free',
    dailyRate: 0,
    securityDeposit: 400,
    status: 'Available',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'],
    availableFrom: '2026-08-01',
    availableTo: '2026-12-31',
    rating: 4.8,
    reviewsCount: 3
  }
];

// 20 Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'rev_1',
    itemId: 'item_0',
    reviewerId: 'user_1',
    reviewerName: 'Rahul Sharma',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'The projector is fantastic! Set it up in the backyard for a birthday screening. Highly recommend XYZ as an owner, she was super helpful.',
    date: '2026-07-28',
    type: 'item'
  },
  {
    id: 'rev_2',
    itemId: 'item_0',
    reviewerId: 'user_2',
    reviewerName: 'Ananya Iyer',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 4,
    comment: 'Clear projection, though it works best in complete dark. Appreciate that it included all the cables.',
    date: '2026-07-15',
    type: 'item'
  },
  {
    id: 'rev_3',
    itemId: 'item_4',
    reviewerId: 'user_0',
    reviewerName: 'XYZ Manne',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Rahul’s drill was exactly what I needed to assemble a bookshelf. Fully charged batteries and a solid set of bits. Thanks!',
    date: '2026-07-20',
    type: 'item'
  },
  {
    id: 'rev_4',
    itemId: 'item_11',
    reviewerId: 'user_0',
    reviewerName: 'XYZ Manne',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Absolutely love this stand mixer. Priya was very clean and nice when handing it over. Made the fluffiest bread dough.',
    date: '2026-08-05',
    type: 'item'
  },
  {
    id: 'rev_5',
    itemId: 'item_2',
    reviewerId: 'user_5',
    reviewerName: 'Karthik Rao',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Cleaned my muddy mountain bike in 10 minutes. Extremely powerful pressure washer. XYZ gave clear instructions.',
    date: '2026-07-10',
    type: 'item'
  },
  {
    id: 'rev_6',
    itemId: 'item_2',
    reviewerId: 'user_13',
    reviewerName: 'Sandeep Varma',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Amazing pressure washer. Used it to clean my terrace tiling. Super clean result.',
    date: '2026-07-25',
    type: 'item'
  },
  {
    id: 'rev_7',
    itemId: 'item_3',
    reviewerId: 'user_6',
    reviewerName: 'Sneha Reddy',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Very helpful kitchen appliance. Worked smoothly and smelled clean. Perfect for making snacks for kids.',
    date: '2026-07-12',
    type: 'item'
  },
  {
    id: 'rev_8',
    itemId: 'item_6',
    reviewerId: 'user_8',
    reviewerName: 'Meera Nair',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 4,
    comment: 'Sturdy tent, had a wonderful camping night at Savandurga. Putting it down takes a bit of practice.',
    date: '2026-06-18',
    type: 'item'
  },
  {
    id: 'rev_9',
    itemId: 'item_8',
    reviewerId: 'user_14',
    reviewerName: 'Pooja Bhat',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Classic board game! We had an awesome weekend group evening playing this. All cards were present.',
    date: '2026-07-04',
    type: 'item'
  },
  {
    id: 'rev_10',
    itemId: 'item_10',
    reviewerId: 'user_16',
    reviewerName: 'Rohan Hegde',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Arjun is an excellent owner. The 360 camera is practically brand new. Made beautiful footage.',
    date: '2026-08-01',
    type: 'item'
  },
  // User reviews
  {
    id: 'rev_11',
    itemId: 'item_0', // XYZ reviewed Rahul as borrower
    reviewerId: 'user_0',
    reviewerName: 'XYZ Manne',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Rahul returned the projector exactly on time and in perfect condition. Great borrower, highly recommended!',
    date: '2026-07-29',
    type: 'user'
  },
  {
    id: 'rev_12',
    itemId: 'item_4', // Rahul reviewed XYZ as borrower
    reviewerId: 'user_1',
    reviewerName: 'Rahul Sharma',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'XYZ was extremely neat and returned the drill bits fully organized. Would lend to her again!',
    date: '2026-07-21',
    type: 'user'
  },
  {
    id: 'rev_13',
    itemId: 'item_11', // Priya reviewed XYZ as borrower
    reviewerId: 'user_4',
    reviewerName: 'Priya Patel',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Super polite and returned the stand mixer thoroughly washed and dry. Perfect borrower!',
    date: '2026-08-06',
    type: 'user'
  },
  {
    id: 'rev_14',
    itemId: 'item_2', // XYZ reviewed Karthik as borrower
    reviewerId: 'user_0',
    reviewerName: 'XYZ Manne',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 4,
    comment: 'Karthik returned it clean, though slightly delayed due to traffic. Easy communication.',
    date: '2026-07-11',
    type: 'user'
  },
  {
    id: 'rev_15',
    itemId: 'item_2', // XYZ reviewed Sandeep as borrower
    reviewerId: 'user_0',
    reviewerName: 'XYZ Manne',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Very polite, quick hand-over. Returned it carefully. 10/10.',
    date: '2026-07-26',
    type: 'user'
  },
  {
    id: 'rev_16',
    itemId: 'item_6', // Ananya reviewed XYZ as borrower
    reviewerId: 'user_2',
    reviewerName: 'Ananya Iyer',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'XYZ is always a pleasure to deal with. Tent was cleaned and dry. Thank you!',
    date: '2026-06-15',
    type: 'user'
  },
  {
    id: 'rev_17',
    itemId: 'item_8', // Aditya reviewed Pooja as borrower
    reviewerId: 'user_7',
    reviewerName: 'Aditya Sen',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Very careful with the board game tokens. Friendly chat during handover.',
    date: '2026-07-05',
    type: 'user'
  },
  {
    id: 'rev_18',
    itemId: 'item_10', // Arjun reviewed Rohan as borrower
    reviewerId: 'user_3',
    reviewerName: 'Arjun Mehta',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Rohan handled the action camera with maximum care. Zero scratches. Responsive and polite.',
    date: '2026-08-02',
    type: 'user'
  },
  {
    id: 'rev_19',
    itemId: 'item_14', // Priya reviewed Arjun as borrower
    reviewerId: 'user_4',
    reviewerName: 'Priya Patel',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 4,
    comment: 'Arjun returned the chafing dishes in good order. Easy transaction.',
    date: '2026-07-29',
    type: 'user'
  },
  {
    id: 'rev_20',
    itemId: 'item_24', // Ananya reviewed Sneha as borrower
    reviewerId: 'user_2',
    reviewerName: 'Ananya Iyer',
    reviewerAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    rating: 5,
    comment: 'Friendly borrower. Returned the ring light and stand safe and sound.',
    date: '2026-07-16',
    type: 'user'
  }
];

// 20 Mock Borrow Requests
export const mockBorrowRequests: BorrowRequest[] = [
  // 3 Pending requests received by Demo User (XYZ) on her items
  {
    id: 'req_0',
    itemId: 'item_1', // Sewing Machine (XYZ's)
    borrowerId: 'user_10', // Divya Joshi
    startDate: '2026-08-12',
    endDate: '2026-08-15',
    purpose: 'Need to hem some window curtains for my new living room setup.',
    message: 'Hello XYZ, I live in block C. I saw you are sharing this machine for free. Can I borrow it for 3 days next week? I have my own thread rolls.',
    status: 'Pending',
    createdAt: '2026-08-08',
    totalCost: 0,
    securityDeposit: 1500
  },
  {
    id: 'req_1',
    itemId: 'item_2', // Pressure Washer (XYZ's)
    borrowerId: 'user_1', // Rahul Sharma
    startDate: '2026-08-15',
    endDate: '2026-08-16',
    purpose: 'Deep cleaning the car and the driveway after the monsoon rain.',
    message: 'Hi XYZ, hope you are doing well! Need the pressure washer for a Sunday cleaning project. Will handle with care.',
    status: 'Pending',
    createdAt: '2026-08-09',
    totalCost: 200,
    securityDeposit: 2000
  },
  {
    id: 'req_2',
    itemId: 'item_3', // Air Fryer (XYZ's)
    borrowerId: 'user_2', // Ananya Iyer
    startDate: '2026-08-11',
    endDate: '2026-08-13',
    purpose: 'Testing recipes before hosting a dinner party next Friday.',
    message: 'Hey, I wanted to try out baking some keto snacks. Can I pick it up on Tuesday evening?',
    status: 'Pending',
    createdAt: '2026-08-08',
    totalCost: 0,
    securityDeposit: 2000
  },

  // Sent requests by Demo User (XYZ)
  {
    id: 'req_3',
    itemId: 'item_6', // Camping Tent (Ananya's)
    borrowerId: 'user_0', // Demo User
    startDate: '2026-08-20',
    endDate: '2026-08-23',
    purpose: 'Going for a weekend trek to Chikmagalur with friends.',
    message: 'Hi Ananya! I need a reliable tent for our trip. I saw yours is available. Let me know if those dates work!',
    status: 'Approved', // Already approved, leading to a reserved transaction
    createdAt: '2026-08-07',
    totalCost: 450, // 3 days * 150
    securityDeposit: 1500
  },
  {
    id: 'req_4',
    itemId: 'item_11', // Stand Mixer (Priya's)
    borrowerId: 'user_0', // Demo User
    startDate: '2026-08-02',
    endDate: '2026-08-06',
    purpose: 'Baking bread batches and cupcakes for neighborhood bake sale.',
    message: 'Hi Priya, I have a big baking project this week. Your stand mixer would save me hours of hand kneading!',
    status: 'Approved', // Approved and currently active transaction
    createdAt: '2026-07-31',
    totalCost: 1200, // 4 days * 300
    securityDeposit: 8000
  },

  // Miscellaneous requests
  {
    id: 'req_5',
    itemId: 'item_0', // Projector
    borrowerId: 'user_1', // Rahul
    startDate: '2026-08-05',
    endDate: '2026-08-10',
    purpose: 'Home movie marathon with family.',
    message: 'Hey XYZ, requesting the projector for a few days.',
    status: 'Approved', // Leads to current Active/Overdue transaction
    createdAt: '2026-08-03',
    totalCost: 1750,
    securityDeposit: 3000
  },
  {
    id: 'req_6',
    itemId: 'item_5',
    borrowerId: 'user_6',
    startDate: '2026-08-14',
    endDate: '2026-08-16',
    purpose: 'Photographing a local community sports match.',
    message: 'Can I borrow the Canon camera for the weekend?',
    status: 'Pending',
    createdAt: '2026-08-08',
    totalCost: 800,
    securityDeposit: 10000
  },
  {
    id: 'req_7',
    itemId: 'item_8',
    borrowerId: 'user_0', // XYZ
    startDate: '2026-08-25',
    endDate: '2026-08-27',
    purpose: 'Board game night.',
    message: 'Hey Aditya, would love to borrow Catan!',
    status: 'Pending',
    createdAt: '2026-08-09',
    totalCost: 0,
    securityDeposit: 500
  },
  {
    id: 'req_8',
    itemId: 'item_4',
    borrowerId: 'user_8',
    startDate: '2026-08-04',
    endDate: '2026-08-05',
    purpose: 'Hanging paintings in kids room.',
    message: 'Rahul, need your cordless drill for an hour.',
    status: 'Approved',
    createdAt: '2026-08-03',
    totalCost: 0,
    securityDeposit: 2500
  },
  {
    id: 'req_9',
    itemId: 'item_12',
    borrowerId: 'user_14',
    startDate: '2026-08-06',
    endDate: '2026-08-08',
    purpose: 'Playing badminton with husband.',
    message: 'Hi Karthik, can we borrow your racket set?',
    status: 'Approved',
    createdAt: '2026-08-05',
    totalCost: 0,
    securityDeposit: 800
  },
  {
    id: 'req_10',
    itemId: 'item_20',
    borrowerId: 'user_19',
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    purpose: 'Making Sunday breakfast.',
    message: 'Hey Kriti, would love to borrow the waffle maker.',
    status: 'Approved',
    createdAt: '2026-07-31',
    totalCost: 0,
    securityDeposit: 1500
  },
  {
    id: 'req_11',
    itemId: 'item_25',
    borrowerId: 'user_10',
    startDate: '2026-08-05',
    endDate: '2026-08-07',
    purpose: 'Pottery trial.',
    message: 'Hi Neha, requesting the pottery wheel.',
    status: 'Rejected',
    createdAt: '2026-08-03',
    totalCost: 400,
    securityDeposit: 4000
  },
  {
    id: 'req_12',
    itemId: 'item_26',
    borrowerId: 'user_0',
    startDate: '2026-07-22',
    endDate: '2026-07-24',
    purpose: 'Steam clean living room sofa.',
    message: 'Sandeep, saw your steam cleaner, would love to borrow.',
    status: 'Approved',
    createdAt: '2026-07-20',
    totalCost: 500,
    securityDeposit: 5000
  },
  {
    id: 'req_13',
    itemId: 'item_16',
    borrowerId: 'user_17',
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    purpose: 'Backpacking trek.',
    message: 'Vikram, requesting your 65L rucksack.',
    status: 'Pending',
    createdAt: '2026-08-08',
    totalCost: 400,
    securityDeposit: 2500
  },
  {
    id: 'req_14',
    itemId: 'item_37',
    borrowerId: 'user_8',
    startDate: '2026-08-10',
    endDate: '2026-08-15',
    purpose: 'Knitting lessons.',
    message: 'Hi Neha, can I borrow the crochet needle kit?',
    status: 'Pending',
    createdAt: '2026-08-09',
    totalCost: 0,
    securityDeposit: 500
  },
  {
    id: 'req_15',
    itemId: 'item_9',
    borrowerId: 'user_6',
    startDate: '2026-08-12',
    endDate: '2026-08-13',
    purpose: 'Cleaning water tank.',
    message: 'Requesting the extension ladder.',
    status: 'Pending',
    createdAt: '2026-08-09',
    totalCost: 100,
    securityDeposit: 1500
  },
  {
    id: 'req_16',
    itemId: 'item_13',
    borrowerId: 'user_15',
    startDate: '2026-08-03',
    endDate: '2026-08-05',
    purpose: 'Weekend hike.',
    message: 'Hi Vikram, can I borrow the trekking poles?',
    status: 'Approved',
    createdAt: '2026-08-01',
    totalCost: 0,
    securityDeposit: 1000
  },
  {
    id: 'req_17',
    itemId: 'item_15',
    borrowerId: 'user_16',
    startDate: '2026-08-18',
    endDate: '2026-08-20',
    purpose: 'Singing meetup.',
    message: 'Manish, need a guitar for a meetup.',
    status: 'Pending',
    createdAt: '2026-08-09',
    totalCost: 240,
    securityDeposit: 2000
  },
  {
    id: 'req_18',
    itemId: 'item_35',
    borrowerId: 'user_4',
    startDate: '2026-08-22',
    endDate: '2026-08-24',
    purpose: 'Kid birthday music.',
    message: 'Hi Rohan, requesting the JBL party box.',
    status: 'Pending',
    createdAt: '2026-08-08',
    totalCost: 800,
    securityDeposit: 10000
  },
  {
    id: 'req_19',
    itemId: 'item_28',
    borrowerId: 'user_2',
    startDate: '2026-08-05',
    endDate: '2026-08-07',
    purpose: 'Day trip.',
    message: 'Hi Vikram, can I borrow the Kanken?',
    status: 'Approved',
    createdAt: '2026-08-04',
    totalCost: 0,
    securityDeposit: 1500
  }
];

// 10 Mock Transactions
export const mockTransactions: Transaction[] = [
  // 2 active borrowing transactions for XYZ
  {
    id: 'tx_0',
    requestId: 'req_4',
    itemId: 'item_11', // Stand Mixer (Priya's)
    borrowerId: 'user_0', // Demo User (XYZ)
    ownerId: 'user_4', // Priya
    startDate: '2026-08-02',
    endDate: '2026-08-12', // Overdue relative to current date (Aug 9) - wait, Aug 12 is in the future.
    // Let's make one of them overdue to trigger the warning!
    // Overdue by 2 days would mean endDate = current date (Aug 9) - 2 days = Aug 7.
    status: 'Active',
    pickupConfirmed: true,
    returnConfirmed: false,
    totalPrice: 1200,
    securityDeposit: 8000
  },
  {
    id: 'tx_1',
    requestId: 'req_3',
    itemId: 'item_6', // Camping Tent (Ananya's)
    borrowerId: 'user_0', // Demo User
    ownerId: 'user_2', // Ananya
    startDate: '2026-08-20',
    endDate: '2026-08-23',
    status: 'Upcoming',
    pickupConfirmed: false,
    returnConfirmed: false,
    totalPrice: 450,
    securityDeposit: 1500
  },

  // 2 active lending transactions for XYZ
  {
    id: 'tx_2',
    requestId: 'req_5',
    itemId: 'item_0', // Projector (XYZ's)
    borrowerId: 'user_1', // Rahul
    ownerId: 'user_0', // XYZ
    startDate: '2026-08-05',
    endDate: '2026-08-07', // End date is Aug 7, which makes it OVERDUE by 2 days (Current date is Aug 9)!
    status: 'Overdue',
    pickupConfirmed: true,
    returnConfirmed: false,
    totalPrice: 1750,
    securityDeposit: 3000
  },
  {
    // A regular completed lending transaction
    id: 'tx_3',
    requestId: 'req_12',
    itemId: 'item_26', // Steam Cleaner
    borrowerId: 'user_0', // XYZ
    ownerId: 'user_13', // Sandeep
    startDate: '2026-07-22',
    endDate: '2026-07-24',
    status: 'Completed',
    pickupConfirmed: true,
    returnConfirmed: true,
    totalPrice: 500,
    securityDeposit: 5000
  },

  // Other transactions
  {
    id: 'tx_4',
    requestId: 'req_8',
    itemId: 'item_4',
    borrowerId: 'user_8',
    ownerId: 'user_1',
    startDate: '2026-08-04',
    endDate: '2026-08-05',
    status: 'Completed',
    pickupConfirmed: true,
    returnConfirmed: true,
    totalPrice: 0,
    securityDeposit: 2500
  },
  {
    id: 'tx_5',
    requestId: 'req_9',
    itemId: 'item_12',
    borrowerId: 'user_14',
    ownerId: 'user_5',
    startDate: '2026-08-06',
    endDate: '2026-08-08',
    status: 'Completed',
    pickupConfirmed: true,
    returnConfirmed: true,
    totalPrice: 0,
    securityDeposit: 800
  },
  {
    id: 'tx_6',
    requestId: 'req_10',
    itemId: 'item_20',
    borrowerId: 'user_19',
    ownerId: 'user_12',
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    status: 'Completed',
    pickupConfirmed: true,
    returnConfirmed: true,
    totalPrice: 0,
    securityDeposit: 1500
  },
  {
    id: 'tx_7',
    requestId: 'req_16',
    itemId: 'item_13',
    borrowerId: 'user_15',
    ownerId: 'user_9',
    startDate: '2026-08-03',
    endDate: '2026-08-05',
    status: 'Completed',
    pickupConfirmed: true,
    returnConfirmed: true,
    totalPrice: 0,
    securityDeposit: 1000
  },
  {
    id: 'tx_8',
    requestId: 'req_19',
    itemId: 'item_28',
    borrowerId: 'user_2',
    ownerId: 'user_9',
    startDate: '2026-08-05',
    endDate: '2026-08-07',
    status: 'Completed',
    pickupConfirmed: true,
    returnConfirmed: true,
    totalPrice: 0,
    securityDeposit: 1500
  },
  {
    id: 'tx_9',
    requestId: 'req_0',
    itemId: 'item_1',
    borrowerId: 'user_10',
    ownerId: 'user_0',
    startDate: '2026-08-12',
    endDate: '2026-08-15',
    status: 'Upcoming', // Newly generated pending approved transaction
    pickupConfirmed: false,
    returnConfirmed: false,
    totalPrice: 0,
    securityDeposit: 1500
  }
];

// 15 Mock Community Requests ("People are looking for...")
export const mockCommunityRequests: CommunityRequest[] = [
  {
    id: 'com_0',
    title: 'Need a heavy-duty tall ladder',
    category: 'Home & DIY',
    requiredDates: 'Aug 15–16',
    description: 'Looking to prune a few overgrown branches of a mango tree hanging over our balcony in Indiranagar. A 10ft or 12ft ladder would be perfect.',
    location: 'Indiranagar, Block A',
    distance: 800,
    postedBy: 'Ananya Iyer',
    posterId: 'user_2',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-08',
    offers: [
      { id: 'off_0', userId: 'user_18', userName: 'Abhishek Roy', userAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E", status: 'Pending' }
    ]
  },
  {
    id: 'com_1',
    title: 'Need a screen projector for movie night',
    category: 'Electronics',
    requiredDates: 'Aug 14–15',
    description: 'Hosting a community movie screening for kids in our apartment complex lawn on Independence Day eve. Need a decent output projector with HDMI support.',
    location: 'Koramangala, 5th Block',
    distance: 1400,
    postedBy: 'Rahul Sharma',
    posterId: 'user_1',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-07',
    offers: []
  },
  {
    id: 'com_2',
    title: 'Looking for a camping tent (4-person)',
    category: 'Camping & Outdoors',
    requiredDates: 'Aug 22–24',
    description: 'Planning a weekend drive and camping trip with family. Need a waterproof, bugs-screen tent that sleeps 3-4 people. Will return dry and clean.',
    location: 'HSR Layout, Sector 3',
    distance: 2100,
    postedBy: 'Arjun Mehta',
    posterId: 'user_3',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-09',
    offers: []
  },
  {
    id: 'com_3',
    title: 'Need a pressure washer for driveway',
    category: 'Cleaning',
    requiredDates: 'Aug 16',
    description: 'Driveway is covered in moss and mud after the recent continuous downpour. Need a standard washer for a few hours on Sunday.',
    location: 'Indiranagar, Double Road',
    distance: 500,
    postedBy: 'Sneha Reddy',
    posterId: 'user_6',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-09',
    offers: []
  },
  {
    id: 'com_4',
    title: 'Looking for a thermal laminator machine',
    category: 'Books & Education',
    requiredDates: 'Aug 10–12',
    description: 'Prepping training cards and flashcards for a local primary school. Need a basic A4 thermal laminating device. Will buy my own sheets.',
    location: 'Jayanagar, 4th Block',
    distance: 1800,
    postedBy: 'Meera Nair',
    posterId: 'user_8',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-08',
    offers: []
  },
  {
    id: 'com_5',
    title: 'Need a DSLR zoom lens for bird watching',
    category: 'Photography',
    requiredDates: 'Aug 29–31',
    description: 'Going to Ranganathittu Bird Sanctuary. Hoping to borrow a Canon EF mount telephoto lens (like 55-250mm or 70-300mm) if someone has it sitting unused.',
    location: 'Indiranagar, Stage 2',
    distance: 1200,
    postedBy: 'Neha Kapur',
    posterId: 'user_19',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-09',
    offers: []
  },
  {
    id: 'com_6',
    title: 'Looking for a waffle maker / iron',
    category: 'Kitchen',
    requiredDates: 'Aug 15',
    description: 'Hosting a small family brunch on Independence Day. Kids requested homemade Belgian waffles. Will clean and return by evening.',
    location: 'Whitefield, Hope Farm',
    distance: 3500,
    postedBy: 'Karthik Rao',
    posterId: 'user_5',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-07',
    offers: []
  },
  {
    id: 'com_7',
    title: 'Need a hot glue gun for school project',
    category: 'Hobbies & Crafts',
    requiredDates: 'Aug 10',
    description: 'My son has a school science model submission on Tuesday. Need a hot glue gun with some spare sticks for Monday afternoon.',
    location: 'Koramangala, 3rd Block',
    distance: 1100,
    postedBy: 'Divya Joshi',
    posterId: 'user_10',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-08',
    offers: []
  },
  {
    id: 'com_8',
    title: 'Need a car roof luggage rack carrier',
    category: 'Travel',
    requiredDates: 'Aug 26–30',
    description: 'Taking a long family road trip in our Swift. Luggage space is tight. Hoping to borrow a removable roof rack carrier.',
    location: 'HSR Layout, Sector 2',
    distance: 2500,
    postedBy: 'Vikram Singh',
    posterId: 'user_9',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-06',
    offers: []
  },
  {
    id: 'com_9',
    title: 'Need 4 folding chairs for home event',
    category: 'Events & Parties',
    requiredDates: 'Aug 16–17',
    description: 'Hosting a small prayer meeting at home. Need 4 additional folding plastic or wooden chairs for elderly guests.',
    location: 'Jayanagar, 5th Block',
    distance: 1900,
    postedBy: 'Priya Patel',
    posterId: 'user_4',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-09',
    offers: []
  },
  {
    id: 'com_10',
    title: 'Need a foam roller for back pain',
    category: 'Sports & Fitness',
    requiredDates: 'Aug 09–12',
    description: 'Suffered minor back strain after gym workout. Need a foam grid roller to release muscle knots for a couple of days.',
    location: 'Whitefield, EPIP Zone',
    distance: 4000,
    postedBy: 'Varun Das',
    posterId: 'user_15',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-08',
    offers: []
  },
  {
    id: 'com_11',
    title: 'Need a cricket batting pad & helmet',
    category: 'Sports & Fitness',
    requiredDates: 'Aug 15–16',
    description: 'Playing in our corporate tournament over the weekend. Need batting pads and a helmet. Ready to pay minor rent.',
    location: 'Koramangala, ST Bed',
    distance: 1600,
    postedBy: 'Aditya Sen',
    posterId: 'user_7',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-08',
    offers: []
  },
  {
    id: 'com_12',
    title: 'Need a carpet cleaning fluid brush',
    category: 'Cleaning',
    requiredDates: 'Aug 12',
    description: 'Accidentally spilled tea on our master bedroom carpet. Need a manual brush scrubber and carpet cleaning fluid if anyone has spares.',
    location: 'Indiranagar, HAL 3rd Stage',
    distance: 900,
    postedBy: 'Rohan Hegde',
    posterId: 'user_16',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-08',
    offers: []
  },
  {
    id: 'com_13',
    title: 'Need SAT prep vocabulary cards',
    category: 'Books & Education',
    requiredDates: 'Aug 10–30',
    description: 'Preparing for SAT test in September. Would love to borrow flash cards or vocabulary guide books for a couple of weeks.',
    location: 'Jayanagar, 3rd Block',
    distance: 1700,
    postedBy: 'Pooja Bhat',
    posterId: 'user_14',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-09',
    offers: []
  },
  {
    id: 'com_14',
    title: 'Need a guitar stand',
    category: 'Electronics',
    requiredDates: 'Aug 11–20',
    description: 'Looking to borrow a simple tripod floor guitar stand for an upcoming display practice. Thank you.',
    location: 'Whitefield, Kadugodi',
    distance: 3800,
    postedBy: 'Manish Gupta',
    posterId: 'user_11',
    posterAvatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='background:%23f8fafc;padding:6px;border-radius:50%25'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E",
    createdAt: '2026-08-09',
    offers: []
  }
];

// 10 Mock Notifications for Demo User XYZ (user_0)
export const mockNotifications: Notification[] = [
  {
    id: 'not_0',
    userId: 'user_0',
    text: 'Rahul Sharma requested your Epson Home Cinema Projector.',
    type: 'request_received',
    createdAt: '2026-08-08T14:32:00.000Z',
    isRead: false,
    relatedId: 'req_5'
  },
  {
    id: 'not_1',
    userId: 'user_0',
    text: 'Your request for KitchenAid Stand Mixer was approved by Priya Patel.',
    type: 'request_approved',
    createdAt: '2026-08-02T09:15:00.000Z',
    isRead: true,
    relatedId: 'tx_0'
  },
  {
    id: 'not_2',
    userId: 'user_0',
    text: 'Reminder: Your borrow of KitchenAid Stand Mixer is due in 3 days.',
    type: 'due_reminder',
    createdAt: '2026-08-09T08:00:00.000Z',
    isRead: false,
    relatedId: 'tx_0'
  },
  {
    id: 'not_3',
    userId: 'user_0',
    text: 'A pressure washer matching your wishlist item is available in Jayanagar.',
    type: 'item_available',
    createdAt: '2026-08-09T09:12:00.000Z',
    isRead: false,
    relatedId: 'item_26'
  },
  {
    id: 'not_4',
    userId: 'user_0',
    text: 'Divya Joshi requested your Singer Sewing Machine.',
    type: 'request_received',
    createdAt: '2026-08-08T18:40:00.000Z',
    isRead: false,
    relatedId: 'req_0'
  },
  {
    id: 'not_5',
    userId: 'user_0',
    text: 'Ananya Iyer requested your High-Pressure Washer (Karcher K2).',
    type: 'request_received',
    createdAt: '2026-08-09T06:10:00.000Z',
    isRead: false,
    relatedId: 'req_2'
  },
  {
    id: 'not_6',
    userId: 'user_0',
    text: 'Your borrow request for Celestron Telescope was rejected by Arjun Mehta.',
    type: 'request_rejected',
    createdAt: '2026-08-04T11:20:00.000Z',
    isRead: true,
    relatedId: 'req_11'
  },
  {
    id: 'not_7',
    userId: 'user_0',
    text: 'Your borrow request for Decathlon Trekking Pole was approved by Vikram Singh.',
    type: 'request_approved',
    createdAt: '2026-08-01T15:30:00.000Z',
    isRead: true,
    relatedId: 'tx_7'
  },
  {
    id: 'not_8',
    userId: 'user_0',
    text: 'Reminder: Rahul Sharma has not returned your Projector yet. Overdue by 2 days.',
    type: 'due_reminder',
    createdAt: '2026-08-09T08:05:00.000Z',
    isRead: false,
    relatedId: 'tx_2'
  },
  {
    id: 'not_9',
    userId: 'user_0',
    text: 'Priya Patel responded to your community offer for folding chairs.',
    type: 'request_approved',
    createdAt: '2026-08-09T05:12:00.000Z',
    isRead: false
  }
];

// Wishlist Items IDs for Demo User XYZ
export const mockWishlist: string[] = ['item_4', 'item_5', 'item_8', 'item_10', 'item_26'];

// 12 Item Categories (as requested)
export const ITEM_CATEGORIES = [
  { name: 'Home & DIY', icon: '🔧', color: 'bg-emerald-50 text-emerald-700' },
  { name: 'Gardening', icon: '🌱', color: 'bg-green-50 text-green-700' },
  { name: 'Cleaning', icon: '🧹', color: 'bg-teal-50 text-teal-700' },
  { name: 'Camping & Outdoors', icon: '🏕️', color: 'bg-amber-50 text-amber-700' },
  { name: 'Events & Parties', icon: '🎉', color: 'bg-orange-50 text-orange-700' },
  { name: 'Kitchen', icon: '🍳', color: 'bg-red-50 text-red-700' },
  { name: 'Photography', icon: '📷', color: 'bg-indigo-50 text-indigo-700' },
  { name: 'Sports & Fitness', icon: '🏏', color: 'bg-blue-50 text-blue-700' },
  { name: 'Books & Education', icon: '📚', color: 'bg-violet-50 text-violet-700' },
  { name: 'Electronics', icon: '💻', color: 'bg-cyan-50 text-cyan-700' },
  { name: 'Hobbies & Crafts', icon: '🎨', color: 'bg-purple-50 text-purple-700' },
  { name: 'Travel', icon: '✈️', color: 'bg-sky-50 text-sky-700' }
];
