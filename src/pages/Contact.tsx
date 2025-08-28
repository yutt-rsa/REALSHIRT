import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";
const Contact = () => {
  const { t } = useLanguage();
  const contactInfo = [{
    icon: <MessageCircle className="h-6 w-6 text-green-600" />,
    title: "WhatsApp",
    value: "0896 5015 5055",
    description: "Chat langsung untuk konsultasi cepat",
    action: () => window.open("https://wa.me/6289650155055", "_blank")
  }, {
    icon: <Instagram className="h-6 w-6 text-pink-600" />,
    title: "Instagram",
    value: "@kaoscetaksatuan",
    description: "Follow untuk update produk terbaru",
    action: () => window.open("https://instagram.com/kaoscetaksatuan", "_blank")
  }, {
    icon: <Mail className="h-6 w-6 text-blue-600" />,
    title: "Email",
    value: "suyutersa@gmail.com",
    description: "Untuk pertanyaan detail dan proposal",
    action: () => window.open("mailto:suyutersa@gmail.com", "_blank")
  }];
  const workingHours = [{
    day: "Senin - Jumat",
    hours: "08:00 - 17:00 WIB"
  }, {
    day: "Sabtu",
    hours: "08:00 - 15:00 WIB"
  }, {
    day: "Minggu",
    hours: "Tutup"
  }];
  return <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
          {t('contact.title')}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          {t('contact.subtitle')}
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-realshirt-black mb-6">
                Informasi Kontak
              </h2>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => <Card key={index} className="hover:shadow-soft transition-shadow cursor-pointer" onClick={contact.action}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {contact.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{contact.title}</h3>
                          <p className="text-primary font-medium mb-1">{contact.value}</p>
                          <p className="text-muted-foreground text-sm">{contact.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </div>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Jam Operasional</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>)}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Untuk urgency atau pertanyaan di luar jam operasional, 
                    silakan kirim pesan WhatsApp. Kami akan membalas sesegera mungkin.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Butuh Respon Cepat?</h3>
                <p className="mb-4 opacity-90">
                  Chat langsung via WhatsApp untuk konsultasi instan
                </p>
                <Button onClick={() => window.open("https://wa.me/6289650155055", "_blank")} variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat WhatsApp Sekarang
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <p className="text-muted-foreground">
                Isi form dibawah dan kami akan menghubungi Anda sesegera mungkin
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name">Nama Lengkap *</Label>
                    <Input id="contact-name" placeholder="Masukkan nama lengkap" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">WhatsApp *</Label>
                    <Input id="contact-phone" placeholder="08XX XXXX XXXX" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="email@example.com" />
                </div>

                <div>
                  <Label htmlFor="contact-subject">Subjek</Label>
                  <Input id="contact-subject" placeholder="Judul pertanyaan atau kebutuhan" />
                </div>

                <div>
                  <Label htmlFor="contact-message">Pesan *</Label>
                  <Textarea id="contact-message" placeholder="Jelaskan kebutuhan atau pertanyaan Anda..." rows={5} required />
                </div>

                <Button type="submit" className="w-full" variant="hero" size="lg">
                  Kirim Pesan
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Field wajib diisi. Kami akan merespon dalam 1x24 jam.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-realshirt-black mb-6 sm:mb-8 px-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[{
            q: "Berapa minimal order kaos custom?",
            a: "Kami melayani mulai dari 1 pcs (satuan) hingga partai besar. Tidak ada minimal order."
          }, {
            q: "Berapa lama proses pengerjaan?",
            a: "Waktu normal 3-5 hari kerja. Untuk urgent bisa 1-2 hari dengan biaya tambahan."
          }, {
            q: "Bisa konsultasi desain?",
            a: "Ya, tim kreatif kami siap membantu konsultasi dan perbaikan desain secara gratis."
          }, {
            q: "Bagaimana cara pembayaran?",
            a: "Transfer bank, e-wallet (OVO, GoPay, DANA), atau COD untuk area tertentu."
          }].map((faq, index) => <Card key={index} className="hover:shadow-soft transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        <NavigationButtons 
          previousPath="/testimoni" 
          previousLabel={t('nav.testimonials')}
          nextPath="/upload" 
          nextLabel={t('nav.upload')} 
        />
      </div>
    </div>;
};
export default Contact;