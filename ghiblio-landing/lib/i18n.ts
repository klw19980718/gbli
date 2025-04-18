// 内联翻译数据
const messages: Record<string, any> = {
  en: {
    "HeroSection": {
      "title": "Transform Text & Photos into Ghibli Illustrations",
      "description": "A professional AI model turns photos and descriptions into dreamy artworks, offering creators a fairytale illustration experience.",
      "badges": {
        "model": "ChatGPT 4.0 Model",
        "uploadPhoto": "Support Photo Upload",
        "textToImage": "Support Text to Image",
        "freeTrial": "Free Trial"
      }
    },
    "Navbar": {
      "home": "Home",
      "features": "Features",
      "examples": "Examples",
      "pricing": "Pricing",
      "faq": "FAQ"
    },
    "Languages": {
      "en": "English",
      "zh": "中文"
    },
    "Buttons": {
      "generate": "Generate Now",
      "remake": "Regenerate",
      "download": "Download Image",
      "login": "Login/Register",
      "loggedIn": "Logged In (Click to log out)",
      "choosePlan": "Choose Plan",
      "planSelected": "Selected"
    },
    "Tabs": {
      "textToImage": "Text to Image",
      "imageToImage": "Image to Image",
      "batch": "Batch Generate"
    },
    "FeatureGrid": {
      "title": "Powerful Features of Ghibli Image Generator",
      "subtitle": "Our Ghibli-style AI image generator brings unlimited possibilities, transforming your imagination into magical Ghibli-style artworks.",
      "features": {
        "chatgpt": {
          "title": "ChatGPT 4o Model",
          "description": "Uses GPT-4 model to understand image content and text descriptions for precise composition"
        },
        "photoTransform": {
          "title": "Photo to Ghibli Illustration",
          "description": "Upload photos and transform them into Ghibli-style characters and backgrounds with one click"
        },
        "multiStyles": {
          "title": "Diverse Styles",
          "description": "Includes Ghibli, Pixar, Q-version stickers, fantasy watercolor and more styles"
        },
        "characterRedraw": {
          "title": "Character Redrawing",
          "description": "Automatically converts portraits into anime style after upload"
        },
        "promptGeneration": {
          "title": "Text to Image",
          "description": "Generate images from text prompts, such as \"magical bakery in the city\""
        },
        "multiImageComposite": {
          "title": "Multi-image Composition",
          "description": "Combine multiple images into a story scene, perfect for couples/family/pet photos"
        }
      }
    },
    "UserExamples": {
      "title": "User Transformation Examples",
      "subtitle": "See how users transform ordinary photos into amazing Ghibli-style illustrations",
      "beforeLabel": "Original Photo",
      "afterLabel": "Ghibli Style",
      "examples": {
        "wedding": {
          "title": "Wedding Photo Transformation",
          "description": "Transform wedding photos into romantic Ghibli scenes",
          "alt": "Wedding photo transformed to Ghibli style"
        },
        "birthday": {
          "title": "Birthday Party Transformation",
          "description": "Turn birthday celebrations into joyful Ghibli moments",
          "alt": "Birthday party photo transformed to Ghibli style"
        },
        "graduation": {
          "title": "Graduation Photo Transformation",
          "description": "Celebrate achievements with Ghibli-style graduation memories",
          "alt": "Graduation photo transformed to Ghibli style"
        },
        "couple": {
          "title": "Couple Photo Transformation",
          "description": "Create magical couple portraits in Ghibli animation style",
          "alt": "Couple photo transformed to Ghibli style"
        },
        "travel": {
          "title": "Travel Selfie Transformation",
          "description": "Convert travel selfies into adventurous Ghibli journeys",
          "alt": "Travel selfie transformed to Ghibli style"
        },
        "beach": {
          "title": "Beach Group Photo Transformation",
          "description": "Transform beach group photos into summer Ghibli scenes",
          "alt": "Beach group photo transformed to Ghibli style"
        }
      }
    },
    "StyleSelector": {
      "title": "Select Style and Parameters",
      "tabs": {
        "style": "Style Category",
        "ratio": "Image Ratio",
        "color": "Color Style",
        "composition": "Composition"
      },
      "styles": {
        "none": "No Style",
        "ghibli": "Ghibli",
        "pixar": "Pixar",
        "shinkai": "Makoto Shinkai",
        "disney": "Disney",
        "realistic": "Realistic Style",
        "anime": "Anime Style",
        "sticker": "Q-version Stickers",
        "chibi": "Japanese Chibi Style"
      },
      "ratios": {
        "square": "Square",
        "landscape": "Landscape",
        "portrait": "Portrait"
      },
      "colors": {
        "none": "No Color",
        "warm": "Warm Tones",
        "cold": "Cold Tones",
        "soft": "Soft Tones",
        "vibrant": "Vibrant Tones",
        "pastel": "Pastel Tones",
        "bw": "Black & White"
      },
      "compositions": {
        "none": "No Composition",
        "blur": "Blurred Background",
        "closeup": "Close-up",
        "wide": "Wide Angle",
        "depth": "Depth of Field",
        "low": "Low Angle",
        "high": "High Angle",
        "macro": "Macro"
      }
    },
    "FAQAccordion": {
      "title": "Frequently Asked Questions",
      "subtitle": "Instructions and feature explanations about Ghiblio",
      "questions": [
        {
          "question": "What makes Ghiblio different from other AI image generators?",
          "answer": "Ghiblio is based on the powerful GPT-4 model, offering high image quality with unique Ghibli style emotions."
        },
        {
          "question": "What is the ChatGPT 4 model?",
          "answer": "ChatGPT 4 is OpenAI's next-generation large language model with powerful image and text understanding capabilities."
        },
        {
          "question": "What types of images can I generate?",
          "answer": "Includes portraits, pets, scenes, and more in Ghibli style, supporting text-to-image and multiple style choices."
        },
        {
          "question": "Do I need artistic skills?",
          "answer": "No, just input text or upload photos - no design skills needed to create artwork."
        },
        {
          "question": "How do I write good prompts?",
          "answer": "Prompts should include subject + appearance features + scene + mood, like 'Girl with straw hat running in a flower field'."
        },
        {
          "question": "Why is my prompt flagged as inappropriate?",
          "answer": "When illegal content, portraits, or brand elements appear, the model automatically blocks them to avoid generating non-compliant content."
        },
        {
          "question": "Will I be charged for failed generations?",
          "answer": "No, failures don't count against your quota and you can retry for free. Contact support if issues persist."
        },
        {
          "question": "Can I use generated images commercially?",
          "answer": "Premium Plan and above include commercial licenses; images can be used for project displays or derivative works."
        },
        {
          "question": "Are my images safe?",
          "answer": "Yes, all uploaded content is encrypted and automatically deleted after 24 hours, strictly protecting user privacy."
        },
        {
          "question": "How many images per plan?",
          "answer": "Fresh Plan 20 times, Standard Plan 50 times, Premium Plan 150 times, Professional Plan 300 times. See pricing section for details."
        }
      ]
    },
    "PricingPlans": {
      "title": "Pricing Plans",
      "subtitle": "Choose a plan that fits your needs and start creating",
      "footer": "All plans include high-definition, ad-free, watermark-free images with instant download; Premium plans and above support commercial use and API access.",
      "plans": {
        "fresh": {
          "name": "Fresh Plan",
          "price": "$1.99",
          "description": "Basic experience users",
          "limit": "20 generations",
          "features": [
            "Support photo/text to image",
            "HD download",
            "Multi-image generation",
            "Selected styles",
            "No ads",
            "No watermark"
          ]
        },
        "standard": {
          "name": "Standard Plan",
          "price": "$3.99",
          "description": "High value users",
          "limit": "50 generations",
          "features": [
            "Includes all Fresh Plan features",
            "All styles (Ghibli/Pixar, etc.)",
            "Auto prompt suggestion"
          ]
        },
        "premium": {
          "name": "Premium Plan",
          "price": "$9.99",
          "description": "Advanced creative users",
          "limit": "150 generations",
          "features": [
            "Includes all Standard Plan features",
            "Multi-image composition (e.g. couple photos)",
            "Resolution enhancement",
            "Batch export images (New feature)"
          ]
        },
        "pro": {
          "name": "Professional Plan",
          "price": "$19.99",
          "description": "Professional commercial users",
          "limit": "300 generations",
          "features": [
            "Includes all features",
            "API access (New feature)",
            "1-on-1 dedicated support",
            "Commercial use license"
          ]
        }
      }
    },
    "Footer": {
      "slogan": "Professional AI models transform photos and descriptions into dreamy artworks, bringing creators a fairy tale illustration experience.",
      "product": "Product",
      "support": "Support",
      "legal": "Legal",
      "contactUs": "Contact Us",
      "copyright": "© {year} Ghiblio. All rights reserved."
    },
    "UploadBox": {
      "textPlaceholder": "Describe the image you want...",
      "imagePlaceholder": "Add image description (optional), more details lead to better results",
      "uploadImage": "Upload Image",
      "uploadMultipleImages": "Upload Multiple Images",
      "uploadSupport": "Supports JPG, PNG",
      "uploadLimit": "Up to 5 images",
      "addMore": "Add",
      "styleSection": {
        "style": "Style Category",
        "ratio": "Image Ratio",
        "color": "Color Style",
        "composition": "Composition Adjustment",
        "hot": "Hot"
      }
    },
    "ResultDisplay": {
      "title": "Generation Result",
      "loading": "Generating, please wait...",
      "clickToGenerate": "Click the button above to start creating"
    },
    "Privacy": {
      "title": "Privacy Policy",
      "backToHome": "Back to Home",
      "lastUpdated": "Last updated: April 1, 2024"
    },
    "Terms": {
      "title": "Terms of Service",
      "backToHome": "Back to Home",
      "lastUpdated": "Last updated: April 1, 2024"
    }
  },
  zh: {
    "HeroSection": {
      "title": "将文字照片转化为吉卜力插画",
      "description": "专业 AI 模型将照片与描述转化为梦幻画作，为创作者带来童话般插画体验。",
      "badges": {
        "model": "ChatGPT 4.0 模型",
        "uploadPhoto": "支持上传照片",
        "textToImage": "支持文字生图",
        "freeTrial": "免费体验中"
      }
    },
    "Navbar": {
      "home": "首页",
      "features": "功能",
      "examples": "案例展示",
      "pricing": "价格",
      "faq": "常见问题"
    },
    "Languages": {
      "en": "English",
      "zh": "中文"
    },
    "Buttons": {
      "generate": "立即生成",
      "remake": "重新生成",
      "download": "下载图片",
      "login": "登录/注册",
      "loggedIn": "已登录（点击登出）",
      "choosePlan": "选择套餐",
      "planSelected": "已选择"
    },
    "Tabs": {
      "textToImage": "文生图",
      "imageToImage": "图生图",
      "batch": "批量生图"
    },
    "FeatureGrid": {
      "title": "吉卜力图像生成器的强大功能",
      "subtitle": "我们的吉卜力风格AI图像生成器带来无限可能，将您的想象力转化为充满魔力的吉卜力风格艺术作品。",
      "features": {
        "chatgpt": {
          "title": "ChatGPT 4o模型",
          "description": "使用 GPT-4 模型理解图像内容与文字描述，精准构图"
        },
        "photoTransform": {
          "title": "照片转吉卜力插画",
          "description": "上传照片，一键生成吉卜力风格角色与背景"
        },
        "multiStyles": {
          "title": "风格多样化",
          "description": "包含吉卜力、皮克斯、Q版表情贴纸、幻想水彩等风格"
        },
        "characterRedraw": {
          "title": "角色重绘",
          "description": "人像上传后自动进行二次元风格转换"
        },
        "promptGeneration": {
          "title": "提示词生成图像",
          "description": "输入文字也能生成画面，如\"城市中的魔法面包店\""
        },
        "multiImageComposite": {
          "title": "多图合成",
          "description": "多张图合并成一个故事场景图，适合情侣/亲子/宠物合影"
        }
      }
    },
    "UserExamples": {
      "title": "用户转换案例",
      "subtitle": "看看用户们如何将普通照片转换成精彩的吉卜力风格插画",
      "beforeLabel": "原始照片",
      "afterLabel": "吉卜力风格",
      "examples": {
        "wedding": {
          "title": "婚礼照片转换",
          "description": "将婚礼照片转换成浪漫的吉卜力场景",
          "alt": "婚礼照片转吉卜力风格"
        },
        "birthday": {
          "title": "生日派对转换",
          "description": "把生日庆祝场景变成欢乐的吉卜力时刻",
          "alt": "生日派对照片转吉卜力风格"
        },
        "graduation": {
          "title": "毕业照片转换",
          "description": "用吉卜力风格纪念重要的毕业时刻",
          "alt": "毕业照片转吉卜力风格"
        },
        "couple": {
          "title": "情侣照片转换",
          "description": "创建魔幻的吉卜力动画风格情侣肖像",
          "alt": "情侣照片转吉卜力风格"
        },
        "travel": {
          "title": "旅行自拍转换",
          "description": "将旅行自拍照转换成冒险的吉卜力旅程",
          "alt": "旅行自拍照片转吉卜力风格"
        },
        "beach": {
          "title": "沙滩合影转换",
          "description": "将沙滩合影照片变成夏日吉卜力场景",
          "alt": "沙滩合影照片转吉卜力风格"
        }
      }
    },
    "StyleSelector": {
      "title": "选择风格与参数",
      "tabs": {
        "style": "风格分类",
        "ratio": "图片比例",
        "color": "色调风格",
        "composition": "构图调整"
      },
      "styles": {
        "none": "无风格",
        "ghibli": "吉卜力",
        "pixar": "皮克斯",
        "shinkai": "新海诚",
        "disney": "迪士尼",
        "realistic": "写实风格",
        "anime": "二次元风格",
        "sticker": "Q版表情贴纸",
        "chibi": "日本小人风格"
      },
      "ratios": {
        "square": "正方形",
        "landscape": "横版",
        "portrait": "竖版"
      },
      "colors": {
        "none": "无色彩",
        "warm": "暖色调",
        "cold": "冷色调",
        "soft": "柔和色调",
        "vibrant": "鲜艳色调",
        "pastel": "粉彩色调",
        "bw": "黑白"
      },
      "compositions": {
        "none": "无构图",
        "blur": "背景虚化",
        "closeup": "特写",
        "wide": "广角",
        "depth": "景深",
        "low": "低角度",
        "high": "高角度",
        "macro": "微距"
      }
    },
    "FAQAccordion": {
      "title": "常见问题",
      "subtitle": "关于 Ghiblio 的使用方法与功能说明",
      "questions": [
        {
          "question": "什么让 Ghiblio 与其他 AI 图像生成器不同？",
          "answer": "Ghiblio 基于强大的 GPT-4 模型，图像质量高，成图具备吉卜力独特的风格情绪。"
        },
        {
          "question": "什么是 ChatGPT 4 模型？",
          "answer": "ChatGPT 4 是 OpenAI 的新一代大语言模型，具备强大的图文理解与生成能力。"
        },
        {
          "question": "我可以生成哪些类型的图像？",
          "answer": "包括人像、宠物、场景等照片的吉卜力风格转换，支持文字转图与多种风格选择。"
        },
        {
          "question": "需要具备绘画基础吗？",
          "answer": "不需要，输入文字或上传照片即可，无需任何设计技能即可生成作品。"
        },
        {
          "question": "如何写好提示词？",
          "answer": "提示词建议包含主语 + 外观特征 + 场景 + 情绪氛围，如'戴草帽的女孩在花海中奔跑'。"
        },
        {
          "question": "为什么提示内容违规？",
          "answer": "出现违法、人物肖像、品牌元素等受限内容时，模型会自动拦截，避免生成不合规内容。"
        },
        {
          "question": "生成失败了会扣次数吗？",
          "answer": "不会，失败不扣次数，可免费重试。若异常持续，可联系客服处理。"
        },
        {
          "question": "生成图像是否可商用？",
          "answer": "高级版及以上支持商用授权，图像可用于项目展示或衍生作品使用。"
        },
        {
          "question": "我的图片安全吗？",
          "answer": "是的，所有上传内容均加密处理，24 小时自动清除，严格保护用户隐私。"
        },
        {
          "question": "一次套餐最多几张图？",
          "answer": "鲜鲜版 20 次、标准版 50 次、高级版 150 次、专业版 300 次，详见定价区。"
        }
      ]
    },
    "PricingPlans": {
      "title": "价格套餐",
      "subtitle": "选择适合你需求的套餐，开始创作吧",
      "footer": "所有套餐均为高清、无广告、无水印，可即时下载；高级版以上套餐支持商业用途和 API 接入。",
      "plans": {
        "fresh": {
          "name": "鲜鲜版",
          "price": "¥9.9",
          "description": "基础体验用户",
          "limit": "共 20 次",
          "features": [
            "支持照片/文字生成图",
            "支持高清下载",
            "支持多图生成图",
            "支持精选风格",
            "无广告",
            "无水印"
          ]
        },
        "standard": {
          "name": "标准版",
          "price": "¥19.9",
          "description": "高性价比用户",
          "limit": "共 50 次",
          "features": [
            "包含鲜鲜版所有功能",
            "支持所有风格（吉卜力/皮克斯等）",
            "自动提示词推荐"
          ]
        },
        "premium": {
          "name": "高级版",
          "price": "¥49.9",
          "description": "进阶创作用户",
          "limit": "共 150 次",
          "features": [
            "包含标准版所有功能",
            "支持多图合成（如情侣图）",
            "分辨率提升",
            "批量导出图像（新功能）"
          ]
        },
        "pro": {
          "name": "专业版",
          "price": "¥99",
          "description": "专业商用场景用户",
          "limit": "共 300 次",
          "features": [
            "包含全部功能",
            "开放 API 调用（新功能）",
            "提供 1V1 专属支持",
            "支持商用授权"
          ]
        }
      }
    },
    "Footer": {
      "slogan": "专业 AI 模型将照片与描述转化为梦幻画作，为创作者带来童话般插画体验。",
      "product": "产品",
      "support": "支持",
      "legal": "法律",
      "contactUs": "联系我们",
      "copyright": "© {year} Ghiblio. 保留所有权利。"
    },
    "UploadBox": {
      "textPlaceholder": "描述你想要的画面...",
      "imagePlaceholder": "添加图像描述（可选），描述越详细，效果越好",
      "uploadImage": "上传图片",
      "uploadMultipleImages": "上传多张图片",
      "uploadSupport": "支持 JPG, PNG",
      "uploadLimit": "最多可上传 5 张",
      "addMore": "添加",
      "styleSection": {
        "style": "风格分类",
        "ratio": "图片比例",
        "color": "色调风格",
        "composition": "构图调整",
        "hot": "热门"
      }
    },
    "ResultDisplay": {
      "title": "生成结果",
      "loading": "正在生成中，请稍候...",
      "clickToGenerate": "点击上方按钮开始创作"
    },
    "Privacy": {
      "title": "隐私政策",
      "backToHome": "返回首页",
      "lastUpdated": "最后更新: 2024年4月1日"
    },
    "Terms": {
      "title": "服务条款",
      "backToHome": "返回首页",
      "lastUpdated": "最后更新: 2024年4月1日"
    }
  }
};

