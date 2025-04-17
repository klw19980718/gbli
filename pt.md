项目名称：Atelier Muse
 版本：MVP V1.0
 日期：2025年4月
 撰写人：walk man

#### 产品名称解析
Atelier Muse （灵感工坊） 
🉐 组合含义（中文意境）：
Atelier Muse 中文意境大致可译为：
 🖼️ 「灵感工作室」 或
 🎨 「缪斯的艺术工坊」
  它传达出一种神秘、灵感涌动、艺术专属的氛围，非常符合你产品“将人像转化为艺术作品”的高端定


#### 产品背景
随着AI图像生成技术的快速发展，用户对“个性化、高质量、艺术感”的图像需求日益增长。尤其在海外市场，艺术肖像作为一种表达自我、纪念、社交展示的媒介，越来越受欢迎。然而目前市面上的同类工具普遍存在以下问题：
- 风格单一，生成图缺乏艺术深度
- 生成速度慢，体验不流畅
- 操作流程复杂，不够直观
- 无法支持多张图处理，使用场景受限
Atelier Muse 旨在解决这些痛点，打造一个高品质、简洁易用、极具艺术感的AI肖像生成平台，让用户轻松拥有自己的专属艺术作品。

#### 产品目标
-  用户体验:提供极简上传 → 风格选择 → 生成 → 下载的流畅体验，30秒内完成生成
-  内容质量:输出高分辨率、细节丰富、风格统一的艺术图像
-  功能完整:初期支持至少6种不同艺术风格，支持多图上传处理
-  艺术感营造:营造一个如“画廊般”的使用氛围，强调艺术性与用户自我表达的结合
-  市场方向:面向全球用户，特别是欧美市场中高端艺术用户与AI爱好者群体

#### 目标用户
- 用户画像:海外年轻人（20~45岁），喜欢艺术、摄影、个性表达，善于使用AI工具
- 使用场景:制作艺术头像、情侣纪念图、宠物画像、生日/节日礼物、社交头像升级
- 用户痛点:
 - 没有绘画基础，却想拥有艺术作品
 - 想快速生成风格多变、艺术性强的头像
 - 希望界面简单、操作轻松，且结果质量高
- 用户动机:想把照片“变成艺术”、展示个人品味、表达情感、尝试有趣的AI创作方式

#### 核心功能列表｜Atelier Muse
1. Google 集成登录:用户可使用 Google 账户一键登录，便于身份识别与未来作品管理
2. 上传照片:用户可拖拽或点击上传照片，支持 JPG、PNG 格式，单张或多图（上限3张）
3. 选择艺术风格:提供多种艺术风格供用户选择（如油画、素描、水彩、动漫等），点击即预览风格
4. 图像生成（AI处理）:后台调用AI模型，这一部分咱是先不用后端处理，先用mock数据
5. 查看与保存结果:用户可查看生成图像，支持高清下载或重新生成。
MVP目标：先完成登录 → 上传 → 选择 → 生成 （先用假接口模拟返回数据） → 查看/下载这条完整流程闭环
补充说明：
- 风格可通过图片缩略图展示，点击放大或带描述说明
- 生成图展示后附带“重新生成 / 下载”按钮，简洁清晰

#### 用户操作流程｜Atelier Muse
1. 用户访问官网首页
2. 点击「Login with Google」快速登录
3. 页面中心展示上传区域
4. 用户拖拽或点击上传照片（支持1~3张）
5. 系统自动校验格式（jpg/png）与清晰度
6. 图片下方展示「风格选择区」
7. 用户点击想要的风格（可切换预览）
8. 点击「Generate Artwork」按钮
9. 展示「生成中」进度反馈动画
10. Generate Artwork」按钮显示出结果区域，展示生成结果
11. 提供按钮：「重新生成」/「保存下载」

#### UI/UX 设计需求｜Atelier Muse

* 整体设计风格定位
    * 设计调性:高级、艺术、极简，仿佛走进一家私人画廊
    * 情绪氛围:静谧、温暖、有仪式感，不追求炫技而强调“品味”
    * 用户体验:页面操作极简，动线清晰，一屏完成所有操作，移动端优先设计
* 页面结构布局（单页结构）
    ``` 
        ┌──────────── 顶部区域 ─────────────┐
        │ Atelier Muse logo      | 登录（Google）│
        └──────────────────────────────┘

        🎨 视觉引导区（Slogan + 副标题）
        > Turn your photo into timeless art.
        > Upload, choose, and create with AI.

        📤 上传区域
        - 拖拽上传或点击上传（支持最多3张）
        - 上传后预览图自动展示

        🎨 艺术风格选择区
        - 横滑卡片，风格缩略图 + 名称
        - 可选风格：油画 / 水彩 / 素描 / 动漫 / 现代插画等

        🧠 AI生成按钮
        - 主按钮：[Generate Artwork]
        - 状态提示：生成中动画 / 进度条

        🖼️ 生成结果展示区
        - 显示生成图（支持多张）
        - 操作按钮：下载 / 重新生成

        🌟 产品优势模块
        - Fast rendering, High-quality artwork, Multi-style support

        ❓ FAQ模块（可折叠）
        - Is it free? Do you save my photo? How fast is it?

        📩 Footer区
        - About / Terms / Contact / Privacy

    ```
