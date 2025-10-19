# 个人博客（静态版）

- 打开 `index.html` 直接浏览。
- 所有样式使用 Tailwind CDN，逻辑为原生 JavaScript。

## 结构

- `index.html`：首页，搜索/筛选/分页/主题切换/回到顶部。
- `assets/js/posts-data.js`：文章数据示例。
- `pages/post.html`：文章详情模板，通过 `?id=` 加载。
- 其他页面：`categories.html`、`archives.html`、`tags.html`、`links.html`、`about.html`。

## 使用

- 将你的文章加入 `assets/js/posts-data.js`，字段：
```json
{
  "id": "唯一ID",
  "title": "标题",
  "excerpt": "摘要",
  "date": "YYYY-MM-DD",
  "category": "分类",
  "tags": ["标签1"],
  "coverFile": "封面图片文件名(存放在pics/)",
  "cover": "备用远程图片URL（可选）"
}
```
- 也可以把 Markdown 渲染为 HTML 并放入 `pages/post.html` 的正文区域。

### 图片管理（pics/）

- 在项目根目录新建 `pics/`，把图片文件放进去，例如：
  - `pics/hero.jpg`：如果存在，会自动替换首页顶部背景。
  - `pics/<coverFile>`：与 `posts-data.js` 中 `coverFile` 对应。
- 我已添加 `.gitkeep` 便于空文件夹提交。
- 生产环境若图片不存在，将自动回退到条目里的 `cover` 远程地址。

## 部署

- GitHub Pages（推荐）：
  1) 新建公开仓库并将本项目推送到 `main` 分支。
  2) 仓库 Settings → Pages：Source 选择 GitHub Actions。
  3) 我已提供 `.github/workflows/pages.yml`，推送后会自动部署。
  4) 首次完成后，访问页面会显示在 Actions 日志与仓库 Pages 面板。

- 项目页注意：本项目所有链接均为相对路径，适用于 `username.github.io/repo/`。我也提供了 `404.html` 以支持直接打开子路径。

- 其他平台：任意静态托管（Vercel/Netlify/OSS 等）将仓库输出目录设为项目根即可。



