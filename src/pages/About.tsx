import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";
const About = () => {
  const { t } = useLanguage();
  const features = [{
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: "Kualitas Terjamin",
    description: "Menggunakan bahan berkualitas tinggi dan teknik sablon terdepan."
  }, {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Melayani Semua Skala",
    description: "Dari satuan hingga ribuan pcs, kami siap melayani kebutuhan Anda."
  }, {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Pengalaman 7+ Tahun",
    description: "Dipercaya ribuan pelanggan sejak 2017 dengan hasil memuaskan."
  }, {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Pengerjaan Cepat",
    description: "Proses produksi efisien dengan hasil berkualitas tinggi."
  }];
  return <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
          {t('about.title')}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          {t('about.subtitle')}
        </p>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-realshirt-black mb-4 sm:mb-6">
              {t('about.story')}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Dimulai pada tahun 2017, RealShirt hadir sebagai solusi bagi mereka yang 
                menginginkan kaos custom berkualitas tinggi. Kami memahami bahwa setiap 
                desain memiliki cerita dan makna tersendiri.
              </p>
              <p>
                Dengan komitmen pada kualitas dan kepuasan pelanggan, RealShirt telah 
                melayani ribuan pelanggan dari berbagai kalangan - mulai dari individu 
                yang ingin mengekspresikan kreativitas, hingga perusahaan besar untuk 
                kebutuhan merchandise dan seragam.
              </p>
              <p>
                Kami bangga menjadi bagian dari perjalanan kreatif setiap pelanggan, 
                mewujudkan ide-ide brilian menjadi karya nyata yang bisa dikenakan 
                dengan bangga.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8 lg:mt-0">
            <img src="/lovable-uploads/26e048cd-0c2f-4c06-811e-fd9bf1b27620.png" alt="RealShirt Logo" className="w-48 h-48 sm:w-64 sm:h-64 object-contain" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-realshirt-black mb-8 sm:mb-12 px-4">
          {t('about.why')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => <Card key={index} className="text-center hover:shadow-soft transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">7+</h3>
              <p className="text-muted-foreground font-medium">Tahun Pengalaman</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">5000+</h3>
              <p className="text-muted-foreground font-medium">Pelanggan Puas</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">50000+</h3>
              <p className="text-muted-foreground font-medium">Kaos Terproduksi</p>
            </div>
          </div>
        </div>
      </section>

      <NavigationButtons 
        previousPath="/" 
        previousLabel={t('nav.home')}
        nextPath="/produk" 
        nextLabel={t('nav.products')} 
      />
    </div>;
};
export default About;