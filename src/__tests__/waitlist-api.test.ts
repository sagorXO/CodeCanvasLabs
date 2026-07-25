import { describe, it, expect } from 'vitest';
import { validateEmail, processWaitlistSubmission, findWaitlistEntry } from '../lib/waitlist';

describe('Waitlist Logic & Validation Unit Tests', () => {
  it('should validate valid email addresses correctly', () => {
    expect(validateEmail('dev@company.com')).toBe(true);
    expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('user@domain')).toBe(false);
  });

  it('should process a new valid waitlist registration with unique IP', () => {
    const randomEmail = `test_${Math.random().toString(16).slice(2)}@codecanvas.io`;
    const res = processWaitlistSubmission(
      {
        email: randomEmail,
        role: 'Full Stack Engineer',
        use_case: 'Visual Pipelines'
      },
      `192.168.1.${Math.floor(Math.random() * 200) + 10}`
    );

    expect(res.status).toBe(201);
    expect(res.success).toBe(true);
    expect(res.data).toBeDefined();
    expect(res.data?.email).toBe(randomEmail);
    expect(res.data?.waitlist_position).toBeGreaterThanOrEqual(3842);
    expect(res.data?.referral_code).toContain('CANVAS-');
  });

  it('should lookup entry by email or referral code correctly', () => {
    const entry = findWaitlistEntry('demo.dev@codecanvas.io');
    expect(entry).not.toBeNull();
    expect(entry?.referral_code).toBe('CANVAS-3842');

    const byRef = findWaitlistEntry('CANVAS-3842');
    expect(byRef).not.toBeNull();
    expect(byRef?.email).toBe('demo.dev@codecanvas.io');
  });

  it('should return existing entry if email already registered', () => {
    const email = 'demo.dev@codecanvas.io';
    const res = processWaitlistSubmission({ email }, `10.0.0.${Math.floor(Math.random() * 200) + 10}`);

    expect(res.status).toBe(200);
    expect(res.success).toBe(true);
    expect(res.data?.email).toBe(email);
    expect(res.data?.waitlist_position).toBe(3842);
  });

  it('should reject invalid email with 400 Bad Request', () => {
    const res = processWaitlistSubmission({ email: 'bad-email-format' }, '172.16.0.1');
    expect(res.status).toBe(400);
    expect(res.success).toBe(false);
    expect(res.error).toBe('Please enter a valid email address');
  });
});
