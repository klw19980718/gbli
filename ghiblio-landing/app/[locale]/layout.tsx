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
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 简单验证语言是否支持
  if (!locales.includes(locale)) {
    // 假设中文是默认语言
    locale = 'zh';
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 