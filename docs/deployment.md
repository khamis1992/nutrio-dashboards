# 🚀 دليل النشر - Nutrio Dashboards

هذا الدليل يوضح كيفية نشر تطبيق Nutrio Dashboards على منصات مختلفة.

---

## 📋 المتطلبات الأساسية

### 🛠️ الأدوات المطلوبة
- **Node.js** 18.0.0 أو أحدث
- **pnpm** 8.0.0 أو أحدث
- **Git** للتحكم في الإصدارات
- حساب على منصة النشر المختارة

### 🔧 إعداد المشروع محلياً
```bash
# استنساخ المشروع
git clone https://github.com/your-username/nutrio-dashboards.git
cd nutrio-dashboards

# تثبيت التبعيات
pnpm install

# اختبار البناء محلياً
pnpm run build
```

---

## 🌐 Netlify (موصى به)

### 🚀 النشر السريع

#### الطريقة الأولى: Drag & Drop
1. قم ببناء المشروع محلياً:
   ```bash
   pnpm run build
   ```
2. اذهب إلى [Netlify](https://app.netlify.com/)
3. اسحب مجلد `dist` إلى منطقة النشر
4. سيتم نشر التطبيق فوراً!

#### الطريقة الثانية: Git Integration
1. ادفع الكود إلى GitHub
2. اربط الريبو بـ Netlify
3. إعدادات البناء:
   ```
   Build command: pnpm run build
   Publish directory: dist
   ```

### ⚙️ إعدادات Netlify المتقدمة

#### ملف `netlify.toml`
```toml
[build]
  publish = "dist"
  command = "pnpm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_ENV = "production"

[context.deploy-preview.environment]
  NODE_ENV = "development"
```

#### متغيرات البيئة
```bash
# في لوحة تحكم Netlify
NODE_VERSION=18
NODE_ENV=production
```

### 🔄 النشر التلقائي مع GitHub Actions

```yaml
# .github/workflows/netlify.yml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## ▲ Vercel

### 🚀 النشر السريع

#### الطريقة الأولى: Vercel CLI
```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر المشروع
vercel --prod
```

#### الطريقة الثانية: Git Integration
1. اذهب إلى [Vercel](https://vercel.com/)
2. اربط الريبو من GitHub
3. سيتم النشر تلقائياً!

### ⚙️ إعدادات Vercel

#### ملف `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🔥 Firebase Hosting

### 🚀 النشر السريع

```bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# تهيئة المشروع
firebase init hosting

# بناء المشروع
pnpm run build

# النشر
firebase deploy
```

### ⚙️ إعدادات Firebase

#### ملف `firebase.json`
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## 📄 GitHub Pages

### 🚀 النشر السريع

#### GitHub Actions للنشر التلقائي
```yaml
# .github/workflows/gh-pages.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      
    - name: Setup Pages
      uses: actions/configure-pages@v3
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: './dist'
        
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    
    steps:
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v2
```

### ⚙️ إعدادات Vite لـ GitHub Pages

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nutrio-dashboards/', // اسم الريبو
  build: {
    outDir: 'dist',
  },
})
```

---

## ☁️ AWS S3 + CloudFront

### 🚀 النشر السريع

#### إعداد S3 Bucket
```bash
# تثبيت AWS CLI
pip install awscli

# تكوين AWS
aws configure

# إنشاء S3 bucket
aws s3 mb s3://nutrio-dashboards

# تفعيل Static Website Hosting
aws s3 website s3://nutrio-dashboards \
  --index-document index.html \
  --error-document index.html
```

#### رفع الملفات
```bash
# بناء المشروع
pnpm run build

# رفع الملفات
aws s3 sync dist/ s3://nutrio-dashboards --delete

# تعيين أذونات القراءة العامة
aws s3api put-bucket-policy \
  --bucket nutrio-dashboards \
  --policy file://bucket-policy.json
```

#### ملف `bucket-policy.json`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nutrio-dashboards/*"
    }
  ]
}
```

---

## 🐳 Docker

### 🚀 النشر باستخدام Docker

#### ملف `Dockerfile`
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the app
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### ملف `nginx.conf`
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

#### بناء وتشغيل Docker
```bash
# بناء الصورة
docker build -t nutrio-dashboards .

# تشغيل الحاوية
docker run -p 80:80 nutrio-dashboards
```

---

## 🔧 إعدادات متقدمة

### 🌍 متغيرات البيئة

#### ملف `.env.production`
```bash
VITE_API_URL=https://api.nutrio.com
VITE_APP_NAME=Nutrio Dashboards
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
```

#### استخدام المتغيرات في الكود
```js
// في الكود
const API_URL = import.meta.env.VITE_API_URL
const APP_NAME = import.meta.env.VITE_APP_NAME
```

### 🔒 إعدادات الأمان

#### Headers الأمان
```js
// في إعدادات الخادم
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'"
}
```

### 📊 مراقبة الأداء

#### Google Analytics
```js
// في index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🚨 استكشاف الأخطاء

### ❌ مشاكل شائعة وحلولها

#### مشكلة: "404 عند تحديث الصفحة"
**الحل:** إضافة إعادة توجيه للـ SPA
```
# في Netlify
/*    /index.html   200

# في Apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]

# في Nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### مشكلة: "بطء في التحميل"
**الحل:** تحسين البناء
```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
```

#### مشكلة: "خطأ في الخطوط العربية"
**الحل:** إضافة الخطوط في CSS
```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');

body {
  font-family: 'Cairo', sans-serif;
}
```

---

## 📈 تحسين الأداء

### ⚡ نصائح لتحسين الأداء

#### 1. تحسين الصور
```bash
# ضغط الصور
npm install -g imagemin-cli
imagemin screenshots/*.webp --out-dir=screenshots/optimized
```

#### 2. تحسين CSS
```js
// في vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  build: {
    cssCodeSplit: true,
    minify: 'esbuild',
  },
})
```

#### 3. تحسين JavaScript
```js
// استخدام Dynamic Imports
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'))
const RestaurantDashboard = lazy(() => import('./components/restaurant/RestaurantDashboard'))
```

---

## 🎯 الخلاصة

### ✅ قائمة التحقق قبل النشر
- [ ] اختبار البناء محلياً
- [ ] فحص جميع الروابط
- [ ] اختبار على متصفحات مختلفة
- [ ] اختبار على أجهزة محمولة
- [ ] فحص الأداء
- [ ] إعداد متغيرات البيئة
- [ ] إعداد النطاق المخصص
- [ ] إعداد SSL
- [ ] إعداد المراقبة

### 🚀 بعد النشر
- [ ] اختبار التطبيق المنشور
- [ ] إعداد النسخ الاحتياطية
- [ ] مراقبة الأداء
- [ ] إعداد التنبيهات
- [ ] توثيق عملية النشر

---

**تم إنشاء هذا الدليل بواسطة فريق Nutrio 🚀**

