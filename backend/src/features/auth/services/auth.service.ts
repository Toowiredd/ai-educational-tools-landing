import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../../../db/index.js';
import { users, sessions } from '../../../db/schema.js';
import { config } from '../../../config/index.js';
import { nanoid } from 'nanoid';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private static readonly SALT_ROUNDS = 12;

  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compare password with hash
   */
  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT tokens
   */
  static generateTokens(payload: TokenPayload): AuthTokens {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }

  /**
   * Verify access token
   */
  static verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Verify refresh token
   */
  static verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, config.jwt.refreshSecret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Register new user
   */
  static async register(email: string, password: string, firstName?: string, lastName?: string) {
    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
      })
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
      });

    // Generate tokens
    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store session
    await this.createSession(user.id, tokens.refreshToken);

    return {
      user,
      tokens,
    };
  }

  /**
   * Login user
   */
  static async login(email: string, password: string) {
    // Find user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await this.comparePasswords(password, user.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await db
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    // Generate tokens
    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store session
    await this.createSession(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      tokens,
    };
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken: string) {
    // Verify refresh token
    const payload = this.verifyRefreshToken(refreshToken);

    // Check if session exists
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.userId, payload.userId),
    });

    if (!session) {
      throw new Error('Session not found');
    }

    // Generate new access token
    const accessToken = jwt.sign(
      {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return { accessToken };
  }

  /**
   * Logout user
   */
  static async logout(userId: string, refreshToken: string) {
    // Delete session
    await db.delete(sessions).where(eq(sessions.userId, userId));

    return { message: 'Logged out successfully' };
  }

  /**
   * Create session
   */
  private static async createSession(userId: string, refreshToken: string) {
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await db.insert(sessions).values({
      userId,
      tokenHash,
      expiresAt,
    });
  }

  /**
   * Clean expired sessions
   */
  static async cleanExpiredSessions() {
    const now = new Date();
    await db.delete(sessions).where(eq(sessions.expiresAt, now));
  }
}
