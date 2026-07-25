import fs from 'fs';
import path from 'path';
import { WaitlistRequest, WaitlistEntry, WaitlistApiResponse } from './types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'waitlist.json');

// In-memory fallback initial dataset
const INITIAL_ENTRIES: WaitlistEntry[] = [
  {
    id: "usr_98a7f20c",
    email: "demo.dev@codecanvas.io",
    role: "Software Engineer",
    use_case: "Workflow Automation",
    waitlist_position: 3842,
    referral_code: "CANVAS-3842",
    created_at: "2026-07-25T12:00:00Z"
  }
];

let memoryWaitlist: WaitlistEntry[] = loadWaitlistFromFile();

function loadWaitlistFromFile(): WaitlistEntry[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Waitlist Storage] Unable to read from data/waitlist.json, using in-memory store.', err);
  }
  return [...INITIAL_ENTRIES];
}

function persistWaitlistToFile(): void {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(memoryWaitlist, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Waitlist Storage] Unable to persist to data/waitlist.json, keeping in-memory.', err);
  }
}

// In-Memory Rate Limiting Tracker (IP -> Timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Filter out timestamps outside window
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - validTimestamps.length };
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function generateWaitlistEntry(request: WaitlistRequest): WaitlistEntry {
  const position = 3842 + memoryWaitlist.length;
  const randomHex = Math.random().toString(16).substring(2, 10);
  const id = `usr_${randomHex}`;
  const referralCode = `CANVAS-${position}`;

  const newEntry: WaitlistEntry = {
    id,
    email: request.email.trim().toLowerCase(),
    role: request.role || 'Software Engineer',
    use_case: request.use_case || 'Workflow Automation',
    waitlist_position: position,
    referral_code: referralCode,
    created_at: new Date().toISOString()
  };

  memoryWaitlist.push(newEntry);
  persistWaitlistToFile();
  return newEntry;
}

export function processWaitlistSubmission(request: WaitlistRequest, ip: string = '127.0.0.1'): WaitlistApiResponse {
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return {
      status: 429,
      success: false,
      error: 'Too many registration requests. Please wait 60 seconds before trying again.'
    };
  }

  if (!request || !request.email) {
    return {
      status: 400,
      success: false,
      error: 'Email address is required'
    };
  }

  if (!validateEmail(request.email)) {
    return {
      status: 400,
      success: false,
      error: 'Please enter a valid email address'
    };
  }

  // Check existing
  const existing = memoryWaitlist.find(
    entry => entry.email === request.email.trim().toLowerCase()
  );

  if (existing) {
    return {
      status: 200,
      success: true,
      data: existing
    };
  }

  const entry = generateWaitlistEntry(request);

  return {
    status: 201,
    success: true,
    data: entry
  };
}

export function findWaitlistEntry(query: string): WaitlistEntry | null {
  if (!query) return null;
  const cleaned = query.trim().toLowerCase();
  
  return memoryWaitlist.find(
    entry => entry.email === cleaned || entry.referral_code.toLowerCase() === cleaned || entry.id.toLowerCase() === cleaned
  ) || null;
}

export function getWaitlistEntries(): WaitlistEntry[] {
  return memoryWaitlist;
}
