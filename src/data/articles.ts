import { parseFrontMatter } from '@/utils/frontmatter'

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
  // yaml 可能把日期解析成 Date 对象，统计转回 YYYY-MM-DD
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value ?? '')
}

function toTags(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : []
}

export const articles: Article[] = Object.entries(mdFiles).map(([path, raw]) => {
  const { data, content } = parseFrontMatter(raw)
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
