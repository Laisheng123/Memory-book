# 纪念树 · Memory Tree

用三段语音记录老人生活故事，AI 转写润色，最终生成精装纪念书。

## 本地预览

```bash
npm run dev
```

浏览器打开 http://localhost:3000

或直接双击 `index.html` 在浏览器中查看。

## 页面结构

- **Hero** — 产品核心价值：说三段话，留下一整本书
- **痛点** — 为什么需要纪念树
- **制作流程** — 录制语音 → AI 转写 → 精装成书
- **三段故事** — 根（从哪里来）· 枝（走过的路）· 叶（想留下的话）
- **成品预览** — 书籍内页样张与功能说明
- **用户评价** / **定价** / **FAQ** / **CTA**

## 技术栈

纯静态页面：HTML + CSS + JavaScript，无需构建步骤。

## Supabase 手机号收集

落地页 CTA 表单会将手机号写入 Supabase `leads` 表。

### 1. 创建数据表

在 [Supabase Dashboard](https://supabase.com/dashboard/project/pmdabxzspboknlhzvgxi/sql) → **SQL Editor** 中执行 `supabase/schema.sql`。

### 2. 配置

Supabase 连接信息在 `js/config.js`：

- URL: `https://pmdabxzspboknlhzvgxi.supabase.co`
- Key: publishable key（可暴露在前端）

### 3. 查看提交记录

Dashboard → **Table Editor** → `leads` 表。
