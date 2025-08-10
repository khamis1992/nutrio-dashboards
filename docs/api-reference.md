# 🔌 مرجع API - Nutrio Dashboards

دليل شامل لواجهات البرمجة المستخدمة في نظام Nutrio Dashboards.

---

## 📋 نظرة عامة

### 🎯 Base URL
```
Production: https://api.nutrio.com/v1
Development: http://localhost:3000/api/v1
```

### 🔐 المصادقة
```javascript
// Headers مطلوبة
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

### 📊 تنسيق الاستجابة
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2024-08-10T12:00:00Z"
}
```

---

## 🔐 المصادقة والأذونات

### 🚪 تسجيل الدخول
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@nutrio.com",
  "password": "password123",
  "role": "admin" // admin, restaurant, gym, driver
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "أحمد محمد",
      "email": "admin@nutrio.com",
      "role": "admin",
      "permissions": ["read", "write", "delete"]
    },
    "expires_in": 3600
  }
}
```

### 🔄 تجديد الرمز المميز
```http
POST /auth/refresh
```

### 🚪 تسجيل الخروج
```http
POST /auth/logout
```

---

## 👨‍💼 إدارة النظام

### 📊 الإحصائيات العامة
```http
GET /admin/dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_users": 1250,
    "total_restaurants": 45,
    "total_gyms": 23,
    "total_drivers": 156,
    "total_orders": 8934,
    "total_revenue": 125000.50,
    "growth_rate": 15.2
  }
}
```

### 👥 إدارة المستخدمين

#### جلب جميع المستخدمين
```http
GET /admin/users?page=1&limit=20&role=all&status=active
```

**Query Parameters:**
- `page`: رقم الصفحة (افتراضي: 1)
- `limit`: عدد النتائج (افتراضي: 20)
- `role`: الدور (all, admin, restaurant, gym, driver)
- `status`: الحالة (active, inactive, suspended)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "أحمد محمد",
        "email": "ahmed@example.com",
        "role": "restaurant",
        "status": "active",
        "created_at": "2024-01-15T10:30:00Z",
        "last_login": "2024-08-10T08:15:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_count": 100,
      "per_page": 20
    }
  }
}
```

#### إنشاء مستخدم جديد
```http
POST /admin/users
```

**Request Body:**
```json
{
  "name": "فاطمة علي",
  "email": "fatima@example.com",
  "password": "password123",
  "role": "restaurant",
  "permissions": ["read", "write"],
  "restaurant_id": 5 // اختياري للمطاعم
}
```

#### تحديث مستخدم
```http
PUT /admin/users/{id}
```

#### حذف مستخدم
```http
DELETE /admin/users/{id}
```

### 🏪 إدارة المطاعم

#### جلب جميع المطاعم
```http
GET /admin/restaurants?status=active&city=riyadh
```

**Response:**
```json
{
  "success": true,
  "data": {
    "restaurants": [
      {
        "id": 1,
        "name": "مطعم البيت الشامي",
        "owner_name": "محمد أحمد",
        "email": "info@shamyhouse.com",
        "phone": "+966501234567",
        "address": "حي النخيل، الرياض",
        "status": "active",
        "rating": 4.8,
        "total_orders": 1250,
        "revenue": 45000.00,
        "created_at": "2024-01-10T12:00:00Z"
      }
    ]
  }
}
```

#### الموافقة على مطعم
```http
POST /admin/restaurants/{id}/approve
```

#### تعليق مطعم
```http
POST /admin/restaurants/{id}/suspend
```

---

## 🍽️ إدارة المطاعم

### 📊 لوحة التحكم
```http
GET /restaurant/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "today_orders": 45,
    "pending_orders": 8,
    "today_revenue": 2340.50,
    "completed_orders": 37,
    "avg_preparation_time": 12,
    "restaurant_rating": 4.8,
    "new_customers": 12,
    "available_items": 85
  }
}
```

### 📋 إدارة الطلبات

#### جلب الطلبات
```http
GET /restaurant/orders?status=pending&date=2024-08-10
```

