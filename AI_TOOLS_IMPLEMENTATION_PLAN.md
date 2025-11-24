# AI Educational Tools - Implementation Plan

**Created:** 2025-11-24
**Based on:** Forensic analysis documents and feature specifications from Index.jsx
**Purpose:** Comprehensive plan to build the three AI educational tools

---

## Executive Summary

The landing page currently showcases three AI educational tools that need to be implemented:

1. **AI Tutors** - Personalized tutoring sessions with AI
2. **Smart Classrooms** - Interactive learning environments
3. **Adaptive Learning** - Performance-based curriculum evolution

This document provides a complete implementation plan to transform the marketing landing page into a fully functional AI educational platform.

---

## Table of Contents

1. [Core Features Analysis](#core-features-analysis)
2. [Architecture Design](#architecture-design)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [API Design](#api-design)
6. [Frontend Components](#frontend-components)
7. [Implementation Phases](#implementation-phases)
8. [Success Metrics](#success-metrics)

---

## 1. Core Features Analysis

### Feature 1: AI Tutors
**Current Description:** "Personalized tutoring sessions with AI to help you understand complex topics."

**Detailed Requirements:**
- **Chat Interface** - Real-time conversational AI tutoring
- **Subject Selection** - Multiple academic subjects (Math, Science, English, History, etc.)
- **Difficulty Levels** - Elementary, Middle School, High School, College
- **Session History** - Save and resume tutoring sessions
- **Multi-modal Support** - Text, code, math equations, diagrams
- **Personalization** - Remember student's learning style and pace
- **Explanation Modes** - Simple, detailed, example-based, step-by-step
- **Practice Problems** - Generate and grade practice questions
- **Progress Tracking** - Track topics covered and mastery levels

**User Stories:**
```
As a student, I want to ask questions about algebra
So that I can get personalized explanations

As a student, I want to see my past tutoring sessions
So that I can review what I learned

As a tutor AI, I want to adjust my explanation style
So that I match the student's comprehension level
```

---

### Feature 2: Smart Classrooms
**Current Description:** "Interactive and intelligent classrooms that adapt to students' learning styles."

**Detailed Requirements:**
- **Virtual Classroom** - Multi-user collaborative environment
- **Real-time Whiteboard** - Shared drawing/writing canvas
- **Live Polls/Quizzes** - Interactive assessments during class
- **Breakout Rooms** - Small group discussions
- **Screen Sharing** - Instructor and student presentations
- **Raise Hand** - Queue management for questions
- **AI Teaching Assistant** - Automated help for common questions
- **Attendance Tracking** - Automatic check-in/out
- **Recording & Playback** - Review past sessions
- **Adaptive Pacing** - Adjust lesson speed based on class comprehension
- **Resource Library** - Shared materials and assignments

**User Stories:**
```
As a teacher, I want to create a virtual classroom
So that students can join and participate remotely

As a student, I want to collaborate on a whiteboard
So that I can work through problems with classmates

As a teacher, I want to see real-time comprehension metrics
So that I can adjust my teaching pace
```

---

### Feature 3: Adaptive Learning
**Current Description:** "Curriculums that evolve based on your learning progress and performance."

**Detailed Requirements:**
- **Skill Assessment** - Initial placement tests
- **Learning Paths** - Personalized curriculum recommendations
- **Dynamic Difficulty** - Adjust content complexity based on performance
- **Prerequisite Tracking** - Ensure foundational knowledge before advancing
- **Spaced Repetition** - Optimize review timing for retention
- **Weakness Identification** - Highlight struggling topics
- **Strength Reinforcement** - Challenge advanced areas
- **Progress Dashboard** - Visual learning analytics
- **Goal Setting** - Define and track learning objectives
- **Recommendation Engine** - Suggest next topics/lessons
- **Mastery Thresholds** - Define completion criteria

**User Stories:**
```
As a student, I want a personalized learning path
So that I focus on topics I need to improve

As a student, I want to see my progress over time
So that I stay motivated

As the system, I want to adapt difficulty dynamically
So that students are challenged but not overwhelmed
```

---

## 2. Architecture Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  AI Tutors   │  │    Smart     │  │   Adaptive   │     │
│  │  Dashboard   │  │  Classrooms  │  │   Learning   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                     ┌──────▼──────┐                        │
│                     │  API Client │                        │
│                     └──────┬──────┘                        │
└────────────────────────────┼────────────────────────────────┘
                             │
                    ┌────────▼─────────┐
                    │   API Gateway    │
                    │   (Express.js)   │
                    └────────┬─────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼─────┐      ┌──────▼──────┐      ┌─────▼──────┐
   │   AI     │      │  Classroom  │      │  Learning  │
   │  Tutor   │      │   Service   │      │   Path     │
   │ Service  │      │             │      │  Service   │
   └────┬─────┘      └──────┬──────┘      └─────┬──────┘
        │                   │                    │
        └───────────────────┴────────────────────┘
                            │
                   ┌────────▼─────────┐
                   │    PostgreSQL    │
                   │  (Primary DB)    │
                   └──────────────────┘
                            │
                   ┌────────▼─────────┐
                   │      Redis       │
                   │  (Cache/Session) │
                   └──────────────────┘
```

### Component Breakdown

#### Frontend (React + Chakra UI)
- **Landing Page** - Current marketing page (existing)
- **Authentication** - Login/Register/Profile
- **AI Tutor Interface** - Chat UI with history
- **Smart Classroom** - WebRTC-based collaborative space
- **Adaptive Learning Dashboard** - Progress visualization
- **Shared Components** - Navigation, layouts, forms

#### Backend (Node.js + Express)
- **Authentication Service** - JWT-based auth
- **AI Tutor Service** - LLM integration (Anthropic Claude or OpenAI)
- **Classroom Service** - WebSocket management, real-time collaboration
- **Learning Path Service** - Adaptive algorithm engine
- **Analytics Service** - Progress tracking and reporting

#### Data Layer
- **PostgreSQL** - Relational data (users, sessions, content)
- **Redis** - Caching, session management, real-time data
- **S3/Cloud Storage** - File uploads (images, documents)

#### External Integrations
- **LLM API** - Anthropic Claude, OpenAI GPT-4, or local Llama
- **WebRTC** - Video/audio for classrooms
- **WebSocket** - Real-time collaboration
- **Email Service** - Notifications (SendGrid/Mailgun)

---

## 3. Technology Stack

### Frontend
```json
{
  "framework": "React 18.2.0",
  "build": "Vite 5.0.2",
  "ui": "Chakra UI 2.8.2",
  "routing": "React Router DOM 6.20.1",
  "state": "Zustand 4.4.0 (lightweight alternative to Redux)",
  "forms": "React Hook Form 7.48.0",
  "api": "Axios 1.6.0 + React Query 5.0.0",
  "realtime": "Socket.IO Client 4.5.0",
  "charts": "Recharts 2.9.0",
  "markdown": "React Markdown 9.0.0",
  "math": "KaTeX 0.16.9",
  "code": "Prism.js 1.29.0",
  "testing": "Vitest + React Testing Library"
}
```

### Backend
```json
{
  "runtime": "Node.js 20+",
  "framework": "Express.js 4.18.0",
  "language": "TypeScript 5.3.0",
  "auth": "jsonwebtoken 9.0.0 + bcrypt 5.1.0",
  "validation": "Zod 3.22.0",
  "database": "pg (PostgreSQL driver) 8.11.0",
  "orm": "Drizzle ORM 0.29.0 (TypeScript-first)",
  "cache": "ioredis 5.3.0",
  "realtime": "Socket.IO 4.5.0",
  "ai": "@anthropic-ai/sdk or openai",
  "testing": "Jest + Supertest"
}
```

### Database
```
- PostgreSQL 15+
- Redis 7+
```

### DevOps
```
- Docker + Docker Compose (development)
- GitHub Actions (CI/CD)
- Vercel/Railway/Render (deployment options)
- AWS S3 or Cloudflare R2 (file storage)
```

---

## 4. Database Schema

### Users & Authentication

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(20) NOT NULL DEFAULT 'student', -- student, teacher, admin
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- User profiles (extended info)
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  grade_level VARCHAR(50), -- elementary, middle_school, high_school, college
  learning_style VARCHAR(50), -- visual, auditory, kinesthetic, reading
  timezone VARCHAR(50),
  language VARCHAR(10) DEFAULT 'en',
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Sessions for auth
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### AI Tutors

```sql
-- Tutoring sessions
CREATE TABLE tutoring_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(100) NOT NULL, -- math, science, english, etc.
  topic VARCHAR(255),
  difficulty_level VARCHAR(50), -- elementary, middle, high, college
  status VARCHAR(20) DEFAULT 'active', -- active, completed, archived
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  duration_seconds INTEGER,
  total_messages INTEGER DEFAULT 0
);

-- Conversation messages
CREATE TABLE tutor_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES tutoring_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb, -- code snippets, math equations, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session summaries (AI-generated)
CREATE TABLE session_summaries (
  session_id UUID PRIMARY KEY REFERENCES tutoring_sessions(id) ON DELETE CASCADE,
  topics_covered TEXT[],
  key_concepts TEXT[],
  questions_answered INTEGER,
  understanding_level VARCHAR(20), -- struggling, developing, proficient, advanced
  next_steps TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Smart Classrooms

```sql
-- Classrooms
CREATE TABLE classrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  subject VARCHAR(100),
  grade_level VARCHAR(50),
  max_students INTEGER DEFAULT 30,
  status VARCHAR(20) DEFAULT 'active', -- active, archived
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classroom enrollments
CREATE TABLE classroom_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'student', -- student, teacher, assistant
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(classroom_id, user_id)
);

-- Classroom sessions (live meetings)
CREATE TABLE classroom_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id UUID REFERENCES classrooms(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  scheduled_start TIMESTAMP NOT NULL,
  scheduled_end TIMESTAMP NOT NULL,
  actual_start TIMESTAMP,
  actual_end TIMESTAMP,
  recording_url TEXT,
  status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, live, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance tracking
CREATE TABLE session_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES classroom_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP,
  left_at TIMESTAMP,
  duration_seconds INTEGER,
  participation_score DECIMAL(3,2), -- 0.00 to 1.00
  UNIQUE(session_id, user_id)
);

-- Whiteboard data (collaborative drawings)
CREATE TABLE whiteboard_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES classroom_sessions(id) ON DELETE CASCADE,
  canvas_data JSONB NOT NULL, -- Fabric.js or Excalidraw JSON
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Live polls/quizzes
CREATE TABLE classroom_polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES classroom_sessions(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- array of options
  correct_answer INTEGER, -- index of correct option (null for opinion polls)
  duration_seconds INTEGER DEFAULT 60,
  status VARCHAR(20) DEFAULT 'draft', -- draft, active, closed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMP
);

-- Poll responses
CREATE TABLE poll_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES classroom_polls(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  selected_option INTEGER NOT NULL,
  is_correct BOOLEAN,
  responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(poll_id, user_id)
);
```

### Adaptive Learning

```sql
-- Subjects and topics hierarchy
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20)
);

CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty_level INTEGER DEFAULT 1, -- 1-10 scale
  estimated_hours DECIMAL(4,1),
  prerequisites UUID[] DEFAULT ARRAY[]::UUID[], -- array of topic IDs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning content (lessons, exercises)
CREATE TABLE learning_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- lesson, exercise, quiz, project, reading
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  difficulty_level INTEGER DEFAULT 1,
  estimated_minutes INTEGER,
  order_index INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User learning paths
CREATE TABLE learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  goal TEXT,
  target_completion_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- active, completed, paused
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Path progress tracking
CREATE TABLE path_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'not_started', -- not_started, in_progress, completed
  mastery_level DECIMAL(3,2) DEFAULT 0.00, -- 0.00 to 1.00
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(path_id, topic_id)
);

-- Assessment results
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  content_id UUID REFERENCES learning_content(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL, -- placement, quiz, practice, final
  score DECIMAL(5,2), -- percentage
  total_questions INTEGER,
  correct_answers INTEGER,
  time_taken_seconds INTEGER,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  submitted_at TIMESTAMP
);

-- Skill mastery tracking
CREATE TABLE skill_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  mastery_level DECIMAL(3,2) DEFAULT 0.00, -- 0.00 to 1.00
  last_practiced TIMESTAMP,
  next_review TIMESTAMP, -- spaced repetition
  review_count INTEGER DEFAULT 0,
  struggle_count INTEGER DEFAULT 0, -- times user struggled with this
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, topic_id)
);

-- Learning analytics
CREATE TABLE learning_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_time_seconds INTEGER DEFAULT 0,
  topics_completed INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  average_score DECIMAL(5,2),
  streak_days INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);
```

### Indexes for Performance

```sql
-- User lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Tutoring
CREATE INDEX idx_tutoring_sessions_user_id ON tutoring_sessions(user_id);
CREATE INDEX idx_tutoring_sessions_status ON tutoring_sessions(status);
CREATE INDEX idx_tutor_messages_session_id ON tutor_messages(session_id);

-- Classrooms
CREATE INDEX idx_classrooms_teacher_id ON classrooms(teacher_id);
CREATE INDEX idx_classroom_enrollments_classroom_id ON classroom_enrollments(classroom_id);
CREATE INDEX idx_classroom_enrollments_user_id ON classroom_enrollments(user_id);
CREATE INDEX idx_classroom_sessions_classroom_id ON classroom_sessions(classroom_id);
CREATE INDEX idx_session_attendance_session_id ON session_attendance(session_id);

-- Learning paths
CREATE INDEX idx_learning_paths_user_id ON learning_paths(user_id);
CREATE INDEX idx_path_progress_path_id ON path_progress(path_id);
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_skill_mastery_user_id ON skill_mastery(user_id);
CREATE INDEX idx_learning_analytics_user_date ON learning_analytics(user_id, date);
```

---

## 5. API Design

### Authentication API

```
POST   /api/auth/register          - Create new user account
POST   /api/auth/login             - Login and get JWT
POST   /api/auth/logout            - Invalidate session
GET    /api/auth/me                - Get current user info
PUT    /api/auth/me                - Update user profile
POST   /api/auth/refresh           - Refresh JWT token
POST   /api/auth/forgot-password   - Request password reset
POST   /api/auth/reset-password    - Reset password with token
```

### AI Tutors API

```
GET    /api/tutors/sessions                    - List user's tutoring sessions
POST   /api/tutors/sessions                    - Create new tutoring session
GET    /api/tutors/sessions/:id                - Get session details
DELETE /api/tutors/sessions/:id                - Delete/archive session
GET    /api/tutors/sessions/:id/messages       - Get conversation history
POST   /api/tutors/sessions/:id/messages       - Send message to AI tutor
GET    /api/tutors/sessions/:id/summary        - Get AI-generated summary
GET    /api/tutors/subjects                    - List available subjects
GET    /api/tutors/subjects/:subject/topics    - List topics in subject
```

### Smart Classrooms API

```
GET    /api/classrooms                         - List user's classrooms
POST   /api/classrooms                         - Create new classroom (teacher)
GET    /api/classrooms/:id                     - Get classroom details
PUT    /api/classrooms/:id                     - Update classroom
DELETE /api/classrooms/:id                     - Archive classroom
POST   /api/classrooms/:id/enroll              - Enroll in classroom (student)
DELETE /api/classrooms/:id/enroll              - Leave classroom
GET    /api/classrooms/:id/students            - List enrolled students
GET    /api/classrooms/:id/sessions            - List classroom sessions
POST   /api/classrooms/:id/sessions            - Schedule new session (teacher)
GET    /api/classrooms/:id/sessions/:sessionId - Get session details
PUT    /api/classrooms/:id/sessions/:sessionId - Update session
POST   /api/classrooms/:id/sessions/:sessionId/start - Start live session
POST   /api/classrooms/:id/sessions/:sessionId/end   - End live session
GET    /api/classrooms/:id/sessions/:sessionId/attendance - Get attendance
POST   /api/classrooms/:id/polls               - Create poll (teacher)
GET    /api/classrooms/:id/polls/:pollId       - Get poll results
POST   /api/classrooms/:id/polls/:pollId/vote  - Submit poll response
```

### Adaptive Learning API

```
GET    /api/learning/subjects                  - List all subjects
GET    /api/learning/subjects/:id/topics       - Get topic tree for subject
GET    /api/learning/topics/:id                - Get topic details
GET    /api/learning/topics/:id/content        - Get learning content for topic
GET    /api/learning/paths                     - List user's learning paths
POST   /api/learning/paths                     - Create new learning path
GET    /api/learning/paths/:id                 - Get learning path details
PUT    /api/learning/paths/:id                 - Update learning path
DELETE /api/learning/paths/:id                 - Delete learning path
GET    /api/learning/paths/:id/progress        - Get progress on path
POST   /api/learning/paths/:id/next            - Get next recommended topic
POST   /api/learning/assessments               - Submit assessment
GET    /api/learning/assessments/:id/results   - Get assessment results
GET    /api/learning/analytics                 - Get user learning analytics
GET    /api/learning/analytics/dashboard       - Get dashboard data
GET    /api/learning/mastery                   - Get skill mastery overview
POST   /api/learning/placement-test            - Take initial placement test
```

### WebSocket Events (Real-time)

```
// Classroom real-time events
classroom:join                  - Join classroom session
classroom:leave                 - Leave classroom session
classroom:message               - Send chat message
classroom:whiteboard:update     - Update whiteboard
classroom:poll:start            - Teacher starts poll
classroom:poll:vote             - Student votes on poll
classroom:hand:raise            - Student raises hand
classroom:hand:lower            - Student lowers hand

// Tutor real-time events
tutor:message                   - Stream AI response (SSE)
```

---

## 6. Frontend Components

### Component Structure

```
src/
├── App.jsx                       # Main app component
├── main.jsx                      # Entry point
├── pages/
│   ├── Index.jsx                 # Landing page (existing)
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx         # Main user dashboard
│   ├── tutors/
│   │   ├── TutorDashboard.jsx    # List of sessions
│   │   ├── TutorSession.jsx      # Active tutoring chat
│   │   └── TutorHistory.jsx      # Past sessions
│   ├── classrooms/
│   │   ├── ClassroomList.jsx     # My classrooms
│   │   ├── ClassroomDetail.jsx   # Classroom overview
│   │   ├── ClassroomLive.jsx     # Live session
│   │   ├── CreateClassroom.jsx   # Teacher: create classroom
│   │   └── JoinClassroom.jsx     # Student: join by code
│   ├── learning/
│   │   ├── LearningPaths.jsx     # My learning paths
│   │   ├── PathDetail.jsx        # Path progress
│   │   ├── TopicView.jsx         # View topic content
│   │   ├── Assessment.jsx        # Take quiz/test
│   │   └── Analytics.jsx         # Progress analytics
│   └── profile/
│       ├── Profile.jsx           # User profile
│       └── Settings.jsx          # User settings
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── DashboardLayout.jsx
│   ├── auth/
│   │   ├── ProtectedRoute.jsx
│   │   └── AuthProvider.jsx
│   ├── tutors/
│   │   ├── ChatMessage.jsx
│   │   ├── ChatInput.jsx
│   │   ├── SessionCard.jsx
│   │   └── SubjectSelector.jsx
│   ├── classrooms/
│   │   ├── Whiteboard.jsx
│   │   ├── VideoGrid.jsx
│   │   ├── ChatPanel.jsx
│   │   ├── ParticipantList.jsx
│   │   ├── PollWidget.jsx
│   │   └── ClassroomCard.jsx
│   ├── learning/
│   │   ├── TopicCard.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── SkillMasteryChart.jsx
│   │   ├── PathTimeline.jsx
│   │   ├── QuestionCard.jsx
│   │   └── AnalyticsDashboard.jsx
│   └── shared/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Modal.jsx
│       ├── Spinner.jsx
│       └── ErrorBoundary.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useTutor.js
│   ├── useClassroom.js
│   ├── useLearningPath.js
│   └── useWebSocket.js
├── services/
│   ├── api.js                    # Axios instance
│   ├── auth.service.js
│   ├── tutor.service.js
│   ├── classroom.service.js
│   └── learning.service.js
├── store/
│   ├── authStore.js              # Zustand store
│   ├── tutorStore.js
│   ├── classroomStore.js
│   └── learningStore.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── validators.js
└── styles/
    └── theme.js                  # Chakra UI theme customization
```

### Key Component Examples

#### 1. TutorSession.jsx (Chat Interface)
```jsx
Features:
- Real-time chat with AI tutor
- Message history with timestamps
- Loading states while AI responds
- Support for markdown, code, math equations
- Session controls (pause, end, save)
- Subject/topic context display
- "Regenerate response" option
- "Simplify explanation" button
```

#### 2. ClassroomLive.jsx (Virtual Classroom)
```jsx
Features:
- Video grid (WebRTC)
- Shared whiteboard canvas
- Live chat
- Participant list with raised hands
- Screen sharing
- Active polls/quizzes
- Recording indicator
- Breakout room assignments
- AI assistant panel
```

#### 3. PathDetail.jsx (Learning Path Progress)
```jsx
Features:
- Visual path timeline
- Topic cards with completion status
- Mastery levels per topic
- Next recommended topic highlight
- Time spent per topic
- Assessment scores
- Unlock prerequisites visualization
- "Continue learning" CTA
```

---

## 7. Implementation Phases

### Phase 0: Foundation (Week 1-2)
**Goal:** Set up infrastructure and authentication

**Tasks:**
- [ ] Set up monorepo structure (frontend + backend)
- [ ] Configure TypeScript for backend
- [ ] Set up PostgreSQL + Redis with Docker Compose
- [ ] Implement database schema and migrations
- [ ] Build authentication API (register, login, JWT)
- [ ] Create auth frontend (login/register pages)
- [ ] Set up protected routes
- [ ] Configure environment variables
- [ ] Set up testing frameworks
- [ ] Create CI/CD pipeline (GitHub Actions)

**Deliverables:**
- Users can register and log in
- JWT-based authentication working
- Database fully set up
- Basic dashboard shell

---

### Phase 1: AI Tutors MVP (Week 3-5)
**Goal:** Functional AI tutoring with chat interface

**Backend Tasks:**
- [ ] Integrate AI SDK (Anthropic Claude or OpenAI)
- [ ] Create tutoring session API endpoints
- [ ] Implement message streaming (SSE)
- [ ] Build conversation context management
- [ ] Create session summary generation
- [ ] Add subject/topic categorization

**Frontend Tasks:**
- [ ] Build chat UI component
- [ ] Implement real-time message streaming
- [ ] Create session history view
- [ ] Add subject selector
- [ ] Build session controls (start, pause, end)
- [ ] Implement markdown/math rendering

**Testing:**
- Unit tests for API endpoints
- Integration tests for AI responses
- E2E tests for complete tutoring flow

**Deliverables:**
- Students can start tutoring sessions
- AI responds to questions in real-time
- Sessions are saved and retrievable
- Multiple subjects supported

---

### Phase 2: Smart Classrooms MVP (Week 6-9)
**Goal:** Basic virtual classroom with real-time collaboration

**Backend Tasks:**
- [ ] Create classroom management API
- [ ] Implement WebSocket server for real-time
- [ ] Build enrollment system
- [ ] Create session scheduling
- [ ] Implement attendance tracking
- [ ] Add poll/quiz functionality
- [ ] Build whiteboard state persistence

**Frontend Tasks:**
- [ ] Create classroom list/detail views
- [ ] Build live classroom interface
- [ ] Implement whiteboard (Excalidraw or Fabric.js)
- [ ] Add real-time chat
- [ ] Integrate WebRTC for video (optional for MVP)
- [ ] Build poll creation and voting UI
- [ ] Create participant management
- [ ] Add raise hand functionality

**Testing:**
- WebSocket connection tests
- Multi-user collaboration tests
- Real-time sync tests

**Deliverables:**
- Teachers can create classrooms
- Students can join classrooms
- Real-time whiteboard collaboration
- Live polls and quizzes
- Basic attendance tracking

---

### Phase 3: Adaptive Learning MVP (Week 10-13)
**Goal:** Personalized learning paths with progress tracking

**Backend Tasks:**
- [ ] Create subject/topic hierarchy
- [ ] Build learning content management
- [ ] Implement assessment engine
- [ ] Create adaptive algorithm (recommendation engine)
- [ ] Build analytics calculation
- [ ] Implement skill mastery tracking
- [ ] Add spaced repetition logic

**Frontend Tasks:**
- [ ] Create learning path dashboard
- [ ] Build topic view with content
- [ ] Implement assessment interface
- [ ] Create progress visualization
- [ ] Build analytics dashboard
- [ ] Add skill mastery charts
- [ ] Implement placement test UI

**Testing:**
- Algorithm accuracy tests
- Progress calculation tests
- Recommendation logic tests

**Deliverables:**
- Students can create learning paths
- Placement tests assign appropriate levels
- Topics unlock based on prerequisites
- Dynamic difficulty adjustment
- Progress analytics dashboard

---

### Phase 4: Polish & Enhancement (Week 14-16)
**Goal:** Production-ready features and optimizations

**Tasks:**
- [ ] Add error boundaries and loading states
- [ ] Implement SEO optimization
- [ ] Add analytics (Google Analytics / Plausible)
- [ ] Create email notifications
- [ ] Build admin dashboard
- [ ] Implement rate limiting
- [ ] Add content moderation
- [ ] Optimize database queries
- [ ] Implement caching strategies
- [ ] Add accessibility features (WCAG 2.1)
- [ ] Create user onboarding flow
- [ ] Write comprehensive documentation
- [ ] Conduct security audit
- [ ] Performance optimization (Lighthouse)
- [ ] Cross-browser testing

**Deliverables:**
- Production-ready application
- Full test coverage
- Documentation complete
- Security hardened
- Performance optimized

---

## 8. Success Metrics

### Technical Metrics
- **API Response Time:** < 200ms (p95)
- **AI Response Time:** < 5s for first token
- **WebSocket Latency:** < 100ms
- **Database Query Time:** < 50ms (p95)
- **Test Coverage:** > 80%
- **Lighthouse Score:** > 90
- **Uptime:** > 99.5%

### User Metrics
- **User Registration:** Track signups
- **Session Completion Rate:** % of sessions finished
- **Average Session Duration:** Time spent tutoring
- **Classroom Participation:** Active users per session
- **Learning Path Completion:** % of paths completed
- **Assessment Scores:** Average improvement over time
- **Daily Active Users (DAU)**
- **Weekly Active Users (WAU)**
- **User Retention:** Week 1, Week 4, Month 3

### Business Metrics
- **Cost per AI Request:** Monitor API costs
- **Infrastructure Costs:** Server/database expenses
- **Customer Acquisition Cost (CAC)**
- **Monthly Recurring Revenue (MRR)** (if applicable)
- **User Satisfaction Score (NPS)**

---

## 9. Risk Mitigation

### Technical Risks

**Risk 1: AI API Costs**
- **Mitigation:** Implement request caching, rate limiting, prompt optimization
- **Fallback:** Local Llama model for development/testing

**Risk 2: Real-time Scalability**
- **Mitigation:** Use Redis pub/sub, horizontal scaling for WebSocket servers
- **Fallback:** Limit concurrent classroom sessions per instance

**Risk 3: Data Privacy**
- **Mitigation:** Encrypt sensitive data, GDPR compliance, regular audits
- **Fallback:** Allow users to delete all data

**Risk 4: Performance Degradation**
- **Mitigation:** CDN for assets, database indexing, query optimization
- **Fallback:** Implement graceful degradation

### Product Risks

**Risk 1: Poor AI Tutoring Quality**
- **Mitigation:** Extensive prompt engineering, user feedback loops
- **Fallback:** Human tutor escalation option

**Risk 2: Low User Adoption**
- **Mitigation:** User testing, onboarding optimization, marketing
- **Fallback:** Pivot features based on feedback

**Risk 3: Content Quality**
- **Mitigation:** Curate high-quality learning content, expert review
- **Fallback:** Community-contributed content with moderation

---

## 10. Next Steps

### Immediate Actions (This Week)
1. **Review and approve this plan**
2. **Set up development environment**
   - Install PostgreSQL, Redis
   - Configure Docker Compose
3. **Create project repository structure**
4. **Initialize backend with TypeScript + Express**
5. **Set up database migrations**
6. **Implement authentication MVP**

### Decision Points
- **AI Provider:** Anthropic Claude vs OpenAI GPT-4 vs Local Llama?
- **WebRTC:** Build from scratch or use Agora/Twilio?
- **Deployment:** Vercel + Railway? AWS? Self-hosted?
- **Pricing Model:** Freemium? Subscription? Per-usage?

### Documentation Needed
- API documentation (OpenAPI/Swagger)
- Component library (Storybook)
- Database schema diagrams
- Deployment runbook
- User guides

---

## Appendix A: Estimated Timeline

```
┌─────────────────────────────────────────────────────────────┐
│                    16-Week Timeline                         │
├─────────────────────────────────────────────────────────────┤
│ Week 1-2    │ Foundation & Auth                             │
│ Week 3-5    │ AI Tutors MVP                                 │
│ Week 6-9    │ Smart Classrooms MVP                          │
│ Week 10-13  │ Adaptive Learning MVP                         │
│ Week 14-16  │ Polish & Production Readiness                 │
└─────────────────────────────────────────────────────────────┘
```

**Total Estimated Effort:** 16 weeks (4 months) for full-stack developer

---

## Appendix B: Technology Alternatives

### AI Providers
| Provider | Pros | Cons | Cost |
|----------|------|------|------|
| Anthropic Claude | Best reasoning, ethical AI | Newer API | $$ |
| OpenAI GPT-4 | Most popular, well-documented | Higher cost | $$$ |
| Local Llama 3 | Free, private | Requires GPU, slower | $ (hardware) |
| Google Gemini | Good quality, competitive price | Newer | $$ |

### Real-time Solutions
| Solution | Pros | Cons |
|----------|------|------|
| Socket.IO | Easy to use, battle-tested | Polling fallback overhead |
| Native WebSocket | Lightweight, standard | More boilerplate |
| Pusher/Ably | Managed, scalable | Vendor lock-in, cost |

### Deployment Options
| Platform | Pros | Cons |
|----------|------|------|
| Vercel + Railway | Easy deploy, great DX | Cost scales with usage |
| AWS (EC2/RDS) | Full control, mature | Complex setup |
| Render | Simple, affordable | Limited scaling |
| Self-hosted | Maximum control | Maintenance burden |

---

**Document Version:** 1.0
**Last Updated:** 2025-11-24
**Author:** Claude (Sonnet 4.5)
**Status:** Ready for Implementation
