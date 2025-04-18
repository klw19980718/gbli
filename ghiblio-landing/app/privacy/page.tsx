"use client"

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';
import { createTranslator } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const { locale = 'zh' } = useParams() as { locale?: string };
  const t = createTranslator(locale);

  // 格式化日期，根据语言环境
  const formatDate = () => {
    const dateOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', dateOptions);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[rgba(255,255,255,0.8)] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="mb-8">
          <Button 
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white/70 hover:text-white hover:bg-white/10 px-2"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            {t('Privacy.backToHome')}
          </Button>
        </div>
        
        <article className="prose prose-invert prose-lg max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-white">{t('Privacy.title')}</h1>
          
          <p>{t('Privacy.lastUpdated')}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">引言</h2>
          <p>欢迎使用 Ghiblio！我们非常重视您的隐私。本隐私政策旨在说明我们如何收集、使用、存储和保护您的个人信息。</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">我们收集的信息</h2>
          <p>当您使用我们的服务时，我们可能会收集以下信息：</p>
          <ul>
            <li>**您提供的信息**：例如，如果您选择注册账户（通过 Google 登录），我们会收集您的 Google 账户基本信息（如姓名、邮箱、头像）。如果您联系我们，我们可能会收集您的联系方式和通信内容。</li>
            <li>**您上传的内容**：您上传用于生成图像的图片或输入的文本描述。</li>
            <li>**使用信息**：我们可能会自动收集有关您如何使用我们服务的信息，例如访问时间、使用的功能、生成的次数等，以帮助我们改进服务。这可能通过 Cookie 或类似技术实现。</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">我们如何使用信息</h2>
          <ul>
            <li>**提供和改进服务**：用于处理您的请求，生成图像，以及优化和改进我们的 AI 模型和服务功能。</li>
            <li>**通信**：用于回应您的咨询和提供客户支持。</li>
            <li>**安全**：用于保护我们的服务和用户安全，防止欺诈和滥用。</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">信息存储和安全</h2>
          <p>我们采取合理的物理、技术和管理措施来保护您的信息安全。您上传的用于图像生成的原始内容（照片、文本）会在处理完成后或在特定时间段内（例如 24 小时）自动从我们的活动服务器中删除，我们不会永久存储这些原始输入内容。</p>
          <p>生成的图像结果可能会根据您的账户类型和我们的服务条款被存储更长时间，以便您访问和管理。我们不会将您的个人身份信息与您的上传内容或生成结果直接关联用于训练我们的核心模型，除非获得您的明确同意或法律要求。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">信息共享</h2>
          <p>我们不会与第三方共享您的个人信息，除非：</p>
          <ul>
            <li>获得您的明确同意。</li>
            <li>为了遵守法律法规或响应有效的法律程序。</li>
            <li>为了保护 Ghiblio、我们的用户或公众的权利、财产或安全。</li>
            <li>与帮助我们运营服务的可信赖的服务提供商共享（例如云存储、计算服务），但他们必须遵守严格的保密义务。</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">您的权利</h2>
          <p>您有权访问、更正或删除我们持有的关于您的某些个人信息。如果您使用 Google 登录，您可以通过您的 Google 账户管理部分授权信息。</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">儿童隐私</h2>
          <p>我们的服务不面向 13 岁以下的儿童。我们不会故意收集儿童的个人信息。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">政策变更</h2>
          <p>我们可能会不时更新本隐私政策。如有重大变更，我们将通过适当方式通知您。请定期查看以了解最新信息。</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">联系我们</h2>
          <p>如果您对本隐私政策有任何疑问，请通过 <a href="mailto:privacy@example.com" className="text-[#FFD300] hover:underline">privacy@example.com</a> 联系我们。</p>
        </article>
      </main>
      <Footer />
    </div>
  );
} 