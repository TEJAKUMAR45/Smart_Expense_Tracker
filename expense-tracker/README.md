# Smart Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB.

## Features
- ✅ Add/Delete expenses with categories
- ✅ Visual charts and analytics
- ✅ Filter by category and date
- ✅ Real-time statistics
- ✅ Responsive design
- ✅ MongoDB data persistence

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Charts**: Recharts

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Usage
1. Start backend server: `npm start` (runs on port 5000)
2. Start frontend server: `npm run dev` (runs on port 5173)
3. Open http://localhost:5173 in your browser

## Contributing
Pull requests are welcome!