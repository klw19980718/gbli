'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createTranslator } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { locale = 'zh' } = useParams() as { locale?: string };
  const { isLoaded, isSignedIn, user } = useUser();
  const t = createTranslator(locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 检查用户是否已登录
    if (isLoaded) {
      setLoading(false);
      if (!isSignedIn) {
        // 如果未登录，重定向到首页
        router.push(`/${locale}`);
      }
    }
  }, [isLoaded, isSignedIn, router, locale]);

  // 获取用户头像或首字母
  const initials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user?.emailAddresses && user?.emailAddresses[0] 
      ? user.emailAddresses[0].emailAddress[0].toUpperCase()
      : 'U';

  // 获取用户邮箱
  const userEmail = user?.emailAddresses && user?.emailAddresses[0] 
    ? user.emailAddresses[0].emailAddress 
    : '';

  // 加载状态
  if (loading || !isLoaded || !isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FFD300] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg">{locale === 'zh' ? '加载中...' : 'Loading...'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="mb-8">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white/70 hover:text-white hover:bg-white/10 px-2"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {locale === 'zh' ? '返回' : 'Back'}
          </Button>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-white">
            {locale === 'zh' ? '个人资料' : 'My Profile'}
          </h1>
          
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-8 border border-[rgba(255,255,255,0.1)]">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback className="text-xl">{initials}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-[rgba(255,255,255,0.6)] mb-4">{userEmail}</p>
                
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="text-[rgba(255,255,255,0.6)]">
                      {locale === 'zh' ? 'Clerk 用户ID:' : 'Clerk User ID:'}
                    </span>
                    <span className="text-sm font-mono bg-[#252525] px-2 py-1 rounded overflow-auto">
                      {user.id}
                    </span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="text-[rgba(255,255,255,0.6)]">
                      {locale === 'zh' ? '账户创建时间:' : 'Account Created:'}
                    </span>
                    <span>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString(
                        locale === 'zh' ? 'zh-CN' : 'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      ) : ''}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <span className="text-[rgba(255,255,255,0.6)]">
                      {locale === 'zh' ? '认证方式:' : 'Authentication:'}
                    </span>
                    <span className="capitalize">
                      {user.externalAccounts && user.externalAccounts.length > 0
                        ? user.externalAccounts[0].provider.includes('google')
                          ? 'Google'
                          : user.externalAccounts[0].provider.includes('github')
                          ? 'GitHub'
                          : user.externalAccounts[0].provider
                        : locale === 'zh' ? '电子邮件' : 'Email'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] rounded-xl p-6 mb-8 border border-[rgba(255,255,255,0.1)]">
            <h2 className="text-xl font-bold mb-4">
              {locale === 'zh' ? '账户信息' : 'Account Information'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[rgba(255,255,255,0.6)] mb-1">
                  {locale === 'zh' ? '名字' : 'First Name'}
                </label>
                <div className="bg-[#252525] px-3 py-2 rounded">
                  {user.firstName || (locale === 'zh' ? '未设置' : 'Not set')}
                </div>
              </div>
              
              <div>
                <label className="block text-[rgba(255,255,255,0.6)] mb-1">
                  {locale === 'zh' ? '姓氏' : 'Last Name'}
                </label>
                <div className="bg-[#252525] px-3 py-2 rounded">
                  {user.lastName || (locale === 'zh' ? '未设置' : 'Not set')}
                </div>
              </div>
              
              <div>
                <label className="block text-[rgba(255,255,255,0.6)] mb-1">
                  {locale === 'zh' ? '电子邮件' : 'Email'}
                </label>
                <div className="bg-[#252525] px-3 py-2 rounded">
                  {userEmail}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={() => window.open('https://accounts.clerk.dev/user/user_2XTx0CMNzpAK9QgO3hVDu8IEcUi/settings/account', '_blank')}
                className="bg-[#FFD300] hover:bg-[#FFD300]/80 text-black"
              >
                {locale === 'zh' ? '前往 Clerk 管理账户' : 'Manage Account on Clerk'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 