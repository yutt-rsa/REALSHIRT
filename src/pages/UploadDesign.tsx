import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";

const UploadDesign = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    quantity: '',
    size: '',
    material: '',
    technique: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWhatsAppOrder = () => {
    if (!formData.name || !formData.phone) {
      toast({
        title: "Data belum lengkap",
        description: "Nama dan nomor WhatsApp wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const message = `Halo RealShirt, saya ingin memesan kaos dengan detail sebagai berikut:

[DATA] Data Pelanggan:
- Nama: ${formData.name}
- WhatsApp: ${formData.phone}
- Email: ${formData.email || '-'}

[PESANAN] Detail Pesanan:
- Jumlah: ${formData.quantity || '-'} pcs
- Ukuran: ${formData.size || '-'}
- Bahan: ${formData.material || '-'}
- Teknik Cetak: ${formData.technique || '-'}
- Catatan: ${formData.notes || '-'}

[CATATAN] Saya akan mengirimkan desain melalui chat WhatsApp ini setelah konfirmasi pemesanan.

Mohon infokan harga dan detail produksinya. Terima kasih.`;
    
    const phoneNumber = "6289650155055";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Pesanan berhasil dikirim!",
      description: "Anda akan diarahkan ke WhatsApp untuk melanjutkan pemesanan.",
      duration: 4000,
    });
  };

  return (
    <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
          Pesan <span className="text-primary">Kaos Custom</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          Isi detail pesanan Anda dan tim kami akan menghubungi Anda via WhatsApp 
          untuk konfirmasi harga dan proses produksi.
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Order Details Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span>Detail Pesanan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={e => handleInputChange('name', e.target.value)} 
                    placeholder="Masukkan nama lengkap" 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">WhatsApp *</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={e => handleInputChange('phone', e.target.value)} 
                    placeholder="08XX XXXX XXXX" 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email (Opsional)</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={e => handleInputChange('email', e.target.value)} 
                  placeholder="email@example.com" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Jumlah (pcs)</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    value={formData.quantity} 
                    onChange={e => handleInputChange('quantity', e.target.value)} 
                    placeholder="contoh: 10" 
                  />
                </div>
                <div>
                  <Label htmlFor="size">Ukuran</Label>
                  <Select onValueChange={value => handleInputChange('size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ukuran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                      <SelectItem value="mix">Mix Size</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="material">Bahan Kaos</Label>
                  <Select onValueChange={value => handleInputChange('material', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bahan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="combed24s">Cotton Combed 24s</SelectItem>
                      <SelectItem value="combed30s">Cotton Combed 30s</SelectItem>
                      <SelectItem value="polyester">Polyester</SelectItem>
                      <SelectItem value="bamboo">Cotton Bamboo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="technique">Teknik Cetak</Label>
                  <Select onValueChange={value => handleInputChange('technique', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih teknik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sablon">Sablon Manual</SelectItem>
                      <SelectItem value="digital">Digital Print</SelectItem>
                      <SelectItem value="custom">Custom Desain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea 
                  id="notes" 
                  value={formData.notes} 
                  onChange={e => handleInputChange('notes', e.target.value)} 
                  placeholder="Catatan khusus untuk pesanan Anda (termasuk deskripsi desain yang diinginkan)..." 
                  rows={4} 
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-600 mt-1" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Cara Mengirim Desain:</p>
                    <ul className="text-xs space-y-1">
                      <li>- Setelah klik tombol di bawah, Anda akan diarahkan ke WhatsApp</li>
                      <li>- Kirimkan file desain atau deskripsi desain melalui chat WhatsApp</li>
                      <li>- Tim kami akan membantu proses pembuatan desain jika diperlukan</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleWhatsAppOrder} 
                className="w-full bg-green-600 hover:bg-green-700 text-white" 
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pesan via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                * Field bertanda bintang wajib diisi. Tim kami akan menghubungi Anda 
                untuk konfirmasi detail dan harga pesanan.
              </p>
            </CardContent>
          </Card>
        </div>

        <NavigationButtons 
          previousPath="/kontak" 
          previousLabel={t('nav.contact')}
          nextPath="/" 
          nextLabel={t('nav.home')} 
        />
      </div>
    </div>
  );
};

export default UploadDesign;