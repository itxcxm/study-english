# Study English Platform

A comprehensive full-stack web application for learning English, featuring interactive courses, practice tests, and an extensive question bank covering grammar, vocabulary, and verb tenses. Built with Next.js and Express.js.

## 🌟 Overview

Study English is a modern learning platform designed to help users improve their English language skills through structured courses, interactive practice sessions, and exam preparation tools. The platform includes support for IELTS and TOEIC exam preparation with over 70+ topics across grammar, vocabulary, and verb tenses.

### Key Highlights

- 🎓 **Interactive Learning**: Engaging practice questions with detailed explanations
- 📚 **Extensive Content**: 72+ topics covering all aspects of English language learning
- 🎯 **Exam Preparation**: Dedicated sections for IELTS and TOEIC practice
- 👥 **User Management**: Secure authentication with role-based access control
- 📊 **Progress Tracking**: Visual analytics and performance monitoring
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- 🔒 **Secure**: JWT-based authentication with HTTP-only cookies
- 🔄 **Auto Token Refresh**: Seamless session management - users stay logged in automatically

## 🏗️ Architecture

This is a monorepo containing two main applications:

```
study-english/
├── client/          # Next.js frontend application
├── server/          # Express.js backend API
└── README.md        # This file
```

### Technology Stack

#### Frontend (Client)

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5.2.2
- **UI Library**: React 19.2.0
- **Styling**: TailwindCSS 3.3.3 + Radix UI
- **State Management**: React Hooks + React Hook Form
- **HTTP Client**: Axios
- **Validation**: Zod

#### Backend (Server)

- **Framework**: Express.js 5.1.0
- **Runtime**: Node.js (ES Modules)
- **Database**: MongoDB + Mongoose 8.19.1
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt, cookie-parser, CORS
- **Development**: Nodemon

## 📁 Project Structure

```
study-english/
│
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   │   ├── (account)/           # User account pages
│   │   │   ├── (user)/              # Auth pages (login/register)
│   │   │   ├── dashboard/           # Main dashboard & features
│   │   │   │   ├── exam/            # IELTS & TOEIC practice
│   │   │   │   ├── review/          # Practice & results
│   │   │   │   └── myCourses/       # Enrolled courses
│   │   │   ├── admin/               # Admin panel
│   │   │   └── ...                  # Other pages
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI components (40+)
│   │   │   └── views/               # Page-specific components
│   │   ├── lib/                     # Utilities & API client
│   │   └── hooks/                   # Custom React hooks
│   ├── public/                      # Static assets
│   └── package.json
│
├── server/                          # Backend API
│   ├── src/
│   │   ├── models/                  # Database models
│   │   │   ├── Grammar/             # 26 grammar topic models
│   │   │   ├── VerbTenses/          # 14 verb tense models
│   │   │   ├── Vocabulary/          # 32 vocabulary models
│   │   │   └── User.js              # User model
│   │   ├── controllers/             # Route handlers
│   │   ├── services/                # Business logic
│   │   ├── repositories/            # Data access layer
│   │   ├── middlewares/             # Auth & validation
│   │   ├── config/                  # Configuration
│   │   └── utils/                   # Constants & utilities
│   ├── server.js                    # Entry point
│   └── package.json
│
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later
- **npm** or **yarn** package manager
- **MongoDB** 6.0 or later (local installation or MongoDB Atlas account)

### Installation & Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd study-english
```

#### 2. Set Up the Backend (Server)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and configure:
# - MongoDB connection string
# - JWT secrets
# - Server port (default: 4000)
```

**Server Environment Variables** (`.env`):

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/study-english
# JWT Secrets - Use strong, unique values (32+ characters recommended)
JWT_SECRET=your_strong_secret_key_here_for_access_tokens
REFRESH_SECRET=your_strong_refresh_key_here_different_from_above
# Token Expiration Times
JWT_ACCESS_EXPIRES_IN=15m  # Access token lifetime
JWT_REFRESH_EXPIRES_IN=7d  # Refresh token lifetime
CLIENT_URL=http://localhost:3000
```

**Note**: The `JWT_SECRET` and `REFRESH_SECRET` should be different values. The access token expires in 15 minutes, but users stay logged in for 7 days via the refresh token mechanism.

```bash
# Start the server
npm run dev
```

Server will run on `http://localhost:4000`

#### 3. Set Up the Frontend (Client)

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local and configure API URL
```

**Client Environment Variables** (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url (optional)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key (optional)
```

```bash
# Start the development server
npm run dev
```

Client will run on `http://localhost:3000`

#### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000/api](http://localhost:4000/api)

### 5. Create Admin Account (Optional)

