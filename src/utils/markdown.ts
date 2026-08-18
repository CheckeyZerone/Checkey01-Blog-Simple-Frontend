/**
 * 配置Markdown渲染成HTML的
 */
import MarkdownIt from 'markdown-it'
import markdownItTexmath from 'markdown-it-texmath'
import katex from 'katex'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css' // KaTeX 公式样式

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`
    }
    return ''
  },
})

md.use(markdownItTexmath, {
  engine: katex,
  delimiters: 'dollars',
  katexOptions: { throwOnError: false },
})

export function renderMarkdown(source: string): string {
  return DOMPurify.sanitize(md.render(source), {
    USE_PROFILES: { html: true, mathMl: true, svg: true },
  })
}
