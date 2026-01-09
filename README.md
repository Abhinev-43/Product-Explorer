# Product Explorer Dashboard

A modern, responsive product browsing application built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features

- ✅ **Product Listing** - Responsive grid displaying products from FakeStore API
- ✅ **Search & Filter** - Real-time search by title and category filtering
- ✅ **Product Details** - Dedicated page for each product with full information
- ✅ **Favorites System** - Mark/unmark favorites with localStorage persistence
- ✅ **Responsive Design** - Mobile-first layout that works on all devices

### Bonus Features

- 🌙 **Dark Mode** - Toggle between light and dark themes
- 💾 **Data Persistence** - Favorites and theme preferences saved locally
- ⚡ **Loading States** - Smooth loading indicators
- ❌ **Error Handling** - Graceful error messages
- ♿ **Accessibility** - ARIA labels and semantic HTML
- 🎨 **Modern UI** - Clean design with smooth transitions

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: FakeStore API

## 🏗️ Project Structure

```
product-explorer/
├── src/
|   ├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
|   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductDetails.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd product-explorer
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Features Walkthrough

### Product Listing

- Products are displayed in a responsive grid (1-4 columns based on screen size)
- Each card shows product image, title, price, and category
- Heart icon for quick favorite toggling
- "View Details" button for detailed information

### Search & Filtering

- **Search**: Type in the search bar to filter products by title
- **Category Filter**: Dropdown to filter by product category
- **Favorites Filter**: Toggle to show only favorited products
- All filters work together seamlessly

### Product Details

- Click any product card to view full details
- Shows large product image, complete description, rating
- Back button returns to the product list
- Favorite toggle available on detail page

### Dark Mode

- Click the sun/moon icon in the header to toggle themes
- Preference is saved and persists across sessions
- Smooth color transitions

### Favorites

- Click the heart icon to add/remove favorites
- Favorites persist in localStorage
- Red heart indicates favorited items
- Filter view to show only favorites

## 🎨 Design Decisions

### Component Architecture

- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components like ProductCard are highly reusable
- **Type Safety**: Full TypeScript coverage with no `any` types
- **Props Interface**: Clear, typed interfaces for all components

### State Management

- Centralized state in main page component
- Local state for UI interactions
- localStorage for persistence
- No external state management needed for this scope

### API Integration

- Centralized API functions in `lib/api.ts`
- Proper error handling and type safety
- Async/await pattern for clean code

### Styling Approach

- Utility-first with Tailwind CSS
- Responsive design using Tailwind breakpoints
- Dark mode using conditional classes
- Smooth transitions and hover effects

## 🔄 Trade-offs & Assumptions

### Trade-offs

1. **Client-Side Rendering**: Used client components for simplicity. Could be optimized with Server Components for initial load
2. **In-Memory Filtering**: Search and filter happen client-side. Could use API queries for larger datasets
3. **localStorage**: Simple persistence solution. Could use database for multi-device sync
4. **No Pagination**: All products load at once. Would add pagination for larger datasets

### Assumptions

1. API is reliable and returns consistent data structure
2. Product images are always available
3. User doesn't need authentication
4. Single-user experience (no multi-user favorites sync)
5. Modern browser with localStorage support

## 🧪 Testing

The application includes comprehensive error handling:

- Network error handling
- Empty state handling
- Loading state indicators
- Graceful degradation

To add unit tests:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Configure netlify.toml for Next.js

## 📄 License

This project is created as a technical assessment.

## 🤝 Contributing

This is an assessment project, but feedback is welcome!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