**Query Parameters:**
- `status`: الحالة (pending, preparing, ready, delivered, cancelled)
- `date`: التاريخ (YYYY-MM-DD)
- `customer_id`: معرف العميل

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 1234,
        "customer": {
          "name": "أحمد محمد",
          "phone": "+966501234567",
          "address": "حي النخيل، الرياض"
        },
        "items": [
          {
            "name": "شاورما دجاج",
            "quantity": 1,
            "price": 25.00
          },
          {
            "name": "كولا",
            "quantity": 1,
            "price": 5.00
          }
        ],
        "total": 45.00,
        "status": "pending",
        "created_at": "2024-08-10T14:30:00Z",
        "estimated_time": 15
      }
    ]
  }
}
```

#### تحديث حالة الطلب
```http
PUT /restaurant/orders/{id}/status
```

**Request Body:**
```json
{
  "status": "preparing",
  "estimated_time": 10,
  "notes": "جاري التحضير"
}
```

### 📜 إدارة القائمة

#### جلب القائمة
```http
GET /restaurant/menu?category=main&available=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "الأطباق الرئيسية",
        "items": [
          {
            "id": 101,
            "name": "شاورما دجاج",
            "description": "شاورما دجاج طازج مع الخضار",
            "price": 25.00,
            "image": "/images/shawarma.jpg",
            "available": true,
            "preparation_time": 10,
            "ingredients": ["دجاج", "خبز", "خضار", "صوص"]
          }
        ]
      }
    ]
  }
}
```

#### إضافة صنف جديد
```http
POST /restaurant/menu/items
```

**Request Body:**
```json
{
  "name": "برجر لحم",
  "description": "برجر لحم طازج مع البطاطس",
  "price": 35.00,
  "category_id": 1,
  "image": "base64_image_data",
  "preparation_time": 15,
  "ingredients": ["لحم", "خبز", "جبن", "خضار"]
}
```

### 📦 إدارة المخزون

#### جلب المخزون
```http
GET /restaurant/inventory?low_stock=true
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "الطماطم",
        "current_stock": 2.0,
        "unit": "كيلو",
        "min_stock": 5.0,
        "status": "low",
        "last_updated": "2024-08-10T10:00:00Z"
      }
    ]
  }
}
```

#### تحديث المخزون
```http
PUT /restaurant/inventory/{id}
```

**Request Body:**
```json
{
  "quantity": 10.0,
  "operation": "add", // add, subtract, set
  "notes": "شراء جديد"
}
```

---

## 🏋️ إدارة صالات الجيم

### 📊 لوحة التحكم
```http
GET /gym/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_members": 245,
    "active_members": 189,
    "today_checkins": 67,
    "monthly_revenue": 45000.00,
    "upcoming_classes": 8,
    "available_trainers": 12,
    "equipment_status": "good",
    "membership_renewals": 23
  }
}
```

### 👥 إدارة الأعضاء

#### جلب الأعضاء
```http
GET /gym/members?status=active&membership_type=premium
```

**Response:**
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": 1,
        "name": "سارة أحمد",
        "email": "sara@example.com",
        "phone": "+966509876543",
        "membership_type": "premium",
        "start_date": "2024-01-15",
        "end_date": "2024-12-15",
        "status": "active",
        "last_checkin": "2024-08-10T07:30:00Z",
        "total_visits": 156
      }
    ]
  }
}
```

#### إضافة عضو جديد
```http
POST /gym/members
```

**Request Body:**
```json
{
  "name": "محمد علي",
  "email": "mohammed@example.com",
  "phone": "+966551234567",
  "membership_type": "basic",
  "duration_months": 12,
  "payment_amount": 1200.00,
  "emergency_contact": {
    "name": "أحمد علي",
    "phone": "+966501111111"
  }
}
```

### 🗓️ إدارة الحصص

#### جلب الحصص
```http
GET /gym/classes?date=2024-08-10&trainer_id=5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "classes": [
      {
        "id": 1,
        "name": "يوجا صباحية",
        "trainer": {
          "id": 5,
          "name": "فاطمة محمد",
          "specialization": "يوجا"
        },
        "start_time": "07:00",
        "end_time": "08:00",
        "capacity": 20,
        "enrolled": 15,
        "status": "scheduled"
      }
    ]
  }
}
```

#### حجز حصة
```http
POST /gym/classes/{id}/book
```

**Request Body:**
```json
{
  "member_id": 123,
  "notes": "أول مرة في اليوجا"
}
```

---

## 🚗 تطبيق التوصيل

### 📊 لوحة السائق
```http
GET /driver/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "today_deliveries": 12,
    "today_earnings": 180.00,
    "available_orders": 5,
    "current_status": "available",
    "rating": 4.9,
    "total_distance": 45.2,
    "online_time": "6h 30m"
  }
}
```

### 📦 إدارة الطلبات

#### جلب الطلبات المتاحة
```http
GET /driver/orders/available?location=24.7136,46.6753&radius=5
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 1234,
        "restaurant": {
          "name": "مطعم البيت الشامي",
          "address": "حي النخيل، الرياض",
          "location": {
            "lat": 24.7136,
            "lng": 46.6753
          }
        },
        "customer": {
          "address": "حي الملز، الرياض",
          "location": {
            "lat": 24.6877,
            "lng": 46.7219
          }
        },
        "total": 45.00,
        "delivery_fee": 8.00,
        "distance": 3.2,
        "estimated_time": 15
      }
    ]
  }
}
```

#### قبول طلب
```http
POST /driver/orders/{id}/accept
```

#### تحديث حالة التوصيل
```http
PUT /driver/orders/{id}/status
```

**Request Body:**
```json
{
  "status": "picked_up", // picked_up, on_way, delivered
  "location": {
    "lat": 24.7136,
    "lng": 46.6753
  },
  "notes": "تم استلام الطلب"
}
```

---

## 📊 التقارير والإحصائيات

