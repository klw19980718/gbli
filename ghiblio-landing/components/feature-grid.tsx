"use client"

import { Bot, ImageIcon, Palette, Users, Sparkles, Layers } from "lucide-react"
import { useParams } from 'next/navigation'
import { createTranslator } from '@/lib/i18n'

export function FeatureGrid() {
  const { locale = 'zh' } = useParams() as { locale?: string }
  const t = createTranslator(locale)

  const features = [
    {
      icon: <Bot className="h-10 w-10 text-[#FFD300]" />,
      title: t('FeatureGrid.features.chatgpt.title'),
      description: t('FeatureGrid.features.chatgpt.description'),
    },
    {
      icon: <ImageIcon className="h-10 w-10 text-[#FFD300]" />,
      title: t('FeatureGrid.features.photoTransform.title'),
      description: t('FeatureGrid.features.photoTransform.description'),
    },
    {
      icon: <Palette className="h-10 w-10 text-[#FFD300]" />,
      title: t('FeatureGrid.features.multiStyles.title'),
      description: t('FeatureGrid.features.multiStyles.description'),
    },
    {
      icon: <Users className="h-10 w-10 text-[#FFD300]" />,
      title: t('FeatureGrid.features.characterRedraw.title'),
      description: t('FeatureGrid.features.characterRedraw.description'),
    },
    {
      icon: <Sparkles className="h-10 w-10 text-[#FFD300]" />,
      title: t('FeatureGrid.features.promptGeneration.title'),
      description: t('FeatureGrid.features.promptGeneration.description'),
    },
    {
      icon: <Layers className="h-10 w-10 text-[#FFD300]" />,
      title: t('FeatureGrid.features.multiImageComposite.title'),
      description: t('FeatureGrid.features.multiImageComposite.description'),
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">{t('FeatureGrid.title')}</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">
            {t('FeatureGrid.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1 border border-[rgba(255,255,255,0.1)]"
            >
              <div className="bg-[#252525] inline-flex rounded-lg p-3 mb-4 shadow-sm">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-[rgba(255,255,255,0.6)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
