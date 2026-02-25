# 💰 Smart Expense Tracker Pro

A modern, full-stack expense tracking application with dark theme UI, real-time analytics, and AI-powered financial insights.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ✨ Features

### 🎨 Modern Dark Dashboard
- **Glassmorphism UI** - Frosted glass cards with backdrop blur
- **Cyan/Blue Theme** - Professional finance color scheme
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Fade, slide, and scale effects

### 💼 Core Features
- ✅ **Add/Delete Expenses** - Quick expense management
- 🔍 **Smart Search** - Search by title, category, or amount
- 🏷️ **Category Filtering** - Filter by 7 expense categories
- 📅 **Date Filtering** - Filter by specific dates
- 📊 **Real-time Charts** - Pie charts with Recharts
- 💡 **Quick Insights** - Today, this week, top category stats

### 🎯 Advanced Features
- 🤖 **Smart Financial Advice** - AI-like spending suggestions
- 📈 **Reports Dashboard** - Comprehensive analytics
- 👤 **User Profile** - Editable profile with photo upload
- 🚪 **Logout System** - Secure logout with confirmation
- 🎨 **Category Tags** - Color-coded expense categories

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS (Dark Theme)
- Recharts (Data Visualization)
- Axios (API Calls)

**Backend:**
- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- CORS enabled

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd expense-tracker
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
✅ Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ App runs on `http://localhost:5173`

## 📱 Usage Guide

### Adding Expenses
1. Fill in title, amount, category, and date
2. Click "Add Expense"
3. Expense appears instantly in the list

### Using Search
- Type in the search bar to filter by:
  - Expense title
  - Category name
  - Amount

### Viewing Reports
1. Click "Reports" in sidebar
2. View:
   - Monthly spending trends
   - Category distribution
   - Highest expense
   - Most frequent category

### Profile Management
1. Click profile picture (top right)
2. Upload new photo
3. Edit name and email
4. Save changes

### Smart Advice
- Automatically analyzes spending patterns
- Provides 3 personalized tips
- Updates based on your expenses

## 🎨 Color Scheme

- **Primary:** Cyan (#06b6d4) - Finance/Money
- **Secondary:** Blue (#2563eb) - Trust/Professional
- **Background:** Navy Gradient - Sophisticated
- **Accent:** Purple, Amber, Emerald - Category colors

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Expense.js         # Expense schema
│   ├── routes/
│   │   └── expenses.js        # API routes
│   ├── .env                   # Environment variables
│   └── server.js              # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── ExpenseChart.jsx
│   │   ├── App.jsx            # Main component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind + Custom CSS
│   ├── index.html
│   └── vite.config.js
└── README.md
```

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Create new expense |
| DELETE | `/api/expenses/:id` | Delete expense |

## 🔒 Security

- Environment variables for sensitive data
- CORS enabled for API security
- Input validation on forms
- Secure MongoDB connection

## 🌟 Key Highlights

1. **Dark Theme Dashboard** - Professional fintech look
2. **Glassmorphism Design** - Modern UI trend
3. **Smart Suggestions** - AI-like financial advice
4. **Real-time Search** - Instant filtering
5. **Profile Upload** - Custom avatar support
6. **Responsive Layout** - Mobile-friendly
7. **Smooth Animations** - Enhanced UX

## 📊 Categories

- 🍔 Food
- 🚗 Transport
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills
- 🏥 Health
- 📦 Other

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for utility-first styling
- Recharts for beautiful visualizations
- MongoDB for database solution

---

⭐ **Star this repo if you found it helpful!**

💡 **Built with modern web technologies for professional expense tracking**
