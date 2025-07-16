# 📦 国家兽药基础数据库

基于 **Vue 3 + TypeScript + UnoCSS + Pinia** 构建的现代化后台管理系统。

---

## ✨ 特性

- 🧩 Vue 3 + TypeScript，结构清晰，类型安全
- ⚡ 极速开发体验，基于 Vite 构建
- 🎨 UnoCSS 原子化 CSS，灵活定制主题
- 🗂️ 使用 Pinia 状态管理，简单易用
- 📦 丰富的内置组件示例，支持二次开发
- 🛠️ 集成 eslint、stylelint、commitlint 等工程化工具
- 🔑 权限路由、多级菜单、KeepAlive 缓存
- 📦 内置 mock，快速模拟接口
- 🚀 plop 模板工具，一键生成页面/组件/模块

---

## 🛠 技术栈

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [UnoCSS](https://unocss.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Plop.js](https://plopjs.com/)

---

## 📁 项目结构（核心）

```plaintext
国家兽药基础数据库
├─ src/                    # 核心源码
│  ├─ api/                 # 接口封装
│  ├─ assets/              # 静态资源（图片/图标/样式）
│  ├─ components/          # 公共组件
│  ├─ layouts/             # 页面布局
│  ├─ router/              # 路由配置
│  ├─ store/               # Pinia 状态管理
│  ├─ views/               # 页面视图
│  ├─ utils/               # 工具函数
│  ├─ constants/           # 常量配置
│  ├─ slots/               # 插槽/扩展
│  ├─ ui/                  # UI 组件封装
│  └─ main.ts              # 应用入口
├─ public/                 # 公共静态资源
├─ plop-templates/         # plop 模板自动化
├─ themes/                 # 主题配置
├─ uno.config.ts           # UnoCSS 配置
├─ vite.config.ts          # Vite 配置
├─ tsconfig*.json          # TypeScript 配置
├─ .env.*                  # 不同环境变量
└─ README.md

---

## 🚀 快速开始

### 安装依赖

推荐使用 pnpm：
```bash
pnpm install

### 本地开发

```bash
pnpm dev
```

---

### 打包构建

```bash
pnpm build
```

---

### 格式化 & 代码检查

```bash
pnpm lint      # eslint + stylelint
pnpm format    # prettier 格式化
```

---

## 🧰 自动化模板生成

内置 [plop.js](https://plopjs.com/) 可快速生成：
- 页面
- 组件
- mock 文件
- store 模块

使用命令：
```bash
pnpm new
```

根据提示选择模板类型，即可快速生成。

---

## 🔧 配置说明

- `.env.*`：环境变量（开发/生产等）
- `vite.config.ts`：Vite 配置
- `uno.config.ts`：UnoCSS 配置
- `eslint.config.js` / `stylelint.config.js`：代码风格
- `plop-templates/`：plop 模板目录

---

## 📄 License

[MIT](LICENSE)

---

> ✨ 欢迎提出 Issue / PR，让这个项目变得更好！
