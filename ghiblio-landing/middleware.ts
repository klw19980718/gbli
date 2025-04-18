import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/request';

// 匹配静态资源和 API 路径的正则表达式
const PUBLIC_FILE = /\.(.*)$/; // Matches files with extensions (e.g., .jpg, .css)
const API_ROUTE = /^\/api\//;   // Matches paths starting with /api/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 检查是否为静态文件、API 路由或 Next.js 内部路径
  if (
    pathname.startsWith('/_next') ||
    API_ROUTE.test(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return; // 不处理这些路径
  }

  // 2. 检查路径是否已经包含支持的语言前缀
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 3. 如果路径缺少语言前缀 (例如 /, /some/page)
  if (pathnameIsMissingLocale) {
    // 重定向到默认语言对应的路径
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    // console.log(`Redirecting from ${pathname} to: ${url.pathname}`); // Debugging log
    return NextResponse.redirect(url);
  }

  // 对于已有语言前缀的路径 (例如 /en/, /zh/some/page)，不执行任何操作
  return; // Allow the request to proceed
}

export const config = {
  // 应用中间件到所有看起来像是页面的路径
  // 排除: api, _next/static, _next/image, assets文件夹, favicon.ico, sw.js
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
}; 