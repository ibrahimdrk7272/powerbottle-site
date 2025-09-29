# Airtable Kurulum Rehberi

Bu rehber, PowerBottle e-ticaret sitesi için Airtable veritabanını nasıl kuracağınızı açıklar.

## 1. Airtable Hesabı Oluşturma

1. [Airtable.com](https://airtable.com)'a gidin
2. "Sign up for free" ile ücretsiz hesap oluşturun
3. E-posta doğrulamasını tamamlayın

## 2. Yeni Base Oluşturma

1. Airtable dashboard'da "Add a base" butonuna tıklayın
2. "Start from scratch" seçin
3. Base adını "PowerBottle" olarak değiştirin

## 3. Tabloları Oluşturma

### Products Tablosu

1. İlk tablonun adını "Products" olarak değiştirin
2. Aşağıdaki alanları oluşturun:

| Alan Adı | Alan Tipi | Açıklama | Örnek |
|----------|-----------|----------|-------|
| name | Single line text | Ürün adı | PowerBottle 1L |
| description | Long text | Ürün açıklaması | Sporcular için özel... |
| price | Number | Fiyat (TL) | 299 |
| original_price | Number | Orijinal fiyat | 399 |
| images | Attachment | Ürün görselleri | [resim dosyaları] |
| variants | Long text | Varyantlar (JSON) | [{"name":"Siyah","value":"black","price":299}] |
| stock | Number | Stok miktarı | 50 |
| weight | Single line text | Ağırlık | 450g |
| capacity | Single line text | Kapasite | 1L |
| features | Long text | Özellikler (JSON array) | ["BPA-free","Sızdırmaz"] |
| specifications | Long text | Teknik özellikler (JSON) | {"material":"BPA-free"} |
| is_active | Checkbox | Aktif mi? | ✓ |
| slug | Single line text | URL slug | powerbottle-1l |
| seo_title | Single line text | SEO başlığı | PowerBottle 1L - Su Bidonu |
| seo_description | Long text | SEO açıklaması | PowerBottle 1L... |
| category | Single line text | Kategori | su-bidonu |
| created | Created time | Oluşturulma tarihi | (otomatik) |
| updated | Last modified time | Güncellenme tarihi | (otomatik) |

### Content Tablosu

1. Yeni tablo ekleyin: "+ Add a table" > "Blank table"
2. Tablo adını "Content" yapın
3. Aşağıdaki alanları oluşturun:

| Alan Adı | Alan Tipi | Açıklama | Örnek |
|----------|-----------|----------|-------|
| key | Single line text | İçerik anahtarı | hero_title |
| type | Single select | İçerik tipi | text |
| content | Long text | İçerik | PowerBottle ile Güçlü Kalın |

**Type seçenekleri:**
- text
- image  
- array

### Orders Tablosu

1. Yeni tablo ekleyin: "+ Add a table" > "Blank table"
2. Tablo adını "Orders" yapın
3. Aşağıdaki alanları oluşturun:

| Alan Adı | Alan Tipi | Açıklama |
|----------|-----------|----------|
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

**Status seçenekleri:**
- pending
- completed
- cancelled
- refunded

### Contact_Submissions Tablosu

1. Yeni tablo ekleyin: "+ Add a table" > "Blank table"
2. Tablo adını "Contact_Submissions" yapın
3. Aşağıdaki alanları oluşturun:

| Alan Adı | Alan Tipi | Açıklama |
|----------|-----------|----------|
| name | Single line text | Ad soyad |
| email | Email | E-posta |
| phone | Phone number | Telefon |
| subject | Single line text | Konu |
| message | Long text | Mesaj |
| submission_date | Date | Gönderim tarihi |
| status | Single select | Durum |

**Status seçenekleri:**
- new
- read
- replied
- closed

## 4. API Key Alma

1. [Airtable API](https://airtable.com/create/tokens) sayfasına gidin
2. "Create new token" butonuna tıklayın
3. Token adını "PowerBottle Site" yapın
4. Scopes bölümünde "data.records:read" ve "data.records:write" seçin
5. Access bölümünde base'inizi seçin
6. "Create token" butonuna tıklayın
7. Token'ı kopyalayın (bir daha gösterilmeyecek!)

## 5. Base ID Alma

1. [Airtable API Documentation](https://airtable.com/api)'a gidin
2. Base'inizi seçin
3. URL'den base ID'yi kopyalayın
   - URL formatı: `https://airtable.com/appXXXXXXXXXXXXXX/api/docs#curl/introduction`
   - Base ID: `appXXXXXXXXXXXXXX` kısmı

## 6. Demo Verileri Ekleme

### Products Tablosuna Demo Ürünler

1. Products tablosunda ilk satıra tıklayın
2. Aşağıdaki bilgileri girin:

**Ürün 1: PowerBottle 1L**
- name: PowerBottle 1L
- description: Sporcular için özel olarak tasarlanmış 1L kapasiteli dumbbell formunda su bidonu. BPA-free malzeme ile üretilmiş, çatlamaya karşı dayanıklı yapı.
- price: 299
- original_price: 399
- variants: [{"name":"Siyah","value":"black","price":299,"stock":50},{"name":"Mavi","value":"blue","price":299,"stock":30},{"name":"Kırmızı","value":"red","price":299,"stock":25}]
- stock: 105
- weight: 450g
- capacity: 1L
- features: ["BPA-free malzeme","Sızdırmaz kapak sistemi","Ergonomik dumbbell tasarımı","Çatlamaya karşı dayanıklı","Kolay temizlenebilir","Dishwasher safe"]
- specifications: {"material":"BPA-free plastik","capacity":"1L","weight":"450g","dimensions":"25cm x 8cm x 8cm","temperature":"-20°C ile +80°C"}
- is_active: ✓ (checked)
- slug: powerbottle-1l
- seo_title: PowerBottle 1L - Sporcular için Su Bidonu
- seo_description: PowerBottle 1L, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu. BPA-free, dayanıklı ve ergonomik tasarım.
- category: su-bidonu

**Ürün 2: PowerBottle 1.5L**
- name: PowerBottle 1.5L
- description: Daha büyük kapasiteli 1.5L PowerBottle. Uzun antrenmanlar için ideal, aynı ergonomik dumbbell tasarımı ile daha fazla su kapasitesi.
- price: 349
- original_price: 449
- variants: [{"name":"Siyah","value":"black","price":349,"stock":40},{"name":"Mavi","value":"blue","price":349,"stock":35},{"name":"Yeşil","value":"green","price":349,"stock":20}]
- stock: 95
- weight: 650g
- capacity: 1.5L
- features: ["BPA-free malzeme","Sızdırmaz kapak sistemi","Ergonomik dumbbell tasarımı","Çatlamaya karşı dayanıklı","Kolay temizlenebilir","Dishwasher safe","Daha büyük kapasite"]
- specifications: {"material":"BPA-free plastik","capacity":"1.5L","weight":"650g","dimensions":"28cm x 9cm x 9cm","temperature":"-20°C ile +80°C"}
- is_active: ✓ (checked)
- slug: powerbottle-1-5l
- seo_title: PowerBottle 1.5L - Büyük Kapasiteli Su Bidonu
- seo_description: PowerBottle 1.5L, uzun antrenmanlar için ideal büyük kapasiteli dumbbell formunda su bidonu. Dayanıklı ve ergonomik tasarım.
- category: su-bidonu

### Content Tablosuna Demo İçerik

1. Content tablosunda aşağıdaki kayıtları ekleyin:

| key | type | content |
|-----|------|---------|
| homepage_title | text | PowerBottle - Sporcular için Su Bidonu |
| homepage_description | text | PowerBottle, sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu. Dayanıklı, ergonomik ve şık tasarım ile antrenmanlarınızı bir üst seviyeye taşıyın. |
| hero_title | text | PowerBottle ile |
| hero_subtitle | text | Sporcular için özel olarak tasarlanmış dumbbell formunda su bidonu. Dayanıklı, ergonomik ve şık tasarım ile antrenmanlarınızı bir üst seviyeye taşıyın. |
| features_title | text | Neden PowerBottle? |
| features_subtitle | text | Sporcular için özel olarak tasarlanmış özellikler ve kalite standartları |
| testimonials_title | text | Müşteri Yorumları |
| testimonials_subtitle | text | PowerBottle kullanan sporcuların gerçek deneyimleri |
| faq_title | text | Sık Sorulan Sorular |
| faq_subtitle | text | PowerBottle hakkında merak ettiklerinizin cevapları |
| newsletter_title | text | Güncel Kalın |
| newsletter_subtitle | text | PowerBottle'dan özel indirimler, yeni ürün duyuruları ve spor ipuçları için e-posta listemize katılın. |
| contact_title | text | İletişime Geçin |
| contact_subtitle | text | Sorularınız, önerileriniz veya destek ihtiyaçlarınız için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaktan mutluluk duyar. |

## 7. Görselleri Ekleme

1. Products tablosunda her ürünün images alanına tıklayın
2. "Choose file" butonuna tıklayın
3. Ürün görsellerini yükleyin
4. En az 3-4 görsel eklemenizi öneririz

**Önerilen görseller:**
- Ana ürün görseli (ön görünüm)
- Yan görünüm
- Detay görseli
- Kullanım görseli

## 8. Environment Variables'a Ekleme

Airtable bilgilerinizi `.env.local` dosyasına ekleyin:

```env
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Products
AIRTABLE_CONTENT_TABLE_NAME=Content
```

## 9. Test Etme

1. Siteyi çalıştırın: `npm run dev`
2. Ana sayfada ürünlerin göründüğünü kontrol edin
3. Ürün sayfasında detayların doğru geldiğini kontrol edin
4. İçeriklerin Airtable'dan çekildiğini kontrol edin

## 10. Canlı Ortam İçin

1. Production için ayrı bir Airtable base oluşturun
2. Aynı tablo yapısını oluşturun
3. Gerçek ürün verilerini ekleyin
4. Production environment variables'ını güncelleyin

## 📞 Yardım

Airtable kurulumu ile ilgili sorularınız için:

- [Airtable Help Center](https://support.airtable.com)
- [Airtable API Documentation](https://airtable.com/api)
- GitHub Issues'da soru sorabilirsiniz
