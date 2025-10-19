// Demo data. Replace or extend with real posts later.

const placeholder = (id) => `https://picsum.photos/seed/${id}/800/500`;

const posts = [
  {
    id: 'sunset-hz',
    title: '杭州·太子尖',
    excerpt: '登高望远，云海晚霞尽收眼底。',
    date: '2025-08-30',
    category: '游记',
    tags: ['旅行', '摄影'],
    coverFile: 'Back.jpg',
    cover: placeholder('hz-sunset'),
  },
  {
    id: 'hello-wei',
    title: '你好，蔚：这是第一篇示例文章',
    excerpt: '用一篇短文，测试首页列表、详情页面、搜索与筛选是否正常工作。',
    date: new Date().toISOString().slice(0,10),
    category: '随笔',
    tags: ['起步', '示例'],
    coverFile: 'Back.jpg',
    cover: placeholder('hello-wei'),
  },
//   {
//     id: 'ningbo-night',
//     title: '宁波古城夜色',
//     excerpt: '流光溢彩，老街的温度藏在灯火里。',
//     date: '2025-08-23',
//     category: '随笔',
//     tags: ['城市', '夜景'],
//     coverFile: 'ningbo-night.jpg',
//     cover: placeholder('nb-night'),
//   },
//   {
//     id: 'qiandao-lake',
//     title: '江西·武功山',
//     excerpt: '草甸起伏，云雾缭绕，山风自由。',
//     date: '2025-06-09',
//     category: '游记',
//     tags: ['徒步', '自然'],
//     coverFile: 'wugongshan.jpg',
//     cover: placeholder('wg-mountain'),
//   },
//   // More demo items
//   ...Array.from({ length: 9 }).map((_, i) => ({
//     id: `demo-${i+1}`,
//     title: `随笔记录 ${i+1}`,
//     excerpt: '记录一点点生活与学习的碎片。',
//     date: `2025-05-${String(28 - i).padStart(2, '0')}`,
//     category: i % 2 ? '随笔' : '技术',
//     tags: i % 2 ? ['生活'] : ['Web', '前端'],
//     cover: placeholder(`demo-${i+1}`),
//   }))
];

export default posts;


