import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to calculate days between two date strings
const getDaysBetween = (start: string, end: string) => {
  const dStart = new Date(start);
  const dEnd = new Date(end);
  const diffTime = Math.abs(dEnd.getTime() - dStart.getTime());
  return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

// -------------------------------------------------------------
// AUTHENTICATION & USERS
// -------------------------------------------------------------

// login user by email
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server login failed' });
  }
});

// register user
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { name, email, neighborhood } = req.body;
  if (!name || !email || !neighborhood) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await prisma.user.create({
      data: {
        id: `user_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        neighborhood,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
        rating: 5.0,
        joinedDate: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }),
        verifiedEmail: true,
        verifiedPhone: false,
        trustedMember: false,
        itemsSharedCount: 0,
        successfulBorrows: 0,
        successfulLends: 0,
        onTimeReturnRate: 100,
        about: `Hello, I'm new to NeighborShare in ${neighborhood}!`
      }
    });

    res.status(210).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server registration failed' });
  }
});

// get all users list
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// get user profile details with their reviews
app.get('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// -------------------------------------------------------------
// ITEMS CRUD & MARKETPLACE
// -------------------------------------------------------------

// get all items with search, filters and sorting
app.get('/api/items', async (req: Request, res: Response) => {
  const { search, category, status, type, condition, maxDistance, sortBy } = req.query;

  try {
    const where: any = {};

    if (category) {
      where.category = String(category);
    }
    if (status && status !== 'All') {
      where.status = String(status);
    }
    if (type && type !== 'All') {
      where.sharingType = String(type);
    }
    if (condition && condition !== 'All') {
      where.condition = String(condition);
    }
    
    // Read items from db
    let dbItems = await prisma.item.findMany({
      where
    });

    // Map images string back to array in code
    let formatted = dbItems.map(item => ({
      ...item,
      images: item.images.split(',')
    }));

    // Post-db filters: text query & distance
    if (search) {
      const q = String(search).toLowerCase();
      formatted = formatted.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }

    if (maxDistance) {
      const limit = Number(maxDistance);
      formatted = formatted.filter(item => item.distance <= limit);
    }

    // Sort operations
    if (sortBy === 'nearest') {
      formatted.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'highest_rated') {
      formatted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'recently_added') {
      formatted.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // recommended: rating high, then distance low
      formatted.sort((a, b) => b.rating - a.rating || a.distance - b.distance);
    }

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// get single item details with reviews
app.get('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: req.params.id }
    });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const reviews = await prisma.review.findMany({
      where: { itemId: item.id }
    });

    res.json({
      ...item,
      images: item.images.split(','),
      reviews
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item details' });
  }
});

// add a new item
app.post('/api/items', async (req: Request, res: Response) => {
  const { name, category, condition, description, ownerId, sharingType, dailyRate, securityDeposit, availableFrom, availableTo, images } = req.body;
  if (!name || !category || !condition || !description || !ownerId || !availableFrom || !availableTo) {
    return res.status(400).json({ error: 'Missing required item details' });
  }

  try {
    // Verify owner
    const user = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!user) {
      return res.status(404).json({ error: 'Owner user not found' });
    }

    const imagesStr = Array.isArray(images) && images.length > 0
      ? images.join(',')
      : 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80';

    const newItem = await prisma.item.create({
      data: {
        id: `item_${Date.now()}`,
        name,
        category,
        condition,
        description,
        ownerId,
        distance: 0, // Listed by current user
        sharingType,
        dailyRate: sharingType === 'Free' ? 0 : Number(dailyRate),
        securityDeposit: Number(securityDeposit),
        status: 'Available',
        images: imagesStr,
        availableFrom,
        availableTo,
        rating: 5.0,
        reviewsCount: 0
      }
    });

    // Increment owner's listed count
    await prisma.user.update({
      where: { id: ownerId },
      data: { itemsSharedCount: user.itemsSharedCount + 1 }
    });

    res.status(211).json({
      ...newItem,
      images: newItem.images.split(',')
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list item' });
  }
});

// edit item
app.put('/api/items/:id', async (req: Request, res: Response) => {
  const { name, category, condition, description, sharingType, dailyRate, securityDeposit, availableFrom, availableTo, images } = req.body;
  
  try {
    const existing = await prisma.item.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const data: any = {
      name,
      category,
      condition,
      description,
      sharingType,
      dailyRate: sharingType === 'Free' ? 0 : Number(dailyRate),
      securityDeposit: Number(securityDeposit),
      availableFrom,
      availableTo
    };

    if (Array.isArray(images)) {
      data.images = images.join(',');
    }

    const updated = await prisma.item.update({
      where: { id: req.params.id },
      data
    });

    res.json({
      ...updated,
      images: updated.images.split(',')
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit item' });
  }
});

// delete item
app.delete('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.item.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await prisma.item.delete({
      where: { id: req.params.id }
    });

    // Decrement owner listed count
    await prisma.user.update({
      where: { id: existing.ownerId },
      data: { itemsSharedCount: { decrement: 1 } }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// -------------------------------------------------------------
// BORROW REQUESTS
// -------------------------------------------------------------

// get list of requests
app.get('/api/requests', async (req: Request, res: Response) => {
  try {
    const requests = await prisma.borrowRequest.findMany();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// create a borrow request
app.post('/api/requests', async (req: Request, res: Response) => {
  const { itemId, borrowerId, startDate, endDate, purpose, message } = req.body;
  if (!itemId || !borrowerId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check date overlap
    const reqStart = new Date(startDate);
    const reqEnd = new Date(endDate);

    const activeBookings = await prisma.transaction.findMany({
      where: {
        itemId,
        NOT: { status: 'Completed' }
      }
    });

    for (const booking of activeBookings) {
      const bStart = new Date(booking.startDate);
      const bEnd = new Date(booking.endDate);
      if (reqStart <= bEnd && reqEnd >= bStart) {
        return res.status(400).json({ error: 'Overlapping borrowing dates with another active booking.' });
      }
    }

    const days = getDaysBetween(startDate, endDate);
    const totalCost = item.sharingType === 'Paid' ? (item.dailyRate * days) : 0;

    const newRequest = await prisma.borrowRequest.create({
      data: {
        id: `req_${Date.now()}`,
        itemId,
        borrowerId,
        startDate,
        endDate,
        purpose: purpose || '',
        message: message || '',
        status: 'Pending',
        createdAt: new Date().toISOString(),
        totalCost,
        securityDeposit: item.securityDeposit
      }
    });

    // Notify item owner
    const borrower = await prisma.user.findUnique({ where: { id: borrowerId } });
    await prisma.notification.create({
      data: {
        id: `not_${Date.now()}`,
        userId: item.ownerId,
        text: `${borrower?.name || 'A neighbor'} requested to borrow your "${item.name}".`,
        type: 'request_received',
        createdAt: new Date().toISOString(),
        isRead: false,
        relatedId: newRequest.id
      }
    });

    res.json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// approve borrow request
app.post('/api/requests/:id/approve', async (req: Request, res: Response) => {
  try {
    const request = await prisma.borrowRequest.findUnique({
      where: { id: req.params.id }
    });
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    // Update request state
    await prisma.borrowRequest.update({
      where: { id: request.id },
      data: { status: 'Approved' }
    });

    // Update item status to Reserved
    await prisma.item.update({
      where: { id: request.itemId },
      data: { status: 'Reserved' }
    });

    const item = await prisma.item.findUnique({ where: { id: request.itemId } });

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        id: `tx_${Date.now()}`,
        requestId: request.id,
        itemId: request.itemId,
        borrowerId: request.borrowerId,
        ownerId: item?.ownerId || '',
        startDate: request.startDate,
        endDate: request.endDate,
        status: 'Upcoming',
        pickupConfirmed: false,
        returnConfirmed: false,
        totalPrice: request.totalCost,
        securityDeposit: request.securityDeposit
      }
    });

    // Cancel other overlapping pending requests
    const rStart = new Date(request.startDate);
    const rEnd = new Date(request.endDate);

    const pendingRequests = await prisma.borrowRequest.findMany({
      where: {
        itemId: request.itemId,
        status: 'Pending',
        NOT: { id: request.id }
      }
    });

    for (const r of pendingRequests) {
      const start = new Date(r.startDate);
      const end = new Date(r.endDate);
      if (start <= rEnd && end >= rStart) {
        await prisma.borrowRequest.update({
          where: { id: r.id },
          data: { status: 'Cancelled' }
        });

        // Notify other borrowers
        await prisma.notification.create({
          data: {
            id: `not_${Date.now()}_cancel_${r.id}`,
            userId: r.borrowerId,
            text: `Your request for "${item?.name}" was cancelled because of an overlapping reservation.`,
            type: 'request_rejected',
            createdAt: new Date().toISOString(),
            isRead: false
          }
        });
      }
    }

    // Notify approved borrower
    await prisma.notification.create({
      data: {
        id: `not_${Date.now()}`,
        userId: request.borrowerId,
        text: `Your request for "${item?.name}" was approved! Prepare for pickup.`,
        type: 'request_approved',
        createdAt: new Date().toISOString(),
        isRead: false,
        relatedId: transaction.id
      }
    });

    // Update borrower borrow count & owner lend count
    await prisma.user.update({
      where: { id: request.borrowerId },
      data: { successfulBorrows: { increment: 1 } }
    });
    await prisma.user.update({
      where: { id: item?.ownerId },
      data: { successfulLends: { increment: 1 } }
    });

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to approve request' });
  }
});

// reject borrow request
app.post('/api/requests/:id/reject', async (req: Request, res: Response) => {
  try {
    const request = await prisma.borrowRequest.findUnique({
      where: { id: req.params.id }
    });
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    await prisma.borrowRequest.update({
      where: { id: request.id },
      data: { status: 'Rejected' }
    });

    const item = await prisma.item.findUnique({ where: { id: request.itemId } });

    // Send notification
    await prisma.notification.create({
      data: {
        id: `not_${Date.now()}`,
        userId: request.borrowerId,
        text: `Your borrow request for "${item?.name}" was declined.`,
        type: 'request_rejected',
        createdAt: new Date().toISOString(),
        isRead: false,
        relatedId: request.id
      }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject request' });
  }
});

// -------------------------------------------------------------
// TRANSACTIONS (HANDOVER & RETURN)
// -------------------------------------------------------------

// get list of transactions
app.get('/api/transactions', async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transactions' });
  }
});

// confirm pickup (status -> Active, item -> Borrowed)
app.post('/api/transactions/:id/pickup', async (req: Request, res: Response) => {
  try {
    const tx = await prisma.transaction.findUnique({
      where: { id: req.params.id }
    });
    if (!tx) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const updatedTx = await prisma.transaction.update({
      where: { id: tx.id },
      data: {
        status: 'Active',
        pickupConfirmed: true
      }
    });

    await prisma.item.update({
      where: { id: tx.itemId },
      data: { status: 'Borrowed' }
    });

    res.json(updatedTx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm pickup' });
  }
});

// confirm return & write reviews (status -> Completed, item -> Available)
app.post('/api/transactions/:id/return', async (req: Request, res: Response) => {
  const { rating, comment, ratingType, reviewerId } = req.body;

  try {
    const tx = await prisma.transaction.findUnique({
      where: { id: req.params.id }
    });
    if (!tx) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const updatedTx = await prisma.transaction.update({
      where: { id: tx.id },
      data: {
        status: 'Completed',
        returnConfirmed: true
      }
    });

    await prisma.item.update({
      where: { id: tx.itemId },
      data: { status: 'Available' }
    });

    // Write review if passed
    if (rating && comment && reviewerId) {
      const reviewer = await prisma.user.findUnique({ where: { id: reviewerId } });

      const newReview = await prisma.review.create({
        data: {
          id: `rev_${Date.now()}`,
          itemId: tx.itemId,
          reviewerId,
          reviewerName: reviewer?.name || 'Neighbor',
          reviewerAvatar: reviewer?.avatar || '',
          rating: Number(rating),
          comment,
          date: new Date().toISOString().split('T')[0],
          type: ratingType || 'item'
        }
      });

      if (ratingType === 'item') {
        const item = await prisma.item.findUnique({ where: { id: tx.itemId } });
        if (item) {
          const currentTotal = item.rating * item.reviewsCount;
          const newCount = item.reviewsCount + 1;
          const newRating = Number(((currentTotal + Number(rating)) / newCount).toFixed(1));
          await prisma.item.update({
            where: { id: tx.itemId },
            data: { rating: newRating, reviewsCount: newCount }
          });
        }
      } else {
        const targetUserId = reviewerId === tx.borrowerId ? tx.ownerId : tx.borrowerId;
        const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
        if (targetUser) {
          const currentTotal = targetUser.rating * 15;
          const newRating = Number(((currentTotal + Number(rating)) / 16).toFixed(1));
          await prisma.user.update({
            where: { id: targetUserId },
            data: { rating: newRating }
          });
        }
      }
    }

    res.json(updatedTx);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to confirm return' });
  }
});

// -------------------------------------------------------------
// COMMUNITY REQUESTS
// -------------------------------------------------------------

// list community requests
app.get('/api/community', async (req: Request, res: Response) => {
  try {
    const list = await prisma.communityRequest.findMany({
      include: { offers: true }
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load community requests' });
  }
});

// create community request
app.post('/api/community', async (req: Request, res: Response) => {
  const { title, category, requiredDates, description, location, posterId } = req.body;
  if (!title || !category || !requiredDates || !description || !posterId) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const poster = await prisma.user.findUnique({ where: { id: posterId } });
    if (!poster) {
      return res.status(404).json({ error: 'Poster user not found' });
    }

    const newRequest = await prisma.communityRequest.create({
      data: {
        id: `com_${Date.now()}`,
        title,
        category,
        requiredDates,
        description,
        location: location || 'Indiranagar',
        distance: 200,
        postedBy: poster.name,
        posterId,
        posterAvatar: poster.avatar,
        createdAt: new Date().toISOString()
      }
    });

    res.json({ ...newRequest, offers: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create community request' });
  }
});

// post offer to lend for community request
app.post('/api/community/:id/offer', async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const cr = await prisma.communityRequest.findUnique({
      where: { id: req.params.id }
    });
    if (!cr) {
      return res.status(404).json({ error: 'Community request not found' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'Offer user not found' });
    }

    const newOffer = await prisma.communityOffer.create({
      data: {
        id: `off_${Date.now()}`,
        communityRequestId: req.params.id,
        userId,
        userName: user.name,
        userAvatar: user.avatar,
        status: 'Pending'
      }
    });

    // Notify poster
    await prisma.notification.create({
      data: {
        id: `not_${Date.now()}`,
        userId: cr.posterId,
        text: `${user.name} offered to lend an item for your request "${cr.title}".`,
        type: 'request_received',
        createdAt: new Date().toISOString(),
        isRead: false
      }
    });

    res.json(newOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to post offer' });
  }
});

// -------------------------------------------------------------
// WISHLIST MANAGEMENT
// -------------------------------------------------------------

// get user wishlist
app.get('/api/wishlist/:userId', async (req: Request, res: Response) => {
  try {
    const list = await prisma.wishlistItem.findMany({
      where: { userId: req.params.userId },
      include: { item: true }
    });

    // Return array of item IDs
    res.json(list.map(w => w.itemId));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load wishlist' });
  }
});

// toggle wishlist
app.post('/api/wishlist/:userId/toggle', async (req: Request, res: Response) => {
  const { itemId } = req.body;
  if (!itemId) {
    return res.status(400).json({ error: 'Item ID is required' });
  }

  try {
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_itemId: {
          userId: req.params.userId,
          itemId
        }
      }
    });

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id }
      });
      res.json({ action: 'removed', itemId });
    } else {
      await prisma.wishlistItem.create({
        data: {
          id: `w_${Date.now()}`,
          userId: req.params.userId,
          itemId
        }
      });
      res.json({ action: 'added', itemId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to toggle wishlist' });
  }
});

// -------------------------------------------------------------
// NOTIFICATIONS MANAGEMENT
// -------------------------------------------------------------

// get user notifications
app.get('/api/notifications/:userId', async (req: Request, res: Response) => {
  try {
    const list = await prisma.notification.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load notifications' });
  }
});

// mark notification read
app.post('/api/notifications/:id/read', async (req: Request, res: Response) => {
  try {
    const notif = await prisma.notification.update({
      where: { id: req.params.id },
      data: { isRead: true }
    });
    res.json(notif);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark read' });
  }
});

// mark all read
app.post('/api/notifications/user/:userId/read-all', async (req: Request, res: Response) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.params.userId },
      data: { isRead: true }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark all read' });
  }
});

// -------------------------------------------------------------
// APP LISTEN START
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
