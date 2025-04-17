// 动态加载特定语言的消息文件
export const getMessages = async (locale: string) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
} 