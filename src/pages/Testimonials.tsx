import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";
const Testimonials = () => {
  const { t } = useLanguage();
  const testimonials = [{
    id: 1,
    name: "Andi Pratama",
    role: "Event Organizer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "RealShirt sangat membantu untuk kebutuhan merchandise event kami. Kualitas sablon bagus, harga kompetitif, dan pengerjaan cepat. Sudah 3 kali pesan dan selalu puas!",
    project: "Event Musik Jakarta"
  }, {
    id: 2,
    name: "Sarah Wijaya",
    role: "Founder Startup",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Tim RealShirt sangat profesional dalam menangani pesanan merchandise perusahaan kami. Dari konsultasi desain hingga hasil akhir, semuanya memuaskan. Highly recommended!",
    project: "Company Merchandise"
  }, {
    id: 3,
    name: "Budi Santoso",
    role: "Ketua Komunitas",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Pesan kaos untuk komunitas motor kami 50 pcs. Hasilnya luar biasa! Bahan nyaman, sablon awet, dan harga sesuai budget. Pasti akan pesan lagi untuk acara selanjutnya.",
    project: "Komunitas Motor Bandung"
  }, {
    id: 4,
    name: "Maya Sari",
    role: "Wedding Organizer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Custom kaos untuk wedding favors klien kami. RealShirt memberikan hasil yang sangat memuaskan. Desain sesuai request, kualitas premium, dan delivery tepat waktu.",
    project: "Wedding Custom Shirts"
  }, {
    id: 5,
    name: "Rizky Hakim",
    role: "Manager HRD",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Sudah 2 tahun jadi pelanggan RealShirt untuk kebutuhan seragam karyawan. Konsisten dalam kualitas dan pelayanan. Tim yang responsif dan hasil selalu memuaskan.",
    project: "Corporate Uniform"
  }, {
    id: 6,
    name: "Dina Marlina",
    role: "Guru",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    text: "Pesan kaos wisuda untuk anak-anak kelas 6. Prosesnya mudah, bisa upload desain sendiri, dan hasilnya bagus sekali. Anak-anak dan orang tua sangat senang!",
    project: "Graduation Shirts"
  }];
  const renderStars = (rating: number) => {
    return Array.from({
      length: 5
    }, (_, index) => <Star key={index} className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />);
  };
  return <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
          Testimoni <span className="text-primary">Pelanggan</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          Dengarkan pengalaman pelanggan yang telah mempercayakan kebutuhan 
          cetak kaos custom mereka kepada RealShirt.
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map(testimonial => <Card key={testimonial.id} className="hover:shadow-soft transition-shadow relative">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    <div className="flex space-x-1 mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-1" />
                  <p className="text-muted-foreground italic mb-3 pl-6">
                    "{testimonial.text}"
                  </p>
                  <div className="text-sm text-primary font-medium">
                    Proyek: {testimonial.project}
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* Overall Rating Section */}
      <section className="bg-muted py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white px-4">
            Rating Kepuasan Pelanggan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex justify-center space-x-1 mb-2">
                {renderStars(5)}
              </div>
              <h3 className="text-2xl font-bold text-primary">4.9/5.0</h3>
              <p className="text-muted-foreground">Rating Keseluruhan</p>
            </div>
            <div className="mx-0 my-[15px]">
              <h3 className="text-2xl font-bold text-primary mb-2">98%</h3>
              <p className="text-muted-foreground">Pelanggan Merekomendasikan</p>
            </div>
            <div className="my-[15px]">
              <h3 className="text-2xl font-bold text-primary mb-2">95%</h3>
              <p className="text-muted-foreground">Repeat Customer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-realshirt-black mb-4 sm:mb-6 px-4">
          Ingin Menjadi Bagian dari Testimoni Positif?
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xs sm:max-w-2xl mx-auto px-4">
          Bergabunglah dengan ribuan pelanggan yang puas dengan layanan RealShirt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <a href="/upload" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-semibold transition-colors">
            Mulai Pesan Sekarang
          </a>
          <a href="/kontak" className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-md font-semibold transition-colors">
            Konsultasi Gratis
          </a>
        </div>

        <NavigationButtons 
          previousPath="/galeri" 
          previousLabel={t('nav.gallery')}
          nextPath="/kontak" 
          nextLabel={t('nav.contact')} 
        />
      </section>
    </div>;
};
export default Testimonials;