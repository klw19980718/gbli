export const locales = ['en', 'zh']; // 定义支持的语言
export const defaultLocale = 'zh';    // 定义默认语言

// 动态加载特定语言的消息文件
export const getMessages = async (locale: string) => {
  // 验证 locale 是否在支持的列表中，如果不在，可以使用 defaultLocale 或抛出错误
  const supportedLocale = locales.includes(locale) ? locale : defaultLocale;
  return {
    messages: (await import(`../messages/${supportedLocale}.json`)).default
  };
} 