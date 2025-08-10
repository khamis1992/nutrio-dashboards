# 🚀 البدء السريع - Nutrio Dashboards

ابدأ مع Nutrio Dashboards في أقل من 5 دقائق!

---

## ⚡ التثبيت السريع

### 📋 المتطلبات
- **Node.js** 18+ ([تحميل](https://nodejs.org/))
- **pnpm** 8+ ([تثبيت](https://pnpm.io/installation))
- **Git** ([تحميل](https://git-scm.com/))

### 🛠️ خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/your-username/nutrio-dashboards.git
cd nutrio-dashboards

# 2. تثبيت التبعيات
pnpm install

# 3. تشغيل التطبيق
pnpm run dev

# 4. فتح المتصفح
# http://localhost:5173
```

🎉 **مبروك! التطبيق يعمل الآن!**

---

## 🎯 جولة سريعة

### 🏠 الصفحة الرئيسية
- **4 لوحات رئيسية** للاختيار من بينها
- **تصميم متجاوب** يعمل على جميع الأجهزة
- **دعم كامل للعربية** مع اتجاه RTL

### 👨‍💼 لوحة إدارة النظام
```
📊 الإحصائيات العامة
👥 إدارة المستخدمين
🏪 إدارة المطاعم
🏋️ إدارة صالات الجيم
📈 التقارير والتحليلات
```

### 🍽️ لوحة إدارة المطاعم
```
📋 إدارة الطلبات
📜 إدارة القائمة
📦 إدارة المخزون
👥 إدارة العملاء
📊 تقارير المبيعات
```

### 🏋️ لوحة إدارة صالات الجيم
```
👥 إدارة الأعضاء
🗓️ إدارة الحصص
👨‍🏫 إدارة المدربين
💳 إدارة الاشتراكات
📊 تقارير الحضور
```

### 🚗 تطبيق التوصيل PWA
```
📱 لوحة السائق
🗺️ نظام التنقل
💰 تتبع الأرباح
📊 الإحصائيات
```

---

## 🎨 التخصيص السريع

### 🌈 تغيير الألوان
```css
/* في src/App.css */
:root {
  --primary-color: #3b82f6;    /* الأزرق */
  --secondary-color: #10b981;  /* الأخضر */
  --accent-color: #f59e0b;     /* البرتقالي */
}
```

### 🔤 تغيير الخطوط
```css
/* إضافة خط جديد */
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

body {
  font-family: 'Tajawal', 'Cairo', sans-serif;
}
```

### 🏢 تخصيص اسم الشركة
```js
// في src/components/HomePage.jsx
const companyName = "اسم شركتك هنا";
const companyLogo = "/path/to/your/logo.png";
```

---

## 🧩 إضافة مكون جديد

### 📝 مثال: إضافة مكون "إحصائية جديدة"

```jsx
// src/components/ui/NewStatCard.jsx
import React from 'react';

const NewStatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-blue-600">{value}</p>
        </div>
        <div className="text-4xl text-blue-500">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 text-sm text-green-600">
          ↗️ {trend}
        </div>
      )}
    </div>
  );
};

export default NewStatCard;
```

### 🔗 استخدام المكون
```jsx
// في أي لوحة تحكم
import NewStatCard from '../ui/NewStatCard';

<NewStatCard 
  title="عدد الزيارات"
  value="1,234"
  icon="👥"
  trend="+15% من الأسبوع الماضي"
/>
```

---

## 🛣️ إضافة صفحة جديدة

### 1. إنشاء المكون
```jsx
// src/components/NewPage.jsx
import React from 'react';

const NewPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        الصفحة الجديدة
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>محتوى الصفحة هنا...</p>
      </div>
    </div>
  );
};

export default NewPage;
```

### 2. إضافة الروت
```jsx
// في src/App.jsx
import NewPage from './components/NewPage';

// داخل Router
<Route path="/new-page" element={<NewPage />} />
```

### 3. إضافة رابط في القائمة
```jsx
// في أي سايد بار
<a href="/new-page" className="sidebar-link">
  📄 الصفحة الجديدة
