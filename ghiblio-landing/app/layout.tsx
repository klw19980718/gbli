import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ghiblio AI - 照片与文字转吉卜力风格插画 | AI艺术生成',
  description: '使用 Ghiblio AI，将您的照片或文字描述一键转化为迷人的吉卜力动画风格插画。体验先进 AI 模型，免费创作独特艺术作品。',
  keywords: [
    '吉卜力风格', 'AI绘画', '照片转插画', '文字生成图片', '图生图', 
    '图像生成', 'AI艺术生成器', '动漫风格转换', '插画创作', 'Ghiblio AI', 
    'AI illustration', 'photo to illustration', 'text to image' 
  ],
  authors: [{ name: 'Ghiblio AI Team' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
