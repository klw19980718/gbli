'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@clerk/nextjs/server';

export function ClerkProviderWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // 添加调试日志
  useEffect(() => {
    // 确保在客户端环境
    if (typeof window === 'undefined') return;
    
    console.log('ClerkProvider初始化 - 时间:', new Date().toISOString());
    try {
      console.log('存在localStorage中的Clerk相关键:', 
        Object.keys(localStorage).filter(key => 
          key.includes('clerk') || key.includes('__clerk') || key.includes('_clerk')
        )
      );
    } catch (e) {
      console.log('无法读取localStorage', e);
    }
    
    // 检查URL中是否有会话相关参数
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('__clerk_ticket') || urlParams.has('__clerk_status')) {
      console.log('检测到Clerk URL参数:', Object.fromEntries(urlParams));
    }

    // 监听存储变化，检测会话状态变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.includes('clerk') || e.key?.includes('__clerk')) {
        console.log('Clerk存储变化:', e.key, '旧值长度:', e.oldValue?.length || 0, '新值长度:', e.newValue?.length || 0);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <ClerkProvider
      publishableKey="pk_test_bWFnbmV0aWMtY29yYWwtNzcuY2xlcmsuYWNjb3VudHMuZGV2JA"
    >
      {children}
    </ClerkProvider>
  );
} 