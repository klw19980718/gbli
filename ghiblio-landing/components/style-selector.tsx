"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'next/navigation'
import { createTranslator } from '@/lib/i18n'

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
  const { locale = 'zh' } = useParams() as { locale?: string }
  const t = createTranslator(locale)

  // Set the initial tab when the component mounts
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const styles = [
    { id: "none", name: t('StyleSelector.styles.none'), icon: "🎨" },
    { id: "ghibli", name: t('StyleSelector.styles.ghibli'), icon: "🏯", hot: true },
    { id: "pixar", name: t('StyleSelector.styles.pixar'), icon: "🚀" },
    { id: "shinkai", name: t('StyleSelector.styles.shinkai'), icon: "☁️" },
    { id: "disney", name: t('StyleSelector.styles.disney'), icon: "🏰" },
    { id: "realistic", name: t('StyleSelector.styles.realistic'), icon: "📷" },
    { id: "anime", name: t('StyleSelector.styles.anime'), icon: "👧" },
    { id: "sticker", name: t('StyleSelector.styles.sticker'), icon: "😊", hot: true },
    { id: "chibi", name: t('StyleSelector.styles.chibi'), icon: "👶", hot: true },
  ]

  const ratios = [
    { id: "square", name: t('StyleSelector.ratios.square'), icon: "⬛" },
    { id: "landscape", name: t('StyleSelector.ratios.landscape'), icon: "🖼️" },
    { id: "portrait", name: t('StyleSelector.ratios.portrait'), icon: "📱" },
  ]

  const colors = [
    { id: "none", name: t('StyleSelector.colors.none'), icon: "⚪" },
    { id: "warm", name: t('StyleSelector.colors.warm'), icon: "🔶" },
    { id: "cold", name: t('StyleSelector.colors.cold'), icon: "🔷" },
    { id: "soft", name: t('StyleSelector.colors.soft'), icon: "🔘" },
    { id: "vibrant", name: t('StyleSelector.colors.vibrant'), icon: "🌈" },
    { id: "pastel", name: t('StyleSelector.colors.pastel'), icon: "🧁" },
    { id: "bw", name: t('StyleSelector.colors.bw'), icon: "⚫" },
  ]

  const compositions = [
    { id: "none", name: t('StyleSelector.compositions.none'), icon: "⬜" },
    { id: "blur", name: t('StyleSelector.compositions.blur'), icon: "🔍" },
    { id: "closeup", name: t('StyleSelector.compositions.closeup'), icon: "👁️" },
    { id: "wide", name: t('StyleSelector.compositions.wide'), icon: "📸" },
    { id: "depth", name: t('StyleSelector.compositions.depth'), icon: "🌫️" },
    { id: "low", name: t('StyleSelector.compositions.low'), icon: "↗️" },
    { id: "high", name: t('StyleSelector.compositions.high'), icon: "↘️" },
    { id: "macro", name: t('StyleSelector.compositions.macro'), icon: "🔎" },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-0" onClick={onClose}>
      <div
        className="bg-[#0F0F0F] rounded-t-xl shadow-xl w-full max-h-[80vh] overflow-hidden border border-[rgba(255,255,255,0.1)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.1)]">
          <h3 className="text-lg font-medium text-white">{t('StyleSelector.title')}</h3>
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
                {t('StyleSelector.tabs.style')}
              </TabsTrigger>
              <TabsTrigger
                value="ratio"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                {t('StyleSelector.tabs.ratio')}
              </TabsTrigger>
              <TabsTrigger
                value="color"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                {t('StyleSelector.tabs.color')}
              </TabsTrigger>
              <TabsTrigger
                value="composition"
                className="data-[state=active]:bg-[#FFD300] data-[state=active]:text-[#0F0F0F]"
              >
                {t('StyleSelector.tabs.composition')}
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
                        {t('UploadBox.styleSection.hot')}
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
