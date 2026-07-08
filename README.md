# 袁浩个人网站

基于 React + Vite 搭建的个人介绍网站基础版，内容来自简历，重点展示 AI Agent 应用开发、RAG、后端接口、可观测性和部署验证能力。

## 本地运行

```bash
pnpm install
pnpm dev
```

默认预览地址：

```text
http://localhost:5173/
```

## 构建

```bash
pnpm build
```

构建产物会输出到 `dist/`。

## 部署到外网

推荐使用 Vercel，适合 React + Vite 静态站，导入仓库后保持默认配置即可：

```text
Build Command: pnpm build
Output Directory: dist
Install Command: pnpm install --frozen-lockfile
```

也可以使用 Netlify，项目内已提供 `netlify.toml`，导入仓库后会自动读取构建命令并发布 `dist/`。

部署完成后，把平台生成的公网 URL 填到笔试提交材料里即可。

## 页面结构

- 全屏 Hero：首页包含视频背景、大标题、导航栏和联系按钮。
- 精选项目：使用大卡片展示企业工单智能 Agent 平台、扫地机器人智能客服系统、具身智能机械臂控制系统。
- 能力模块：用卡片呈现 Agent 编排、RAG、后端接口、可观测性、测试部署、AI 工具实践。
- 联系方式：整屏收尾页，包含邮箱、电话和微信。
