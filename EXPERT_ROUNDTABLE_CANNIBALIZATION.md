# Mixture of Experts Roundtable - AI Educational Tools
## Accelerated Implementation Strategy via Code Cannibalization

**Date:** 2025-11-24
**Purpose:** Identify existing software, libraries, and code patterns to expedite development
**Approach:** Multi-expert analysis + open-source resource mapping

---

## Table of Contents

1. [Expert Roundtable Discussion](#expert-roundtable-discussion)
2. [Cannibalization Strategy](#cannibalization-strategy)
3. [Identified Resources by Feature](#identified-resources-by-feature)
4. [Integration Roadmap](#integration-roadmap)
5. [Risk Assessment](#risk-assessment)
6. [Accelerated Timeline](#accelerated-timeline)

---

## 1. Expert Roundtable Discussion

### 🎯 Expert Panel

**Moderator (Product Manager):** "We need to build AI Tutors, Smart Classrooms, and Adaptive Learning. Timeline: 16 weeks. Budget: Limited. What existing solutions can we leverage?"

---

### 💻 **Frontend Expert (Sarah)**

**Analysis:**
"Don't reinvent the wheel. For chat interfaces, whiteboard collaboration, and progress dashboards, there are mature React libraries we can adapt."

**Recommendations:**

**For AI Tutors Chat Interface:**
- **Cannibalize:** [ChatUI by Alibaba](https://github.com/alibaba/ChatUI) or [react-chat-widget](https://github.com/Wolox/react-chat-widget)
- **Why:** Pre-built message bubbles, typing indicators, file uploads
- **Adaptation:** Strip out unnecessary features, integrate with our AI backend

**For Smart Classrooms Whiteboard:**
- **Cannibalize:** [Excalidraw](https://github.com/excalidraw/excalidraw) (open-source, MIT license)
- **Why:** Production-ready collaborative whiteboard, 30k+ stars
- **Adaptation:** Embed as React component, connect to our WebSocket backend

**For Video Grid:**
- **Cannibalize:** [Daily.co React components](https://github.com/daily-co/daily-react) or build with native WebRTC
- **Why:** Handles complex WebRTC orchestration
- **Alternative:** Use Agora.io or 100ms SDK (free tiers available)

**For Progress Visualization:**
- **Cannibalize:** [Recharts](https://recharts.org/) + pre-built dashboard templates
- **Why:** Declarative charts, works great with React
- **Templates:** [React Admin Dashboard](https://github.com/creativetimofficial/material-dashboard-react)

**Key Libraries:**
```json
{
  "chat": "@chatscope/chat-ui-kit-react",
  "whiteboard": "@excalidraw/excalidraw",
  "video": "daily-js or @100mslive/react-sdk",
  "charts": "recharts",
  "forms": "react-hook-form + zod",
  "state": "zustand",
  "api": "@tanstack/react-query"
}
```

---

### 🔧 **Backend Expert (Marcus)**

**Analysis:**
"For authentication, real-time, and AI integration, there are battle-tested Node.js patterns and frameworks. We should use established patterns from production systems."

**Recommendations:**

**For Authentication:**
- **Cannibalize:** [node-express-boilerplate by hagopj13](https://github.com/hagopj13/node-express-boilerplate)
- **Why:** Production-ready auth with JWT, validation, error handling, tests
- **Includes:** User management, email verification, password reset, role-based access
- **Stars:** 2.3k+, actively maintained

**For Real-time (WebSocket):**
- **Cannibalize:** [Socket.IO](https://socket.io/) with Redis adapter
- **Pattern:** [Socket.IO with rooms pattern](https://socket.io/docs/v4/rooms/)
- **Why:** Handles reconnection, broadcasting, room management automatically

**For AI Integration:**
- **Cannibalize:** [Vercel AI SDK](https://github.com/vercel/ai)
- **Why:** Streaming responses, unified interface for OpenAI/Anthropic/others
- **Features:** Token streaming, function calling, prompt caching built-in

**For Database:**
- **Cannibalize:** [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) + migrations
- **Why:** TypeScript-first, zero overhead, SQL-like syntax
- **Alternative:** Prisma (heavier but better DX)

**Architecture Pattern:**
- **Cannibalize:** [Bulletproof React pattern](https://github.com/alan2207/bulletproof-react) adapted for backend
- **Structure:** Feature-based folders, clean separation of concerns

**Key Packages:**
```json
{
  "framework": "express + typescript",
  "auth": "passport-jwt + bcryptjs",
  "validation": "zod",
  "orm": "drizzle-orm",
  "realtime": "socket.io + socket.io-redis",
  "ai": "@ai-sdk/anthropic or openai",
  "queue": "bullmq (if needed)",
  "testing": "vitest + supertest"
}
```

---

### 🤖 **AI/ML Expert (Priya)**

**Analysis:**
"For adaptive learning algorithms and AI tutoring, there's significant research and open-source implementations we can adapt."

**Recommendations:**

**For Adaptive Learning Algorithm:**
- **Cannibalize:** [Knowledge Tracing algorithms from edX](https://github.com/openedx)
- **Papers to implement:** Bayesian Knowledge Tracing (BKT) or Deep Knowledge Tracing (DKT)
- **Simpler approach:** [Spaced Repetition algorithm from Anki](https://github.com/ankitects/anki)
- **Why:** Proven effectiveness, well-documented

**For AI Tutoring:**
- **Cannibalize:** [LangChain](https://github.com/langchain-ai/langchainjs) for conversation management
- **Pattern:** RAG (Retrieval Augmented Generation) for subject-specific knowledge
- **Templates:** [LangChain chat templates](https://js.langchain.com/docs/modules/chains/popular/chat_vector_db)

**For Content Generation:**
- **Cannibalize:** Prompt templates from [Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)
- **Adapt for:** Subject-specific tutoring, difficulty levels, learning styles

**For Assessment:**
- **Cannibalize:** [Item Response Theory (IRT) implementation](https://github.com/eribean/girth)
- **Why:** Adaptive testing based on student ability

**Key Approaches:**
```javascript
// Spaced Repetition (from Anki/SuperMemo)
function calculateNextReview(quality, interval, repetitions) {
  // SM-2 algorithm
  if (quality < 3) return { interval: 1, repetitions: 0 };
  if (repetitions === 0) return { interval: 1, repetitions: 1 };
  if (repetitions === 1) return { interval: 6, repetitions: 2 };
  return {
    interval: Math.round(interval * 2.5),
    repetitions: repetitions + 1
  };
}

// Knowledge Tracing (simplified BKT)
function updateMastery(prior, correct, pLearn = 0.3, pSlip = 0.1, pGuess = 0.25) {
  const pKnew = prior;
  const pCorrect = correct ? 1 : 0;
  const pKnewGivenCorrect =
    (pKnew * (1 - pSlip)) /
    (pKnew * (1 - pSlip) + (1 - pKnew) * pGuess);
  return pKnewGivenCorrect + (1 - pKnewGivenCorrect) * pLearn;
}
```

---

### 🎨 **UI/UX Expert (Jordan)**

**Analysis:**
"Educational software needs to be intuitive and engaging. There are excellent design systems and component libraries we can adopt."

**Recommendations:**

**Design System:**
- **Keep:** Chakra UI (already in project)
- **Enhance with:** [Chakra Templates](https://chakra-templates.dev/) for dashboards
- **Icons:** [Lucide React](https://lucide.dev/) (modern, consistent)

**For Gamification:**
- **Cannibalize:** [React Rewards](https://github.com/thedevelobear/react-rewards) for achievement animations
- **Pattern:** Progress bars, streaks, badges from [Duolingo's design patterns](https://design.duolingo.com/)

**For Onboarding:**
- **Cannibalize:** [React Joyride](https://github.com/gilbarbara/react-joyride) for interactive tours
- **Why:** Guide users through complex features

**For Accessibility:**
- **Cannibalize:** Chakra UI's built-in a11y + [React Aria](https://react-spectrum.adobe.com/react-aria/)
- **Testing:** [axe-core](https://github.com/dequelabs/axe-core) for automated a11y checks

---

### 🚀 **DevOps Expert (Alex)**

**Analysis:**
"For rapid deployment and scaling, containerization and managed services are key."

**Recommendations:**

**For Infrastructure:**
- **Cannibalize:** [Docker Compose template for full-stack apps](https://github.com/docker/awesome-compose/tree/master/react-express-postgresql)
- **Production:** Railway.app (easiest) or Render.com templates

**For CI/CD:**
- **Cannibalize:** [GitHub Actions workflow templates](https://github.com/actions/starter-workflows)
- **Pattern:** Build → Test → Deploy on merge to main

**For Monitoring:**
- **Free tier:** [Sentry](https://sentry.io/) for error tracking
- **Logging:** [Pino](https://github.com/pinojs/pino) (fast structured logging)
- **Metrics:** [Prometheus client](https://github.com/siimon/prom-client)

**Docker Compose Template:**
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [backend]

  backend:
    build: ./backend
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgresql://user:pass@postgres:5432/edutools
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]

  postgres:
    image: postgres:15-alpine
    volumes: [postgres-data:/var/lib/postgresql/data]
    environment:
      POSTGRES_DB: edutools
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass

  redis:
    image: redis:7-alpine
    volumes: [redis-data:/data]

volumes:
  postgres-data:
  redis-data:
```

---

### 🔒 **Security Expert (Maria)**

**Analysis:**
"Educational platforms handle sensitive student data. We need FERPA/COPPA compliance from day one."

**Recommendations:**

**For Authentication Security:**
- **Cannibalize:** [OWASP Node.js security best practices](https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices)
- **Use:** helmet.js, express-rate-limit, hpp, cors with strict config

**For Data Protection:**
- **Cannibalize:** [Node.js encryption patterns](https://github.com/fireship-io/node-crypto-examples)
- **Encrypt:** Student PII at rest using AES-256
- **Hash:** Passwords with bcrypt (cost factor 12+)

**For Input Validation:**
- **Cannibalize:** Zod schemas from [Zod examples](https://github.com/colinhacks/zod#table-of-contents)
- **Sanitize:** All user inputs (XSS prevention)

**For API Security:**
- **Rate limiting:** express-rate-limit
- **CORS:** Strict origin whitelist
- **CSP:** Content Security Policy headers

**Security Checklist:**
```javascript
// Essential security middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
```

---

### 📊 **Data Scientist (Kenji)**

**Analysis:**
"For analytics and learning insights, we need efficient data processing and visualization."

**Recommendations:**

**For Analytics Pipeline:**
- **Cannibalize:** [Apache Superset](https://github.com/apache/superset) for teacher dashboards (optional)
- **Simpler:** Pre-aggregated queries + Recharts
- **Pattern:** Event-based tracking (Mixpanel/Amplitude pattern)

**For Recommendation Engine:**
- **Cannibalize:** [Collaborative filtering algorithms](https://github.com/guymorita/recommendationRaccoon)
- **Adapted:** Content-based filtering for learning paths

**For Data Warehouse:**
- **Use:** PostgreSQL materialized views for aggregations
- **Pattern:** Daily rollup jobs for analytics

---

## 2. Cannibalization Strategy

### Priority 1: Foundation (Week 1-2)

| Component | Cannibalize From | Effort Saved | Notes |
|-----------|------------------|--------------|-------|
| **Auth System** | node-express-boilerplate | 1 week | Copy auth module, adapt schemas |
| **Database Setup** | Drizzle ORM examples | 2 days | Use their migration patterns |
| **API Structure** | Express.js best practices | 3 days | Feature-based folder structure |
| **Docker Config** | Awesome Compose templates | 1 day | Full-stack template available |

**Total Time Saved:** ~2 weeks → Reduced to 3 days

---

### Priority 2: AI Tutors (Week 3-5)

| Component | Cannibalize From | Effort Saved | Notes |
|-----------|------------------|--------------|-------|
| **Chat UI** | @chatscope/chat-ui-kit-react | 1 week | Pre-built components |
| **AI Streaming** | Vercel AI SDK | 1 week | Handles SSE/streaming |
| **LangChain Integration** | LangChain.js templates | 3 days | Conversation memory |
| **Message Storage** | Existing chat app patterns | 2 days | Standard CRUD |

**Total Time Saved:** ~3 weeks → Reduced to 1 week

---

### Priority 3: Smart Classrooms (Week 6-9)

| Component | Cannibalize From | Effort Saved | Notes |
|-----------|------------------|--------------|-------|
| **Whiteboard** | Excalidraw | 2 weeks | Embed entire library |
| **Video/Audio** | Daily.co or 100ms SDK | 2 weeks | Managed WebRTC |
| **WebSocket** | Socket.IO with rooms | 1 week | Built-in patterns |
| **Real-time Sync** | Socket.IO examples | 1 week | Canonical patterns |

**Total Time Saved:** ~6 weeks → Reduced to 2 weeks

---

### Priority 4: Adaptive Learning (Week 10-13)

| Component | Cannibalize From | Effort Saved | Notes |
|-----------|------------------|--------------|-------|
| **Spaced Repetition** | Anki algorithm | 1 week | Well-documented |
| **Progress Tracking** | Standard analytics patterns | 1 week | Event-based |
| **Recommendation** | Content-based filtering | 1 week | Simple implementation |
| **Charts/Analytics** | Recharts + templates | 3 days | Pre-built charts |

**Total Time Saved:** ~4 weeks → Reduced to 1.5 weeks

---

### **Total Timeline Reduction**

- **Original Estimate:** 16 weeks
- **With Cannibalization:** 8-10 weeks
- **Savings:** 6-8 weeks (37-50% faster)

---

## 3. Identified Resources by Feature

### 🎓 AI Tutors - Complete Resource List

#### Chat Interface
```bash
npm install @chatscope/chat-ui-kit-react
npm install react-markdown remark-gfm  # For markdown rendering
npm install katex react-katex          # For math equations
npm install prismjs react-syntax-highlighter  # For code
```

**Template to Cannibalize:**
```jsx
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const TutorChat = ({ messages, onSend }) => {
  return (
    <MainContainer>
      <ChatContainer>
        <MessageList>
          {messages.map((msg, i) => (
            <Message key={i} model={{
              message: <ReactMarkdown components={{
                code({ node, inline, className, children }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter language={match[1]}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : <code className={className}>{children}</code>
                }
              }}>{msg.content}</ReactMarkdown>,
              direction: msg.role === 'user' ? 'outgoing' : 'incoming'
            }} />
          ))}
        </MessageList>
        <MessageInput onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  );
};
```

#### AI Streaming with Vercel AI SDK
```bash
npm install ai @ai-sdk/anthropic
```

**Backend Pattern:**
```typescript
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages, subject, difficulty } = await req.json();

  const result = await streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: `You are an expert ${subject} tutor. Adjust explanations for ${difficulty} level.`,
    messages,
  });

  return result.toAIStreamResponse();
}
```

**Frontend Integration:**
```typescript
import { useChat } from 'ai/react';

function TutorSession() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/tutor/chat',
    body: { subject: 'mathematics', difficulty: 'high-school' }
  });

  return <TutorChat messages={messages} onSend={handleSubmit} />;
}
```

---

### 🏫 Smart Classrooms - Complete Resource List

#### Whiteboard (Excalidraw)
```bash
npm install @excalidraw/excalidraw
```

**Component to Cannibalize:**
```jsx
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useState } from "react";

const CollaborativeWhiteboard = ({ roomId, userId }) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  // WebSocket sync
  useEffect(() => {
    if (!excalidrawAPI) return;

    const socket = io('/whiteboard');

    socket.emit('join-room', roomId);

    socket.on('whiteboard-update', (elements) => {
      excalidrawAPI.updateScene({ elements });
    });

    const handleChange = (elements) => {
      socket.emit('whiteboard-change', { roomId, elements });
    };

    excalidrawAPI.onChange(handleChange);

    return () => socket.disconnect();
  }, [excalidrawAPI, roomId]);

  return (
    <div style={{ height: "600px" }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        theme="light"
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.Export />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};
```

#### Video Conferencing (100ms)
```bash
npm install @100mslive/react-sdk @100mslive/hms-video-react
```

**Component:**
```jsx
import { useHMSActions, useHMSStore, selectPeers } from '@100mslive/react-sdk';
import { VideoTile } from '@100mslive/hms-video-react';

const VideoClassroom = ({ roomId, userName }) => {
  const hmsActions = useHMSActions();
  const peers = useHMSStore(selectPeers);

  useEffect(() => {
    const authToken = await fetch('/api/classroom/token', {
      method: 'POST',
      body: JSON.stringify({ roomId, userName })
    }).then(r => r.json());

    hmsActions.join({ userName, authToken: authToken.token });

    return () => hmsActions.leave();
  }, []);

  return (
    <div className="video-grid">
      {peers.map(peer => (
        <VideoTile key={peer.id} peer={peer} />
      ))}
    </div>
  );
};
```

#### Real-time Collaboration (Socket.IO)
```bash
npm install socket.io socket.io-client
npm install socket.io-redis ioredis  # For scaling
```

**Server Setup:**
```typescript
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL }
});

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

io.on('connection', (socket) => {
  socket.on('join-classroom', (classroomId) => {
    socket.join(`classroom:${classroomId}`);
  });

  socket.on('whiteboard-update', ({ classroomId, data }) => {
    socket.to(`classroom:${classroomId}`).emit('whiteboard-sync', data);
  });

  socket.on('chat-message', ({ classroomId, message }) => {
    io.to(`classroom:${classroomId}`).emit('chat-message', {
      ...message,
      timestamp: Date.now()
    });
  });

  socket.on('raise-hand', ({ classroomId, userId }) => {
    io.to(`classroom:${classroomId}`).emit('hand-raised', userId);
  });
});
```

---

### 📚 Adaptive Learning - Complete Resource List

#### Spaced Repetition Algorithm
```typescript
// Cannibalized from Anki/SuperMemo SM-2
interface ReviewData {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

function calculateNextReview(
  quality: number,  // 0-5 (5 = perfect recall)
  data: ReviewData
): { nextReview: Date; newData: ReviewData } {
  let { easeFactor, interval, repetitions } = data;

  // Update ease factor
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Failed recall
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    nextReview,
    newData: { easeFactor, interval, repetitions }
  };
}
```

#### Knowledge Tracing (Bayesian)
```typescript
// Simplified BKT for mastery estimation
interface BKTParams {
  pInit: number;   // Initial knowledge probability
  pLearn: number;  // Learning rate
  pSlip: number;   // Probability of slip (know but wrong)
  pGuess: number;  // Probability of guess (don't know but right)
}

function updateMastery(
  priorMastery: number,
  wasCorrect: boolean,
  params: BKTParams = {
    pInit: 0.1,
    pLearn: 0.3,
    pSlip: 0.1,
    pGuess: 0.25
  }
): number {
  const { pLearn, pSlip, pGuess } = params;

  // P(knew | correct) using Bayes' theorem
  if (wasCorrect) {
    const numerator = priorMastery * (1 - pSlip);
    const denominator = numerator + (1 - priorMastery) * pGuess;
    priorMastery = numerator / denominator;
  } else {
    const numerator = priorMastery * pSlip;
    const denominator = numerator + (1 - priorMastery) * (1 - pGuess);
    priorMastery = numerator / denominator;
  }

  // P(will know) = P(knew) + P(didn't know) * P(learn)
  return priorMastery + (1 - priorMastery) * pLearn;
}
```

#### Recommendation Engine
```typescript
// Content-based filtering for learning paths
interface Topic {
  id: string;
  subject: string;
  difficulty: number;
  prerequisites: string[];
  tags: string[];
}

interface UserProgress {
  completedTopics: string[];
  strugglingTopics: string[];
  masteryLevels: Record<string, number>;
}

function recommendNextTopics(
  user: UserProgress,
  allTopics: Topic[],
  limit: number = 5
): Topic[] {
  return allTopics
    .filter(topic => {
      // Must complete prerequisites
      const hasPrereqs = topic.prerequisites.every(pre =>
        user.completedTopics.includes(pre)
      );
      // Not already completed
      const notCompleted = !user.completedTopics.includes(topic.id);
      return hasPrereqs && notCompleted;
    })
    .map(topic => {
      // Score based on difficulty match and tag similarity
      const avgMastery = Object.values(user.masteryLevels).reduce((a, b) => a + b, 0) /
                        Object.values(user.masteryLevels).length;

      const difficultyScore = 1 - Math.abs(topic.difficulty - (avgMastery * 10));

      const tagSimilarity = topic.tags.filter(tag =>
        user.completedTopics.some(compId =>
          allTopics.find(t => t.id === compId)?.tags.includes(tag)
        )
      ).length / topic.tags.length;

      return {
        ...topic,
        score: difficultyScore * 0.6 + tagSimilarity * 0.4
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
```

---

## 4. Integration Roadmap

### Week 1-2: Foundation Setup

#### Day 1-3: Backend Skeleton
```bash
# Clone and adapt node-express-boilerplate
git clone https://github.com/hagopj13/node-express-boilerplate.git backend
cd backend
rm -rf .git

# Install our additional dependencies
npm install drizzle-orm postgres socket.io ioredis
npm install -D drizzle-kit
npm install @ai-sdk/anthropic ai
npm install zod

# Adapt structure
mkdir src/features/{auth,tutors,classrooms,learning}
# Copy auth from boilerplate, adapt others
```

#### Day 4-5: Database + Docker
```bash
# Create drizzle schema based on our design
cat > src/db/schema.ts << 'EOF'
import { pgTable, uuid, varchar, timestamp, integer, decimal, text, jsonb, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  role: varchar('role', { length: 20 }).notNull().default('student'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Add other tables from our schema...
EOF

# Set up Docker Compose
cat > docker-compose.yml << 'EOF'
[Use the template from DevOps expert section]
EOF
```

#### Day 6-7: Frontend Integration
```bash
cd ../frontend
npm install zustand @tanstack/react-query axios
npm install socket.io-client
npm install @chatscope/chat-ui-kit-react
npm install @excalidraw/excalidraw
npm install react-markdown remark-gfm katex react-katex

# Set up store structure
mkdir src/stores
mkdir src/services
mkdir src/hooks
```

---

### Week 3-4: AI Tutors

#### Day 1-2: Chat UI
- Copy ChatUI component template
- Integrate with Chakra UI theme
- Add markdown/math/code rendering
- Test with mock data

#### Day 3-5: AI Backend
```typescript
// src/features/tutors/tutor.service.ts
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export class TutorService {
  async startSession(userId: string, subject: string, difficulty: string) {
    // Create session in DB
    const session = await db.insert(tutoringSessions).values({
      userId, subject, difficultyLevel: difficulty
    }).returning();

    return session[0];
  }

  async streamResponse(sessionId: string, message: string) {
    // Get session context
    const messages = await this.getSessionMessages(sessionId);
    const session = await this.getSession(sessionId);

    // Stream AI response
    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: this.buildSystemPrompt(session),
      messages: [...messages, { role: 'user', content: message }],
    });

    // Save to DB in background
    this.saveMessage(sessionId, 'user', message);

    return result.toAIStreamResponse();
  }

  private buildSystemPrompt(session) {
    return `You are an expert ${session.subject} tutor.
    Student level: ${session.difficultyLevel}
    Teaching style: Patient, encouraging, Socratic method
    Always:
    - Break down complex topics
    - Use examples and analogies
    - Check for understanding
    - Encourage critical thinking`;
  }
}
```

#### Day 6-7: Testing & Polish
- E2E testing with Playwright
- Performance optimization
- Error handling
- Loading states

---

### Week 5-7: Smart Classrooms

#### Day 1-3: Whiteboard Integration
```jsx
// Copy Excalidraw component
// Add WebSocket sync
// Add persistence to PostgreSQL
// Test multi-user collaboration
```

#### Day 4-6: Video Integration
```bash
# Option A: Use 100ms (recommended for MVP)
npm install @100mslive/react-sdk @100mslive/hms-video-react

# Option B: Daily.co
npm install @daily-co/daily-react

# Set up room creation API
# Integrate with classroom sessions
# Add participant management
```

#### Day 7-10: Real-time Features
- Socket.IO room management
- Chat functionality
- Polls/quizzes
- Hand raising
- Attendance tracking

---

### Week 8-10: Adaptive Learning

#### Day 1-3: Learning Path Engine
```typescript
// Implement spaced repetition
// Implement knowledge tracing
// Build recommendation algorithm
// Test with sample data
```

#### Day 4-7: Progress Tracking
```bash
# Install Recharts
npm install recharts

# Build analytics dashboard
# Implement mastery calculations
# Create progress visualizations
```

#### Day 8-10: Assessment System
- Question bank creation
- Assessment taking UI
- Grading logic
- Adaptive difficulty

---

## 5. Risk Assessment

### High Risk Items

**Risk 1: AI API Costs**
- **Probability:** High
- **Impact:** High (could exceed budget)
- **Mitigation:**
  - Implement aggressive caching (Redis)
  - Use Claude Haiku for simple queries
  - Set rate limits per user
  - Monitor usage with alerts
- **Cannibalized Solution:** Use [Helicone](https://www.helicone.ai/) for cost monitoring

**Risk 2: Real-time Scalability**
- **Probability:** Medium
- **Impact:** High (classrooms fail at scale)
- **Mitigation:**
  - Redis adapter for Socket.IO (done)
  - Limit classroom size (30 students)
  - Horizontal scaling with PM2 or Kubernetes
- **Cannibalized Solution:** Use managed Socket.IO (Ably/Pusher) if needed

**Risk 3: WebRTC Complexity**
- **Probability:** High
- **Impact:** Medium (video might be buggy)
- **Mitigation:**
  - Use managed service (100ms/Daily.co)
  - Free tier: 10,000 minutes/month
  - Fallback: Audio-only mode
- **Cannibalized Solution:** 100ms SDK handles all complexity

### Medium Risk Items

**Risk 4: Database Performance**
- **Mitigation:** Proper indexing (already in schema), read replicas if needed
- **Cannibalized Solution:** Drizzle ORM query optimization guides

**Risk 5: Learning Algorithm Accuracy**
- **Mitigation:** A/B testing, user feedback loops
- **Cannibalized Solution:** Start with proven SM-2, iterate based on data

---

## 6. Accelerated Timeline

### Revised Implementation Timeline (10 weeks)

```
Week 1-2:   Foundation [DONE IN 1 WEEK with boilerplate]
            ✅ Auth (cannibalized)
            ✅ Database (Drizzle templates)
            ✅ Docker (Awesome Compose)
            ✅ Basic API structure

Week 3-4:   AI Tutors [DONE IN 2 WEEKS]
            ✅ Chat UI (ChatUI kit)
            ✅ AI Streaming (Vercel AI SDK)
            ✅ Session management
            ✅ Testing

Week 5-7:   Smart Classrooms [DONE IN 3 WEEKS]
            ✅ Whiteboard (Excalidraw)
            ✅ Video (100ms SDK)
            ✅ Real-time (Socket.IO patterns)
            ✅ Polls/Chat

Week 8-9:   Adaptive Learning [DONE IN 2 WEEKS]
            ✅ Spaced repetition (Anki algorithm)
            ✅ Knowledge tracing
            ✅ Recommendation engine
            ✅ Analytics dashboard (Recharts)

Week 10:    Polish & Deploy [DONE IN 1 WEEK]
            ✅ Testing
            ✅ Documentation
            ✅ Deploy to Railway/Render
            ✅ Monitoring setup
```

**Total: 10 weeks** (vs 16 weeks from scratch = 37.5% time savings)

---

## 7. Quick Start Commands

### Clone and Set Up
```bash
# 1. Clone auth boilerplate for backend
git clone https://github.com/hagopj13/node-express-boilerplate.git backend
cd backend && rm -rf .git && npm install

# 2. Add our dependencies
npm install drizzle-orm postgres socket.io ioredis @ai-sdk/anthropic ai zod
npm install -D drizzle-kit @types/node tsx

# 3. Set up frontend (already exists)
cd ../ai-educational-tools-landing
npm install zustand @tanstack/react-query axios socket.io-client
npm install @chatscope/chat-ui-kit-react @excalidraw/excalidraw
npm install react-markdown remark-gfm katex react-katex
npm install recharts react-hook-form

# 4. Set up database
cd ../backend
cp .env.example .env
# Edit .env with your DATABASE_URL and ANTHROPIC_API_KEY

# 5. Start development
docker-compose up -d postgres redis
npm run dev
```

---

## 8. Recommended Package.json

### Backend
```json
{
  "name": "ai-edu-tools-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "drizzle-orm": "^0.29.1",
    "postgres": "^3.4.3",
    "ioredis": "^5.3.2",
    "socket.io": "^4.6.0",
    "@socket.io/redis-adapter": "^8.2.1",
    "@ai-sdk/anthropic": "^0.0.11",
    "ai": "^3.0.0",
    "pino": "^8.17.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "drizzle-kit": "^0.20.9",
    "vitest": "^1.1.0"
  }
}
```

### Frontend (add to existing)
```json
{
  "dependencies": {
    "@chatscope/chat-ui-kit-react": "^1.10.1",
    "@chatscope/chat-ui-kit-styles": "^1.4.0",
    "@excalidraw/excalidraw": "^0.17.0",
    "@100mslive/react-sdk": "^0.10.0",
    "@100mslive/hms-video-react": "^0.8.0",
    "@tanstack/react-query": "^5.14.2",
    "socket.io-client": "^4.6.0",
    "zustand": "^4.4.7",
    "react-hook-form": "^7.49.2",
    "react-markdown": "^9.0.1",
    "remark-gfm": "^4.0.0",
    "katex": "^0.16.9",
    "react-katex": "^3.0.1",
    "recharts": "^2.10.3",
    "ai": "^3.0.0"
  }
}
```

---

## 9. Key Files to Create First

### Priority Order

1. **Backend:**
   ```
   backend/
   ├── src/
   │   ├── db/
   │   │   ├── schema.ts          ← Database schema (from our plan)
   │   │   └── index.ts           ← Drizzle instance
   │   ├── features/
   │   │   ├── auth/              ← Cannibalize from boilerplate
   │   │   ├── tutors/
   │   │   │   ├── tutor.service.ts
   │   │   │   ├── tutor.routes.ts
   │   │   │   └── tutor.controller.ts
   │   │   ├── classrooms/
   │   │   └── learning/
   │   ├── middleware/
   │   │   ├── auth.middleware.ts
   │   │   ├── error.middleware.ts
   │   │   └── validate.middleware.ts
   │   ├── sockets/
   │   │   └── classroom.socket.ts
   │   └── index.ts
   ├── docker-compose.yml
   └── .env.example
   ```

2. **Frontend:**
   ```
   src/
   ├── features/
   │   ├── tutors/
   │   │   ├── TutorChat.jsx        ← Cannibalize ChatUI
   │   │   ├── TutorSession.jsx
   │   │   └── useTutor.js
   │   ├── classrooms/
   │   │   ├── Whiteboard.jsx       ← Embed Excalidraw
   │   │   ├── VideoGrid.jsx        ← Use 100ms
   │   │   └── ClassroomLive.jsx
   │   └── learning/
   │       ├── ProgressDashboard.jsx ← Use Recharts
   │       └── TopicView.jsx
   ├── stores/
   │   ├── authStore.js
   │   ├── tutorStore.js
   │   └── classroomStore.js
   └── services/
       └── api.js
   ```

---

## 10. Success Metrics

### Development Velocity
- **Lines of code reused:** ~70%
- **Time saved:** 6-8 weeks
- **Bug density:** Lower (using battle-tested libraries)

### Code Quality
- **Test coverage:** >80% (inherit tests from libraries)
- **Performance:** <200ms API response (proven patterns)
- **Security:** OWASP compliant (helmet, rate-limit, etc.)

---

## Next Steps

**This Week:**
1. ✅ Clone node-express-boilerplate
2. ✅ Set up Docker Compose
3. ✅ Install all frontend dependencies
4. ✅ Create database schema with Drizzle
5. ✅ Test basic auth flow

**Next Week:**
1. ✅ Integrate Vercel AI SDK
2. ✅ Build chat UI with ChatUI kit
3. ✅ Test AI streaming
4. ✅ Create first tutoring session

**Ready to start implementation!**

---

**Document Version:** 1.0
**Last Updated:** 2025-11-24
**Compiled by:** Multi-Expert Panel
**Status:** Ready for Execution
