'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { createTranslator } from '@/lib/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function AuthModal({ isOpen, onClose, locale = 'zh' }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const t = createTranslator(locale);
  
  // 注释掉调试信息
  // console.log('AuthModal locale:', locale);
  // console.log('翻译测试:', t('AuthModal.title'), t('AuthModal.subtitle'));

  useEffect(() => {
    // 确保在客户端环境
    if (typeof window === 'undefined') return;
    
    // 当模态框打开时禁止滚动
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignInWithOAuth = async (strategy: 'oauth_google' | 'oauth_github') => {
    try {
      setIsLoading(true);
      if (!signIn) return;
      
      console.log(`开始${strategy === 'oauth_google' ? '谷歌' : 'GitHub'}登录流程...`);
      console.log('当前语言:', locale);
      
      // 构建完整的回调URL
      if (typeof window === 'undefined') return;
      const origin = window.location.origin;
      const redirectUrl = `${origin}/sso-callback`;
      const redirectUrlComplete = `${origin}/${locale}`;
      
      console.log('重定向URL:', redirectUrl);
      console.log('完成后重定向URL:', redirectUrlComplete);
      
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl,
        redirectUrlComplete
      });
      
      console.log('已发送重定向请求，等待跳转...');
    } catch (error) {
      console.error(`${strategy === 'oauth_google' ? '谷歌' : 'GitHub'}登录错误:`, error);
      setIsLoading(false);
    }
  };

  const handleContinueWithEmail = async () => {
    if (!emailAddress) return;
    
    try {
      setIsLoading(true);
      if (isSignUp) {
        // 注册新用户
        await signUp?.create({
          emailAddress
        });
        
        // 准备邮箱验证
        await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
        
        // 显示验证码输入界面
        setVerificationStep(true);
      } else {
        // 登录已有用户
        if (signIn) {
          try {
            const response = await signIn.create({
              identifier: emailAddress
            });
            
            // 获取第一个邮箱ID
            const firstFactor = response.supportedFirstFactors?.find(
              factor => factor.strategy === 'email_code'
            );
            
            if (firstFactor && 'emailAddressId' in firstFactor) {
              await signIn.prepareFirstFactor({
                strategy: 'email_code',
                emailAddressId: firstFactor.emailAddressId
              });
              
              // 显示验证码输入界面
              setVerificationStep(true);
            }
          } catch (error: any) {
            // 处理"找不到账户"错误
            if (error.message?.includes("Couldn't find your account") || 
                error.message?.includes("找不到您的账户") ||
                error.errors?.[0]?.message?.includes("couldn't be found")) {
              // 提示用户此邮箱未注册，切换到注册模式
              setIsSignUp(true);
              alert(t('AuthModal.accountNotFound'));
            } else {
              throw error; // 重新抛出其他类型的错误
            }
          }
        }
      }
    } catch (error) {
      console.error(isSignUp ? '注册错误:' : '登录错误:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    console.log('验证码点击开始，验证码值:', verificationCode, '注册模式:', isSignUp);
    try {
      setIsLoading(true);
      
      if (isSignUp) {
        // 验证注册用户的邮箱
        try {
          console.log('尝试验证注册邮箱...');
          const verification = await signUp?.attemptEmailAddressVerification({
            code: verificationCode
          });
          
          console.log('注册验证结果:', verification);
          
          // 完成注册并登录
          if (verification?.status === 'complete') {
            console.log('验证完成，状态: complete, 会话ID:', verification.createdSessionId);
            const { createdSessionId } = verification;
            if (createdSessionId) {
              // 注册成功且创建了会话
              console.log('创建会话成功，准备跳转到首页');
              if (typeof window !== 'undefined') {
                window.location.href = '/';
              }
            } else {
              // 注册成功但需要额外步骤
              console.log('注册成功但没有会话ID，显示成功消息');
              alert(t('AuthModal.verificationSuccess'));
              onClose();
            }
          } else {
            console.log('验证未完成，状态:', verification?.status);
          }
        } catch (error: any) {
          // 检查是否是"已验证"错误
          console.error('注册验证异常:', error);
          if (error.message && (
              error.message.includes('already been verified') || 
              error.message.includes('已验证')
            )) {
            console.log('邮箱已验证过，准备跳转');
            alert(t('AuthModal.alreadyVerified'));
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }
            return;
          }
          throw error; // 重新抛出其他类型的错误
        }
      } else {
        // 验证登录用户
        try {
          console.log('尝试验证登录...');
          const result = await signIn?.attemptFirstFactor({
            strategy: 'email_code',
            code: verificationCode
          });
          
          console.log('登录验证结果:', result);
          
          if (result?.status === 'complete') {
            // 登录成功
            console.log('登录成功，准备跳转到首页');
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }
          } else {
            console.log('登录验证未完成，状态:', result?.status);
          }
        } catch (error: any) {
          // 检查是否是"已验证"错误
          console.error('登录验证异常:', error);
          if (error.message && (
              error.message.includes('already been verified') || 
              error.message.includes('已验证')
            )) {
            console.log('验证码已使用过，准备跳转');
            alert(t('AuthModal.alreadyVerified'));
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }
            return;
          }
          throw error; // 重新抛出其他类型的错误
        }
      }
    } catch (error) {
      console.error('验证过程中出现错误:', error);
      alert(t('AuthModal.verificationFailed'));
    } finally {
      setIsLoading(false);
      console.log('验证过程结束');
    }
  };

  // 显示验证码输入界面
  if (verificationStep) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm !m-0 !p-0 w-screen h-screen">
        <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl relative mx-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('AuthModal.verificationTitle')}
            </h2>
            <p className="text-gray-600 mt-1">
              {t('AuthModal.verificationSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                {t('AuthModal.verificationCodeLabel')}
              </label>
              <input
                type="text"
                id="verificationCode"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD300]"
                placeholder={t('AuthModal.verificationCodePlaceholder')}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              className="w-full bg-[#FFD300] text-black py-2.5 rounded-lg hover:bg-[#FFD300]/80 flex items-center justify-center"
              onClick={handleVerifyCode}
              disabled={isLoading || !verificationCode}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : null}
              {isLoading ? t('AuthModal.processingButton') : t('AuthModal.verifyButton')}
            </button>

            <p className="text-center text-sm text-gray-500">
              {t('AuthModal.noCodeReceived')}{' '}
              <button
                className="text-[#FFD300] hover:underline"
                onClick={handleContinueWithEmail}
                disabled={isLoading}
              >
                {t('AuthModal.resendCode')}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 显示登录/注册界面
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm !m-0 !p-0 w-screen h-screen">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignUp ? t('AuthModal.signupTitle') : t('AuthModal.title')}
          </h2>
          <p className="text-gray-600 mt-1">
            {isSignUp ? t('AuthModal.signupSubtitle') : t('AuthModal.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          <button
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => handleSignInWithOAuth('oauth_github')}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" />
            </svg>
            <span>GitHub</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => handleSignInWithOAuth('oauth_google')}
            disabled={isLoading}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span>Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t('AuthModal.orDivider')}</span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('AuthModal.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD300]"
              placeholder={t('AuthModal.emailPlaceholder')}
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* 添加 Clerk CAPTCHA 元素 */}
          <div id="clerk-captcha" className="mt-2"></div>

          <button
            className="w-full bg-[#FFD300] text-black py-2.5 rounded-lg hover:bg-[#FFD300]/80 flex items-center justify-center"
            onClick={handleContinueWithEmail}
            disabled={isLoading || !emailAddress}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : null}
            {isLoading ? t('AuthModal.processingButton') : t('AuthModal.continueButton')}
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            {isSignUp ? t('AuthModal.haveAccount') : t('AuthModal.noAccount')}{' '}
            <button
              className="text-[#FFD300] font-medium hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isLoading}
            >
              {isSignUp ? t('AuthModal.loginLink') : t('AuthModal.signupLink')}
            </button>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center">
            <div className="text-xs text-gray-500 flex items-center">
              <span>{t('AuthModal.securedBy')}</span>
              <svg className="h-4 ml-1 opacity-70" viewBox="0 0 416 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M59.97 28.856c15.314 0 28.293 12.9 28.293 28.218 0 15.238-12.979 28.218-28.293 28.218-15.315 0-28.294-12.98-28.294-28.218 0-15.238 12.9-28.218 28.294-28.218zm0 78.367c27.816 0 50.131-22.388 50.131-50.149 0-27.76-22.315-50.069-50.13-50.069-27.816 0-50.132 22.309-50.132 50.07 0 27.76 22.316 50.148 50.131 50.148z" fill="currentColor"/>
                <path d="M113.597 27.133H99.685c-1.565 0-2.574 1.164-2.574 2.328l-.318 54.678c0 1.245 1.327 2.489 2.893 2.489h14.075c1.327 0 2.574-1.244 2.574-2.489l-.476-54.678c0-1.164-1.01-2.328-2.575-2.328h.31v-.08h.001zM132.492 42.371h13.757c1.408 0 2.337 1.005 2.337 2.01v40.077c0 1.005-1.01 2.01-2.337 2.01h-13.757c-1.328 0-2.416-1.005-2.416-2.01V44.382c0-1.005 1.088-2.01 2.416-2.01zm6.858-33.46c4.831 0 8.766 3.935 8.766 8.847 0 4.911-3.935 8.846-8.766 8.846-4.833 0-8.768-3.935-8.846-8.846 0-4.912 3.935-8.846 8.768-8.846zM203.492 60.421c0-10.505-5.922-19.272-17.134-19.272-6.452 0-10.626 2.81-13.12 6.663h-.16v-4.733c0-.923-1.006-1.766-2.013-1.766h-12.831c-1.087 0-2.093.843-2.093 1.766v41.84c0 .923 1.006 1.767 2.093 1.767h13.278c1.087 0 2.094-.844 2.094-1.767V65.234c0-5.258 3.13-9.248 8.527-9.248 5.317 0 7.815 3.99 7.815 9.163v19.763c0 .923 1.008 1.767 2.095 1.767h13.277c1.088 0 2.094-.844 2.094-1.767V60.42h-3.922zM182.343 8.911h-13.278c-1.087 0-2.094.844-2.094 1.767v16.968h-.159c-2.575-3.852-6.694-6.663-13.12-6.663-11.212 0-17.134 8.767-17.134 19.272v25.924h3.922V60.42c0-10.505 5.922-19.272 17.134-19.272 6.452 0 10.626 2.81 13.12 6.663h.16v-4.733c0-.923 1.006-1.766 2.013-1.766h12.831c1.087 0 2.093.843 2.093 1.766v41.84c0 .923-1.006 1.767-2.093 1.767h-13.278c-1.087 0-2.094-.844-2.094-1.767V65.234c0-5.258-3.13-9.248-8.527-9.248-5.317 0-7.815 3.99-7.815 9.163v19.763c0 .923-1.008 1.767-2.095 1.767h-13.277c-1.088 0-2.094-.844-2.094-1.767V42.927h-3.921V84.85c0 .923 1.006 1.767 2.094 1.767h13.277c1.087 0 2.094-.844 2.094-1.767V65.15c0-5.174 2.499-9.164 7.815-9.164 5.397 0 8.527 3.99 8.527 9.248v19.614c0 .923 1.007 1.767 2.094 1.767h13.278c1.088 0 2.094-.844 2.094-1.767v-41.84c0-.923-1.006-1.766-2.094-1.766h-12.83c-1.088 0-2.093.843-2.093 1.766v4.733h-.16c-2.495-3.853-6.669-6.663-13.12-6.663-11.212 0-17.134 8.767-17.134 19.272 0-10.505 5.922-19.272 17.134-19.272 6.451 0 10.625 2.81 13.12 6.663h.16V10.678c0-.923 1.006-1.767 2.093-1.767h13.278c1.087 0 2.094.844 2.094 1.767v16.968h3.92V10.678c0-.923-1.006-1.767-2.094-1.767zM286.728 63.144c0 12.11-10.04 22.08-22.315 22.16h-.239c-6.133-.08-11.53-2.41-15.544-6.822l-.16-.16-1.087-1.366-.08-.08c-3.287-4.572-5.056-10.15-5.056-16.123 0-12.191 8.926-21.2 20.775-21.2 12.192 0 21.277 10.757 21.277 23.267v.323h-3.441v.16h3.441v.161h-35.117c1.485 7.504 7.576 12.594 15.385 12.594 6.21 0 11.689-3.933 14.34-9.748l.08-.24 3.13 1.05-.08.16c-3.13 6.901-9.839 11.376-17.415 11.376-8.927 0-16.104-6.346-17.591-14.83l-.08-.483h38.726v-.08-.008zm-38.726-3.934h34.797c-1.328-7.74-7.736-13-15.464-13-7.327 0-13.537 5.02-15.104 12.594l-.318 1.445.09-.16-.001-.878zM326.078 63.224c0 10.923-8.927 19.846-19.847 19.846-10.923 0-19.847-8.923-19.847-19.846s8.924-19.848 19.847-19.848c10.92 0 19.847 8.925 19.847 19.848zm-56.95-41.761h-13.755c-1.408 0-2.336 1.005-2.336 2.01v60.428c0 1.005 1.007 2.01 2.336 2.01h13.756c1.328 0 2.414-1.005 2.414-2.01V23.474c0-1.005-1.086-2.01-2.414-2.01zm37.103 55.182c8.449 0 15.305-6.848 15.305-15.306 0-8.46-6.856-15.307-15.305-15.307-8.447 0-15.304 6.848-15.304 15.307 0 8.458 6.857 15.306 15.304 15.306zM397.326 43.46h-12.83c-1.088 0-2.095.842-2.095 1.766v4.652h-.16c-2.494-3.934-7.972-7.659-14.583-7.659-11.212 0-20.855 8.768-20.855 22.007 0 13.32 9.643 22.167 20.855 22.167 6.61 0 12.089-3.726 14.584-7.741h.159v4.733c0 .922 1.007 1.766 2.094 1.766h12.83c1.088 0 2.095-.844 2.095-1.766V45.225c0-.924-1.007-1.767-2.094-1.767zM369.97 76.387c-6.532 0-11.868-5.342-11.868-12.594 0-7.174 5.336-12.516 11.868-12.516 6.531 0 11.867 5.342 11.867 12.516 0 7.252-5.336 12.594-11.867 12.594zM287.263 8.992h13.674c1.4 0 2.322 1.005 2.322 2.01v27.482h.01v5.422h-.01v40.077c0 1.007-1.004 2.011-2.322 2.011h-13.674c-1.32 0-2.403-1.004-2.403-2.01V11.003c0-1.006 1.082-2.01 2.403-2.01z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 