* 配色方案
   * 背景主色:#FAF7F2,温润背景，营造艺术空间感
   * 主文字色:#2D2D2D,高对比阅读体验
   * 次文字色:#6D6D6D,副标题、FAQ描述等
   * 强调色 / CTA:#C8A96D,按钮、边框、hover 高亮
   * 卡片背景:#EAE7DE,风格展示卡片、分隔线区域
* 字体建议
    * 标题字体:Playfair Display,带衬线，体现艺术感与典雅氛围
    * 正文字体:Inter / Lato,清晰现代，适合网页阅读
    * Logo字体:自定义艺术字 or Playfair 加粗,加强品牌记忆点
* 交互建议
    1. 所有组件保持 竖向单列布局，不堆叠信息
    2. 风格选择区可横滑（scroll snapping）
    3. 生成图像后自动跳转视图至结果展示区域，保留上传与风格选择栏
    4. 所有按钮使用画布金，hover 有轻微放大 / 发光效果
    5. 所有样式要按照设计规范类如 apple 设计规范
#### LandingPage文案融入 SEO 
* 主视觉区文案（Hero Section）
    ```
        <h1>Turn Your Photo into a Timeless Portrait Artwork</h1>
        <p>Atelier Muse is your AI-powered tool to <strong>turn any photo into a painting</strong>. Choose from oil painting, watercolor, sketch and more — and receive a <strong>high-quality portrait</strong> within seconds.</p>
        <a class="cta-button">🎨 Generate My Artwork</a>
    ```
* 核心价值区（3大卖点）
    ```
        <section class="features">
    <div class="feature">
        <h3>🎨 Multiple Art Styles</h3>
        <p>Oil painting, sketch, anime, watercolor — pick your perfect artistic finish.</p>
    </div>
    <div class="feature">
        <h3>⚡ Fast & Easy</h3>
        <p>AI processes your image and returns your portrait in less than 30 seconds.</p>
    </div>
    <div class="feature">
        <h3>🖼️ High-Quality Results</h3>
        <p>Gallery-worthy results from your photo — perfect as <strong>custom artwork gifts</strong> or keepsakes.</p>
    </div>
        </section>

    ```
* 操作流程模块（How it Works）
    ```
        <section class="how-it-works">
        <h2>How to Create Your AI Portrait</h2>
        <ol>
            <li><strong>Upload a photo</strong> (JPG or PNG)</li>
            <li>Select a portrait art style</li>
            <li>Click “Generate” and get your artwork instantly</li>
        </ol>
        </section>

    ```
* FAQ 模块（转化+SEO双用）
    ```
        <section class="faq">
        <h2>Frequently Asked Questions</h2>
        <details>
            <summary>Is it free to use?</summary>
            <p>Yes! You can generate AI artwork at no cost during our beta launch.</p>
        </details>
        <details>
            <summary>Do I need art or design skills?</summary>
            <p>Not at all. Just upload a photo and let our AI handle the rest.</p>
        </details>
        <details>
            <summary>Can I use it for couple or pet portraits?</summary>
            <p>Absolutely. Atelier Muse supports <strong>couple portraits</strong>, <strong>pet paintings</strong>, and more.</p>
        </details>
        <details>
            <summary>How long does it take?</summary>
            <p>Usually less than 30 seconds per image.</p>
        </details>
        </section>

    ```
* 页底情绪转化文案（轻SEO+转化）
```
<p class="footer-callout">
  Create a meaningful gift. Celebrate a memory. <strong>Turn your favorite photo into a portrait painting</strong> — with Atelier Muse, it only takes seconds.
</p>

```

#### 前端技术栈
Next.js + Tailwind CSS + 使用 Next.js 官方支持的 Google Fonts（推荐）字体

#### 项目目录
```
atelier-muse/
│
├── app/                           # 应用主目录（Next.js App Router）
│   ├── layout.tsx                # 全局布局（包含 <html> 和 <body>）
│   ├── page.tsx                  # 首页（上传 + 生成 + 结果展示）
│   ├── globals.css               # 全局样式导入（引入 Tailwind）
│   └── favicon.ico              # 网站图标
│
├── components/                   # 可复用 UI 组件
│   ├── Header.tsx               # 顶部导航（Logo + Google 登录）
│   ├── Hero.tsx                 # 首页主视觉（Slogan + CTA）
│   ├── Upload.tsx               # 图片上传组件（支持预览）
│   ├── StyleSelector.tsx        # 风格选择模块（卡片点击）
│   ├── GenerateButton.tsx       # “生成艺术图”按钮组件
│   ├── Result.tsx               # 结果展示图区域
│   ├── FeatureSection.tsx       # 产品优势（图文3栏）
│   ├── FAQ.tsx                  # 常见问题（折叠列表）
│   └── Footer.tsx               # 底部链接区（About / Terms 等）
│
├── public/                      # 静态文件（图片、字体、图标等）
│   ├── logo.svg
│   ├── style-thumbs/            # 风格预览图
│   │   ├── oil.png
│   │   ├── sketch.png
│   │   └── watercolor.png
│   └── placeholder.jpg          # 默认生成结果图
│
├── styles/                      # 可选 Tailwind 扩展样式（或 PostCSS）
│   └── tailwind.config.ts
│
├── utils/                       # 辅助函数
│   └── imageUtils.ts            # 图片预览、格式检查等
│
├── package.json
├── tsconfig.json                # TypeScript 配置
├── tailwind.config.js           # Tailwind 配置
├── postcss.config.js
└── README.md

```