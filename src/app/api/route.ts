"use server"
import { redis } from '@/lib';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get('state')
  if (state) {
    const vp = await redis.get(`waltid-state-${state}`)
    if (vp) {
      return new Response(vp, { headers: { 'content-type': 'application/json' } })
    }
  }
  return new Response('', { status: 404 })
}


export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    const headerSplit = authHeader.split('Bearer ')
    if (headerSplit.length > 1) {
      const authToken = headerSplit[1]
      if (authToken === process.env.WALTID_STATUS_CALLBACK_API_KEY) {
        const jsonBody = await request.json();
        if (jsonBody['verificationResult'] && jsonBody['verificationResult'] === true) {
          const state = jsonBody.id
          if (state) {
            await redis.set(`waltid-state-${state}`, JSON.stringify(jsonBody), {
              expiration: {
                type: 'EX', value: 60 * 5 // valid for 5 minutes
              }
            });
            console.log(jsonBody)
          }
          return new Response()
        }
      }
    }
  }
  return new Response(undefined, { status: 401 })
}