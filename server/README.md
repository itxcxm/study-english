# Study English - Server

A robust Express.js backend API for the Study English platform, providing authentication, user management, and an extensive question bank for English learning covering grammar, vocabulary, and verb tenses.

## 🌟 Features

### Core Features

- **RESTful API**: Well-structured API endpoints following REST principles
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **User Management**: Complete CRUD operations for user accounts
- **Role-Based Access**: Admin, moderator, and user roles with appropriate permissions
- **Review System**: Extensive question bank with 70+ topics
- **Database Integration**: MongoDB with Mongoose ODM
- **CORS Support**: Configured for cross-origin requests
- **Security**: HTTP-only cookies, bcrypt password hashing, JWT token rotation

### Question Bank

- **Grammar Topics**: 26 comprehensive grammar categories
- **Vocabulary Topics**: 32 real-world vocabulary themes
- **Verb Tenses**: 14 different verb tense categories
- **Random Selection**: Intelligent random question selection
- **Active Management**: Enable/disable questions without deletion

## 🛠️ Tech Stack

### Core

- **Express** 5.1.0 - Web framework
- **Node.js** - Runtime environment (ES Modules)
- **MongoDB** - NoSQL database
- **Mongoose** 8.19.1 - MongoDB ODM

### Security & Authentication

- **jsonwebtoken** 9.0.2 - JWT token generation and verification
- **bcrypt** 6.0.0 - Password hashing
- **cookie-parser** 1.4.7 - Cookie handling
- **cors** 2.8.5 - CORS middleware

### Development

- **dotenv** 16.6.1 - Environment variable management
- **nodemon** 3.1.10 - Development auto-reload

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   │
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── index.js             # Model aggregator
│   │   │
│   │   ├── Grammar/             # 26 Grammar models
│   │   │   ├── index.js
│   │   │   ├── Adjectives.js
│   │   │   ├── Adverbs.js
│   │   │   ├── Nouns.js
│   │   │   ├── Pronouns.js
│   │   │   ├── Verbs.js
│   │   │   ├── Prepositions.js
│   │   │   ├── Conjunctions.js
│   │   │   ├── Articles.js
│   │   │   ├── Conditionals.js
│   │   │   ├── PassiveVoice.js
│   │   │   ├── ReportedSpeech.js
│   │   │   ├── Questions.js
│   │   │   ├── Negation.js
│   │   │   ├── Comparisons.js
│   │   │   ├── Emphasis.js
│   │   │   ├── Subjunctive.js
│   │   │   ├── RelativeClauses.js
│   │   │   ├── NounClauses.js
│   │   │   ├── AdverbialClauses.js
│   │   │   ├── Inversion.js
│   │   │   ├── CleftSentences.js
│   │   │   ├── Existential.js
│   │   │   ├── UsedTo.js
│   │   │   ├── WishIfOnly.js
│   │   │   └── OtherVerbTenses.js
│   │   │
│   │   ├── VerbTenses/          # 14 Verb Tense models
│   │   │   ├── index.js
│   │   │   ├── PresentSimple.js
│   │   │   ├── PresentContinuous.js
│   │   │   ├── PresentPerfect.js
│   │   │   ├── PresentPerfectContinuous.js
│   │   │   ├── PastSimple.js
│   │   │   ├── PastContinuous.js
│   │   │   ├── PastPerfect.js
│   │   │   ├── PastPerfectContinuous.js
│   │   │   ├── FutureSimple.js
│   │   │   ├── FutureContinuous.js
│   │   │   ├── FuturePerfect.js
│   │   │   ├── FuturePerfectContinuous.js
│   │   │   └── OtherVerbTenses.js
│   │   │
│   │   └── Vocabulary/          # 32 Vocabulary models
│   │       ├── index.js
│   │       ├── Family.js
│   │       ├── Relationships.js
│   │       ├── Education.js
│   │       ├── Jobs.js
│   │       ├── Weather.js
│   │       ├── Time.js
│   │       ├── DatesSeasons.js
│   │       ├── Colors.js
│   │       ├── Numbers.js
│   │       ├── Animals.js
│   │       ├── FoodDrinks.js
│   │       ├── VegetablesFruits.js
│   │       ├── Clothing.js
│   │       ├── House.js
│   │       ├── SchoolSupplies.js
│   │       ├── Transportation.js
│   │       ├── Travel.js
│   │       ├── Health.js
│   │       ├── Emotions.js
│   │       ├── Technology.js
│   │       ├── Sports.js
│   │       ├── ArtMusic.js
│   │       ├── Entertainment.js
│   │       ├── Nature.js
│   │       ├── PlantsFlowers.js
│   │       ├── Places.js
│   │       ├── ShoppingMoney.js
│   │       ├── Festivals.js
│   │       ├── Shapes.js
│   │       ├── VerbsActions.js
│   │       └── OtherVocabulary.js
│   │
│   ├── controllers/
│   │   ├── index.js             # Controller exports
│   │   ├── authController.js    # Authentication endpoints
│   │   ├── userController.js    # User management endpoints
│   │   └── reviewController.js  # Review/practice endpoints
│   │
│   ├── services/
│   │   ├── authService.js       # Authentication business logic
│   │   ├── jwtService.js        # JWT token management
│   │   ├── userService.js       # User business logic
│   │   └── reviewServices.js    # Review business logic
│   │
│   ├── repositories/
│   │   ├── baseRepository.js    # Base repository pattern
│   │   ├── authRepository.js    # Auth data access
│   │   ├── jwtRepository.js     # JWT data access
│   │   ├── userRepository.js    # User data access
│   │   └── reviewRepositories.js # Review data access
│   │
│   ├── middlewares/
│   │   ├── index.js             # Middleware exports
│   │   ├── auth.js              # Authentication middleware
│   │   └── validation.js        # Validation middleware
│   │
│   ├── utils/
│   │   └── constants.js         # Application constants
│   │
│   └── app.js                   # Express app configuration
│
├── server.js                    # Server entry point
├── package.json                 # Dependencies
├── API_EXAMPLES.md              # API documentation
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **MongoDB** 6.0 or later (local or cloud instance)
- **npm** or **yarn** package manager

