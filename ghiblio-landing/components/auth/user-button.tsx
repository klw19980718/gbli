'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createTranslator } from '@/lib/i18n';
import { UserIcon, Settings, LogOut, User } from 'lucide-react';

interface UserButtonProps {
  locale: string;
}

export function UserButton({ locale = 'zh' }: UserButtonProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const t = createTranslator(locale);

  // 添加调试输出
  console.log('用户信息:', user);

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      // 登出后会自动重定向到首页
    } catch (error) {
      console.error('登出错误:', error);
      setIsSigningOut(false);
    }
  };

  // 获取用户头像或首字母
  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`
    : user.emailAddresses && user.emailAddresses[0] 
      ? user.emailAddresses[0].emailAddress[0].toUpperCase()
      : '';

  // 获取用户邮箱或用户名
  const userEmail = user.emailAddresses && user.emailAddresses[0] 
    ? user.emailAddresses[0].emailAddress 
    : '';

  // 获取显示名称
  const displayName = user.firstName 
    ? `${user.firstName} ${user.lastName || ''}`
    : userEmail.split('@')[0] || (locale === 'en' ? 'My Account' : '我的账户');

  // 提前获取必要的翻译
  const profileText = locale === 'en' ? 'Profile' : '个人资料';
  const settingsText = locale === 'en' ? 'Settings' : '设置';
  const signOutText = locale === 'en' ? 'Sign Out' : '退出登录';
  const signingOutText = locale === 'en' ? 'Signing Out...' : '正在退出...';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center hover:opacity-80 cursor-pointer transition-opacity">
          <Avatar className="h-8 w-8 border-2 border-[#FFD300]/20 hover:border-[#FFD300]/40 transition-colors">
            <AvatarImage src={user.imageUrl} alt={displayName} />
            <AvatarFallback className="bg-[#252525] text-white">
              {initials || <User size={14} />}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white w-60">
        <div className="px-2 py-3 flex gap-3 items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.imageUrl} alt={displayName} />
            <AvatarFallback className="bg-[#252525] text-white">
              {initials || <User size={16} />}
            </AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate">{userEmail}</p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.1)]" />
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-[#252525] py-2 focus:bg-[#252525]"
          onClick={() => window.location.href = `/${locale}/profile`}
        >
          <UserIcon size={16} className="mr-2" />
          {profileText}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-[#252525] py-2 focus:bg-[#252525]"
          onClick={() => window.location.href = `/${locale}/settings`}
        >
          <Settings size={16} className="mr-2" />
          {settingsText}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.1)]" />
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-[#252525] py-2 focus:bg-[#252525] text-red-400 hover:text-red-300"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut size={16} className="mr-2" />
          {isSigningOut ? signingOutText : signOutText}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 