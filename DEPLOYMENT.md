# Deployment Rehberi

Bu rehber, PowerBottle e-ticaret sitesini Vercel üzerinde nasıl deploy edeceğinizi açıklar.

## 🚀 Vercel ile Deployment

### 1. GitHub Repository Hazırlama

1. GitHub'da yeni repository oluşturun
2. Projeyi GitHub'a push edin:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/powerbottle-site.git
git push -u origin main
```

### 2. Vercel Hesabı Oluşturma

1. [Vercel.com](https://vercel.com)'a gidin
2. "Sign up" butonuna tıklayın
3. GitHub hesabınızla giriş yapın
4. Vercel'in GitHub repository'nize erişim izni verin

### 3. Proje Deployment

1. Vercel dashboard'da "New Project" butonuna tıklayın
2. GitHub repository'nizi seçin
3. "Import" butonuna tıklayın
4. Project Settings'de:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 4. Environment Variables Ekleme

1. Project Settings > Environment Variables bölümüne gidin
2. Aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AIRTABLE_API_KEY=key...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_NAME=Products
AIRTABLE_CONTENT_TABLE_NAME=Content
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=PowerBottle
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

3. Her değişken için:
   - **Name**: Değişken adı
   - **Value**: Değişken değeri
   - **Environment**: Production, Preview, Development (hepsini seçin)
   - "Add" butonuna tıklayın

### 5. İlk Deployment

1. "Deploy" butonuna tıklayın
2. Deployment işlemi 2-3 dakika sürecektir
3. Başarılı deployment sonrası URL alacaksınız: `https://your-project.vercel.app`

## 🌐 Domain Bağlama

### 1. Domain Satın Alma

