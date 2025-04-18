"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'next/navigation'
import { createTranslator } from '@/lib/i18n'

interface PlanType {
  id: string;
  name: string;
  price: string;
  description: string;
  limit: string;
  features: string[];
}

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { locale = 'zh' } = useParams() as { locale?: string }
  const t = createTranslator(locale)

  // 从翻译数据中获取计划信息
  const plansData = t('PricingPlans.plans')
  
  // 构造plans数组
  const plans: PlanType[] = [
    {
      id: "fresh",
      name: plansData.fresh.name,
      price: plansData.fresh.price,
      description: plansData.fresh.description,
      limit: plansData.fresh.limit,
      features: plansData.fresh.features,
    },
    {
      id: "standard",
      name: plansData.standard.name,
      price: plansData.standard.price,
      description: plansData.standard.description,
      limit: plansData.standard.limit,
      features: plansData.standard.features,
    },
    {
      id: "premium",
      name: plansData.premium.name,
      price: plansData.premium.price,
      description: plansData.premium.description,
      limit: plansData.premium.limit,
      features: plansData.premium.features,
    },
    {
      id: "pro",
      name: plansData.pro.name,
      price: plansData.pro.price,
      description: plansData.pro.description,
      limit: plansData.pro.limit,
      features: plansData.pro.features,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">{t('PricingPlans.title')}</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">{t('PricingPlans.subtitle')}</p>
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
                  {plan.features.map((feature: string, index: number) => (
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
                  {selectedPlan === plan.id ? t('Buttons.planSelected') : t('Buttons.choosePlan')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-[rgba(255,255,255,0.6)]">
          {t('PricingPlans.footer')}
        </div>
      </div>
    </section>
  )
}
