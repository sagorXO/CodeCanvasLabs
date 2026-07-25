import { NextResponse } from 'next/server';
import { processWaitlistSubmission } from '@/lib/waitlist';
import { WaitlistRequest } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body: WaitlistRequest = await req.json();
    const result = processWaitlistSubmission(body);

    return NextResponse.json(result, { status: result.status });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: err.message || 'Internal Server Error'
      },
      { status: 500 }
    );
  }
}