</a>
```

---

## 🔧 الأوامر المفيدة

### 🏗️ أوامر البناء
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

### 📦 إدارة التبعيات
```bash
# إضافة مكتبة جديدة
pnpm add library-name

# إضافة مكتبة للتطوير فقط
pnpm add -D library-name

# إزالة مكتبة
pnpm remove library-name

# تحديث التبعيات
pnpm update
```

### 🧹 تنظيف المشروع
```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules pnpm-lock.yaml
pnpm install

# تنظيف ملفات البناء
rm -rf dist
```

---

## 🎯 نصائح للمبتدئين

### 📁 فهم هيكل المشروع
```
src/
├── components/     # جميع المكونات
│   ├── admin/     # مكونات لوحة الإدارة
│   ├── ui/        # مكونات واجهة المستخدم
│   └── layout/    # مكونات التخطيط
├── context/       # إدارة الحالة
└── App.jsx       # التطبيق الرئيسي
```

### 🎨 استخدام Tailwind CSS
```jsx
// أمثلة على فئات Tailwind المفيدة
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  خلفية زرقاء، نص أبيض، حشو، زوايا مدورة، ظل
</div>

<button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
  زر أخضر مع تأثير hover
</button>
```

### 🔄 إدارة الحالة
```jsx
// استخدام useState
const [count, setCount] = useState(0);

// استخدام useEffect
useEffect(() => {
  // كود يتم تنفيذه عند تحميل المكون
}, []);

// استخدام Context
const { user, setUser } = useContext(AppContext);
```

---

## 🐛 حل المشاكل الشائعة

### ❌ خطأ: "Module not found"
```bash
# تأكد من تثبيت التبعيات
pnpm install

# أو أعد تثبيت التبعيات
rm -rf node_modules
pnpm install
```

### ❌ خطأ: "Port already in use"
```bash
# استخدم بورت مختلف
pnpm run dev -- --port 3001

# أو أوقف العملية التي تستخدم البورت
lsof -ti:5173 | xargs kill -9
```

### ❌ مشكلة: "الخطوط العربية لا تظهر"
```css
/* تأكد من إضافة الخط في CSS */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');

body {
  font-family: 'Cairo', sans-serif;
  direction: rtl;
}
```

---

## 📚 الخطوات التالية

### 🎓 تعلم المزيد
1. **[دليل المساهمة](../CONTRIBUTING.md)** - كيفية المساهمة
2. **[دليل النشر](deployment.md)** - نشر التطبيق
3. **[مرجع API](api-reference.md)** - واجهات البرمجة
4. **[نظام التصميم](design-system.md)** - الألوان والخطوط

### 🚀 تطوير المشروع
- إضافة ميزات جديدة
- تحسين الأداء
- إضافة اختبارات
- تحسين التصميم

### 🤝 المشاركة
- شارك المشروع مع الآخرين
- اكتب مقالات عن التجربة
- ساهم في التطوير
- قدم اقتراحات للتحسين

---

## 💡 نصائح إضافية

### ⚡ تسريع التطوير
```bash
# استخدم الاختصارات
alias dev="pnpm run dev"
alias build="pnpm run build"
alias preview="pnpm run preview"
```

### 🔍 أدوات مفيدة
- **React Developer Tools** - لفحص المكونات
- **Tailwind CSS IntelliSense** - لاقتراحات Tailwind
- **ES7+ React/Redux/React-Native snippets** - لاختصارات الكود

### 📱 اختبار على الأجهزة المحمولة
```bash
# تشغيل على الشبكة المحلية
pnpm run dev -- --host

# ثم افتح على الهاتف
# http://your-ip:5173
```

---

🎉 **مبروك! أنت الآن جاهز لبدء التطوير مع Nutrio Dashboards!**

**هل تحتاج مساعدة؟** افتح [Issue](https://github.com/your-username/nutrio-dashboards/issues) أو راجع [التوثيق الكامل](../README.md).

---

**تم إنشاء هذا الدليل بواسطة فريق Nutrio 🚀**