### 📈 تقارير المبيعات
```http
GET /reports/sales?start_date=2024-08-01&end_date=2024-08-10&type=restaurant
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "total_sales": 125000.50,
      "total_orders": 1250,
      "average_order": 100.00,
      "growth_rate": 15.2
    },
    "daily_breakdown": [
      {
        "date": "2024-08-10",
        "sales": 12500.00,
        "orders": 125,
        "average": 100.00
      }
    ],
    "top_items": [
      {
        "name": "شاورما دجاج",
        "quantity": 450,
        "revenue": 11250.00
      }
    ]
  }
}
```

### 📊 تقارير الأداء
```http
GET /reports/performance?entity_type=restaurant&entity_id=1
```

---

## 🔔 نظام الإشعارات

### 📱 جلب الإشعارات
```http
GET /notifications?unread=true&type=order
```

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": 1,
        "type": "order",
        "title": "طلب جديد",
        "message": "لديك طلب جديد من أحمد محمد",
        "data": {
          "order_id": 1234
        },
        "read": false,
        "created_at": "2024-08-10T14:30:00Z"
      }
    ],
    "unread_count": 5
  }
}
```

### ✅ تحديد الإشعار كمقروء
```http
PUT /notifications/{id}/read
```

### 📤 إرسال إشعار
```http
POST /notifications/send
```

**Request Body:**
```json
{
  "recipient_id": 123,
  "type": "order",
  "title": "تحديث الطلب",
  "message": "تم تحضير طلبك وهو جاهز للتوصيل",
  "data": {
    "order_id": 1234
  }
}
```

---

## 🔍 البحث والفلترة

### 🔎 البحث العام
```http
GET /search?q=شاورما&type=menu_item&restaurant_id=1
```

### 📊 الفلترة المتقدمة
```http
GET /filter?entity=orders&filters[status]=pending&filters[date_from]=2024-08-01&sort=created_at&order=desc
```

---

## 📁 إدارة الملفات

### 📤 رفع ملف
```http
POST /upload
Content-Type: multipart/form-data
```

**Request Body:**
```
file: [binary data]
type: image // image, document, video
category: menu // menu, profile, document
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://cdn.nutrio.com/images/menu/item_123.jpg",
    "filename": "item_123.jpg",
    "size": 245760,
    "type": "image/jpeg"
  }
}
```

---

## ⚠️ معالجة الأخطاء

### 🚨 رموز الأخطاء الشائعة

| الكود | الوصف | المعنى |
|-------|--------|---------|
| 400 | Bad Request | طلب غير صحيح |
| 401 | Unauthorized | غير مصرح |
| 403 | Forbidden | ممنوع |
| 404 | Not Found | غير موجود |
| 422 | Validation Error | خطأ في التحقق |
| 500 | Server Error | خطأ في الخادم |

### 📝 تنسيق رسائل الخطأ
```json
{
  "success": false,
  "error": {
    "code": 422,
    "message": "خطأ في التحقق من البيانات",
    "details": {
      "email": ["البريد الإلكتروني مطلوب"],
      "password": ["كلمة المرور يجب أن تكون 8 أحرف على الأقل"]
    }
  },
  "timestamp": "2024-08-10T12:00:00Z"
}
```

---

## 🔧 أمثلة عملية

### 📱 JavaScript/React
```javascript
// مثال على استدعاء API
const fetchOrders = async () => {
  try {
    const response = await fetch('/api/restaurant/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      setOrders(data.data.orders);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};
```

### 🐍 Python
```python
import requests

# مثال على استدعاء API
def get_dashboard_stats(token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        'https://api.nutrio.com/v1/admin/dashboard/stats',
        headers=headers
    )
    
    if response.status_code == 200:
        return response.json()['data']
    else:
        raise Exception(f'API Error: {response.status_code}')
```

### 📱 cURL
```bash
# مثال على استدعاء API باستخدام cURL
curl -X GET "https://api.nutrio.com/v1/restaurant/orders" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 🔒 الأمان

### 🛡️ أفضل الممارسات
- استخدم HTTPS دائماً
- احفظ الرموز المميزة بشكل آمن
- تحقق من انتهاء صلاحية الرموز
- استخدم معدل محدود للطلبات
- تحقق من الأذونات قبل كل طلب

### 🚦 معدل الطلبات
```
- 1000 طلب/ساعة للمستخدمين العاديين
- 5000 طلب/ساعة للمطاعم وصالات الجيم
- 10000 طلب/ساعة للمديرين
```

---

## 📞 الدعم

### 💬 قنوات الدعم
- **التوثيق:** [docs.nutrio.com](https://docs.nutrio.com)
- **البريد الإلكتروني:** api-support@nutrio.com
- **GitHub Issues:** [github.com/nutrio/api/issues](https://github.com/nutrio/api/issues)

### 🆘 الحصول على المساعدة
عند طلب المساعدة، يرجى تضمين:
- رمز الخطأ
- رسالة الخطأ الكاملة
- الطلب المرسل (بدون الرموز المميزة)
- الاستجابة المستلمة

---

**تم إنشاء هذا المرجع بواسطة فريق Nutrio 🚀**

**آخر تحديث:** 10 أغسطس 2024

