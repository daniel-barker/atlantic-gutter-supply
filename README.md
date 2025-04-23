# Atlantic Gutter Supply Website

A modern, responsive website for Atlantic Gutter Supply, a company specializing in gutter products and accessories. This project is built with Next.js, Tailwind CSS, and Prisma.

## Features

- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Product Catalog**: Browse products with filtering by category
- **Admin Panel**: Secure admin area for managing products and categories
- **Authentication**: User authentication for admin access
- **Database Integration**: Prisma ORM with SQLite database (can be upgraded to PostgreSQL for production)

## Tech Stack

- **Frontend**: Next.js 15 (React 19), Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS with Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up the database and seed initial data:

```bash
npx prisma generate
npx prisma db push
npx ts-node --project prisma/tsconfig.json prisma/seed.ts
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the website

## Admin Access

After running the seed script, you can access the admin panel with these credentials:

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: admin@atlanticguttersupply.com
- **Password**: admin123

## Project Structure

- `/src/app`: Next.js app router pages and API routes
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and libraries
- `/prisma`: Database schema and seed data
- `/public`: Static assets

## API Routes

- `/api/products`: CRUD operations for products
- `/api/categories`: CRUD operations for categories
- `/api/auth`: Authentication endpoints

## Deployment

This application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## License

This project is licensed under the MIT License.
