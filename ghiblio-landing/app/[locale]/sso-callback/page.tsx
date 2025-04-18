'use client';

import React from 'react';
import { useEffect } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface SSOCallbackProps {
  params: {
    locale: string;
  };
}

export default function SSOCallback({ params }: SSOCallbackProps) {
  // 使用 React.use() 解包 params 对象
  const resolvedParams = React.use(params as any) as { locale: string };
  const locale = resolvedParams.locale;
  
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    // 确保Clerk已加载且在客户端环境
    if (!isSignInLoaded || !isSignUpLoaded || typeof window === 'undefined') {
      return;
    }

    // 处理回调
    async function handleCallback() {
      try {
        if (!window.location.search) {
          router.push('/');
          return;
        }

        const params = new URLSearchParams(window.location.search);
        
        // 检查是否有认证票据
        if (!params.has('__clerk_ticket')) {
          router.push('/');
          return;
        }

        const ticket = params.get('__clerk_ticket') || '';

        // 尝试处理登录回调
        if (signIn) {
          try {
            await signIn.create({
              strategy: "ticket",
              ticket
            });
            
            router.push('/');
            return;
          } catch (err) {
            // 如果不是登录票据，可能是注册票据
            console.log('Not a sign-in ticket, trying sign-up...');
          }
        }

        // 尝试处理注册回调
        if (signUp) {
          try {
            await signUp.create({
              strategy: "ticket",
              ticket
            });
            
            router.push('/');
            return;
          } catch (err) {
            console.error('Failed to process sign-up ticket', err);
            router.push('/');
          }
        }
      } catch (error) {
        console.error('SSO回调处理失败:', error);
        router.push('/');
      }
    }

    handleCallback();
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
        <h2 className="text-xl font-semibold">
          {locale === 'zh' 
            ? '正在处理您的登录...' 
            : 'Processing your login...'}
        </h2>
      </div>
    </div>
  );
} 