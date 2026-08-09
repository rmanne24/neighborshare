# NeighbourShare

> **"Why buy it when your neighbor has it?"**  
NeighbourShare is a hyperlocal community resource-sharing platform that empowers neighbors to list, discover, request, borrow, and return household items—reducing environmental waste and building tight-knit community connections.

---

## 🌟 The Inspiration
The average power drill is used for only **13 minutes in its entire lifespan**. High-pressure washers, camping tents, lawn aerators, and guest event supplies sit in storage spaces for months, gathering dust, while neighbors go out and spend thousands of rupees buying the exact same items. 

We built **NeighbourShare** to bridge this gap. By creating a trustworthy, frictionless, hyperlocal marketplace, we make it simple to borrow a sewing machine, a projector, or gardening gear from the person next door. This not only saves money but also fosters community trust and reduces carbon footprints by encouraging circular resource consumption.

---

## 🚀 What It Does
NeighbourShare is a fully functional web application built as a client-server monorepo. Here are the core user flows:

1. **Hyperlocal Discoverability:** Browse available listings filtered by category, distance, price (Free or Paid), and condition.
2. **Date Conflict Verification:** Select booking dates on a calendar; the backend automatically checks against database records to reject overlapping borrow requests.
3. **Interactive Booking Timelines:** Track borrows/lends through a visual status stepper:  
   `REQUESTED ➔ APPROVED ➔ PICKED UP ➔ BORROWED ➔ RETURNED ➔ COMPLETED`
4. **Action-Driven Handovers:** Triggers for owners to approve requests, confirm pickups, and release security deposits.
5. **Interactive Review Flow:** Upon returning items, borrowers and owners can write dual-aspect reviews (rating item condition, owner communication, and promptness).
6. **Community Request Board:** Open bulletin where neighbors can post items they need (e.g., "Need a heavy-duty tall ladder for pruning") and neighbors can offer to lend with a single click.
7. **Unread Notifications Center:** Keep updated on approvals, due dates, and community offers.

---

## 🛠️ How We Built It
We structured the application as a monorepo consisting of:

* **Frontend:**
  - **React 18** & **TypeScript** scaffolded with Vite.
  - **Tailwind CSS v4** for modern styling, custom glassmorphism, and responsive grid layouts.
  - **Lucide Icons** for UI visual aids.
  - **React Router Dom (v6)** for SPA view routing.
* **Backend:**
  - **Node.js** & **Express.js** API server written in TypeScript.
  - **Prisma ORM** for query building.
  - **SQLite Database** (`dev.db`) for lightweight, serverless relational storage.
  - **nodemon** & **ts-node** for server hot-reloads.

---

## 🚧 Challenges We Ran Into
* **SQLite Date-Overlap Validations:** Ensuring that user requests don't overlap with already approved transactions. We solved this by writing custom Date intersection queries in the Express requests router, automatically cancelling conflicting pending proposals once a booking is approved.
* **Vite API Reverse Proxy:** Configuring paths so that the React build maps `/api` requests seamlessly to the Express server running on port 5000, eliminating CORS issues during development.
* **Tailwind CSS v4 Directives:** Adjusting to the new `@import "tailwindcss"` standards in Tailwind v4 and configuring `@tailwindcss/postcss` for seamless CSS compilation.

---

## 🏆 Accomplishments We're Proud Of
* **Seamless State Transitions:** The transaction stages work fluidly. When a borrower hits "Returned", the owner gets an alert, a review pop-up is unlocked, and submitting the review updates the target item's rating and user trust score in real-time.
* **Rich Dashboard UI:** A clean fintech-inspired dashboard for user **XYZ** that shows personal stats, quick approval logs, and active rentals with overdue warnings.
* **Database Seeding:** A comprehensive `seed.ts` script that loads 20 user profiles, 40 items, active requests, reviews, and community threads, making the app immediately interactive.

---

## 📚 What We Learned
* **Prisma Client Management:** Implementing cascade deletes and relational references in SQLite.
* **Monorepo Structuring:** Managing dependencies and concurrent services inside `frontend` and `backend` folders under a single repository workspace.
* **Responsive Layouts:** Designing sliding sidebar sheets and bottom sticky tabs for mobile screen widths.

---

## 🔮 What's Next
* **Real-time Chat:** Integrating WebSockets (Socket.io) to allow instant direct messaging between neighbors.
* **Interactive Map Views:** Integrating Mapbox or OpenStreetMap APIs to let users search for items on a visual neighborhood map.
* **Escrow Deposit Integration:** Hooking up payment gateways (like Razorpay or Stripe) to handle refundable security deposits securely.

---

## 💻 How to Run Locally

### Prerequisites
* [Node.js](https://nodejs.org) (v18 or higher)
* [npm](https://npm.co) (v9 or higher)

### Setup & Run

1. **Clone and Navigate:**
   ```bash
   git clone https://github.com/rmanne24/neighborshare.git
   cd neighborshare
   ```

2. **Run the Backend Server:**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npx prisma db seed
   npm run dev
   ```
   *(Backend will start on port `5000`)*

3. **Run the Frontend Client:**
   Open a new terminal window in the root directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *(Frontend will start on port `5173`)*

4. Open `http://localhost:5173/` in your browser. Log in using `xyz.manne@example.com` (password: `password123`) to explore the app!
