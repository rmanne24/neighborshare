import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockUsers = [
  {
    id: 'user_0',
    name: 'Sairishita Manne',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    email: 'sairishita.manne@example.com',
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
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80',
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

const mockItems = [
  { id: 'item_0', ownerId: 'user_0', name: 'Epson Home Cinema Projector', category: 'Electronics', condition: 'Excellent', description: 'Full HD 1080p home theater projector. Perfect for movie nights, gaming, or presenting. Comes with a HDMI cable, remote control, and a tripod screen if requested. 3400 lumens brightness ensures it works even with moderate ambient light.', distance: 0, sharingType: 'Paid', dailyRate: 350, securityDeposit: 3000, status: 'Borrowed', images: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.8, reviewsCount: 6 },
  { id: 'item_1', ownerId: 'user_0', name: 'Singer Start 1306 Sewing Machine', category: 'Hobbies & Crafts', condition: 'Good', description: 'Compact, easy-to-use sewing machine with 6 built-in stitches. Great for beginners, mending clothes, or crafting projects. Includes basic sewing threads, needles, and a foot pedal.', distance: 0, sharingType: 'Free', dailyRate: 0, securityDeposit: 1500, status: 'Available', images: 'https://images.unsplash.com/photo-1605367036578-8467104944d1?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.6, reviewsCount: 3 },
  { id: 'item_2', ownerId: 'user_0', name: 'High-Pressure Washer (Karcher K2)', category: 'Cleaning', condition: 'Excellent', description: 'Powerful 110-bar pressure washer, ideal for cleaning cars, bikes, patios, and garden walls. Includes spray guns, extension lance, and dirt blaster nozzle. Please handle with care and avoid spraying directly at pets or people.', distance: 0, sharingType: 'Paid', dailyRate: 200, securityDeposit: 2000, status: 'Available', images: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-05', availableTo: '2026-11-30', rating: 4.9, reviewsCount: 11 },
  { id: 'item_3', ownerId: 'user_0', name: 'Philips Air Fryer XL', category: 'Kitchen', condition: 'Excellent', description: 'Rapid air technology air fryer with 1.2 kg capacity (fits a small chicken or a big batch of fries!). Fry, bake, grill, and roast with up to 90% less fat. Super easy to clean, non-stick drawer is dishwasher-safe.', distance: 0, sharingType: 'Free', dailyRate: 0, securityDeposit: 2000, status: 'Available', images: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.9, reviewsCount: 8 },
  { id: 'item_4', ownerId: 'user_1', name: 'Bosch 18V Cordless Drill', category: 'Home & DIY', condition: 'Excellent', description: 'Heavy duty Bosch cordless drill. Comes with 2 rechargeable batteries, charger, and a complete set of drill bits for wood, masonry, and metal. Perfect for home renovations and flat-pack furniture assembly.', distance: 500, sharingType: 'Free', dailyRate: 0, securityDeposit: 2500, status: 'Available', images: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.8, reviewsCount: 12 },
  { id: 'item_5', ownerId: 'user_2', name: 'Canon EOS 1500D DSLR Camera', category: 'Photography', condition: 'Excellent', description: 'Easy-to-use entry-level DSLR camera with 24.1 Megapixel sensor. Supplied with EF-S 18-55mm IS II kit lens, battery, charger, 32GB SD card, and camera bag. Perfect for capturing family gatherings or learning photography basics.', distance: 400, sharingType: 'Paid', dailyRate: 400, securityDeposit: 10000, status: 'Available', images: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.7, reviewsCount: 9 },
  { id: 'item_6', ownerId: 'user_2', name: 'Quechua 3-Person Camping Tent', category: 'Camping & Outdoors', condition: 'Good', description: 'Waterproof, wind-resistant double-roof dome tent. Easy pitch design, sleeps 3 people comfortably. Weighs 3.4kg, pack size is compact. Includes tent pegs, poles, and carrying bag. Must be dried before returning.', distance: 400, sharingType: 'Paid', dailyRate: 150, securityDeposit: 1500, status: 'Reserved', images: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.8, reviewsCount: 14 },
  { id: 'item_7', ownerId: 'user_6', name: 'Falcon Lawn Aerator & Spreader', category: 'Gardening', condition: 'Good', description: 'Manual rolling lawn aerator spikes that loosen compacted soil to let oxygen and water reach roots. Also includes a seed and fertilizer hand-spreader. Essential for gardening spring maintenance.', distance: 600, sharingType: 'Free', dailyRate: 0, securityDeposit: 1000, status: 'Available', images: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.5, reviewsCount: 4 },
  { id: 'item_8', ownerId: 'user_7', name: 'Catan (5th Edition) Board Game', category: 'Hobbies & Crafts', condition: 'Excellent', description: 'Popular multi-player board game of trading, building, and settling. Fun for 3-4 players. Please ensure all hexes, cards, wooden settlements, roads, cities, and dice are counted and returned carefully.', distance: 900, sharingType: 'Free', dailyRate: 0, securityDeposit: 500, status: 'Available', images: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.9, reviewsCount: 8 },
  { id: 'item_9', ownerId: 'user_18', name: 'Aluminum 12-Step Extension Ladder', category: 'Home & DIY', condition: 'Good', description: 'Sturdy, light-weight aluminum folding ladder. Can be used in A-frame position or extended fully up to 12 feet. Has anti-slip rubber pads for stability. Fits in the back of most hatchbacks with seats folded down.', distance: 1200, sharingType: 'Paid', dailyRate: 100, securityDeposit: 1500, status: 'Available', images: 'https://images.unsplash.com/photo-1585675124050-02215d2f4720?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.6, reviewsCount: 5 }
];

const mockBorrowRequests = [
  { id: 'req_0', itemId: 'item_1', borrowerId: 'user_10', startDate: '2026-08-12', endDate: '2026-08-15', purpose: 'Need to hem some window curtains for my new living room setup.', message: 'Hello Sairishita, I live in block C. I saw you are sharing this machine for free. Can I borrow it for 3 days next week? I have my own thread rolls.', status: 'Pending', createdAt: '2026-08-08', totalCost: 0, securityDeposit: 1500 },
  { id: 'req_1', itemId: 'item_2', borrowerId: 'user_1', startDate: '2026-08-15', endDate: '2026-08-16', purpose: 'Deep cleaning the car and the driveway after the monsoon rain.', message: 'Hi Sairishita, hope you are doing well! Need the pressure washer for a Sunday cleaning project. Will handle with care.', status: 'Pending', createdAt: '2026-08-09', totalCost: 200, securityDeposit: 2000 },
  { id: 'req_2', itemId: 'item_3', borrowerId: 'user_2', startDate: '2026-08-11', endDate: '2026-08-13', purpose: 'Testing recipes before hosting a dinner party next Friday.', message: 'Hey, I wanted to try out baking some keto snacks. Can I pick it up on Tuesday evening?', status: 'Pending', createdAt: '2026-08-08', totalCost: 0, securityDeposit: 2000 },
  { id: 'req_3', itemId: 'item_6', borrowerId: 'user_0', startDate: '2026-08-20', endDate: '2026-08-23', purpose: 'Going for a weekend trek to Chikmagalur with friends.', message: 'Hi Ananya! I need a reliable tent for our trip. I saw yours is available. Let me know if those dates work!', status: 'Approved', createdAt: '2026-08-07', totalCost: 450, securityDeposit: 1500 },
  { id: 'req_4', itemId: 'item_11', borrowerId: 'user_0', startDate: '2026-08-02', endDate: '2026-08-06', purpose: 'Baking bread batches and cupcakes for neighborhood bake sale.', message: 'Hi Priya, I have a big baking project this week. Your stand mixer would save me hours of hand kneading!', status: 'Approved', createdAt: '2026-07-31', totalCost: 1200, securityDeposit: 8000 },
  { id: 'req_5', itemId: 'item_0', borrowerId: 'user_1', startDate: '2026-08-05', endDate: '2026-08-10', purpose: 'Home movie marathon with family.', message: 'Hey Sairishita, requesting the projector for a few days.', status: 'Approved', createdAt: '2026-08-03', totalCost: 1750, securityDeposit: 3000 }
];

const mockTransactions = [
  { id: 'tx_0', requestId: 'req_4', itemId: 'item_11', borrowerId: 'user_0', ownerId: 'user_4', startDate: '2026-08-02', endDate: '2026-08-12', status: 'Active', pickupConfirmed: true, returnConfirmed: false, totalPrice: 1200, securityDeposit: 8000 },
  { id: 'tx_1', requestId: 'req_3', itemId: 'item_6', borrowerId: 'user_0', ownerId: 'user_2', startDate: '2026-08-20', endDate: '2026-08-23', status: 'Upcoming', pickupConfirmed: false, returnConfirmed: false, totalPrice: 450, securityDeposit: 1500 },
  { id: 'tx_2', requestId: 'req_5', itemId: 'item_0', borrowerId: 'user_1', ownerId: 'user_0', startDate: '2026-08-05', endDate: '2026-08-07', status: 'Overdue', pickupConfirmed: true, returnConfirmed: false, totalPrice: 1750, securityDeposit: 3000 }
];

const mockReviews = [
  { id: 'rev_1', itemId: 'item_0', reviewerId: 'user_1', reviewerName: 'Rahul Sharma', reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', rating: 5, comment: 'The projector is fantastic! Set it up in the backyard for a birthday screening. Highly recommend Sairishita as an owner.', date: '2026-07-28', type: 'item' },
  { id: 'rev_2', itemId: 'item_0', reviewerId: 'user_2', reviewerName: 'Ananya Iyer', reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', rating: 4, comment: 'Clear projection, though it works best in complete dark.', date: '2026-07-15', type: 'item' }
];

const mockCommunityRequests = [
  { id: 'com_0', title: 'Need a heavy-duty tall ladder', category: 'Home & DIY', requiredDates: 'Aug 15–16', description: 'Looking to prune a few overgrown branches of a mango tree hanging over our balcony in Indiranagar. A 10ft or 12ft ladder would be perfect.', location: 'Indiranagar, Block A', distance: 800, postedBy: 'Ananya Iyer', posterId: 'user_2', posterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', createdAt: '2026-08-08' }
];

const mockNotifications = [
  { id: 'not_0', userId: 'user_0', text: 'Rahul Sharma requested your Epson Home Cinema Projector.', type: 'request_received', createdAt: '2026-08-08T14:32:00.000Z', isRead: false, relatedId: 'req_5' },
  { id: 'not_1', userId: 'user_0', text: 'Your request for KitchenAid Stand Mixer was approved by Priya Patel.', type: 'request_approved', createdAt: '2026-08-02T09:15:00.000Z', isRead: true, relatedId: 'tx_0' }
];

const mockWishlist = [
  { id: 'w_0', userId: 'user_0', itemId: 'item_4' },
  { id: 'w_1', userId: 'user_0', itemId: 'item_5' }
];

async function main() {
  console.log('Seeding database...');

  // 1. Users
  for (const user of mockUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Add a few secondary users who own items in the seed
  const secondaryUsers = [
    { id: 'user_11', name: 'Manish Gupta', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=manish', email: 'manish@example.com', neighborhood: 'Whitefield', rating: 4.3, joinedDate: 'Dec 2025', verifiedEmail: true, verifiedPhone: true, trustedMember: false, about: 'Guitarist' },
    { id: 'user_18', name: 'Abhishek Roy', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=abhishek', email: 'abhishek@example.com', neighborhood: 'Jayanagar', rating: 4.5, joinedDate: 'Apr 2026', verifiedEmail: true, verifiedPhone: true, trustedMember: false, about: 'Loves repair' }
  ];
  for (const user of secondaryUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        ...user,
        itemsSharedCount: 0,
        successfulBorrows: 0,
        successfulLends: 0,
        onTimeReturnRate: 100
      }
    });
  }

  // 2. Items (Note: image list mapped to string)
  for (const item of mockItems) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }

  // Create temporary items for stand mixer and other elements in requests
  const extraItems = [
    { id: 'item_11', ownerId: 'user_4', name: 'Stand Mixer (KitchenAid Artisan)', category: 'Kitchen', condition: 'Excellent', description: 'Whip cream and bake', distance: 1400, sharingType: 'Paid', dailyRate: 300, securityDeposit: 8000, status: 'Borrowed', images: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.9, reviewsCount: 15 },
    { id: 'item_26', ownerId: 'user_13', name: 'Vacuum Steam Cleaner', category: 'Cleaning', condition: 'Excellent', description: 'Deep steam clean', distance: 700, sharingType: 'Paid', dailyRate: 250, securityDeposit: 5000, status: 'Available', images: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80', availableFrom: '2026-08-01', availableTo: '2026-12-31', rating: 4.9, reviewsCount: 12 }
  ];
  for (const item of extraItems) {
    // Ensure owners exist
    await prisma.user.upsert({
      where: { id: item.ownerId },
      update: {},
      create: {
        id: item.ownerId,
        name: 'Extra Owner',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=owner',
        email: `${item.ownerId}@example.com`,
        neighborhood: 'Jayanagar',
        rating: 4.8,
        joinedDate: 'Jan 2025',
        verifiedEmail: true,
        verifiedPhone: true,
        trustedMember: true,
        about: 'Sharing kitchen tools.'
      }
    });

    await prisma.item.upsert({
      where: { id: item.id },
      update: {},
      create: item
    });
  }

  // 3. Requests
  for (const req of mockBorrowRequests) {
    await prisma.borrowRequest.upsert({
      where: { id: req.id },
      update: {},
      create: req,
    });
  }

  // 4. Transactions
  for (const tx of mockTransactions) {
    await prisma.transaction.upsert({
      where: { id: tx.id },
      update: {},
      create: tx,
    });
  }

  // 5. Reviews
  for (const rev of mockReviews) {
    await prisma.review.upsert({
      where: { id: rev.id },
      update: {},
      create: rev,
    });
  }

  // 6. Community Requests
  for (const com of mockCommunityRequests) {
    await prisma.communityRequest.upsert({
      where: { id: com.id },
      update: {},
      create: com,
    });
  }

  // 7. Wishlist Items
  for (const wish of mockWishlist) {
    await prisma.wishlistItem.upsert({
      where: { id: wish.id },
      update: {},
      create: wish,
    });
  }

  // 8. Notifications
  for (const not of mockNotifications) {
    await prisma.notification.upsert({
      where: { id: not.id },
      update: {},
      create: not,
    });
  }

  console.log('Seeding complete! Database populated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