1. [Namecheap](https://namecheap.com), [GoDaddy](https://godaddy.com) veya benzeri servisten domain satın alın
2. Önerilen domain: `powerbottle.com` veya `powerbottle.store`

### 2. Vercel'de Domain Ekleme

1. Vercel dashboard'da projenizi seçin
2. Settings > Domains bölümüne gidin
3. "Add Domain" butonuna tıklayın
4. Domain'inizi yazın (örn: `powerbottle.com`)
5. "Add" butonuna tıklayın

### 3. DNS Ayarları

1. Domain sağlayıcınızın DNS ayarlarına gidin
2. Aşağıdaki kayıtları ekleyin:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.19.61 | 3600 |
| A | www | 76.76.19.61 | 3600 |
| CNAME | @ | cname.vercel-dns.com | 3600 |

**Not**: Vercel dashboard'da size özel DNS ayarları gösterilecektir.

### 4. SSL Sertifikası

Vercel otomatik olarak SSL sertifikası sağlar. 24 saat içinde aktif olur.

## 🔧 Production Konfigürasyonu

### 1. Stripe Production Keys

1. [Stripe Dashboard](https://dashboard.stripe.com)'a gidin
2. "Activate test data" toggle'ını kapatın
3. API Keys bölümünden production anahtarlarını alın:
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

4. Webhook endpoint ekleyin:
   - **URL**: `https://your-domain.com/api/stripe-webhook`
   - **Events**: `checkout.session.completed`, `payment_intent.succeeded`

### 2. Airtable Production Base

1. Airtable'da production base oluşturun
2. Aynı tablo yapısını oluşturun (AIRTABLE_SETUP.md'ye bakın)
3. Gerçek ürün verilerini ekleyin
4. Production API key oluşturun

### 3. Email Production Ayarları

1. Gmail yerine profesyonel email servisi kullanın:
   - [SendGrid](https://sendgrid.com)
   - [Mailgun](https://mailgun.com)
   - [Amazon SES](https://aws.amazon.com/ses/)

2. SMTP ayarlarını güncelleyin

### 4. Analytics Kurulumu

#### Google Analytics 4

1. [Google Analytics](https://analytics.google.com)'da yeni property oluşturun
2. Measurement ID'yi alın: `G-XXXXXXXXXX`
3. Environment variable olarak ekleyin

#### Plausible Analytics

1. [Plausible.io](https://plausible.io)'da hesap oluşturun
2. Site ekleyin
3. Domain'i environment variable olarak ekleyin

## 🔄 Otomatik Deployment

### 1. Git Push ile Deployment

Her `git push` işleminde otomatik deployment:

```bash
git add .
git commit -m "Update content"
git push origin main
```

### 2. Preview Deployments

Pull request oluşturduğunuzda otomatik preview deployment oluşur.

## 📊 Monitoring ve Analytics

### 1. Vercel Analytics

1. Vercel dashboard'da Analytics bölümüne gidin
2. Performance metriklerini izleyin
3. Error loglarını kontrol edin

### 2. Uptime Monitoring

1. [UptimeRobot](https://uptimerobot.com) ile site izleme
2. [StatusCake](https://statuscake.com) alternatifi

## 🔒 Güvenlik

### 1. Environment Variables

- Production keys'leri asla kod içinde saklamayın
- Vercel environment variables kullanın
- API keys'leri düzenli olarak yenileyin

### 2. Rate Limiting

1. Vercel'de rate limiting ekleyin
2. API endpoints'lerde throttling uygulayın

### 3. CORS Ayarları

1. Sadece gerekli domain'lere izin verin
2. API endpoints'lerde CORS kontrolü yapın

## 🚨 Backup ve Recovery

### 1. Code Backup

```bash
# Local backup
git clone https://github.com/yourusername/powerbottle-site.git
```

### 2. Database Backup

1. Airtable'da düzenli export alın
2. JSON formatında backup dosyaları oluşturun

### 3. Environment Variables Backup

Vercel dashboard'dan environment variables'ları export edin.

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Environment variables'ları kontrol edin
   - Node.js version uyumluluğunu kontrol edin

2. **Domain Not Working**
   - DNS propagation'ı bekleyin (24-48 saat)
   - DNS ayarlarını tekrar kontrol edin

3. **Stripe Webhook Failures**
   - Webhook URL'inin doğru olduğundan emin olun
   - SSL sertifikasının aktif olduğunu kontrol edin

### Logs

1. Vercel dashboard > Functions > View Function Logs
2. Real-time error monitoring

## 📈 Performance Optimization

### 1. Image Optimization

1. Next.js Image component kullanın
2. WebP formatında görseller yükleyin
3. Lazy loading aktif edin

### 2. Caching

1. Vercel'de otomatik caching aktif
2. Static generation kullanın
3. ISR (Incremental Static Regeneration) uygulayın

### 3. CDN

Vercel otomatik olarak global CDN sağlar.

## 💰 Maliyetler

### Vercel Pricing

- **Hobby Plan**: $0/ay (kişisel projeler)
- **Pro Plan**: $20/ay (ticari projeler)
- **Enterprise**: Custom pricing

### Domain

- .com domain: ~$10-15/yıl
- .store domain: ~$20-30/yıl

### Third-party Services

- Stripe: %2.9 + 30¢ per transaction
- Airtable: Free plan (1,200 records)
- Analytics: Free (Google Analytics, Plausible)

## 📞 Destek

Deployment ile ilgili sorularınız için:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- GitHub Issues'da soru sorabilirsiniz

## ✅ Deployment Checklist

- [ ] GitHub repository oluşturuldu
- [ ] Vercel hesabı oluşturuldu
- [ ] Proje deploy edildi
- [ ] Environment variables eklendi
- [ ] Domain satın alındı
- [ ] DNS ayarları yapıldı
- [ ] SSL sertifikası aktif
- [ ] Stripe production keys eklendi
- [ ] Airtable production base oluşturuldu
- [ ] Email ayarları yapıldı
- [ ] Analytics kuruldu
- [ ] Test siparişi verildi
- [ ] Monitoring aktif edildi

Tebrikler! PowerBottle e-ticaret siteniz canlıda! 🎉
