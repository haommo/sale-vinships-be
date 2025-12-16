# 🚀 Hướng dẫn Deploy Backend lên Coolify (GitHub App - No Dockerfile)

## 📋 Yêu cầu

- Coolify instance đang chạy
- GitHub repository (public hoặc private)
- MariaDB database đã sẵn sàng
- GitHub App đã được cài đặt trong Coolify

---

## 🔧 Bước 1: Chuẩn bị Repository

### 1.1. Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/sale-vinships-be.git
git push -u origin main
```

### 1.2. Kiểm tra các file cần thiết

Đảm bảo repository có các file:
- ✅ `package.json` (với scripts: build, start:prod, postinstall)
- ✅ `prisma/schema.prisma`
- ✅ `nixpacks.json` (optional, để custom build process)
- ❌ **KHÔNG CẦN** `Dockerfile`

---

## 🎯 Bước 2: Kết nối GitHub với Coolify

### 2.1. Cài đặt GitHub App (nếu chưa có)
1. Trong Coolify, vào **Settings → Git Providers**
2. Click **Add GitHub App**
3. Follow hướng dẫn để install GitHub App vào tài khoản GitHub của bạn
4. Authorize Coolify để truy cập repositories

### 2.2. Đăng nhập Coolify
1. Truy cập Coolify dashboard
2. Chọn **Project** hoặc tạo project mới

---

## 🎯 Bước 3: Tạo Application từ GitHub

### 3.1. Thêm Application mới
1. Click **+ New Resource**
2. Chọn **Application**
3. Chọn **Select a GitHub App** (QUAN TRỌNG - không chọn Public/Private Repository)
4. Chọn GitHub App đã install
5. Chọn Repository: `your-username/sale-vinships-be`
6. Chọn Branch: `main`
7. Click **Continue**

### 3.2. Cấu hình Build Pack
1. **Build Pack**: Coolify sẽ tự động detect **Nixpacks** (Node.js)
2. **Port**: `3000`
3. **Base Directory**: `/` (để trống nếu code ở root)
4. **Publish Directory**: `dist` (optional)

### 3.3. Health Check (Optional)
- **Health Check Enabled**: ✅ Bật
- **Health Check Path**: `/api/docs`
- **Health Check Interval**: `30s`

---

## 🔐 Bước 4: Cấu hình Environment Variables

Trong Coolify, vào **Environment Variables** và thêm các biến sau:

```bash
# Database - MariaDB
DATABASE_URL=mysql://root:dtxtdWOWv535wBvzP1yk3BQFLeNPN7517cgGBM7W7ZoX06IFVQrE99sAuMl1yhic@51.79.84.54:1001/sale_vinship
DATABASE_HOST=51.79.84.54
DATABASE_PORT=1001
DATABASE_USER=root
DATABASE_PASSWORD=dtxtdWOWv535wBvzP1yk3BQFLeNPN7517cgGBM7W7ZoX06IFVQrE99sAuMl1yhic
DATABASE_NAME=sale_vinship

# JWT
JWT_SECRET=your-production-jwt-secret-change-this-immediately
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# App
PORT=3000
NODE_ENV=production
```

> ⚠️ **Quan trọng**: Đổi `JWT_SECRET` thành giá trị bảo mật khác cho production!

---

## 🚀 Bước 5: Deploy

### 5.1. Khởi động Deployment
1. Trong Coolify app dashboard, click **Deploy**
2. Coolify sẽ:
   - Clone repository
   - Build Docker image từ Dockerfile
   - Push schema Prisma (nếu có command trong Dockerfile)
   - Start container

### 5.2. Theo dõi Deployment
- Xem logs realtime trong tab **Deployments**
- Kiểm tra container status trong **Application**

### 5.3. Chạy Prisma Database Push (lần đầu)

Sau khi deploy thành công lần đầu, cần push schema lên database:

**Cách 1: Sử dụng Coolify Terminal**
1. Vào Application → **Terminal**
2. Chạy lệnh:
```bash
npx prisma db push
```

**Cách 2: Thêm vào Dockerfile**
 tự động:
   - Clone repository từ GitHub
   - Detect Node.js project (qua package.json)
   - Install dependencies (`npm ci`)
   - Generate Prisma Client (`npx prisma generate`)
   - Build application (`npm run build`)
   - Push Prisma schema (`npx prisma db push`)
   - Start application (`npm run start:prod`)ript để check và push schema
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm run start:prod"]
```

> ⚠️ **Lưu ý**: `--accept-data-loss` chỉ dùng cho lần đầu. Sau đó nên dùng migrations.

### 5.4. Seed Database (Optional)

Nếu muốn seed dữ liệu test:

```bash
npx ts-node prisma/seed.ts
```

Hoặc thêm vào script deployment.

---

## 🌐 Bước 6: Cấu hình Domain

