// 内联翻译数据
const messages: Record<string, Record<string, Record<string, string>>> = {
  en: {
    "HeroSection": {
      "title": "Transform Text & Photos into Ghibli Illustrations",
      "description": "A professional AI model turns photos and descriptions into dreamy artworks, offering creators a fairytale illustration experience."
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
      "login": "Login/Register"
    },
    "Tabs": {
      "textToImage": "Text to Image",
      "imageToImage": "Image to Image",
      "batch": "Batch Generate"
    }
  },
  zh: {
    "HeroSection": {
      "title": "将文字照片转化为吉卜力插画",
      "description": "专业 AI 模型将照片与描述转化为梦幻画作，为创作者带来童话般插画体验。"
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
      "login": "登录/注册"
    },
    "Tabs": {
      "textToImage": "文生图",
      "imageToImage": "图生图",
      "batch": "批量生图"
    }
  }
};

/**
 * 简单的国际化翻译函数
 * @param locale 语言代码
 * @param key 翻译键，格式为 "section.key"
 * @returns 翻译后的文本
 */
export function translate(locale: string, key: string): string {
  // 处理键格式 "section.key"
  const [section, messageKey] = key.split('.');
  
  try {
    // 如果未找到翻译，回退到中文
    const localeMessages = messages[locale as keyof typeof messages] || messages['zh'];
    const sectionMessages = localeMessages[section as keyof typeof localeMessages];
    return sectionMessages?.[messageKey as keyof typeof sectionMessages] || key;
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