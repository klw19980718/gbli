'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// 支持的语言
const languages = [
  { code: 'zh', label: '中文', icon: '🇨🇳' },
  { code: 'en', label: 'English', icon: '🇺🇸' }
];

export default function SimpleLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  // 从当前路径中提取语言代码
  const currentLocale = pathname.split('/')[1] || 'zh';
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  // 切换语言
  const changeLanguage = (locale: string) => {
    if (locale === currentLocale) return;
    
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="px-3 py-2 rounded-lg border border-gray-700 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-all duration-200 hover:border-[#FFD300]"
          size="sm"
        >
          <Globe className="mr-2 h-4 w-4 text-[#FFD300]" />
          <span className="mr-1">{currentLanguage.icon}</span>
          <span className="mr-1">{currentLanguage.label}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#1A1A1A] border border-gray-700 text-white min-w-[150px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={cn(
              "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#252525]",
              currentLocale === language.code && "bg-[#252525]"
            )}
            onClick={() => changeLanguage(language.code)}
          >
            <span>{language.icon}</span>
            <span>{language.label}</span>
            {currentLocale === language.code && (
              <Check className="ml-auto h-4 w-4 text-[#FFD300]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 