/**
 * 获取深层嵌套对象的属性
 * @param obj 对象
 * @param path 路径数组或点分隔的字符串路径
 * @param defaultValue 默认值
 */
function getNestedValue(obj: any, path: string | string[], defaultValue: any = undefined): any {
  // 将路径转换为数组
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;
  
  for (const key of keys) {
    // 处理数组索引，如 "questions.0.question"
    if (/^\d+$/.test(key) && Array.isArray(result)) {
      const index = parseInt(key, 10);
      result = result[index];
    } else {
      result = result?.[key];
    }

    if (result === undefined) {
      return defaultValue;
    }
  }
  
  return result;
}

/**
 * 简单的国际化翻译函数
 * @param locale 语言代码
 * @param key 翻译键，格式为 "section.key" 或 "section.subKey.deepKey"
 * @returns 翻译后的文本或对象
 */
export function translate(locale: string, key: string): any {
  try {
    // 如果未找到翻译，回退到中文
    const localeMessages = messages[locale] || messages['zh'];
    const result = getNestedValue(localeMessages, key);
    
    return result !== undefined ? result : key;
  } catch (error) {
    console.error(`Translation missing for ${key} in ${locale}`);
    return key;
  }
}

/**
 * 创建翻译工具函数
 * @param locale 语言代码
 * @returns 翻译函数
 */
export function createTranslator(locale: string) {
  return (key: string) => translate(locale, key);
} 