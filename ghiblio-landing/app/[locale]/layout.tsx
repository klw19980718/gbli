import React from 'react';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

// 支持的语言列表
const locales = ['en', 'zh'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// Make the layout component async
export default async function LocaleLayout({
  children,
  params // Accept the params object directly
}: {
  children: React.ReactNode;
  params: { locale: string }; // Keep the type definition
}) {
  // Await params before accessing its properties
  const { locale } = await params;

  // 简单验证语言是否支持 (optional, middleware should handle redirection)
  // if (!locales.includes(locale)) {
  //   locale = 'zh'; // Default to Chinese if locale is invalid
  // }

  // LocaleLayout should only return its children
  return <>{children}</>;
} 