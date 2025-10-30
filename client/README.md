# Study English - Client

A modern, responsive Next.js web application for learning English, featuring interactive courses, practice tests, and comprehensive review systems for vocabulary, grammar, and verb tenses.

## 🌟 Features

### Core Features

- **User Authentication**: Secure login/register system with JWT-based authentication
- **Dashboard**: Personalized learning dashboard with progress tracking
- **Review System**: Interactive practice questions across multiple topics
  - Grammar topics (Adjectives, Verbs, Prepositions, etc.)
  - Vocabulary topics (Family, Animals, Food, Technology, etc.)
  - Verb Tenses (Present, Past, Future in all forms)
- **Exam Practice**: Dedicated sections for IELTS and TOEIC exam preparation
- **Course Management**: Browse and enroll in available courses
- **User Profile**: Manage personal information and track learning progress
- **Admin Panel**: Administrative features for content management

### User Interface

- **Modern Design**: Clean, professional UI built with TailwindCSS
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Component Library**: Extensive UI components from Radix UI
- **Dark Mode Support**: Theme switching capability with next-themes
- **Charts & Analytics**: Visual progress tracking with Recharts

## 🛠️ Tech Stack

### Framework & Core

- **Next.js** 15.5.4 - React framework with App Router
- **React** 19.2.0 - UI library
- **TypeScript** 5.2.2 - Type safety

### Styling & UI

- **TailwindCSS** 3.3.3 - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants
- **tailwind-merge** - Tailwind class merging

### State & Forms

- **React Hook Form** 7.53.0 - Form management
- **Zod** 3.23.8 - Schema validation
- **@hookform/resolvers** - Form validation integration

### Data & API

- **Axios** 1.12.2 - HTTP client
- **Supabase** 2.58.0 - Backend services
- **jose** 6.1.0 - JWT handling

### UI Components

- Charts: **Recharts** 2.12.7
- Calendar: **react-day-picker** 9.0.0
- Carousel: **embla-carousel-react** 8.3.0
- Toast: **Sonner** 1.5.0
- Command Palette: **cmdk** 1.0.0
- Date utilities: **date-fns** 3.6.0

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (account)/          # Account routes
│   │   │   └── profile/        # User profile page
│   │   ├── (user)/             # User authentication
│   │   │   ├── login/          # Login page
│   │   │   └── register/       # Registration page
│   │   ├── about/              # About page
│   │   ├── admin/              # Admin panel
│   │   ├── courses/            # Courses listing
│   │   ├── dashboard/          # Main dashboard
│   │   │   ├── exam/           # Exam practice
│   │   │   │   ├── ielts/      # IELTS practice
│   │   │   │   └── toeic/      # TOEIC practice
│   │   │   ├── myCourses/      # Enrolled courses
│   │   │   ├── payment/        # Payment handling
│   │   │   └── review/         # Review & practice
│   │   │       ├── practice/   # Practice mode
│   │   │       └── result/     # Results page
│   │   ├── introduce/          # Introduction page
│   │   ├── practiceTest/       # Practice tests
│   │   ├── pricing/            # Pricing plans
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (30+ components)
│   │   │
│   │   └── views/              # Page-specific components
│   │       ├── Header.tsx      # Main header
│   │       ├── HeaderDash.tsx  # Dashboard header
│   │       ├── Hero.tsx        # Landing hero section
│   │       ├── Courses.tsx     # Courses section
│   │       ├── Features.tsx    # Features showcase
│   │       ├── Pricing.tsx     # Pricing section
│   │       └── Footer.tsx      # Footer component
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── api.ts              # Axios API client
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── supabase.ts         # Supabase client
│   │   ├── practice-data.ts    # Practice data helpers
│   │   └── utils.ts            # General utilities
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── use-toast.ts        # Toast notifications
│   │
│   └── middleware.ts           # Next.js middleware
│
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies

