import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const payload = {
    name: form.get('name'),
    email: form.get('email'),
    usecase: form.get('usecase'),
    receivedAt: new Date().toISOString()
  };
  console.log('Waitlist submission:', payload);
  return NextResponse.json({ ok: true });
}
