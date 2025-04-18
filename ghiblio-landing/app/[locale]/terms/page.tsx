"use client"

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';
import { createTranslator } from '@/lib/i18n';

export default function TermsOfServicePage() {
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
            {t('Terms.backToHome')}
          </Button>
        </div>
        
        <article className="prose prose-invert prose-lg max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-white">{t('Terms.title')}</h1>
          
          <p>{t('Terms.lastUpdated')}</p>
          
          {locale === 'zh' ? (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">接受条款</h2>
              <p>欢迎使用 Ghiblio！使用我们的服务即表示您同意遵守这些条款。如果您不同意这些条款，请不要使用我们的服务。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">服务描述</h2>
              <p>Ghiblio 是一个基于人工智能的图像生成平台，允许用户通过文本描述或上传照片来生成吉卜力风格的插画。我们为用户提供不同套餐和功能，具体取决于您选择的订阅计划。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">账户与注册</h2>
              <p>使用我们的某些服务可能需要创建账户。您同意提供准确、最新和完整的信息，并及时更新这些信息。您需要对账户安全负责，包括密码保护和限制访问您的计算机或移动设备。如有未经授权使用您的账户或任何其他安全问题，请立即通知我们。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">服务使用</h2>
              <p>您同意仅将我们的服务用于合法目的，并遵守所有适用的法律法规。禁止使用我们的服务生成违法、侵权、有害、威胁、滥用、骚扰、侵犯、诽谤、粗俗、淫秽或其他不当内容。我们保留自行决定限制或终止服务访问权限的权利。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">内容限制</h2>
              <p>我们的服务不得用于生成包含儿童不当内容、露骨成人内容、暴力内容、政治敏感内容或构成仇恨言论的图像。我们的系统设有保障措施，可能会拒绝或阻止生成违反这些限制的内容。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">知识产权</h2>
              <h3 className="text-xl font-medium mt-4 mb-2 text-white">我们的内容</h3>
              <p>平台及其内容（包括但不限于软件、设计、技术、模型架构、文本、图形等）的所有权利归我们或我们的许可方所有。除非经我们明确授权，否则您不得复制、修改、创建衍生作品、分发、销售、展示、许可或以其他方式使用这些内容。</p>
              
              <h3 className="text-xl font-medium mt-4 mb-2 text-white">您的内容</h3>
              <p>您保留您上传到平台的内容的所有权利，但您授予我们全球性、非独占、免版税的许可，允许我们使用、复制、修改、分发、发布和处理您的内容，以便提供和改进我们的服务。</p>
              
              <h3 className="text-xl font-medium mt-4 mb-2 text-white">生成的内容</h3>
              <p>对于使用我们的服务生成的图像：</p>
              <ul>
                <li>免费计划：您可以将生成的图像用于个人非商业用途。</li>
                <li>付费计划：根据您的订阅计划不同，您可能获得不同程度的使用权利，包括商业使用权（高级版及以上）。请参阅您的具体订阅详情。</li>
              </ul>
              <p>请注意，即使您拥有生成图像的使用权，您也可能无法申请版权，因为人工智能生成的内容在某些司法管辖区可能不受版权保护。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">付款和订阅</h2>
              <p>某些服务功能需要付费使用。价格和支付条款将在购买时明确显示。订阅会自动续订，除非您在续订日期前取消。您可以随时在账户设置中管理或取消订阅。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">免责声明</h2>
              <p>我们的服务按"现状"和"可用性"提供，不做任何明示或暗示的保证。我们不保证服务将不间断、及时、安全或无错误。生成的图像质量可能因多种因素而异，包括但不限于输入提示、选择的风格和模型限制。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">责任限制</h2>
              <p>在法律允许的最大范围内，我们不对任何直接、间接、偶然、特殊、后果性或惩罚性损害负责，包括但不限于利润损失、商誉损失、数据丢失或其他无形损失。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">变更</h2>
              <p>我们可能会不时修改这些条款。如有重大更改，我们将通知您。继续使用我们的服务即表示您接受修订后的条款。</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">联系我们</h2>
              <p>如果您对这些条款有任何疑问，请通过 <a href="mailto:terms@example.com" className="text-[#FFD300] hover:underline">terms@example.com</a> 联系我们。</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Acceptance of Terms</h2>
              <p>Welcome to Ghiblio! By using our services, you agree to comply with these terms. If you do not agree with these terms, please do not use our services.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Service Description</h2>
              <p>Ghiblio is an AI-based image generation platform that allows users to generate Ghibli-style illustrations through text descriptions or uploaded photos. We offer different packages and features to users depending on the subscription plan you choose.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Account and Registration</h2>
              <p>Using some of our services may require creating an account. You agree to provide accurate, current, and complete information and to update this information in a timely manner. You are responsible for account security, including password protection and limiting access to your computer or mobile device. Please notify us immediately of any unauthorized use of your account or any other security issues.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Service Usage</h2>
              <p>You agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations. It is prohibited to use our services to generate illegal, infringing, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, or otherwise inappropriate content. We reserve the right to limit or terminate service access at our sole discretion.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Content Restrictions</h2>
              <p>Our services must not be used to generate images containing inappropriate content involving children, explicit adult content, violent content, politically sensitive content, or content constituting hate speech. Our systems have safeguards in place that may refuse or block the generation of content that violates these restrictions.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Intellectual Property</h2>
              <h3 className="text-xl font-medium mt-4 mb-2 text-white">Our Content</h3>
              <p>All rights to the platform and its content (including but not limited to software, designs, technology, model architecture, text, graphics, etc.) belong to us or our licensors. Unless explicitly authorized by us, you may not copy, modify, create derivative works, distribute, sell, display, license, or otherwise use this content.</p>
              
              <h3 className="text-xl font-medium mt-4 mb-2 text-white">Your Content</h3>
              <p>You retain all rights to the content you upload to the platform, but you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, distribute, publish, and process your content in order to provide and improve our services.</p>
              
              <h3 className="text-xl font-medium mt-4 mb-2 text-white">Generated Content</h3>
              <p>For images generated using our services:</p>
              <ul>
                <li>Free Plan: You may use the generated images for personal, non-commercial purposes.</li>
                <li>Paid Plans: Depending on your subscription plan, you may have different levels of usage rights, including commercial use rights (Premium and above). Please refer to your specific subscription details.</li>
              </ul>
              <p>Please note that even if you have usage rights to generated images, you may not be able to claim copyright as AI-generated content may not be eligible for copyright protection in some jurisdictions.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Payment and Subscriptions</h2>
              <p>Some service features require payment. Prices and payment terms will be clearly displayed at the time of purchase. Subscriptions automatically renew unless you cancel before the renewal date. You can manage or cancel your subscription at any time in your account settings.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Disclaimer</h2>
              <p>Our services are provided "as is" and "as available" without any express or implied warranties. We do not guarantee that the services will be uninterrupted, timely, secure, or error-free. The quality of generated images may vary due to various factors, including but not limited to input prompts, selected styles, and model limitations.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, goodwill, data, or other intangible losses.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Changes</h2>
              <p>We may modify these terms from time to time. If there are significant changes, we will notify you. Continued use of our services indicates your acceptance of the revised terms.</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Contact Us</h2>
              <p>If you have any questions about these terms, please contact us at <a href="mailto:terms@example.com" className="text-[#FFD300] hover:underline">terms@example.com</a>.</p>
            </>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
} 