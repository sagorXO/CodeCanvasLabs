import { describe, it, expect } from 'vitest';
import { validateEmail, processWaitlistSubmission } from '../lib/waitlist';

describe('Waitlist Logic & Validation Unit Tests', () => {
  it('should validate valid email addresses correctly', () => {
    expect(validateEmail('dev@company.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('user@domain')).toBe(false);
  });

  it('should process a valid waitlist registration', () => {
    const res = processWaitlistSubmission({
      email: 'newdeveloper@codecanvas.io',
      role: 'Full Stack Engineer',
      use_case: 'Visual Pipelines'
    });

    expect(res.status).toBe(201);
    expect(res.success).toBe(true);
    expect(res.data).toBeDefined();
    expect(res.data?.email).toBe('newdeveloper@codecanvas.io');
    expect(res.data?.waitlist_position).toBeGreaterThanOrEqual(3842);
    expect(res.data?.referral_code).toContain('CANVAS-');
  });

  it('should return existing entry if email already registered', () => {
    const email = 'demo.dev@codecanvas.io';
    const res = processWaitlistSubmission({ email });

    expect(res.status).toBe(200);
    expect(res.success).toBe(true);
    expect(res.data?.email).toBe(email);
    expect(res.data?.waitlist_position).toBe(3842);
  });

  it('should reject invalid email with 400 Bad Request', () => {
    const res = processWaitlistSubmission({ email: 'bad-email-format' });
    expect(res.status).toBe(400);
    expect(res.success).toBe(false);
    expect(res.error).toBe('Please enter a valid email address');
  });
});
