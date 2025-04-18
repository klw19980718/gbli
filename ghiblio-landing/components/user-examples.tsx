"use client"

import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider"
import { useParams } from 'next/navigation'
import { createTranslator } from '@/lib/i18n'

export function UserExamples() {
  const { locale = 'zh' } = useParams() as { locale?: string }
  const t = createTranslator(locale)

  const examples = [
    {
      id: 3,
      title: t('UserExamples.examples.wedding.title'),
      description: t('UserExamples.examples.wedding.description'),
      alt: "婚礼照片转吉卜力风格",
    },
    {
      id: 4,
      title: t('UserExamples.examples.birthday.title'),
      description: t('UserExamples.examples.birthday.description'),
      alt: "生日派对照片转吉卜力风格",
    },
    {
      id: 5,
      title: t('UserExamples.examples.graduation.title'),
      description: t('UserExamples.examples.graduation.description'),
      alt: "毕业照片转吉卜力风格",
    },
    {
      id: 6,
      title: t('UserExamples.examples.couple.title'),
      description: t('UserExamples.examples.couple.description'),
      alt: "情侣照片转吉卜力风格",
    },
    {
      id: 7,
      title: t('UserExamples.examples.travel.title'),
      description: t('UserExamples.examples.travel.description'),
      alt: "旅行自拍照片转吉卜力风格",
    },
    {
      id: 8,
      title: t('UserExamples.examples.beach.title'),
      description: t('UserExamples.examples.beach.description'),
      alt: "沙滩合影照片转吉卜力风格",
    },
  ]

  return (
    <section id="examples" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">{t('UserExamples.title')}</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">{t('UserExamples.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {examples.map((example) => (
            <div
              key={example.id}
              className="flex flex-col rounded-lg overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#1A1A1A]"
            >
              <div className="p-4">
                <h3 className="font-bold text-white mb-1">{example.title}</h3>
                <p className="text-sm text-[rgba(255,255,255,0.6)]">{example.description}</p>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <ImageComparisonSlider 
                  beforeImage={`/images/${example.id}a.png`} 
                  afterImage={`/images/${example.id}b.png`} 
                  beforeLabel={t('UserExamples.beforeLabel')}
                  afterLabel={t('UserExamples.afterLabel')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
