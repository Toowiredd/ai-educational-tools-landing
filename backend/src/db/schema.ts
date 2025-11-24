import { pgTable, uuid, varchar, timestamp, integer, decimal, text, jsonb, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'teacher', 'admin']);
export const sessionStatusEnum = pgEnum('session_status', ['active', 'completed', 'archived']);
export const classroomStatusEnum = pgEnum('classroom_status', ['active', 'archived']);
export const learningPathStatusEnum = pgEnum('learning_path_status', ['active', 'completed', 'paused']);

// ==================== Users & Authentication ====================

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  role: userRoleEnum('role').notNull().default('student'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  lastLogin: timestamp('last_login'),
});

export const userProfiles = pgTable('user_profiles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  gradeLevel: varchar('grade_level', { length: 50 }),
  learningStyle: varchar('learning_style', { length: 50 }),
  timezone: varchar('timezone', { length: 50 }),
  language: varchar('language', { length: 10 }).default('en'),
  preferences: jsonb('preferences').default({}),
});

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  tokenHash: varchar('token_hash', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ==================== AI Tutors ====================

export const tutoringSessions = pgTable('tutoring_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  subject: varchar('subject', { length: 100 }).notNull(),
  topic: varchar('topic', { length: 255 }),
  difficultyLevel: varchar('difficulty_level', { length: 50 }),
  status: sessionStatusEnum('status').default('active'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
  durationSeconds: integer('duration_seconds'),
  totalMessages: integer('total_messages').default(0),
});

export const tutorMessages = pgTable('tutor_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => tutoringSessions.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 20 }).notNull(), // 'user', 'assistant', 'system'
  content: text('content').notNull(),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessionSummaries = pgTable('session_summaries', {
  sessionId: uuid('session_id').primaryKey().references(() => tutoringSessions.id, { onDelete: 'cascade' }),
  topicsCovered: text('topics_covered').array(),
  keyConcepts: text('key_concepts').array(),
  questionsAnswered: integer('questions_answered'),
  understandingLevel: varchar('understanding_level', { length: 20 }),
  nextSteps: text('next_steps'),
  generatedAt: timestamp('generated_at').defaultNow().notNull(),
});

// ==================== Smart Classrooms ====================

export const classrooms = pgTable('classrooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  teacherId: uuid('teacher_id').references(() => users.id, { onDelete: 'set null' }),
  subject: varchar('subject', { length: 100 }),
  gradeLevel: varchar('grade_level', { length: 50 }),
  maxStudents: integer('max_students').default(30),
  status: classroomStatusEnum('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const classroomEnrollments = pgTable('classroom_enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  classroomId: uuid('classroom_id').references(() => classrooms.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 20 }).default('student'),
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
});

export const classroomSessions = pgTable('classroom_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  classroomId: uuid('classroom_id').references(() => classrooms.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  scheduledStart: timestamp('scheduled_start').notNull(),
  scheduledEnd: timestamp('scheduled_end').notNull(),
  actualStart: timestamp('actual_start'),
  actualEnd: timestamp('actual_end'),
  recordingUrl: text('recording_url'),
  status: varchar('status', { length: 20 }).default('scheduled'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessionAttendance = pgTable('session_attendance', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => classroomSessions.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  joinedAt: timestamp('joined_at'),
  leftAt: timestamp('left_at'),
  durationSeconds: integer('duration_seconds'),
  participationScore: decimal('participation_score', { precision: 3, scale: 2 }),
});

export const whiteboardStates = pgTable('whiteboard_states', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => classroomSessions.id, { onDelete: 'cascade' }).notNull(),
  canvasData: jsonb('canvas_data').notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const classroomPolls = pgTable('classroom_polls', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => classroomSessions.id, { onDelete: 'cascade' }).notNull(),
  question: text('question').notNull(),
  options: jsonb('options').notNull(),
  correctAnswer: integer('correct_answer'),
  durationSeconds: integer('duration_seconds').default(60),
  status: varchar('status', { length: 20 }).default('draft'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
});

export const pollResponses = pgTable('poll_responses', {
  id: uuid('id').primaryKey().defaultRandom(),
  pollId: uuid('poll_id').references(() => classroomPolls.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  selectedOption: integer('selected_option').notNull(),
  isCorrect: boolean('is_correct'),
  respondedAt: timestamp('responded_at').defaultNow().notNull(),
});

// ==================== Adaptive Learning ====================

export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  color: varchar('color', { length: 20 }),
});

export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  difficultyLevel: integer('difficulty_level').default(1),
  estimatedHours: decimal('estimated_hours', { precision: 4, scale: 1 }),
  prerequisites: uuid('prerequisites').array().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const learningContent = pgTable('learning_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  topicId: uuid('topic_id').references(() => topics.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  difficultyLevel: integer('difficulty_level').default(1),
  estimatedMinutes: integer('estimated_minutes'),
  orderIndex: integer('order_index'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const learningPaths = pgTable('learning_paths', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  subjectId: uuid('subject_id').references(() => subjects.id, { onDelete: 'cascade' }).notNull(),
  goal: text('goal'),
  targetCompletionDate: timestamp('target_completion_date'),
  status: learningPathStatusEnum('status').default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const pathProgress = pgTable('path_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  pathId: uuid('path_id').references(() => learningPaths.id, { onDelete: 'cascade' }).notNull(),
  topicId: uuid('topic_id').references(() => topics.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 20 }).default('not_started'),
  masteryLevel: decimal('mastery_level', { precision: 3, scale: 2 }).default('0.00'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  timeSpentSeconds: integer('time_spent_seconds').default(0),
});

export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  topicId: uuid('topic_id').references(() => topics.id, { onDelete: 'cascade' }).notNull(),
  contentId: uuid('content_id').references(() => learningContent.id, { onDelete: 'set null' }),
  type: varchar('type', { length: 50 }).notNull(),
  score: decimal('score', { precision: 5, scale: 2 }),
  totalQuestions: integer('total_questions'),
  correctAnswers: integer('correct_answers'),
  timeTakenSeconds: integer('time_taken_seconds'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  submittedAt: timestamp('submitted_at'),
});

export const skillMastery = pgTable('skill_mastery', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  topicId: uuid('topic_id').references(() => topics.id, { onDelete: 'cascade' }).notNull(),
  masteryLevel: decimal('mastery_level', { precision: 3, scale: 2 }).default('0.00'),
  lastPracticed: timestamp('last_practiced'),
  nextReview: timestamp('next_review'),
  reviewCount: integer('review_count').default(0),
  struggleCount: integer('struggle_count').default(0),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const learningAnalytics = pgTable('learning_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  date: timestamp('date').notNull(),
  totalTimeSeconds: integer('total_time_seconds').default(0),
  topicsCompleted: integer('topics_completed').default(0),
  exercisesCompleted: integer('exercises_completed').default(0),
  averageScore: decimal('average_score', { precision: 5, scale: 2 }),
  streakDays: integer('streak_days').default(0),
});

// Relations (for Drizzle Query API)
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  tutoringSessions: many(tutoringSessions),
  classrooms: many(classrooms),
  enrollments: many(classroomEnrollments),
  learningPaths: many(learningPaths),
}));

export const tutoringSessionsRelations = relations(tutoringSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [tutoringSessions.userId],
    references: [users.id],
  }),
  messages: many(tutorMessages),
  summary: one(sessionSummaries),
}));

export const classroomsRelations = relations(classrooms, ({ one, many }) => ({
  teacher: one(users, {
    fields: [classrooms.teacherId],
    references: [users.id],
  }),
  enrollments: many(classroomEnrollments),
  sessions: many(classroomSessions),
}));
