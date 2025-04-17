"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQAccordion() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const faqs = [
    {
      question: "什么让 Ghiblio 与其他 AI 图像生成器不同？",
      answer: "Ghiblio 基于强大的 GPT-4 模型，图像质量高，成图具备吉卜力独特的风格情绪。",
    },
    {
      question: "什么是 ChatGPT 4 模型？",
      answer: "ChatGPT 4 是 OpenAI 的新一代大语言模型，具备强大的图文理解与生成能力。",
    },
    {
      question: "我可以生成哪些类型的图像？",
      answer: "包括人像、宠物、场景等照片的吉卜力风格转换，支持文字转图与多种风格选择。",
    },
    {
      question: "需要具备绘画基础吗？",
      answer: "不需要，输入文字或上传照片即可，无需任何设计技能即可生成作品。",
    },
    {
      question: "如何写好提示词？",
      answer: "提示词建议包含主语 + 外观特征 + 场景 + 情绪氛围，如'戴草帽的女孩在花海中奔跑'。",
    },
    {
      question: "为什么提示内容违规？",
      answer: "出现违法、人物肖像、品牌元素等受限内容时，模型会自动拦截，避免生成不合规内容。",
    },
    {
      question: "生成失败了会扣次数吗？",
      answer: "不会，失败不扣次数，可免费重试。若异常持续，可联系客服处理。",
    },
    {
      question: "生成图像是否可商用？",
      answer: "高级版及以上支持商用授权，图像可用于项目展示或衍生作品使用。",
    },
    {
      question: "我的图片安全吗？",
      answer: "是的，所有上传内容均加密处理，24 小时自动清除，严格保护用户隐私。",
    },
    {
      question: "一次套餐最多几张图？",
      answer: "鲜鲜版 20 次、标准版 50 次、高级版 150 次、专业版 300 次，详见定价区。",
    },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">常见问题</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">关于 Ghiblio 的使用方法与功能说明</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
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
