import { NextResponse } from 'next/server';
import { processWaitlistSubmission, findWaitlistEntry } from '@/lib/waitlist';
import { WaitlistRequest } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
    const body: WaitlistRequest = await req.json();
    const result = processWaitlistSubmission(body, ip);

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { status: 400, success: false, error: 'Query parameter (email or referral_code) is required' },
        { status: 400 }
      );
    }

    const entry = findWaitlistEntry(query);

    if (!entry) {
      return NextResponse.json(
        { status: 404, success: false, error: 'No waitlist entry found matching your query' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: entry
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 500, success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
