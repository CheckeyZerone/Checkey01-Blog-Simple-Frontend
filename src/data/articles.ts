import matter from 'gray-matter'

export interface Article {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

// 读取`src/contents`下所有 Markdown 文章（构建时打包进项目）
const mdFiles = import.meta.glob('../contents/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function toDataString(value: unknown): string {
  // gray-matter 可能把日期解析成 Date 对象，统计转回 YYYY-MM-DD
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value ?? '')
}

function toTags(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : []
}

export const articles: Article[] = Object.entries(mdFiles).map(([path, raw]) => {
  const { data, content } = matter(raw)
  const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
  return {
    slug,
    title: String(data.title ?? slug),
    date: toDataString(data.date),
    tags: toTags(data.tags),
    excerpt: String(data.excerpt ?? ''),
    content: content.trim(),
  }
})

// export const articles: Article[] = [
//   {
//     slug: 'hello-vue',
//     title: '我的第一篇博客',
//     date: '2026-08-14',
//     tags: ['vue', '随笔'],
//     excerpt: '欢迎来到我的博客，这是第一篇文章。',
//     content: '# 第一篇博客\n\n你好，Vue 3！\n```python\nprint("hello world!")\n```',
//   },
//   {
//     slug: 'markdown-notes',
//     title: 'Markdown 学习笔记',
//     date: '2026-08-15',
//     tags: ['markdown'],
//     excerpt: '记录 Markdown 的常用语法。',
//     content: '# Markdown\n\n## 标题\n\n- 列表\n- 加粗 **bold**\n- $E = mc^2$',
//   },
//   {
//     slug: 'blog-plan',
//     title: '博客开发计划',
//     date: '2026-08-16',
//     tags: ['计划'],
//     excerpt: '接下来四周要完成的事情。',
//     content: '# 计划\n\n1. 首页列表\n2. 详情页\n3. 标签',
//   },
// ]
