import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Palette, Printer, Zap, Shirt } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";
const Products = () => {
  const { t } = useLanguage();
  const services = [{
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Custom Desain",
    description: "Upload desain sendiri atau konsultasi dengan tim kreatif kami untuk mewujudkan ide unik Anda.",
    features: ["Upload file desain", "Konsultasi gratis", "Revisi desain", "Preview sebelum produksi"],
    price: "Mulai 35rb/pcs"
  }, {
    icon: <Printer className="h-8 w-8 text-primary" />,
    title: "Sablon Manual",
    description: "Teknik sablon tradisional dengan hasil tahan lama, cocok untuk desain dengan warna solid.",
    features: ["Hasil tahan lama", "Warna solid", "Cocok partai besar", "Harga ekonomis"],
    price: "Mulai 25rb/pcs"
  }, {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Digital Print",
    description: "Printing digital berkualitas tinggi, perfect untuk desain kompleks dengan banyak warna.",
    features: ["Detail tinggi", "Banyak warna", "Cocok foto/gradient", "Hasil premium"],
    price: "Mulai 45rb/pcs"
  }];
  const materials = [{
    name: "Cotton Combed 24s",
    description: "Bahan katun halus, nyaman dipakai sehari-hari",
    popular: true
  }, {
    name: "Cotton Combed 30s",
    description: "Bahan premium, lebih halus dan lembut",
    popular: false
  }, {
    name: "Polyester",
    description: "Tahan lama, cocok untuk olahraga",
    popular: false
  }, {
    name: "Cotton Bamboo",
    description: "Eco-friendly, anti-bacterial, sangat lembut",
    popular: false
  }];
  return <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
          {t('products.title')}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          {t('products.subtitle')}
        </p>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-realshirt-black mb-8 sm:mb-12 px-4">
          {t('products.techniques')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => <Card key={index} className="hover:shadow-soft transition-shadow relative">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {service.features.map((feature, idx) => <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </div>)}
                </div>
                <div className="pt-4 border-t">
                  <p className="font-semibold text-primary text-lg">{service.price}</p>
                  <p className="text-xs text-muted-foreground">*Harga dapat berubah tergantung jumlah dan kompleksitas</p>
                </div>
                <Link to="/upload">
                  <Button className="w-full" variant="hero">
                    Pilih Layanan Ini
                  </Button>
                </Link>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* Materials Section */}
      <section className="bg-muted py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white px-4">
            {t('products.materials')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material, index) => <Card key={index} className="text-center relative">
                {material.popular && <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    Populer
                  </Badge>}
                <CardHeader>
                  <Shirt className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {material.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Tidak yakin dengan pilihan bahan? Konsultasikan dengan tim kami!
            </p>
            <Link to="/kontak">
              <Button variant="outline">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-realshirt-black mb-8 sm:mb-12 px-4">
          {t('products.process')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[{
          step: "1",
          title: "Upload Desain",
          desc: "Upload file desain atau konsultasi dengan tim kami"
        }, {
          step: "2",
          title: "Pilih Spesifikasi",
          desc: "Tentukan bahan, ukuran, jumlah, dan teknik cetak"
        }, {
          step: "3",
          title: "Konfirmasi & Bayar",
          desc: "Review detail pesanan dan lakukan pembayaran"
        }, {
          step: "4",
          title: "Produksi & Kirim",
          desc: "Kami produksi dan kirim pesanan Anda"
        }].map((process, index) => <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {process.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{process.title}</h3>
              <p className="text-muted-foreground text-sm">{process.desc}</p>
            </div>)}
        </div>
        <div className="text-center mt-12">
          <Link to="/upload">
            <Button size="lg" variant="hero">
              Mulai Pesan Sekarang
            </Button>
          </Link>
        </div>

        <NavigationButtons 
          previousPath="/tentang" 
          previousLabel={t('nav.about')}
          nextPath="/galeri" 
          nextLabel={t('nav.gallery')} 
        />
      </section>
    </div>;
};
export default Products;