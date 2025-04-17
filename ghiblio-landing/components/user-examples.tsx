"use client"

import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider"

export function UserExamples() {
  const examples = [
    {
      id: 3,
      title: "浪漫婚礼瞬间",
      description: "将珍贵的婚纱照转化为充满吉卜力氛围的浪漫插画。",
      alt: "婚礼照片转吉卜力风格",
    },
    {
      id: 4,
      title: "温馨生日派对",
      description: "把生日的欢乐时光定格成温馨可爱的吉卜力动画场景。",
      alt: "生日派对照片转吉卜力风格",
    },
    {
      id: 5,
      title: "青春毕业纪念",
      description: "让毕业的喜悦与不舍在吉卜力画风中留下独特印记。",
      alt: "毕业照片转吉卜力风格",
    },
    {
      id: 6,
      title: "甜蜜情侣合影",
      description: "捕捉情侣间的甜蜜互动，生成温馨的吉卜力风格二人世界。",
      alt: "情侣照片转吉卜力风格",
    },
    {
      id: 7,
      title: "旅途自拍大变身",
      description: "将旅行中的自拍照转换成具有故事感的吉卜力动画人物。",
      alt: "旅行自拍照片转吉卜力风格",
    },
    {
      id: 8,
      title: "阳光沙滩时光",
      description: "和朋友们的海边合影也能拥有清新的吉卜力夏日色彩。",
      alt: "沙滩合影照片转吉卜力风格",
    },
  ]

  return (
    <section id="examples" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">用户案例</h2>
          <p className="text-lg text-[rgba(255,255,255,0.6)] max-w-2xl mx-auto">图生图创作灵感</p>
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
                  beforeLabel="原图"
                  afterLabel="AI 生成"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
