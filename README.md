# Bookoria Frontend

A modern, responsive e-commerce platform for book lovers built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

![Bookoria]

## 📚 Overview

Book Shop is a full-featured online bookstore application that allows users to browse, search, and purchase books. The platform includes user authentication, book reviews, shopping cart functionality, and a comprehensive admin dashboard for managing inventory and users.

## ✨ Features

- **User Authentication** - Register, login, and profile management
- **Book Browsing** - Search, filter, and sort through the book catalog
- **Reviews System** - Read and write book reviews with ratings
- **Shopping Cart** - Add books to cart and manage quantities
- **Checkout Process** - Secure payment processing
- **User Dashboard** - View order history and manage profile
- **Admin Panel** - Manage books, users, and orders
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🔑 Demo Credentials

### Admin Access

To explore the admin dashboard and functionality, use these credentials:

Email: admin@bookoria.com
Password: Admin123!

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS and Ant Design
- **Form Handling**: React Hook Form with Zod validation
- **API Communication**: RTK Query with JWT authentication
- **Persistence**: Redux Persist

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/book-shop.git
cd book-shop/book-shop-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install

# or

yarn install
```

### 3️⃣ Set Up Environment Variables

Update the .env file with you can check the .env.example file.

### 4️⃣ Start Development Server

The application will be available at http://localhost:5173 .

## 🌐 API Integration

The application communicates with a RESTful API using RTK Query. Key features:

- Automatic caching and invalidation
- Loading and error states
- Optimistic updates
- Typed responses with TypeScript

## 🔒 Authentication & Authorization

### Authentication Flow

- JWT-based authentication with refresh tokens
- Persistent login state using Redux Persist
- Protected routes for authenticated users

### User Roles

- Customer : Can browse books, make purchases, and write reviews
- Admin : Has access to the admin dashboard for managing books, users, and orders

## 📝 Key Features Details

### Book Management

- Browse books with search, filter, and pagination
- View detailed book information including reviews
- Admin can add, edit, and delete books

### Shopping Cart

- Add/remove books from cart
- Update quantities
- Persistent cart between sessions
- Price calculations and summaries

### Review System

- Users can write, edit, and delete their reviews
- Star rating system
- Average ratings displayed on book pages

### User Management (Admin)

- View all users
- Edit user details
- Block/unblock users
- Delete users

## 🧪 Testing

To run tests:

## 🚨 Troubleshooting

### Common Issues

1. API Connection Issues

   - Ensure the backend server is running
   - Check that your .env file has the correct API URL

2. Authentication Problems

   - Clear browser storage and try logging in again
   - Check browser console for specific error messages

3. Build Failures

   - Make sure all dependencies are installed
   - Check for TypeScript errors with npm run tsc

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - GitHub Profile

## 🙏 Acknowledgments

- React
- Redux Toolkit
- Tailwind CSS
- Ant Design
- Vite
