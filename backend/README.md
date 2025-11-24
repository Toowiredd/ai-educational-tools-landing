# AI Educational Tools - Backend API

RESTful API backend for AI Educational Tools platform built with Express.js, TypeScript, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Express.js 4.18
- **Language:** TypeScript 5.3
- **Database:** PostgreSQL 15+ (via Drizzle ORM)
- **Cache:** Redis 7+
- **AI:** Anthropic Claude / OpenAI GPT-4
- **Real-time:** Socket.IO
- **Validation:** Zod
- **Authentication:** JWT + bcrypt

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration and environment variables
│   ├── db/               # Database schema and connection
│   ├── features/         # Feature-based modules
│   │   ├── auth/         # Authentication (register, login, JWT)
│   │   ├── tutors/       # AI Tutoring feature
│   │   ├── classrooms/   # Smart Classrooms feature
│   │   └── learning/     # Adaptive Learning feature
│   ├── middleware/       # Express middleware (auth, validation, errors)
│   ├── utils/            # Utility functions
│   └── index.ts          # Server entry point
├── drizzle.config.ts     # Drizzle ORM configuration
├── docker-compose.dev.yml # Local development database
├── package.json
└── tsconfig.json
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker (for local PostgreSQL and Redis)
- Anthropic or OpenAI API key

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start local database**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Server runs on http://localhost:8080

## Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Run production server
npm test             # Run tests
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Drizzle Studio (database GUI)
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## API Endpoints

### Authentication

```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
POST   /api/auth/refresh      - Refresh access token
POST   /api/auth/logout       - Logout user
GET    /api/auth/me           - Get current user (protected)
```

### Health Check

```
GET    /health                - Server health status
```

## Environment Variables

Required variables in `.env`:

```env
# Server
NODE_ENV=development
PORT=8080
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_edu_tools
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# AI Provider
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your-api-key-here
```

See `.env.example` for full configuration options.

## Database

### Schema

Complete database schema includes:
- Users & Authentication
- AI Tutoring Sessions
- Smart Classrooms
- Adaptive Learning Paths
- Analytics

### Migrations

```bash
# Generate migration
npm run db:generate

# Push schema to database
npm run db:push

# View database (GUI)
npm run db:studio
```

## Authentication

JWT-based authentication with refresh tokens:

1. **Register** → Returns access + refresh tokens
2. **Login** → Returns access + refresh tokens
3. **Protected routes** → Require `Authorization: Bearer <token>` header
4. **Refresh** → Exchange refresh token for new access token

## Development

### Adding New Feature

1. Create feature directory in `src/features/`
2. Add controllers, services, routes, schemas
3. Export routes in main `index.ts`
4. Add database tables in `src/db/schema.ts`

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier configured
- Follow existing patterns in `features/auth/`

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use production database (Neon, Supabase, etc.)
- [ ] Set strong JWT secrets (32+ chars)
- [ ] Configure CORS for your frontend URL
- [ ] Set up SSL/HTTPS
- [ ] Enable rate limiting
- [ ] Configure logging
- [ ] Set up error monitoring (Sentry, etc.)

### Deploy to Railway

```bash
railway login
railway init
railway add --plugin postgresql
railway up
```

### Deploy to Render

1. Connect GitHub repo
2. Select `backend` directory
3. Set environment variables
4. Deploy

See `QUICK_START_GUIDE.md` for detailed deployment instructions.

## Security

- Helmet.js for security headers
- Rate limiting on all API routes
- JWT token expiration
- Password hashing with bcrypt (12 rounds)
- Input validation with Zod
- SQL injection prevention (Drizzle ORM)
- CORS configuration

## Performance

- Compression middleware
- Redis caching (ready for implementation)
- Database connection pooling
- Efficient queries with Drizzle ORM

## Troubleshooting

See `QUICK_START_GUIDE.md` troubleshooting section.

## Contributing

See main `CONTRIBUTING.md` in project root.

## License

[To be determined]
