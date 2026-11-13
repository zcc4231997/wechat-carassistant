# 微信车载语音助手 · 官网

独立 Android 语音辅助工具的下载官网。非腾讯或微信官方产品。

## 发布范围
此仓库仅包含官网源码与可直接部署的 `site/` 静态产物。不包含 Android 工程、模型权重、签名密钥、构建缓存或 APK 的 Git 副本。原 Android 工程未删除或修改。

- React 19 + Vite 8 + Tailwind CSS 4
- 暖白 / 墨绿响应式设计，无 emoji
- 本地主界面素材、SVG 二维码、安装说明、权限与隐私说明
- Android v1.0，Android 8.0+，ARM 32/64 位
- APK 362,334,504 bytes（362.3 MB / 345.6 MiB）
- SHA-256: `22949f4c0bd9933c198f42cd5b25fdebd9ad9f5a8f19d496636476ca79e40804`

## 本地开发
Node.js 22.12+（推荐 24）
```sh
npm install
npm run dev
npm run build
```
`dist/` 为构建产物。`site/` 为已构建且纳入版本控制的静态发布目录，用于无需构建的托管。

## 首次发布：安装包
APK 不能提交普通 Git（单文件超过 100 MB）。也不适合 Cloudflare Pages（单文件上限 25 MiB）。使用 GitHub Releases 存储 APK，网站只保存下载地址。

1. 在 GitHub 仓库创建 Release，标签 `v1.0`，附件上传原始 `app-release.apk`。
2. 上传成功后，核对实际地址为：
   `https://github.com/zcc4231997/wechat-carassistant/releases/download/v1.0/app-release.apk`
3. 核对文件大小与 SHA-256，然后将 `public/release.json` 的 `published` 改为 `true`。
4. 构建，复制 `dist/` 的内容更新 `site/`，提交 feature 分支后合并。

**目前 `published:false` 是明确的防误导状态。未上传 APK 时下载页会显示“安装包待发布”，不会把用户导向虚假的可用下载。**

## 推荐部署：Cloudflare Pages
不需要 Supabase，也不需要 Render 后端。

1. 合并官网 feature 分支到仓库 main（或初始空仓库先推同名分支至 GitHub，再创建默认分支）。
2. Cloudflare → Workers & Pages → 创建 Pages 项目 → 连接 GitHub → 选择本仓库。
3. 生产分支选包含官网的分支；框架预设 `None`；构建命令留空；输出目录 `site`。
4. 部署完成后先测试 `https://实际项目名.pages.dev/` 与 `/download.html`。
5. 二维码在浏览器中自动指向当前站点的 `/download.html`，无需手动修改即可使用新域名。`npm run qr -- https://实际项目名.pages.dev/download.html` 仅用于更新静态兜底二维码。

## 挂自己的域名

域名从 DNSHE 或任何注册商购买都可以，DNS 管理可迁移到 Cloudflare。

### 根域名（例如 example.com）
1. 把域名添加到 Cloudflare，按页面给出的两条 nameserver 去注册商更新 NS。
2. 等状态为 Active（不要猜 NS 值）。
3. Pages 项目 → Custom domains → Set up a custom domain → 输入 `example.com`，让向导创建 DNS 记录。
4. HTTPS 证书激活后，测试主页、download.html、privacy.html。
5. 页面二维码会自动使用当前域名。可选更新静态兜底图：`npm run qr -- https://example.com/download.html`，再构建更新 `site/`。

### 子域名（例如 app.example.com）
可以保留外部 DNS。先在 Pages 的 Custom domains 添加该子域名，再在当前 DNS 服务商按向导添加 CNAME，目标为项目真实的 `xxx.pages.dev`。不要仅加 DNS 而跳过 Pages 域名绑定。HTTPS 就绪后，页面二维码自动使用访问域名；静态兜底二维码可选更新。

官网与 APK 不需要同源。自定义域名改变的是网页地址，GitHub Release 下载链接可以不变。

## Render 备选
New → Static Site → GitHub 仓库；Build Command 留空；Publish Directory `site`；添加 Custom Domain 后按 Render 显示的 DNS 记录配置。不要为此新建收费 Web Service。

## 无需 GitHub Pages 的提醒
初版静态兜底二维码预置 GitHub Pages 形式地址，只是待启用的计划地址，**不代表已经上线**；实际页面二维码由本地打包的 QRCode 库生成，自动采用当前站点地址。如决定使用 GitHub Pages，Settings → Pages → Source 选分支，发布目录可用 `/docs`（需要将 `site` 拷贝为 `docs`）；更推荐上面的 Cloudflare Pages，直接使用 `site` 即可。正式部署后请扫码确认实际网址和下载流程。

## 安全与隐私
不要上传手机截图里的真实联系人、聊天、电话、账号及诊断日志。现有主界面截图进行了微小视觉清理（移除原图内的 emoji），非新的应用 UI。

相关 APK 的旧隐私政策包含与实现不一致的绝对声明；官网 `privacy.html` 已明确说明本地消息历史、诊断日志和系统备份的边界，但不会自动修复 APK。大规模发布前建议修订应用内政策并真机验证。模型许可应单独核实。
