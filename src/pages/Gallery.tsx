import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ImageIcon } from "lucide-react";
import NavigationButtons from "@/components/NavigationButtons";
import { useLanguage } from "@/contexts/LanguageContext";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  technique: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

const categories = ["Semua", "Kaos", "Hoodie", "Kemeja", "Totebag", "Topi", "Merchandise"];

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setGalleryItems(data || []);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const filteredItems = selectedCategory === "Semua" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="py-12 sm:py-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
          {t('gallery.title')}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
          {t('gallery.subtitle')}
        </p>
      </section>

      {/* Filter Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"} 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Memuat galeri...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Tidak ada item galeri
            </h3>
            <p className="text-muted-foreground">
              {selectedCategory !== "Semua" 
                ? `Tidak ada item dalam kategori "${selectedCategory}"`
                : "Galeri belum memiliki konten"
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative overflow-hidden">
                  <div className="aspect-square bg-muted">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  {item.technique && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      {item.technique}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-12 sm:py-16 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground font-medium">Proyek Selesai</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-muted-foreground font-medium">Perusahaan Klien</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">95%</h3>
              <p className="text-muted-foreground font-medium">Kepuasan Pelanggan</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">24 Jam</h3>
              <p className="text-muted-foreground font-medium">Proses Tercepat</p>
            </div>
          </div>
        </div>
      </section>

      <NavigationButtons 
        previousPath="/produk" 
        previousLabel={t('nav.products')}
        nextPath="/testimoni" 
        nextLabel={t('nav.testimonials')} 
      />
    </div>
  );
};

export default Gallery;