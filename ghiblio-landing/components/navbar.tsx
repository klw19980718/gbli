"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/';
  
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

  // --- 模拟登录处理 ---
  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    // TODO: 此处应调用实际的 Google 登录逻辑
    console.log("模拟登录状态切换为:", !isLoggedIn);
  };

  // --- 辅助函数：根据是否在首页生成链接属性 ---
  const getLinkProps = (sectionId: string) => {
    if (isHomePage) {
      return {
        href: `#${sectionId}`,
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, sectionId)
      };
    } else {
      return {
        href: `/#${sectionId}`,
        onClick: () => setIsMenuOpen(false) // 非首页点击链接时也关闭移动菜单
      };
    }
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
          <span className="text-xl font-bold text-[#FFD300]">Ghiblio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5">
          <a {...getLinkProps('features')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            功能特性
          </a>
          <a {...getLinkProps('examples')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            案例展示
          </a>
          <a {...getLinkProps('pricing')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            价格套餐
          </a>
          <a {...getLinkProps('faq')} className="text-sm text-white hover:text-[#FFD300] transition-colors">
            常见问题
          </a>
          
          {/* --- 条件渲染登录按钮或头像 --- */} 
          {isLoggedIn ? (
             <Avatar className="h-8 w-8 cursor-pointer" onClick={handleLoginToggle}> {/* 点击头像模拟登出 */} 
              {/* TODO: 替换为真实用户头像 URL */}
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" /> 
              <AvatarFallback>U</AvatarFallback> 
            </Avatar>
          ) : (
            <Button size="sm" className="bg-[#FFD300] hover:bg-[#FFD300]/80 text-[#0F0F0F] text-xs" onClick={handleLoginToggle}>
              <User size={14} className="mr-1" /> 登录/注册
            </Button>
          )}
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
            <a {...getLinkProps('features')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">功能特性</a>
            <a {...getLinkProps('examples')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">案例展示</a>
            <a {...getLinkProps('pricing')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">价格套餐</a>
            <a {...getLinkProps('faq')} className="text-sm text-white hover:text-[#FFD300] transition-colors py-1.5">常见问题</a>
            <div className="pt-1">
              {/* --- 移动端条件渲染登录按钮或头像 --- */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-2 py-1.5 cursor-pointer" onClick={() => { handleLoginToggle(); setIsMenuOpen(false); }}>
                  <Avatar className="h-7 w-7"> 
                    <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" /> 
                    <AvatarFallback>U</AvatarFallback> 
                  </Avatar>
                  <span className="text-sm text-white">已登录 (点击登出)</span>
                </div>
               ) : (
                <Button size="sm" className="bg-[#FFD300] hover:bg-[#FFD300]/80 text-[#0F0F0F] text-xs w-full" onClick={() => { handleLoginToggle(); setIsMenuOpen(false); }}>
                  <User size={14} className="mr-1" /> 登录/注册
                </Button>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