```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- Backend server running (see server README)

### Installation

1. **Clone the repository**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the client directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:4000/api

   # Supabase Configuration (if using Supabase features)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Linting

```bash
npm run lint
```

## 📱 Pages & Routes

### Public Pages

- `/` - Landing page with hero, features, courses, and pricing
- `/about` - About the platform
- `/courses` - Available courses listing
- `/introduce` - Platform introduction
- `/pricing` - Pricing plans
- `/practiceTest` - Public practice tests

### Authentication

- `/login` - User login
- `/register` - User registration

### Protected Routes (Dashboard)

- `/dashboard` - Main dashboard
- `/dashboard/exam` - Exam practice hub
  - `/dashboard/exam/ielts` - IELTS practice
  - `/dashboard/exam/toeic` - TOEIC practice
- `/dashboard/myCourses` - User's enrolled courses
- `/dashboard/review` - Review system
  - `/dashboard/review/practice` - Practice mode
  - `/dashboard/review/result` - Results and analytics
- `/dashboard/payment` - Payment processing

### User Account

- `/profile` - User profile management

### Admin

- `/admin` - Admin panel (restricted to admin users)

## 🎨 UI Components

The application uses a comprehensive set of UI components built with Radix UI primitives:

### Layout Components

- **Card** - Container with header, content, and footer
- **Separator** - Visual divider
- **Aspect Ratio** - Maintain aspect ratios
- **Resizable** - Resizable panels

### Navigation

- **Navigation Menu** - Main navigation
- **Breadcrumb** - Page hierarchy
- **Menubar** - Menu bar with dropdowns
- **Pagination** - Page navigation

### Forms & Inputs

- **Form** - Form wrapper with validation
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Toggle option
- **Radio Group** - Multiple choice selection
- **Switch** - On/off toggle
- **Slider** - Range input
- **Calendar** - Date picker
- **Input OTP** - One-time password input

### Feedback

- **Alert** - Important messages
- **Alert Dialog** - Confirmation dialogs
- **Toast** - Notifications (via Sonner)
- **Progress** - Progress indicator
- **Skeleton** - Loading placeholder

### Overlays

- **Dialog** - Modal dialogs
- **Sheet** - Side panels
- **Drawer** - Mobile-friendly drawer (via Vaul)
- **Popover** - Popup content
- **Tooltip** - Hover information
- **Hover Card** - Rich hover content
- **Context Menu** - Right-click menu
- **Dropdown Menu** - Action menus

### Display

- **Accordion** - Collapsible sections
- **Collapsible** - Toggle content visibility
- **Tabs** - Tabbed interface
- **Badge** - Status indicators
- **Avatar** - User avatars
- **Table** - Data tables
- **Chart** - Data visualization (Recharts)
- **Carousel** - Image/content slider

### Utilities

- **Command** - Command palette (cmdk)
- **Scroll Area** - Custom scrollbars
- **Toggle** - Toggle button
- **Toggle Group** - Multiple toggles
- **Label** - Form labels
- **Button** - Interactive buttons

## 🔐 Authentication

The application uses JWT-based authentication with HTTP-only cookies:

- **Access Token**: Short-lived (15 minutes), stored in HTTP-only cookie
- **Refresh Token**: Long-lived (7 days), used to refresh access tokens
- **Auto-refresh**: Tokens are automatically refreshed when expired
- **Protected Routes**: Middleware guards authenticated routes

## 🌐 API Integration

API calls are made using Axios with the following configuration:

```typescript
// Base URL from environment or default
baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Credentials enabled for cookies
withCredentials: true;
```

### API Endpoints Used

- `POST /api/auth` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `POST /api/users` - User registration
- `GET /api/review?topic={topic}` - Get review questions
- `GET /api/review/topics` - Get available topics
- `POST /api/review` - Add new question (admin)

## 📊 Review System Topics

### Vocabulary (32 topics)

Family, Relationships, Education, Jobs, Weather, Time, DatesSeasons, Colors, Numbers, Animals, FoodDrinks, VegetablesFruits, Clothing, House, SchoolSupplies, Transportation, Travel, Health, Emotions, Technology, Sports, ArtMusic, Entertainment, Nature, PlantsFlowers, Places, ShoppingMoney, Festivals, Shapes, VerbsActions, OtherVocabulary

### Grammar (26 topics)

Nouns, Pronouns, Adjectives, Adverbs, Verbs, Prepositions, Conjunctions, Articles, Conditionals, PassiveVoice, ReportedSpeech, Questions, Negation, Comparisons, Emphasis, Subjunctive, RelativeClauses, NounClauses, AdverbialClauses, Inversion, CleftSentences, Existential, UsedTo, WishIfOnly, OtherVerbTenses

### Verb Tenses (14 topics)

PresentSimple, PresentContinuous, PresentPerfect, PresentPerfectContinuous, PastSimple, PastContinuous, PastPerfect, PastPerfectContinuous, FutureSimple, FutureContinuous, FuturePerfect, FuturePerfectContinuous, OtherVerbTenses

## 🎯 Key Features Implementation

### Review Practice Flow

1. User selects a topic from available topics
2. System fetches 20 random questions from the backend
3. User answers questions interactively
4. Results are displayed with explanations
5. Progress is tracked and saved

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Touch-friendly components on mobile devices
- Optimized navigation for different screen sizes

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Implement responsive design for all new features
4. Test on multiple browsers and devices
5. Use the existing UI components from `/components/ui`
6. Follow the App Router conventions for new pages

## 📝 Development Guidelines

### Code Style

- Use functional components with hooks
- Implement TypeScript interfaces for props
- Use Tailwind classes for styling
- Keep components small and focused
- Use server components where possible (Next.js 13+)

### File Naming

- Pages: `page.tsx`
- Layouts: `layout.tsx`
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)

### State Management

- Use React hooks (useState, useEffect, etc.)
- React Hook Form for form state
- Context API for shared state when needed

## 📄 License

This project is part of the Study English platform.

## 🔗 Related

- [Server Documentation](../server/README.md)
- [API Documentation](../server/API_EXAMPLES.md)

## 📞 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using Next.js, React, and TailwindCSS**
