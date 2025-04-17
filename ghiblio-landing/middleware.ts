import { NextRequest, NextResponse } from 'next/server';

// 支持的语言
const locales = ['en', 'zh'];
// 默认语言
const defaultLocale = 'zh';

// 静态资源文件正则
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 不处理静态资源、API 路由和已有语言前缀的路径
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname) ||
    locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  ) {
    return;
  }

  // 从 cookie 或 Accept-Language 头获取首选语言
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const acceptLanguage = request.headers.get('accept-language');
  
  let locale = defaultLocale;
  
  // 优先使用 cookie 中的语言
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } 
  // 然后尝试使用 Accept-Language 头
  else if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(item => item.split(';')[0].trim())
      .find(item => locales.includes(item.substring(0, 2)));
    
    if (preferredLocale) {
      locale = preferredLocale.substring(0, 2);
    }
  }

  // 重定向到带有语言前缀的 URL
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

// 只应用中间件到不带语言前缀的路径
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
}; 