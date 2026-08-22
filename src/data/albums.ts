export interface Album {
  slug: string
  title: string
  date: string
  photoCount: number
}

// TODO: 相册占位，后续实现
export const albums: Album[] = [
  { slug: 'vrchat-daily', title: 'VRChat 日常', date: '2026-08-10', photoCount: 12 },
  { slug: 'contest-screenshots', title: '题解截图', date: '2026-08-05', photoCount: 8 },
  { slug: 'life-snapshots', title: '生活随手拍', date: '2026-07-28', photoCount: 23 },
]