### Installation

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**

   Create a `.env` file in the server directory:

   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/study-english

   # JWT Secrets (use strong, random strings in production)
   JWT_SECRET=your_access_token_secret_key_here
   REFRESH_SECRET=your_refresh_token_secret_key_here

   # CORS
   CLIENT_URL=http://localhost:3000
   ```

   **Note**: The `JWT_SECRET` and `REFRESH_SECRET` should be different values. Access token cookies expire in 15 minutes, and refresh token cookies expire in 7 days.

4. **Start MongoDB**

   Make sure MongoDB is running:

   ```bash
   # If using local MongoDB
   mongod

   # Or use MongoDB Atlas cloud database
   # Update MONGODB_URI in .env with your Atlas connection string
   ```

5. **Run the server**

   Development mode (with auto-reload):

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Production mode:

   ```bash
   npm start
   # or
   yarn start
   ```

6. **Verify server is running**

   You should see:

   ```
   🚀 Server running on port 4000
   📱 API available at http://localhost:4000
   MongoDB connected successfully
   ```

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint           | Description       | Auth Required |
| ------ | ------------------ | ----------------- | ------------- |
| POST   | `/api/auth`        | User login        | No            |
| POST   | `/api/auth/logout` | User logout       | No            |
| GET    | `/api/auth/check`  | Check auth status | No            |

### Users (`/api/users`)

| Method | Endpoint         | Description       | Auth Required |
| ------ | ---------------- | ----------------- | ------------- |
| POST   | `/api/users`     | Register new user | No            |
| GET    | `/api/users`     | Get all users     | Yes (Admin)   |
| GET    | `/api/users/:id` | Get user by ID    | Yes           |
| PUT    | `/api/users/:id` | Update user       | Yes           |
| DELETE | `/api/users/:id` | Delete user       | Yes (Admin)   |

### Review (`/api/review`)

| Method | Endpoint                             | Description             | Auth Required |
| ------ | ------------------------------------ | ----------------------- | ------------- |
| GET    | `/api/review?topic={topic}`          | Get 20 random questions | Yes           |
| GET    | `/api/review/topics`                 | Get available topics    | Yes (Admin)   |
| GET    | `/api/review/quantity?topic={topic}` | Get question count      | Yes           |
| POST   | `/api/review`                        | Add new question        | Yes (Admin)   |
| PUT    | `/api/review/:id`                    | Update question         | Yes (Admin)   |
| DELETE | `/api/review/:id?topic={topic}`      | Delete question         | Yes (Admin)   |

For detailed API documentation with examples, see [API_EXAMPLES.md](./API_EXAMPLES.md)

## 🗄️ Database Models

### User Schema

```javascript
{
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: ['user', 'admin', 'moderator'], default: 'user'),
  status: String (enum: ['active', 'inactive', 'suspended'], default: 'active'),
  avatar_url: String,
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Question Schema (All Topics)

