"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      id: "fresh",
      name: "鲜鲜版",
      price: "¥9.9",
      description: "基础体验用户",
      limit: "共 20 次",
      features: ["支持照片/文字生成图", "支持高清下载", "支持多图生成图", "支持精选风格", "无广告", "无水印"],
    },
    {
      id: "standard",
      name: "标准版",
      price: "¥19.9",
      description: "高性价比用户",
      limit: "共 50 次",
      features: ["包含鲜鲜版所有功能", "支持所有风格（吉卜力/皮克斯等）", "自动提示词推荐"],
    },
    {
      id: "premium",
      name: "高级版",
      price: "¥49.9",
      description: "进阶创作用户",
      limit: "共 150 次",
      features: ["包含标准版所有功能", "支持多图合成（如情侣图）", "分辨率提升", "批量导出图像（新功能）"],
    },
    {
      id: "pro",
      name: "专业版",
      price: "¥99",
      description: "专业商用场景用户",
      limit: "共 300 次",
      features: ["包含全部功能", "开放 API 调用（新功能）", "提供 1V1 专属支持", "支持商用授权"],
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">价格套餐</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">选择适合你需求的套餐，开始创作吧</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white ${
                selectedPlan === plan.id
                  ? "border-[#FFD300] shadow-lg shadow-[#FFD300]/20 scale-105"
                  : "hover:border-[#FFD300]/50 hover:shadow-md"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-white">{plan.name}</CardTitle>
                <CardDescription className="text-[rgba(255,255,255,0.6)]">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-[rgba(255,255,255,0.6)] ml-2">{plan.limit}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#FFD300] mr-2 shrink-0" />
                      <span className="text-sm text-[rgba(255,255,255,0.8)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    selectedPlan === plan.id
                      ? "bg-[#FFD300] hover:bg-[#FFD300]/80 text-[#0F0F0F]"
                      : "bg-[#252525] hover:bg-[#333333] text-white"
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {selectedPlan === plan.id ? "已选择" : "选择套餐"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-[rgba(255,255,255,0.6)]">
          所有套餐均为高清、无广告、无水印，可即时下载；高级版以上套餐支持商业用途和 API 接入。
        </div>
      </div>
    </section>
  )
}
