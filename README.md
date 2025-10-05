# Express Products API

## تشغيل محلي
1. `npm install`
2. `npm run dev`  # للتطوير مع nodemon
3. الواجهة: http://localhost:3000

## Endpoints
- GET `/api/products`  => جلب كل المنتجات (يدعم query: name, category, minPrice, maxPrice)
- GET `/api/products/:id` => جلب منتج بحسب id
- POST `/api/products` => إنشاء منتج (body: { name, category, price })
- PUT `/api/products/:id` => تحديث منتج (body أي الحقول)
- DELETE `/api/products/:id` => حذف منتج

## Git workflow
- Branches: `feature/read-products`, `feature/crud-operations`
- Commit messages: `feat:`, `fix:`, `chore:`
- افتح PR لكل فرع إلى `main` ثم ادمجه بعد المراجعة.
