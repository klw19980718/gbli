'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { createTranslator } from '@/lib/i18n';
import { AuthModal } from '@/components/auth/auth-modal';

interface SignInButtonProps {
  locale: string;
}

export function SignInButton({ locale = 'zh' }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signIn } = useSignIn();
  const t = createTranslator(locale);
  
  // 注释掉调试信息
  // console.log('SignInButton locale:', locale);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button 
        size="sm"
        className="bg-[#FFD300] hover:bg-[#FFD300]/80 text-[#0F0F0F] text-xs"
        onClick={handleOpenModal}
        disabled={isLoading}
      >
        <User size={14} className="mr-1" />
        {t('Buttons.login')}
      </Button>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        locale={locale}
      />
    </>
  );
} 