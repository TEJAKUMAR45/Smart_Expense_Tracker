# 💰 Smart Expense Tracker

A full-stack expense tracking application with a modern React frontend and Node.js backend. Track your expenses with beautiful visualizations and comprehensive analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)

## 🚀 Features

- **📊 Interactive Dashboard** - Real-time expense visualization with pie charts
- **💳 Expense Management** - Add, edit, and delete expenses with categories
- **🔍 Smart Filtering** - Filter by category, date range, and amount
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎨 Modern UI** - Clean interface with Tailwind CSS
- **⚡ Real-time Updates** - Instant data synchronization

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive chart library
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
ExpenseTracker/
├── expense-tracker/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── package.json
│   │   └── README.md
│   ├── backend/           # Node.js backend API
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   └── package.json
│   └── package.json       # Root package.json
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TEJAKUMAR45/Smart_Expense_Tracker.git
   cd Smart_Expense_Tracker
   ```

2. **Install dependencies**
   ```bash
   cd expense-tracker
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In the backend directory
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start the application**
   
   **Backend (Terminal 1):**
   ```bash
   cd expense-tracker/backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd expense-tracker/frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
NODE_ENV=development
```

### Frontend Configuration
The frontend is configured to connect to the backend at `http://localhost:5000` by default.

## 📱 Usage

1. **Add Expenses** - Use the form to add new expenses with categories
2. **View Dashboard** - See your spending patterns with interactive charts
3. **Filter Data** - Filter expenses by category, date, or amount
4. **Manage Categories** - Organize expenses into custom categories
5. **Track Trends** - Monitor your spending habits over time

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Teja Kumar**
- GitHub: [@TEJAKUMAR45](https://github.com/TEJAKUMAR45)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Recharts for beautiful data visualizations
- MongoDB for the flexible database solution

---

<<<<<<< HEAD
⭐ Star this repository if you found it helpful!
=======
⭐ Star this repository if you found it helpful!
>>>>>>> dc50537df6495918649694dc206a5a041228ba65