To access admin features, you can manually create an admin user in MongoDB or register a user and update their role:

```javascript
// In MongoDB shell or Compass
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

## 📚 Features

### User Features

#### Authentication & Profile

- Secure user registration and login
- JWT-based authentication with automatic token refresh
- Seamless session management - users stay logged in as long as refresh token is valid
- Automatic token renewal when access token expires (no logout required)
- User profile management
- Password encryption with bcrypt

#### Learning Dashboard

- Personalized learning dashboard
- Progress tracking and analytics
- Visual statistics with charts
- Course enrollment management

#### Review System

- **72+ Topics** organized in three categories:
  - **Grammar** (26 topics): Nouns, Verbs, Adjectives, Conditionals, Passive Voice, etc.
  - **Vocabulary** (32 topics): Family, Jobs, Technology, Travel, Health, etc.
  - **Verb Tenses** (14 topics): All present, past, and future tenses
- Random question selection (20 per session)
- Detailed explanations for each answer
- Practice mode with instant feedback
- Results tracking and review

#### Exam Preparation

- IELTS practice tests
- TOEIC practice tests
- Timed exam simulations
- Performance analytics

#### Course Management

- Browse available courses
- Enroll in courses
- Track course progress
- Access course materials

### Admin Features

- User management (view, edit, delete users)
- Content management (add/edit/delete questions)
- Topic management
- System analytics
- Role assignment (user, moderator, admin)

### Technical Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode**: Theme switching support
- **Real-time Updates**: Instant feedback and updates
- **Secure API**: Protected endpoints with middleware
- **Automatic Token Refresh**: Seamless token renewal without user interruption
- **Request Queue Management**: Handles concurrent requests during token refresh
- **Optimized Performance**: Efficient database queries
- **Error Handling**: Comprehensive error management
- **Validation**: Client and server-side validation

## 🎯 API Documentation

### Main Endpoints

#### Authentication

- `POST /api/auth` - User login (returns access & refresh tokens in cookies)
- `POST /api/auth/logout` - User logout (clears cookies)
- `GET /api/auth/check` - Check authentication status & refresh tokens
  - Automatically refreshes tokens if access token expired but refresh token valid
  - Returns new tokens in cookies if refresh was successful
  - Returns 401 if both tokens expired

#### Users

- `POST /api/users` - Register new user
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

#### Review/Practice

- `GET /api/review?topic={topic}` - Get 20 random questions
- `GET /api/review/topics` - Get all available topics (admin only)
- `GET /api/review/quantity?topic={topic}` - Get question count
- `POST /api/review` - Add new question (admin only)
- `DELETE /api/review/:id` - Delete question (admin only)

For detailed API documentation with examples, see [Server API Documentation](./server/API_EXAMPLES.md)

## 📖 Documentation

- **[Client Documentation](./client/README.md)** - Frontend setup, components, and features
- **[Server Documentation](./server/README.md)** - Backend setup, API, and architecture
- **[API Examples](./server/API_EXAMPLES.md)** - Detailed API usage examples

## 🔐 Security

### Authentication Flow

1. User logs in with email and password
2. Server validates credentials and generates JWT tokens:
   - **Access Token**: Short-lived (15 minutes) for API requests
   - **Refresh Token**: Long-lived (7 days) for token renewal
3. Both tokens stored in HTTP-only cookies (XSS protection)
4. **Automatic Token Refresh System**:
   - When access token expires, client detects 401 error
   - Client automatically calls `/api/auth/check` endpoint
   - Server validates refresh token:
     - ✅ If refresh token is valid: generates new access & refresh tokens, continues request
     - ❌ If refresh token is expired: returns 401, client redirects to login
   - All pending requests are queued and retried after token refresh
   - User experiences no interruption - stays logged in seamlessly
5. Protected routes require valid authentication
6. Server-side middleware automatically refreshes tokens on expired access tokens

### Token Refresh Mechanism

#### Client-Side (Automatic)

- **Axios Interceptor**: Monitors all API responses for 401 errors
- **Automatic Refresh**: When 401 detected, automatically calls `/api/auth/check`
- **Request Queue**: Concurrent requests wait for token refresh to complete
- **Seamless UX**: User never sees "session expired" - tokens refresh in background
- **Logout on Failure**: Only redirects to login if refresh token is also expired

#### Server-Side (Middleware)

- **Auth Middleware**: Checks access token on protected routes
- **Automatic Refresh**: If access token expired but refresh token valid:
  - Generates new access token
  - Generates new refresh token
  - Sets both in HTTP-only cookies
  - Continues request without error
- **Fallback**: Returns 401 only if refresh token is also expired

#### Benefits

- 🔄 **No Manual Refresh**: Users don't need to re-login every 15 minutes
- 🔒 **Secure**: Short-lived access tokens reduce security risk
- ⚡ **Performance**: Requests are queued during refresh, preventing duplicate refresh calls
- 👤 **Better UX**: Users stay logged in for 7 days (refresh token lifetime)
- 🛡️ **Automatic Cleanup**: Expired refresh tokens automatically log users out

### Security Measures

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication with dual-token system
- ✅ HTTP-only cookies (XSS prevention)
- ✅ Automatic token refresh with secure cookie renewal
- ✅ CORS configuration
- ✅ Secure cookie settings in production (HTTPS only)
- ✅ SameSite cookie policy (CSRF prevention)
- ✅ Input validation and sanitization
- ✅ Role-based access control
- ✅ Request queue management to prevent token refresh loops

## 🧪 Testing

### Backend Testing

```bash
cd server
npm test
```

### Frontend Testing

```bash
cd client
npm test
```

### Linting

```bash
# Server
cd server
npm run lint

