import { readFileSync } from 'node:fs'

import { build } from 'vite'

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
)
const version = pkg.version
const outDir = `release/${version}`

console.log(`[release] 开始打包 v${version} -> ${outDir}`)

await build({
  build: {
    outDir,
  },
})

console.log(`[release] 完成：${outDir}`)
