import { redirect } from 'next/navigation';

// 默认语言
const defaultLocale = 'zh';

export default function Home() {
  // 重定向到默认语言路径
  redirect(`/${defaultLocale}`);
}
