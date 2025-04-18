import React from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

// 支持的语言列表
const locales = ['en', 'zh'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale } // locale is automatically passed by Next.js
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 简单验证语言是否支持 (optional, middleware should handle redirection)
  // if (!locales.includes(locale)) {
  //   locale = 'zh'; // Default to Chinese if locale is invalid (though middleware should prevent this)
  // }

  // LocaleLayout should only return its children, as the root layout handles <html> and <body>
  return <>{children}</>;
} 