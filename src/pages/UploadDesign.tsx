import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileImage, MessageCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";
const UploadDesign = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
  const {
    toast
  } = useToast();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Format file tidak didukung",
          description: "Silakan upload file dalam format JPG, PNG, GIF, atau PDF",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File terlalu besar",
          description: "Ukuran file maksimal 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleWhatsAppOrder = () => {
    if (!selectedFile) {
      toast({
        title: "File desain belum dipilih",
        description: "Silakan upload file desain terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    if (!formData.name || !formData.phone) {
      toast({
        title: "Data belum lengkap",
        description: "Nama dan nomor WhatsApp wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Create WhatsApp message template
    const message = `Halo RealShirt, saya ingin memesan kaos dengan detail sebagai berikut:

📝 Data Pelanggan:
- Nama: ${formData.name}
- WhatsApp: ${formData.phone}
- Email: ${formData.email || '-'}

👕 Detail Pesanan:
- Jumlah: ${formData.quantity || '-'} pcs
- Ukuran: ${formData.size || '-'}
- Bahan: ${formData.material || '-'}
- Teknik Cetak: ${formData.technique || '-'}
- Catatan: ${formData.notes || '-'}

🎨 File Desain: ${selectedFile.name}

Mohon infokan harga dan detail produksinya. Terima kasih.`;
    const phoneNumber = "6289650155055";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Pesanan berhasil dikirim!",
      description: "Anda akan diarahkan ke WhatsApp untuk melanjutkan pemesanan"
    });
  };
  return <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white">
          Upload <span className="text-primary">Desain</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          Upload desain Anda dan isi detail pesanan. Tim kami akan menghubungi 
          Anda via WhatsApp untuk konfirmasi harga dan proses produksi.
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileImage className="h-5 w-5 text-primary" />
                  <span>Upload File Desain</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input type="file" accept=".jpg,.jpeg,.png,.gif,.pdf" onChange={handleFileChange} className="hidden" id="design-upload" />
                  <label htmlFor="design-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">
                      Klik untuk upload file desain
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Format: JPG, PNG, GIF, PDF (Max 10MB)
                    </p>
                  </label>
                </div>
                
                {selectedFile && <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        File berhasil dipilih:
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">{selectedFile.name}</p>
                  </div>}

                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Tips untuk hasil terbaik:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Gunakan resolusi minimal 300 DPI</li>
                    <li>Format vektor (AI, PDF) memberikan hasil terbaik</li>
                    <li>Pastikan desain tidak blur atau pecah</li>
                    <li>Ukuran file maksimal 10MB</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Order Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input id="name" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} placeholder="Masukkan nama lengkap" />
                  </div>
                  <div>
                    <Label htmlFor="phone">WhatsApp *</Label>
                    <Input id="phone" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="08XX XXXX XXXX" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email (Opsional)</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="email@example.com" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Jumlah (pcs)</Label>
                    <Input id="quantity" type="number" value={formData.quantity} onChange={e => handleInputChange('quantity', e.target.value)} placeholder="contoh: 10" />
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
                  <Textarea id="notes" value={formData.notes} onChange={e => handleInputChange('notes', e.target.value)} placeholder="Catatan khusus untuk pesanan Anda..." rows={3} />
                </div>

                <Button onClick={handleWhatsAppOrder} className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Pesan via WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Field wajib diisi. Dengan menekan tombol di atas, Anda akan 
                  diarahkan ke WhatsApp untuk melanjutkan pemesanan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <NavigationButtons 
          previousPath="/kontak" 
          previousLabel={t('nav.contact')}
          nextPath="/" 
          nextLabel={t('nav.home')} 
        />
      </div>
    </div>;
};
export default UploadDesign;