"use client"

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function TermsOfServicePage() {
  const router = useRouter();

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
            返回
          </Button>
        </div>
        
        <article className="prose prose-invert prose-lg max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif text-white">服务条款</h1>
          
          <p>更新日期：{new Date().toLocaleDateString('zh-CN')}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">1. 接受条款</h2>
          <p>访问和使用 Ghiblio（"服务"），即表示您同意遵守这些服务条款（"条款"）。如果您不同意这些条款，请勿使用本服务。</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">2. 服务描述</h2>
          <p>Ghiblio 提供基于人工智能的图像生成服务，允许用户上传图片或输入文本描述来创建具有特定艺术风格（如吉卜力风格）的图像。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">3. 用户账户</h2>
          <p>您可能需要通过 Google 账户登录才能访问某些功能。您有责任维护您的账户信息的机密性，并对在您账户下发生的所有活动负责。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">4. 用户内容和行为</h2>
          <p>您对您上传或输入的任何内容（图片、文本）负全部责任。您同意不使用本服务上传或生成任何非法的、侵权的、诽谤的、淫秽的、或令人反感的内容。我们保留删除违反这些条款的内容或暂停/终止账户的权利。</p>
          <p>您声明并保证您拥有或有权使用您上传的所有内容，并且您的内容不侵犯任何第三方的权利。</p>
          <p>严禁使用本服务生成有害内容，包括但不限于仇恨言论、骚扰、暴力或成人内容。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">5. 生成内容的所有权和使用</h2>
          <p>您保留您上传的原始内容的所有权。</p>
          <p>对于通过本服务生成的图像（"生成内容"）：</p>
          <ul>
            <li>**免费用户**：生成内容仅供个人、非商业用途使用。</li>
            <li>**付费用户（指定套餐）**：根据您购买的套餐（例如高级版及以上），我们授予您非独家的、全球性的、免版税的许可，允许您将生成内容用于商业目的，具体授权范围请参阅相关套餐说明。</li>
          </ul>
          <p>您理解 AI 生成的内容可能并非完全独一无二，相似的输入可能产生相似的输出。我们不对生成内容的独创性或是否侵犯第三方权利作任何保证。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">6. 付费和订阅</h2>
          <p>服务的某些功能可能需要付费。所有费用均不可退还，除非法律另有规定或我们在特定促销活动中明确说明。价格和套餐内容可能会发生变化。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">7. 知识产权</h2>
          <p>本服务本身，包括其所有软件、代码、设计、文本、图形和界面（不包括用户内容和生成内容），均为 Ghiblio 或其许可方的财产，并受版权和其他知识产权法律的保护。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">8. 免责声明</h2>
          <p>本服务按"原样"和"可用"的基础提供，不作任何明示或暗示的保证。我们不保证服务将不间断、无错误、安全或满足您的特定要求。对于因使用本服务而产生的任何直接、间接、附带、特殊或后果性损害，我们不承担任何责任。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">9. 条款变更</h2>
          <p>我们保留随时修改这些条款的权利。我们将通过在网站上发布更新版本来通知您。您在变更后继续使用本服务即表示您接受新的条款。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">10. 终止</h2>
          <p>我们可能因任何原因（包括违反本条款）随时暂停或终止您对本服务的访问，恕不另行通知。</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">11. 适用法律</h2>
          <p>本条款受 [您的司法管辖区，例如：中华人民共和国] 法律管辖。</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">12. 联系我们</h2>
          <p>如果您对这些服务条款有任何疑问，请通过 <a href="mailto:terms@example.com" className="text-[#FFD300] hover:underline">terms@example.com</a> 联系我们。</p>
        </article>
      </main>
      <Footer />
    </div>
  );
} 