# Smart Expense Tracker - Frontend

A modern, responsive expense tracking application built with React and Tailwind CSS.

## Features

✨ **Modern UI/UX**
- Clean, responsive design that works on all devices
- Smooth animations and hover effects
- Consistent color scheme and typography
- Intuitive icons and visual feedback

📊 **Comprehensive Dashboard**
- Real-time expense tracking
- Interactive pie chart visualization
- Category-based filtering
- Date-based filtering
- Summary statistics cards

💰 **Expense Management**
- Easy expense addition with form validation
- Multiple expense categories
- Delete functionality with confirmation
- Automatic date handling

🎨 **Visual Enhancements**
- Gradient backgrounds
- Card-based layout
- Custom scrollbars
- Progress bars for category breakdown
- Emoji icons for better UX

## Layout Structure

### Desktop Layout (XL screens)
```
┌─────────────────────────────────────────────────────────┐
│                    Header & Title                        │
├─────────────┬───────────────────────────────────────────┤
│             │  Filters Section                          │
│ Add Expense │  ┌─────────────┬─────────────────────────┐ │
│   Form      │  │  Category   │      Date Filter        │ │
│             │  └─────────────┴─────────────────────────┘ │
│             │  Summary Cards (4 cards in a row)        │
├─────────────┼───────────────────────────────────────────┤
│ Expense     │              Chart                        │
│   List      │           (Pie Chart)                     │
└─────────────┴───────────────────────────────────────────┘
│              Category Breakdown Cards                    │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (SM screens)
```
┌─────────────────────────┐
│      Header & Title     │
├─────────────────────────┤
│    Add Expense Form     │
├─────────────────────────┤
│    Filters Section      │
├─────────────────────────┤
│    Summary Cards        │
│    (2x2 grid)          │
├─────────────────────────┤
│     Expense List        │
├─────────────────────────┤
│       Chart             │
├─────────────────────────┤
│  Category Breakdown     │
└─────────────────────────┘
```

## Key Improvements Made

1. **Responsive Grid System**: Uses CSS Grid and Flexbox for perfect alignment
2. **Consistent Styling**: All components use Tailwind CSS classes
3. **Better Typography**: Improved font hierarchy and spacing
4. **Enhanced Interactivity**: Hover effects, animations, and transitions
5. **Visual Feedback**: Loading states, empty states, and success indicators
6. **Accessibility**: Proper focus states and semantic HTML
7. **Mobile-First Design**: Responsive breakpoints for all screen sizes

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for data visualization
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)