# Client
cd client
npm run lint
```

## 🚀 Deployment

### Production Build

#### Server

```bash
cd server
npm start
```

#### Client

```bash
cd client
npm run build
npm run start
```

### Deployment Platforms

**Recommended Platforms:**

- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Database**: MongoDB Atlas

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Configure production MongoDB connection
- [ ] Enable HTTPS/SSL
- [ ] Set up proper CORS configuration
- [ ] Configure environment variables securely
- [ ] Enable rate limiting
- [ ] Set up logging and monitoring
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up automated backups
- [ ] Configure CDN for static assets

## 📊 Database Schema

### User Collection

```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  role: String (user|admin|moderator),
  status: String (active|inactive|suspended),
  avatar_url: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Question Collections (72 topics)

```javascript
{
  question: String (required),
  answers: Array<String> (2-6 items),
  correctAnswer: Number (0-based index),
  explanation: String (required),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 UI Components

The client uses 40+ reusable UI components including:

- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch
- **Navigation**: Menu, Breadcrumb, Pagination, Tabs
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Sheet, Drawer, Popover, Tooltip
- **Display**: Card, Table, Chart, Badge, Avatar, Accordion
- **Utilities**: Button, Calendar, Command Palette, Carousel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code structure and naming conventions
- Use TypeScript for type safety (client)
- Use ES6+ features (server)
- Write clean, readable code with comments
- Test your changes thoroughly
- Update documentation as needed

## 📝 Scripts

### Server Scripts

```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Client Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection

**Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::4000
```

- Change PORT in `.env` or kill the process using the port

**CORS Error**

```
Access-Control-Allow-Origin error
```

- Verify `CLIENT_URL` in server `.env` matches frontend URL

**JWT Error**

```
Error: secretOrPrivateKey must have a value
```

- Set `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` in server `.env`

**Token Refresh Issues**

```
401 Unauthorized on every request after 15 minutes
```

- Verify refresh token is being sent in cookies (`withCredentials: true` in axios)
- Check that `/api/auth/check` endpoint is accessible
- Ensure `JWT_REFRESH_SECRET` is set correctly in server `.env`
- Check browser console for cookie-related errors

## 📞 Support

For issues, questions, or contributions:

- Check the documentation in `/client` and `/server` directories
- Review [API_EXAMPLES.md](./server/API_EXAMPLES.md) for API usage
- Open an issue on GitHub
- Contact the development team

## 📄 License

This project is part of the Study English platform.

## 🙏 Acknowledgments

- Built with Next.js, React, Express.js, and MongoDB
- UI components from Radix UI and shadcn/ui
- Icons from Lucide React
- Charts from Recharts

## 📈 Roadmap

### Upcoming Features

- [ ] Real-time multiplayer quizzes
- [ ] Voice recognition for pronunciation practice
- [ ] AI-powered personalized learning paths
- [ ] Mobile apps (iOS & Android)
- [ ] Gamification and achievements system
- [ ] Social features (study groups, friends)
- [ ] Advanced analytics dashboard
- [ ] Video lessons integration
- [ ] Certificate generation
- [ ] Payment integration for premium features

## 📸 Screenshots

### Landing Page

Modern, responsive landing page with hero section, features, courses, and pricing.

### Dashboard

Personalized learning dashboard with progress tracking and quick access to all features.

### Practice Mode

Interactive practice sessions with instant feedback and detailed explanations.

### Exam Preparation

Dedicated sections for IELTS and TOEIC exam practice with timed tests.

---

**Built with ❤️ by the Study English Team**

**Tech Stack**: Next.js • React • TypeScript • TailwindCSS • Express.js • MongoDB • Node.js
