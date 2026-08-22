export interface FriendLink {
  name: string
  url: string
  description: string
  featured?: boolean
}

// 友情链接：占位数据，友链页阶段替换为真实链接；featured: true 的会展示在首页
export const friendLinks: FriendLink[] = [
  { name: 'Checkey01 的小站', url: '/', description: '欢迎交换友链', featured: true },
  { name: '你的博客名', url: '/', description: '一行简介', featured: true },
  { name: '你的博客名', url: '/', description: '一行简介', featured: true },
]
