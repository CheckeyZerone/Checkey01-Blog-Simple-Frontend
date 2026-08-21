import { parse } from 'yaml'

export interface Frontmatter {
  title?: string
  date?: string
  tags?: string[]
  excerpt?: string
  featured?: boolean
}

// 把 Markdown 原始文本转成 frontmatter 数据和正文
export function parseFrontMatter(source: string): {
  data: Frontmatter
  content: string
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  if (!match) {
    return {
      data: {},
      content: source,
    }
  }

  const yamlText = match[1]
  if (yamlText === undefined) {
    return {
      data: {},
      content: source,
    }
  }
  const content = source.slice(match[0].length)
  return {
    data: (parse(yamlText) ?? {}) as Frontmatter,
    content,
  }
}
