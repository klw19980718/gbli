"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';
import { createTranslator } from '@/lib/i18n';

interface ResultDisplayProps {
  isLoading: boolean;
  imageUrl: string | null;
  onRemake: () => void; // 重新制作的回调
  onDownload: () => void; // 下载的回调 (需要实现具体逻辑)
}

export function ResultDisplay({ isLoading, imageUrl, onRemake, onDownload }: ResultDisplayProps) {
  const { locale = 'zh' } = useParams() as { locale?: string };
  const t = createTranslator(locale);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isLoading) {
      setProgress(0); // 重置进度
      // 模拟进度增加
      let currentProgress = 0;
      timer = setInterval(() => {
        currentProgress += Math.random() * 20 + 5; // 随机增加 5-25
        if (currentProgress >= 100) {
          setProgress(100);
          clearInterval(timer!); // 清除定时器
        } else {
          setProgress(currentProgress);
        }
      }, 300); // 每 300ms 更新一次
    } else {
      setProgress(100); // 加载完成直接设为 100
    }

    return () => {
      if (timer) {
        clearInterval(timer); // 组件卸载时清除定时器
      }
    };
  }, [isLoading]);

  return (
    <div className="relative z-40 mt-8 w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto bg-[#1A1A1A] rounded-xl shadow-lg p-4 md:p-6 border border-[rgba(255,255,255,0.1)] animate-fade-in">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        {t('ResultDisplay.title')}
      </h3>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <Progress value={progress} className="w-full max-w-md mb-4 h-2 bg-[#252525]" />
          <p className="text-sm text-[rgba(255,255,255,0.6)]">
            {t('ResultDisplay.loading')}
          </p>
        </div>
      )}

      {!isLoading && imageUrl && (
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-video max-w-xl rounded-lg overflow-hidden mb-4 border border-[rgba(255,255,255,0.1)]">
            <Image 
              src={imageUrl} 
              alt={t('ResultDisplay.title')} 
              fill 
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="flex gap-3 mt-2">
            <Button 
              variant="secondary"
              size="sm"
              onClick={onRemake} 
              className="bg-[#252525] text-[#FFD300] hover:bg-[#333] rounded-md px-4 py-1.5 text-xs font-normal border-none"
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              {t('Buttons.remake')}
            </Button>
            <Button 
              size="sm"
              onClick={onDownload} 
              className="bg-[#FFD300] hover:bg-[#e6b400] text-[#0F0F0F] rounded-md px-4 py-1.5 text-xs font-normal"
            >
              <Download className="mr-1 h-4 w-4" />
              {t('Buttons.download')}
            </Button>
          </div>
        </div>
      )}
      
      {!isLoading && !imageUrl && (
         <div className="flex flex-col items-center justify-center min-h-[200px]">
           <p className="text-sm text-[rgba(255,255,255,0.6)]">{t('ResultDisplay.clickToGenerate')}</p>
        </div>
      )} 
    </div>
  );
} 