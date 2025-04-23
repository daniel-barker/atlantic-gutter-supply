import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(_request: NextRequest) {
  // Redirect from /admin to /admin/dashboard
  redirect('/admin/dashboard');
}
