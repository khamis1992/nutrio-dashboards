# 🚀 تعليمات إعداد Nutrio Dashboards على GitHub

هذا الدليل يوضح كيفية رفع المشروع إلى GitHub وإعداده للنشر.

---

## 📋 الخطوات المطلوبة

### 1. 🔧 إنشاء ريبو على GitHub

1. اذهب إلى [GitHub](https://github.com/)
2. اضغط على **"New repository"**
3. املأ البيانات:
   ```
   Repository name: nutrio-dashboards
   Description: نظام إدارة شامل للمطاعم وصالات الجيم مع تطبيق توصيل PWA
   ✅ Public (أو Private حسب الحاجة)
   ❌ Initialize with README (لأن لدينا README جاهز)
   ```
4. اضغط **"Create repository"**

### 2. 📤 رفع الكود إلى GitHub

```bash
# في مجلد المشروع
cd /path/to/nutrio-dashboards-repo

# إضافة remote origin
git remote add origin https://github.com/YOUR_USERNAME/nutrio-dashboards.git

# رفع الكود
git push -u origin main
```

### 3. 🌐 إعداد النشر على Netlify

#### الطريقة الأولى: ربط GitHub مع Netlify
1. اذهب إلى [Netlify](https://app.netlify.com/)
2. اضغط **"New site from Git"**
3. اختر **GitHub** وصل حسابك
4. اختر ريبو `nutrio-dashboards`
5. إعدادات البناء:
   ```
   Build command: pnpm run build
   Publish directory: dist
   ```
6. اضغط **"Deploy site"**

#### الطريقة الثانية: النشر اليدوي
```bash
# بناء المشروع
pnpm run build

# رفع مجلد dist إلى Netlify مباشرة
```

### 4. ⚙️ إعداد GitHub Actions (اختياري)

الملف موجود بالفعل في `.github/workflows/deploy.yml`

لتفعيله، أضف المتغيرات التالية في إعدادات الريبو:
```
Settings > Secrets and variables > Actions > New repository secret

NETLIFY_AUTH_TOKEN: your_netlify_auth_token
NETLIFY_SITE_ID: your_netlify_site_id
```

### 5. 🔧 تخصيص المشروع

#### تحديث الروابط في README.md
```markdown
# استبدل YOUR_USERNAME باسم المستخدم الحقيقي
https://github.com/YOUR_USERNAME/nutrio-dashboards.git
```

#### تحديث package.json
```json
{
  "name": "nutrio-dashboards",
  "homepage": "https://your-site-name.netlify.app",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/nutrio-dashboards.git"
  }
}
```

---

## 🎯 الملفات الجاهزة في المشروع

### 📁 الملفات الأساسية
- ✅ `README.md` - دليل شامل للمشروع
- ✅ `LICENSE` - رخصة MIT
- ✅ `CHANGELOG.md` - سجل التغييرات
- ✅ `CONTRIBUTING.md` - دليل المساهمة
- ✅ `.gitignore` - ملفات مستبعدة من Git

### 📚 التوثيق
- ✅ `docs/quick-start.md` - البدء السريع
- ✅ `docs/deployment.md` - دليل النشر
- ✅ `docs/api-reference.md` - مرجع API

### 🔧 إعدادات التطوير
- ✅ `.github/workflows/deploy.yml` - GitHub Actions
- ✅ `package.json` - إعدادات المشروع
- ✅ `vite.config.js` - إعدادات Vite
- ✅ `tailwind.config.js` - إعدادات Tailwind

### 📸 الأصول
- ✅ `screenshots/` - لقطات شاشة للتطبيق
- ✅ `public/manifest.json` - إعدادات PWA
- ✅ `public/_redirects` - إعدادات Netlify

---

## 🚀 بعد الرفع

### 1. ✅ التحقق من الريبو
- [ ] الكود مرفوع بنجاح
- [ ] README يظهر بشكل صحيح
- [ ] الصور تظهر في README
- [ ] الروابط تعمل

### 2. 🌐 التحقق من النشر
- [ ] الموقع يعمل على Netlify
- [ ] جميع الصفحات تحمل بشكل صحيح
- [ ] التصميم يظهر بشكل مناسب
- [ ] الروتنق يعمل بدون أخطاء

### 3. 📊 إعداد المراقبة
- [ ] Google Analytics (اختياري)
- [ ] Netlify Analytics
- [ ] GitHub Insights

---

## 🔧 أوامر مفيدة

### Git Commands
```bash
# فحص حالة Git
git status

# إضافة تغييرات جديدة
git add .
git commit -m "feat: إضافة ميزة جديدة"
git push

# إنشاء فرع جديد
git checkout -b feature/new-feature

# دمج الفروع
git checkout main
git merge feature/new-feature
```

### Project Commands
```bash
# تشغيل التطوير
pnpm run dev

# بناء للإنتاج
pnpm run build

# معاينة البناء
pnpm run preview

# فحص الكود
pnpm run lint
```

---

## 🆘 حل المشاكل الشائعة

### ❌ مشكلة: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/nutrio-dashboards.git
```

### ❌ مشكلة: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### ❌ مشكلة: "الصور لا تظهر في README"
- تأكد من أن مجلد `screenshots` مرفوع
- تحقق من مسارات الصور في README.md
- استخدم مسارات نسبية: `screenshots/image.webp`

### ❌ مشكلة: "Netlify build fails"
```bash
# تأكد من وجود ملف _redirects
echo "/*    /index.html   200" > public/_redirects

# تأكد من إعدادات البناء الصحيحة
Build command: pnpm run build
Publish directory: dist
```

---

## 📈 تحسينات مستقبلية

### 🔮 الإصدار 1.1.0
- [ ] نظام مصادقة متقدم
- [ ] تحليلات متقدمة
- [ ] وضع الليل
- [ ] إشعارات البريد الإلكتروني

### 🔮 الإصدار 1.2.0
- [ ] ذكاء اصطناعي
- [ ] تطبيق موبايل
- [ ] تكامل APIs خارجية
- [ ] دعم لغات إضافية

---

## 📞 الدعم

### 💬 إذا واجهت مشاكل:
1. راجع [التوثيق](docs/)
2. ابحث في [Issues](https://github.com/YOUR_USERNAME/nutrio-dashboards/issues)
3. أنشئ Issue جديد مع تفاصيل المشكلة
4. راسل فريق الدعم

### 🤝 للمساهمة:
1. اقرأ [دليل المساهمة](CONTRIBUTING.md)
2. أنشئ Fork للمشروع
3. أنشئ فرع للميزة الجديدة
4. أرسل Pull Request

---

## 🎉 تهانينا!

لقد أصبح لديك الآن:
- ✅ **ريبو GitHub احترافي** مع توثيق شامل
- ✅ **تطبيق منشور** على Netlify
- ✅ **نظام CI/CD** مع GitHub Actions
- ✅ **مشروع جاهز للإنتاج** مع جميع الميزات

**المشروع جاهز للاستخدام والتطوير! 🚀**

---

**تم إنشاء هذا الدليل بواسطة فريق Nutrio 💙**

**تاريخ الإنشاء:** 10 أغسطس 2024