```javascript
{
  question: String (required),
  answers: [String] (2-6 items required),
  correctAnswer: Number (0-based index, required),
  explanation: String (required),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔐 Authentication Flow

### Login Process

1. User submits email and password
2. Server validates credentials
3. Server generates access token (15 min) and refresh token (7 days)
4. Tokens stored in HTTP-only cookies
5. Client receives success response

### Token Refresh

1. Access token expires after 15 minutes
2. Client makes request with expired access token
3. Server validates refresh token
4. Server generates new token pair
5. New tokens set in cookies

### Cookie Configuration

```javascript
{
  httpOnly: true,              // Prevents XSS attacks
  secure: true (production),   // HTTPS only in production
  sameSite: 'Strict',          // CSRF protection
  maxAge: 15m (access) / 7d (refresh)
}
```

## 🎯 Review System

### Topics Organization

**Vocabulary (32 topics)**

- Daily Life: Family, Relationships, Education, Jobs
- Nature: Animals, Weather, Nature, PlantsFlowers
- Objects: Clothing, House, SchoolSupplies, Transportation
- Food: FoodDrinks, VegetablesFruits
- Activities: Sports, Entertainment, Travel, ArtMusic
- Others: Technology, Health, Emotions, Colors, Numbers, Time, etc.

**Grammar (26 topics)**

- Parts of Speech: Nouns, Pronouns, Adjectives, Adverbs, Verbs
- Connectors: Prepositions, Conjunctions, Articles
- Structures: Conditionals, PassiveVoice, ReportedSpeech, Questions
- Advanced: Inversion, CleftSentences, Subjunctive, Emphasis
- Clauses: RelativeClauses, NounClauses, AdverbialClauses

**Verb Tenses (14 topics)**

- Present: Simple, Continuous, Perfect, Perfect Continuous
- Past: Simple, Continuous, Perfect, Perfect Continuous
- Future: Simple, Continuous, Perfect, Perfect Continuous
- Other Tenses

### Question Retrieval

- Random selection of 20 questions per request
- Only active questions are returned (`isActive: true`)
- Efficient MongoDB aggregation pipeline
- Support for all 72 topics

## 🏗️ Architecture Pattern

### Layered Architecture

```
Controller Layer (HTTP handling)
    ↓
Service Layer (Business logic)
    ↓
Repository Layer (Data access)
    ↓
Model Layer (Database schema)
```

### Benefits

- **Separation of Concerns**: Each layer has a specific responsibility
- **Testability**: Easy to unit test each layer independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features following the same pattern

## 🛡️ Security Features

### Password Security

- Bcrypt hashing with salt rounds
- Passwords never stored in plain text
- Secure password comparison

### JWT Security

- Separate secrets for access and refresh tokens
- Short-lived access tokens (15 minutes)
- Longer-lived refresh tokens (7 days)
- Token rotation on refresh

### HTTP Security

- HTTP-only cookies (prevents XSS)
- CORS configuration
- Secure cookies in production (HTTPS)
- SameSite cookie policy (prevents CSRF)

### Middleware Protection

- `authMiddleware`: Validates JWT tokens
- `adminMiddleware`: Restricts admin-only endpoints
- Request validation and sanitization

## 📊 Constants & Configuration

### HTTP Status Codes

```javascript
HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
```

### JWT Configuration

```javascript
JWT_CONFIG = {
  ACCESS_EXPIRES_IN: "15m",
  REFRESH_EXPIRES_IN: "7d",
  ACCESS_COOKIE_MAX_AGE: 15 * 60 * 1000, // 15 minutes
  REFRESH_COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
};
```

## 🧪 Testing the API

### Using cURL

**Login:**

```bash
curl -X POST http://localhost:4000/api/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  -c cookies.txt
```

**Get Questions:**

```bash
curl -X GET "http://localhost:4000/api/review?topic=Adjectives" \
  -b cookies.txt
