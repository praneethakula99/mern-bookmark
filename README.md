# 📚 MERN Bookmark Manager

A full-stack **MERN** application that allows users to sign in with **Google OAuth (Supabase)** and manage personal bookmarks.

✨ Users can:
- Add, view, delete bookmarks
- Mark bookmarks as favorite
- Keep bookmarks private per user
- Log in with Google (Supabase OAuth)
- Store data in MongoDB

---

## 🚀 Features

✅ Google Login with Supabase  
✅ Protected backend routes with Supabase JWT  
✅ User-specific bookmarks (private data)  
✅ Add, view, delete, favorite bookmarks  
✅ Clean UI with React & Bootstrap  
✅ MongoDB for data persistence  

---

## 📁 Project Structure

📦 mern-bookmark-manager
├── backend/ (Express API)
├── frontend/ (React UI)
├── .gitignore
├── README.md
├── package.json



---

## 🧠 Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Frontend | React |
| Database | MongoDB (Atlas or local) |
| Authentication | Supabase Google OAuth |
| Deployment | Vercel / Render / Heroku |

---

## 📌 Getting Started

### 🔥 1. Clone Repository


git clone https://github.com/praneethakula99/mern-bookmark-manager.git
cd mern-bookmark-manager
🧩 2. Backend Setup

cd backend
npm install
Create file:


backend/.env
Add:


MONGO_URI=your_mongo_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Start backend:


npm start
💻 3. Frontend Setup
bash
Copy code
cd frontend
npm install
Create:
frontend/.env
Add:


REACT_APP_SUPABASE_URL=https://xyz.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
Start frontend:

npm start
🔐 Google OAuth Setup (Supabase)
✅ Go to Supabase → Authentication → Providers → Google
✅ Add Redirect URLs:

http://localhost:3000
http://localhost:3000/dashboard
✅ Create Google OAuth app → copy CLIENT ID & SECRET → add to Supabase

🧪 How It Works
User clicks Login with Google

Supabase handles OAuth

Frontend receives access token

Token sent to backend via Authorization header

Backend verifies & allows CRUD operations

🧾 API Endpoints (Protected)
GET /api/bookmarks         → Get user bookmarks
POST /api/bookmarks/add     → Add bookmark
DELETE /api/bookmarks/:id   → Delete
PUT /api/bookmarks/fav/:id  → Toggle favourite
Each request must include:


🛠 Challenges Faced During Development
🔐 1. Authentication Integration Complexity

Integrating Supabase OAuth with a custom MERN backend required careful handling of JWT tokens.
The frontend receives an access token from Supabase, but the backend must validate and authorize requests correctly.
This required proper middleware setup and consistent token formatting (Authorization: Bearer <token>).

🔄 2. Token Handling & Protected Routes

Ensuring that protected routes only allow authenticated users was challenging.
The backend needed middleware to:

Extract the JWT from headers

Verify the token

Attach user data to requests

Incorrect token handling initially resulted in 403 and 500 errors.

📡 3. CORS & API Communication

When running frontend and backend on different ports (3000 and 5000), CORS configuration was necessary.
Improper configuration led to blocked requests and failed API calls.

🔐 Auth Token Handling
Problem:
Backend was expecting custom JWT (x-auth-token).
Frontend used Supabase access tokens.

Fix:
Switched backend auth middleware to decode Supabase JWT from:

Authorization: Bearer <token>
🧠 Notes & Tips
✨ Supabase manages auth
✨ No password stored in DB
✨ Bookmarks are tied to Supabase user ID
✨ On logout, Supabase session ends

🚀 Future Improvements
⭐ Add pagination
⭐ Add categories & tags
⭐ Enable real-time updates
⭐ Add profile page