### 6.1. Thêm Custom Domain
1. Trong Coolify app, vào **Domains**
2. Click **Add Domain**
3. Nhập domain: `api.vinship.com`
4. Coolify tự động generate SSL certificate (Let's Encrypt)

### 6.2. Cấu hình DNS
Trỏ domain đến Coolify server:
```
Type: A
Name: api (hoặc @)
Value: <coolify-server-ip>
```

### 6.3. Kiểm tra SSL
- Coolify tự động cấu hình HTTPS
- Kiểm tra: `https://api.vinship.com/health`

---

## 📊 Bước 7: Monitoring & Logs

### 7.1. Xem Application Logs
- Trong Coolify: **Application → Logs**
- Xem realtime logs của container

### 7.2. Database Monitoring
- Check connection từ Coolify terminal:
```bash
npx prisma db pull
```

### 7.3. Application Metrics
Coolify tự động monitor:
- CPU usage
- Memory usage
- Network traffic
- Container status

---

## 🔄 Bước 8: CI/CD Tự động

### 8.1. Auto-deploy từ Git
Coolify có thể tự động deploy khi có git push:

1. Trong Application Settings:
2. Enable **Automatic Deployment**
3. Chọn **Watch Branch**: `main`
4. Mỗi lần push lên `main`, Coolify sẽ tự động rebuild và deploy

### 8.2. Webhooks
Coolify cung cấp webhook URL để trigger deployment từ GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Coolify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Coolify Deployment
        run: |
          curl -X POST ${{ secrets.COOLIFY_WEBHOOK_URL }}
```

---

## 🛠️ Troubleshooting

### ❌ Build failed
**Kiểm tra:**
- Dockerfile syntax
- Dependencies trong package.json
- Build logs trong Coolify

### ❌ Database connection error
**Kiểm tra:**
- Environment variables đúng chưa
- Database host/port accessible từ Coolify server
- Firewall rules cho database

**Test connection:**
```bash
# Trong Coolify terminal
npx prisma db pull
```

### ❌ Application crash ngay sau start
**Kiểm tra logs:**
```bash
# Xem logs trong Coolify hoặc
docker logs <container-id>
```

**Common issues:**
- Missing environment variables
- Prisma client chưa generate
- Port conflict

### ❌ Health check failed
**Kiểm tra:**
- Health check endpoint có tồn tại không
- Port mapping đúng chưa (3000)
- Application đã start xong chưa

---

## 📝 Nixpacks Configuration (No Dockerfile)

**File: `nixpacks.json` - Custom build configuration:**

```json
{
  "nixpacks": {
    "phases": {
      "setup": {
        "nixPkgs": ["nodejs_20"]
      },
      "install": {
        "cmds": ["npm ci"]
      },
      "build": {
        "cmds": [
          "npx prisma generate",
          "npm run build"
        ]
      }
    },
    "start": {
      "cmd": "npx prisma db push && npm run start:prod"
    }
  }
}
```

**File: `package.json` - Required scripts:**

```json
{
  "scripts": {
    "build": "prisma generate && nest build",
    "postinstall": "prisma generate",
    "start:prod": "node dist/main"
  }
}
```

> ✅ **Coolify tự động detect Node.js** và build project mà không cần Dockerfile!

---

## 🎯 Checklist Deploy

- [ ] Code đã push lên Git repository
- [ ] Dockerfile và .dockerignore đã có
- [ ] Environment variables đã cấu hình trong Coolify
- [ ] Database accessible từ Coolify server
- [ ] Health check endpoint đã tạo
- [ ] First deploy thành công
- [ ] Prisma schema đã push lên database
- [ ] Application logs không có error
- [ ] API endpoints hoạt động: `https://your-domain.com/api/docs`
- [ ] SSL certificate active (nếu dùng custom domain)

---

## 🔗 Resources

- **Coolify Docs**: https://coolify.io/docs
- **NestJS Deployment**: https://docs.nestjs.com/deployment
- **Prisma Production**: https://www.prisma.io/docs/guides/deployment

---

## 💡 Production Tips

### 1. Sử dụng Migrations thay vì db push
```bash
# Tạo migration
npx prisma migrate dev --name init

# Deploy migration
npx prisma migrate deploy
```

### 2. Tách Database và Application
- Không dùng MariaDB public IP
- Sử dụng private network giữa app và database
- Hoặc dùng database service trong Coolify

### 3. Environment Management
- Không commit `.env` vào Git
- Sử dụng Coolify Environment Variables
- Khác nhau giữa dev/staging/production

### 4. Monitoring & Alerts
- Setup Uptime monitoring (UptimeRobot, Pingdom)
- Configure email alerts trong Coolify
- Log aggregation (nếu cần)

### 5. Backup Strategy
- Backup database định kỳ
- Backup environment variables
- Version control cho migrations

---

**Chúc bạn deploy thành công! 🎉**
