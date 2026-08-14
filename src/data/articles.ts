export interface Article {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

export const articles: Article[] = [
  {
    slug: 'hello-vue',
    title: '我的第一篇博客',
    date: '2026-08-14',
    tags: ['vue', '随笔'],
    excerpt: '欢迎来到我的博客，这是第一篇文章。',
    content: '# 第一篇博客\n\n你好，Vue 3！',
  },
  {
    slug: 'markdown-notes',
    title: 'Markdown 学习笔记',
    date: '2026-08-15',
    tags: ['markdown'],
    excerpt: '记录 Markdown 的常用语法。',
    content: '# Markdown\n\n## 标题\n\n- 列表\n- 加粗 **bold**',
  },
  {
    slug: 'blog-plan',
    title: '博客开发计划',
    date: '2026-08-16',
    tags: ['计划'],
    excerpt: '接下来四周要完成的事情。',
    content: '# 计划\n\n1. 首页列表\n2. 详情页\n3. 标签',
  },
]
