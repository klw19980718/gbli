"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useParams } from 'next/navigation'
import { createTranslator } from '@/lib/i18n'

interface FAQ {
  question: string;
  answer: string;
}

export function FAQAccordion() {
  const [openItem, setOpenItem] = useState<number | null>(0)
  const { locale = 'zh' } = useParams() as { locale?: string }
  const t = createTranslator(locale)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  // 直接获取问题数组
  const faqs = t('FAQAccordion.questions')

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">{t('FAQAccordion.title')}</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">{t('FAQAccordion.subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq: FAQ, index: number) => (
            <div key={index} className="border-b border-[rgba(255,255,255,0.1)] last:border-0">
              <button
                className="flex justify-between items-center w-full py-4 text-left"
                onClick={() => toggleItem(index)}
                aria-expanded={openItem === index}
              >
                <span className="font-medium text-lg text-white">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[rgba(255,255,255,0.6)] transition-transform ${
                    openItem === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openItem === index ? "max-h-40" : "max-h-0"}`}
              >
                <div className="pb-4 text-[rgba(255,255,255,0.6)]">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
