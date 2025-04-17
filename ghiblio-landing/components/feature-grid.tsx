import { Bot, ImageIcon, Palette, Users, Sparkles, Layers } from "lucide-react"

export function FeatureGrid() {
  const features = [
    {
      icon: <Bot className="h-10 w-10 text-[#FFD300]" />,
      title: "ChatGPT 4o模型",
      description: "使用 GPT-4 模型理解图像内容与文字描述，精准构图",
    },
    {
      icon: <ImageIcon className="h-10 w-10 text-[#FFD300]" />,
      title: "照片转吉卜力插画",
      description: "上传照片，一键生成吉卜力风格角色与背景",
    },
    {
      icon: <Palette className="h-10 w-10 text-[#FFD300]" />,
      title: "风格多样化",
      description: "包含吉卜力、皮克斯、Q版表情贴纸、幻想水彩等风格",
    },
    {
      icon: <Users className="h-10 w-10 text-[#FFD300]" />,
      title: "角色重绘",
      description: "人像上传后自动进行二次元风格转换",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-[#FFD300]" />,
      title: "提示词生成图像",
      description: '输入文字也能生成画面，如"城市中的魔法面包店"',
    },
    {
      icon: <Layers className="h-10 w-10 text-[#FFD300]" />,
      title: "多图合成",
      description: "多张图合并成一个故事场景图，适合情侣/亲子/宠物合影",
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">吉卜力图像生成器的强大功能</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">
            我们的吉卜力风格AI图像生成器带来无限可能，将您的想象力转化为充满魔力的吉卜力风格艺术作品。
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
