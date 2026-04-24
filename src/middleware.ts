import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Solo auditar rutas que empiezan con /admin
  if (path.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')?.value;

    // Si no hay sesión válida, redirigir al login
    if (session !== 'admin_authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configurar el "matcher" para optimizar dónde corre el middleware.
// Correrá en todas las rutas de `/admin` y sus subcarpetas.
export const config = {
  matcher: ['/admin/:path*'],
};
