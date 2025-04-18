"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import SimpleLanguageSwitcher from "./simple-language-switcher"
import { createTranslator } from "@/lib/i18n"
import { useUser } from '@clerk/nextjs'
import { SignInButton } from './auth/sign-in-button'
import { UserButton } from './auth/user-button'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [forceRender, setForceRender] = useState(0)
  const pathname = usePathname()
  const { locale = 'zh' } = useParams() as { locale?: string };
  const t = createTranslator(locale);
  const isHomePage = pathname === `/${locale}`;
  const { isLoaded, isSignedIn, user } = useUser();
  
  // 检查会话存储中是否有登录成功标记
  useEffect(() => {
    try {
      const loginSuccess = sessionStorage.getItem('clerk_login_success');
      const signupSuccess = sessionStorage.getItem('clerk_signup_success');
      
      if (loginSuccess || signupSuccess) {
        console.log('检测到登录/注册成功标记:', { loginSuccess, signupSuccess });
        
        // 清除标记
        sessionStorage.removeItem('clerk_login_success');
        sessionStorage.removeItem('clerk_signup_success');
        
        // 强制组件重新渲染以刷新用户状态
        const timer = setTimeout(() => {
          console.log('强制刷新用户状态...');
          setForceRender(prev => prev + 1);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.log('会话存储访问错误:', e);
    }
  }, []);
  
  // 添加状态变化日志
  useEffect(() => {
    console.log(`Navbar - 用户状态已加载 [渲染${forceRender}]:`, { 
      isSignedIn, 
      userId: user?.id,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      pathname,
      time: new Date().toISOString()
    });
    
    // 如果检测到登录状态异常，尝试刷新
    if (isLoaded && !isSignedIn && forceRender < 3) {
      const clerkItems = Object.keys(localStorage).filter(key => 
        key.includes('clerk') || key.includes('__clerk')
      );
      
      if (clerkItems.length > 0) {
        console.log('检测到Clerk存储项但未登录:', clerkItems);
        console.log('尝试再次刷新状态...');
        const timer = setTimeout(() => {
          setForceRender(prev => prev + 1);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isLoaded, isSignedIn, user, pathname, forceRender]);
  
  // 监听滚动事件，更新滚动状态
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // 初始检查
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 添加平滑滚动效果
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // 考虑导航栏高度的偏移
        behavior: 'smooth'
      })
    }
  }

  // --- 修改导航栏背景逻辑 ---
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    (isScrolled || isMenuOpen) // 如果滚动了 或者 菜单打开了
      ? "bg-[#0F0F0F] border-b border-[rgba(255,255,255,0.1)]" // 不透明背景
      : "bg-transparent border-transparent" // 透明背景
  }`;

  // --- 辅助函数：根据是否在首页生成链接属性 ---
  const getLinkProps = (sectionId: string) => {
    if (isHomePage) {
      return {
        href: `#${sectionId}`,
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, sectionId)
      };
    } else {
      return {
        href: `/${locale}#${sectionId}`,
        onClick: () => setIsMenuOpen(false) // 非首页点击链接时也关闭移动菜单
      };
    }
  };

  // 渲染认证按钮或用户按钮
  const renderAuthButton = () => {
    if (!isLoaded) {
      // 加载中显示一个占位按钮
      return (
        <Button size="sm" className="bg-[#252525] text-transparent animate-pulse text-xs">
          <span className="opacity-0">加载中</span>
        </Button>
      );
    }

    if (isSignedIn) {
      return <UserButton locale={locale} />;
    }

    return <SignInButton locale={locale} />;
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
          <span className="text-xl font-bold text-[#FFD300]">Ghiblio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          <a {...getLinkProps('features')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            {t('Navbar.features')}
          </a>
          <a {...getLinkProps('examples')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            {t('Navbar.examples')}
          </a>
          <a {...getLinkProps('pricing')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            {t('Navbar.pricing')}
          </a>
          <a {...getLinkProps('faq')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            {t('Navbar.faq')}
          </a>
          
          {/* 调整顺序，语言切换器放到登录按钮的左侧 */}
          <div className="flex items-center space-x-3">
            <SimpleLanguageSwitcher />
            {renderAuthButton()}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */} 
      {/* 将移动菜单的背景色移到 Nav 上统一处理 */} 
      {isMenuOpen && (
        <div className="md:hidden absolute w-full top-full left-0 bg-[#0F0F0F] py-3 px-4 shadow-lg border-t border-[rgba(255,255,255,0.1)]"> 
          <div className="flex flex-col space-y-3">
            <a {...getLinkProps('features')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">
              {t('Navbar.features')}
            </a>
            <a {...getLinkProps('examples')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">
              {t('Navbar.examples')}
            </a>
            <a {...getLinkProps('pricing')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">
              {t('Navbar.pricing')}
            </a>
            <a {...getLinkProps('faq')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">
              {t('Navbar.faq')}
            </a>
            
            {/* 移动端语言切换器 */}
            <div className="py-2">
              <SimpleLanguageSwitcher />
            </div>
            
            <div className="pt-1">
              {renderAuthButton()}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
