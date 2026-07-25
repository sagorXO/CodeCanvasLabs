import { WaitlistRequest, WaitlistEntry, WaitlistApiResponse } from './types';

// In-memory fallback and helper functions for waitlist operations
let memoryWaitlist: WaitlistEntry[] = [
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
  return newEntry;
}

export function processWaitlistSubmission(request: WaitlistRequest): WaitlistApiResponse {
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

export function getWaitlistEntries(): WaitlistEntry[] {
  return memoryWaitlist;
}
