'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD is not set in environment variables');
  }

  if (password === adminPassword) {
    // Generate a simple token (in a real app, use a JWT or secure session ID)
    const token = 'admin_authenticated'; 
    const cookieStore = await cookies();
    
    // Set cookie for 7 days
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/admin',
    });

    return { success: true };
  }

  return { success: false, error: 'Contraseña incorrecta' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}