```

### Using Postman/Insomnia

1. Import the API collection
2. Set base URL to `http://localhost:4000`
3. Enable cookie handling for authentication
4. Follow examples in `API_EXAMPLES.md`

## 🔧 Development

### Adding a New Topic

1. **Create Model** (`src/models/Category/NewTopic.js`):

```javascript
import mongoose from "mongoose";
const { Schema } = mongoose;

const newTopicSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answers: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v && v.length >= 2 && v.length <= 6,
        message: "Answers must contain between 2 and 6 options",
      },
    },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const NewTopic = mongoose.model("NewTopic", newTopicSchema);
export { NewTopic };
```

2. **Export in Category Index** (`src/models/Category/index.js`):

```javascript
export * from "./NewTopic.js";
```

3. **Register in Main Index** (`src/models/index.js`):

```javascript
import { NewTopic } from "./Category/index.js";

const models = {
  // ... existing models
  NewTopic,
};
```

4. **Use in Repository/Service**:

```javascript
const model = models[topic]; // 'NewTopic'
```

### Error Handling

All endpoints follow a consistent error response format:

```javascript
{
  success: false,
  message: "Error description"
}
```

## 📈 Performance Optimization

- **Database Indexing**: Indexes on frequently queried fields
- **Connection Pooling**: MongoDB connection pool management
- **Efficient Queries**: Mongoose aggregation for complex operations
- **Caching Strategy**: Consider implementing Redis for frequently accessed data

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production` in environment
- [ ] Use strong, unique JWT secrets
- [ ] Configure MongoDB Atlas or production database
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Set up environment variables securely
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting (recommended)
- [ ] Set up logging (Winston, Morgan, etc.)
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up monitoring (PM2, New Relic, etc.)

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/study-english
JWT_SECRET=strong_random_secret_32_chars_min
REFRESH_SECRET=different_strong_secret_32_chars_min
CLIENT_URL=https://yourdomain.com
```

### Deployment Platforms

- **Heroku**: Easy deployment with MongoDB Atlas
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2, Elastic Beanstalk, or ECS
- **Google Cloud**: Cloud Run or App Engine
- **Railway**: Simple deployment with auto-scaling
- **Render**: Free tier with PostgreSQL/MongoDB

## 🤝 Contributing

1. Follow the existing layered architecture
2. Maintain consistent error handling
3. Use ES Modules (import/export)
4. Comment complex business logic
5. Update API documentation when adding endpoints
6. Test all endpoints before committing

## 📝 Code Style

- Use ES6+ features
- Async/await for asynchronous operations
- Consistent naming conventions:
  - Controllers: `XxxController`
  - Services: `XxxService`
  - Repositories: `XxxRepository`
- JSDoc comments for complex functions
- Descriptive variable and function names

## 🐛 Common Issues

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running locally or check your `MONGODB_URI`

### JWT Error

```
Error: secretOrPrivateKey must have a value
```

**Solution**: Set `JWT_SECRET` and `REFRESH_SECRET` in `.env`

### CORS Error

```
Access-Control-Allow-Origin error
```

**Solution**: Verify `CLIENT_URL` in `.env` matches your frontend URL

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 📄 License

This project is part of the Study English platform.

## 🔗 Related

- [Client Documentation](../client/README.md)
- [API Examples](./API_EXAMPLES.md)

## 📞 Support

For issues or questions:

- Check the [API_EXAMPLES.md](./API_EXAMPLES.md) for usage examples
- Review the code documentation
- Contact the development team

---

**Built with ❤️ using Express.js, MongoDB, and Node.js**
