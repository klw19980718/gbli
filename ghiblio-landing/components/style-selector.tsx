"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StyleSelectorProps {
  onClose: () => void
  onStyleSelect: (style: string) => void
  onRatioSelect: (ratio: string) => void
  onColorSelect: (color: string) => void
  onCompositionSelect: (composition: string) => void
  initialTab?: string
}

export function StyleSelector({
  onClose,
  onStyleSelect,
  onRatioSelect,
  onColorSelect,
  onCompositionSelect,
  initialTab = "style",
}: StyleSelectorProps) {
  const [activeTab, setActiveTab] = useState(initialTab)

  // Set the initial tab when the component mounts
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const styles = [
    { id: "none", name: "无风格", icon: "🎨" },
    { id: "ghibli", name: "吉卜力", icon: "🏯", hot: true },
    { id: "pixar", name: "皮克斯", icon: "🚀" },
    { id: "shinkai", name: "新海诚", icon: "☁️" },
    { id: "disney", name: "迪士尼", icon: "🏰" },
    { id: "realistic", name: "写实风格", icon: "📷" },
    { id: "anime", name: "二次元风格", icon: "👧" },
    { id: "sticker", name: "Q版表情贴纸", icon: "😊", hot: true },
    { id: "chibi", name: "日本小人风格", icon: "👶", hot: true },
  ]

  const ratios = [
    { id: "square", name: "正方形", icon: "⬛" },
    { id: "landscape", name: "横版", icon: "🖼️" },
    { id: "portrait", name: "竖版", icon: "📱" },
  ]

  const colors = [
    { id: "none", name: "无色彩", icon: "⚪" },
    { id: "warm", name: "暖色调", icon: "🔶" },
    { id: "cold", name: "冷色调", icon: "🔷" },
    { id: "soft", name: "柔和色调", icon: "🔘" },
    { id: "vibrant", name: "鲜艳色调", icon: "🌈" },
    { id: "pastel", name: "粉彩色调", icon: "🧁" },
    { id: "bw", name: "黑白", icon: "⚫" },
  ]

  const compositions = [
    { id: "none", name: "无构图", icon: "⬜" },
    { id: "blur", name: "背景虚化", icon: "🔍" },
    { id: "closeup", name: "特写", icon: "👁️" },
    { id: "wide", name: "广角", icon: "📸" },
    { id: "depth", name: "景深", icon: "🌫️" },
    { id: "low", name: "低角度", icon: "↗️" },
    { id: "high", name: "高角度", icon: "↘️" },
    { id: "macro", name: "微距", icon: "🔎" },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-0" onClick={onClose}>
      <div
        className="bg-[#0F0F0F] rounded-t-xl shadow-xl w-full max-h-[80vh] overflow-hidden border border-[rgba(255,255,255,0.1)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.1)]">
          <h3 className="text-lg font-medium text-white">选择风格与参数</h3>
          <button onClick={onClose} className="text-[rgba(255,255,255,0.6)] hover:text-white">
            <X size={20} />
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="grid grid-cols-4 mb-4 bg-[#1A1A1A]">
              <TabsTrigger
                value="style"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                风格分类
              </TabsTrigger>
              <TabsTrigger
                value="ratio"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                图片比例
              </TabsTrigger>
              <TabsTrigger
                value="color"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                色调风格
              </TabsTrigger>
              <TabsTrigger
                value="composition"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                构图调整
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <TabsContent value="style" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {styles.map((style) => (
                  <div
                    key={style.id}
                    className="relative bg-[#1A1A1A] hover:bg-[#252525] rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center"
                    onClick={() => onStyleSelect(style.name)}
                  >
                    {style.hot && (
                      <span className="absolute top-2 right-2 bg-[#FF3B30] text-white text-xs px-1.5 py-0.5 rounded-full">
                        热门
                      </span>
                    )}
                    <span className="text-3xl mb-2">{style.icon}</span>
                    <span className="text-sm font-medium text-center text-white">{style.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ratio" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {ratios.map((ratio) => (
                  <div
                    key={ratio.id}
                    className="bg-[#1A1A1A] hover:bg-[#252525] rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center"
                    onClick={() => onRatioSelect(ratio.name)}
                  >
                    <span className="text-3xl mb-2">{ratio.icon}</span>
                    <span className="text-sm font-medium text-white">{ratio.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="color" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {colors.map((color) => (
                  <div
                    key={color.id}
                    className="bg-[#1A1A1A] hover:bg-[#252525] rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center"
                    onClick={() => onColorSelect(color.name)}
                  >
                    <span className="text-3xl mb-2">{color.icon}</span>
                    <span className="text-sm font-medium text-white">{color.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="composition" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {compositions.map((composition) => (
                  <div
                    key={composition.id}
                    className="bg-[#1A1A1A] hover:bg-[#252525] rounded-lg p-4 cursor-pointer transition-colors flex flex-col items-center"
                    onClick={() => onCompositionSelect(composition.name)}
                  >
                    <span className="text-3xl mb-2">{composition.icon}</span>
                    <span className="text-sm font-medium text-white">{composition.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
