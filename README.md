# PowerBottle - E-ticaret Sitesi

PowerBottle, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu satışı yapan modern bir e-ticaret sitesidir.

## 🚀 Özellikler

- **Modern Tasarım**: Tailwind CSS ile responsive ve modern UI
- **E-ticaret**: Stripe Checkout ile güvenli ödeme
- **CMS**: Airtable ile kolay içerik yönetimi
- **SEO Optimized**: Meta tags, Open Graph, JSON-LD structured data
- **Performance**: Next.js ile hızlı yükleme
- **Analytics**: Google Analytics 4 ve Plausible desteği
- **PWA Ready**: Progressive Web App özellikleri

## 🛠 Teknoloji Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Ödeme**: Stripe Checkout
- **CMS**: Airtable
- **Hosting**: Vercel
- **Analytics**: Google Analytics 4 / Plausible
- **Email**: Nodemailer

## 📋 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd powerbottle-site
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables

`.env.local` dosyası oluşturun:

```bash
cp env.example .env.local
```

Gerekli değişkenleri doldurun:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Airtable Configuration
AIRTABLE_API_KEY=key...
AIRTABLE_BASE_ID=app...
AIRTABLE_TABLE_NAME=Products
AIRTABLE_CONTENT_TABLE_NAME=Content

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=PowerBottle

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=powerbottle.com
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Site [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🔧 Konfigürasyon

### Stripe Kurulumu

1. [Stripe Dashboard](https://dashboard.stripe.com)'a gidin
2. API Keys bölümünden test anahtarlarını alın
3. Webhooks bölümünde yeni endpoint ekleyin:
   - URL: `https://your-domain.com/api/stripe-webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

### Airtable Kurulumu

1. [Airtable](https://airtable.com)'da yeni base oluşturun
2. Aşağıdaki tabloları oluşturun:

#### Products Tablosu
| Field Name | Field Type | Description |
|------------|------------|-------------|
| name | Single line text | Ürün adı |
| description | Long text | Ürün açıklaması |
| price | Number | Fiyat (TL) |
| original_price | Number | Orijinal fiyat (TL) |
| images | Attachment | Ürün görselleri |
| variants | Long text (JSON) | Varyantlar |
| stock | Number | Stok miktarı |
| weight | Single line text | Ağırlık |
| capacity | Single line text | Kapasite |
| features | Long text | Özellikler (JSON array) |
| specifications | Long text | Teknik özellikler (JSON) |
| is_active | Checkbox | Aktif mi? |
| slug | Single line text | URL slug |
| seo_title | Single line text | SEO başlığı |
| seo_description | Long text | SEO açıklaması |
| category | Single line text | Kategori |

#### Content Tablosu
| Field Name | Field Type | Description |
|------------|------------|-------------|
| key | Single line text | İçerik anahtarı |
| type | Single select | text/image/array |
| content | Long text | İçerik |

#### Orders Tablosu
| Field Name | Field Type | Description |
|------------|------------|-------------|
| customer_name | Single line text | Müşteri adı |
| customer_email | Email | Müşteri e-postası |
| customer_phone | Phone number | Müşteri telefonu |
| shipping_address | Long text | Teslimat adresi (JSON) |
| items | Long text | Sipariş ürünleri (JSON) |
| total_amount | Number | Toplam tutar |
| stripe_payment_intent_id | Single line text | Stripe payment intent ID |
| status | Single select | Sipariş durumu |
| order_date | Date | Sipariş tarihi |
| notes | Long text | Notlar |

#### Contact_Submissions Tablosu
| Field Name | Field Type | Description |
|------------|------------|-------------|
| name | Single line text | Ad soyad |
| email | Email | E-posta |
| phone | Phone number | Telefon |
| subject | Single line text | Konu |
| message | Long text | Mesaj |
| submission_date | Date | Gönderim tarihi |
| status | Single select | Durum |

3. API Key'i alın ve environment variables'a ekleyin

### Email Kurulumu (Gmail)

1. Gmail hesabınızda 2FA'yı aktifleştirin
2. App Password oluşturun
3. Environment variables'a ekleyin

## 🚀 Deployment

### Vercel ile Deployment

1. [Vercel](https://vercel.com)'e gidin ve GitHub hesabınızla giriş yapın
2. "New Project" butonuna tıklayın
3. Repository'nizi seçin
4. Environment variables'ları ekleyin
5. "Deploy" butonuna tıklayın

### Domain Bağlama

1. Vercel dashboard'da projenizi seçin
2. Settings > Domains bölümüne gidin
3. Domain'inizi ekleyin
4. DNS ayarlarınızı güncelleyin

### Canlıya Geçiş

1. **Stripe**: Test anahtarlarını production anahtarlarıyla değiştirin
2. **Airtable**: Production base'i oluşturun
3. **Email**: Production SMTP ayarlarını yapın
4. **Analytics**: Production tracking ID'lerini ekleyin

## 📁 Proje Yapısı

```
powerbottle-site/
├── components/          # React bileşenleri
├── context/            # React Context (Cart)
├── data/               # Demo veriler
├── lib/                # Utility fonksiyonları
├── pages/              # Next.js sayfaları
│   ├── api/           # API routes
│   └── product/       # Ürün sayfaları
├── public/             # Statik dosyalar
├── styles/             # CSS dosyaları
└── README.md
```

## 🎨 İçerik Düzenleme

### Görselleri Değiştirme

1. `public/images/` klasörüne yeni görselleri yükleyin
2. Airtable'da Products tablosunda ilgili ürünün images alanını güncelleyin
3. Site otomatik olarak yeni görselleri kullanacaktır

### Fiyatları Güncelleme

1. Airtable'da Products tablosuna gidin
2. İlgili ürünün price alanını güncelleyin
3. Değişiklikler 5 dakika içinde sitede görünecektir

### Ürün Açıklaması Düzenleme

1. Airtable'da Products tablosunda description alanını düzenleyin
2. SEO için seo_title ve seo_description alanlarını da güncelleyin

### Ana Sayfa İçeriği

1. Airtable'da Content tablosuna gidin
2. İlgili key'leri düzenleyin:
   - `hero_title`: Ana sayfa başlığı
   - `hero_subtitle`: Ana sayfa alt başlığı
   - `features_title`: Özellikler başlığı

## 🔍 SEO ve Analytics

### Google Analytics 4

1. [Google Analytics](https://analytics.google.com)'da yeni property oluşturun
2. Measurement ID'yi alın
3. Environment variable olarak ekleyin

### Plausible Analytics

1. [Plausible](https://plausible.io)'da hesap oluşturun
2. Site'nizi ekleyin
3. Domain'i environment variable olarak ekleyin

### SEO Optimizasyonu

- Meta tags otomatik olarak Airtable'dan çekilir
- Open Graph tags mevcuttur
- JSON-LD structured data eklenmiştir
- Sitemap.xml otomatik oluşturulur

## 🐛 Sık Karşılaşılan Hatalar

### "Airtable API Error"

- API key'in doğru olduğundan emin olun
- Base ID'nin doğru olduğundan emin olun
- Tablo isimlerinin doğru olduğundan emin olun

### "Stripe Checkout Error"

- Publishable key'in doğru olduğundan emin olun
- Secret key'in doğru olduğundan emin olun
- Webhook URL'inin doğru olduğundan emin olun

### "Email Not Sending"

- SMTP ayarlarının doğru olduğundan emin olun
- Gmail App Password kullandığınızdan emin olun
- 2FA'nın aktif olduğundan emin olun

## 📞 Destek

Herhangi bir sorunuz için:

- **E-posta**: info@powerbottle.com
- **Telefon**: +90 555 123 45 67
- **GitHub Issues**: Repository'de issue açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Stripe](https://stripe.com) - Payment processing
- [Airtable](https://airtable.com) - Database and CMS
- [Vercel](https://vercel.com) - Hosting platform
