import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt, Users, Award } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";
const Index = () => {
  const { t } = useLanguage();
  return <div>
      {/* Hero Section - Futuristic */}
      <section className="relative min-h-screen bg-gradient-hero text-white flex items-center grid-pattern">
        <div className="absolute inset-0 bg-gradient-glow"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" style={{background: 'var(--gradient-black-red)'}}>
          <div className="mb-8 sm:mb-12 animate-pulse">
            <div className="relative inline-block">
              <img src="/lovable-uploads/5decbe66-1b1c-47ed-a83a-059ca66c2f8e.png" alt="Realohit Logo" className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto mb-6 sm:mb-8 drop-shadow-2xl glow-red" />
              <div className="absolute inset-0 bg-gradient-glow opacity-50 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 text-white leading-tight">
            REALSHIRT
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-12 font-bold text-primary tracking-wide px-4">
            CETAK KAOS SATUAN & CUSTOM
          </p>
          <p className="text-sm sm:text-lg md:text-xl mb-12 sm:mb-16 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto opacity-80 leading-relaxed px-4">
            Wujudkan desain impian Anda menjadi kaos berkualitas tinggi dengan teknologi modern. 
            Melayani satuan hingga partai besar dengan standar premium sejak 2017.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link to="/upload" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 bg-primary hover:bg-primary/80 btn-glow glow-red font-bold tracking-wide">
                PESAN SEKARANG
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
            <Link to="/produk" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-primary btn-glow backdrop-blur-sm">
                LIHAT LAYANAN
              </Button>
            </Link>
            <Link to="/tentang" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 bg-white/20 text-white hover:bg-white/30 btn-glow backdrop-blur-sm font-semibold">
                SELANJUTNYA
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Grid */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent px-4">
              MENGAPA REALSHIRT?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl mx-auto px-4">
              Teknologi modern bertemu dengan kualitas premium untuk hasil yang sempurna
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="glass-card p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-card rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-primary/20 transition-all duration-300 glow-red">
                <Shirt className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">KUALITAS PREMIUM</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Menggunakan bahan berkualitas tinggi dan teknik sablon terdepan 
                untuk hasil yang tahan lama dan detail sempurna.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-card rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-primary/20 transition-all duration-300 glow-red">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">FLEKSIBEL & SCALABLE</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Melayani kebutuhan dari 1 pcs hingga ribuan pcs dengan 
                sistem produksi yang efisien dan harga kompetitif.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-8 text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-card rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-primary/20 transition-all duration-300 glow-red">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">TRUSTED SINCE 2017</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Telah melayani ribuan pelanggan dengan tingkat kepuasan 
                tinggi dan reputasi terpercaya selama lebih dari 7 tahun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Futuristic */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent px-4">
            READY TO CREATE?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Upload desain Anda sekarang dan dapatkan penawaran terbaik 
            dari tim RealShirt dengan teknologi modern terdepan.
          </p>
          <Link to="/upload" className="inline-block w-full sm:w-auto px-4">
            <Button size="lg" className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-16 py-4 sm:py-6 bg-primary hover:bg-primary/80 btn-glow glow-red font-bold tracking-wider shadow-brand">
              UPLOAD DESAIN SEKARANG
              <ArrowRight className="ml-3 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </section>
    </div>;
};
export default Index;