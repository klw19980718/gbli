"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadBox } from "@/components/upload-box"
import { StyleSelector } from "@/components/style-selector"
import { ResultDisplay } from "@/components/result-display"

export function HeroSection() {
  const [isStyleSelectorOpen, setIsStyleSelectorOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("style")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedComposition, setSelectedComposition] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [showResultArea, setShowResultArea] = useState(false);

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style)
    setIsStyleSelectorOpen(false)
  }

  const handleRatioSelect = (ratio: string) => {
    setSelectedRatio(ratio)
    setIsStyleSelectorOpen(false)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setIsStyleSelectorOpen(false)
  }

  const handleCompositionSelect = (composition: string) => {
    setSelectedComposition(composition)
    setIsStyleSelectorOpen(false)
  }

  const openStyleSelector = (category: string) => {
    setActiveCategory(category)
    setIsStyleSelectorOpen(true)
  }

  const handleGenerate = () => {
    console.log("开始生成...");
    setShowResultArea(true);
    setIsLoading(true);
    setResultImageUrl(null);

    setTimeout(() => {
      console.log("生成完成!");
      setIsLoading(false);
      setResultImageUrl('/images/bg.png');
    }, 3000);
  };

  const handleRemake = () => {
    console.log("重新制作");
    handleGenerate();
  };

  const handleDownload = () => {
    if (resultImageUrl) {
      console.log("下载图片:", resultImageUrl);
      const link = document.createElement('a');
      link.href = resultImageUrl;
      link.download = resultImageUrl.split('/').pop() || 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("没有可下载的图片 URL");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0F0F0F] pt-20 pb-10 md:pt-24">
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: "0" }}>
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/bg.png')", backgroundSize: "cover" }}
        ></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-[rgba(15,15,15,0.5)] to-[#0F0F0F]"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center relative z-20 w-full">
        <div className="text-center max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif text-white">
            将文字照片转化为吉卜力插画
          </h1>
          <p className="text-base md:text-lg text-[rgba(255,255,255,0.6)] mb-6">
            专业 AI 模型将照片与描述转化为梦幻画作，为创作者带来童话般插画体验。
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#FFD300]/10 text-[#FFD300]">
              ChatGPT 4.0 模型
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#FFD300]/10 text-[#FFD300]">
              支持上传照片
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#FFD300]/10 text-[#FFD300]">
              支持文字生图
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#FFD300]/20 text-[#FFD300]">
              免费体验中
            </span>
          </div>
        </div>

        <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto bg-[#1A1A1A]/90 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-[rgba(255,255,255,0.1)] relative z-30">
          <Tabs defaultValue="text-to-image" className="w-full">
            <TabsList className="grid grid-cols-3 mb-5 bg-[#252525]">
              <TabsTrigger
                value="text-to-image"
                className="text-sm data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                文生图
              </TabsTrigger>
              <TabsTrigger
                value="image-to-image"
                className="text-sm data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                图生图
              </TabsTrigger>
              <TabsTrigger
                value="batch"
                className="text-sm data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                批量生图
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text-to-image">
              <UploadBox type="text" />
            </TabsContent>
            <TabsContent value="image-to-image">
              <UploadBox type="image" />
            </TabsContent>
            <TabsContent value="batch">
              <UploadBox type="batch" />
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleGenerate} className="bg-[#FFD300] hover:bg-[#FFD300]/80 text-[#0F0F0F] px-6 py-1.5 text-base rounded-lg flex items-center gap-2">
              <span>立即生成</span>
            </Button>
          </div>
        </div>
      </div>

      {showResultArea && (
        <ResultDisplay 
          isLoading={isLoading} 
          imageUrl={resultImageUrl} 
          onRemake={handleRemake} 
          onDownload={handleDownload} 
        />
      )}

      {isStyleSelectorOpen && (
        <StyleSelector
          onClose={() => setIsStyleSelectorOpen(false)}
          onStyleSelect={handleStyleSelect}
          onRatioSelect={handleRatioSelect}
          onColorSelect={handleColorSelect}
          onCompositionSelect={handleCompositionSelect}
          initialTab={activeCategory}
        />
      )}
    </section>
  )
}
