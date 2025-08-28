import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  technique: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

const categories = [
  'Kaos',
  'Hoodie', 
  'Kemeja',
  'Totebag',
  'Topi',
  'Merchandise'
];

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    technique: '',
    image_url: ''
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .rpc('has_role', { _user_id: user.id, _role: 'admin' });
        
        if (error) throw error;
        setIsAdmin(data);
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [user]);

  // Fetch gallery items
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
        toast({
          title: "Error",
          description: "Gagal memuat data galeri",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchGalleryItems();
    }
  }, [user, isAdmin, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('gallery_items')
          .update({
            title: formData.title,
            category: formData.category,
            technique: formData.technique || null,
            image_url: formData.image_url || null
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Item galeri berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from('gallery_items')
          .insert({
            title: formData.title,
            category: formData.category,
            technique: formData.technique || null,
            image_url: formData.image_url || null
          });

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Item galeri berhasil ditambahkan",
        });
      }

      // Refresh data
      const { data } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      setGalleryItems(data || []);
      setShowDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan item galeri",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGalleryItems(galleryItems.filter(item => item.id !== id));
      toast({
        title: "Berhasil",
        description: "Item galeri berhasil dihapus",
      });
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus item galeri",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      technique: item.technique || '',
      image_url: item.image_url || ''
    });
    setShowDialog(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: '',
      technique: '',
      image_url: ''
    });
  };

  const handleAddNew = () => {
    resetForm();
    setShowDialog(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-[400px]">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Silakan login terlebih dahulu untuk mengakses panel admin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-[400px]">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Anda tidak memiliki akses ke panel admin.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Panel Admin</h1>
            <p className="text-muted-foreground mt-2">Kelola konten galeri RealShirt</p>
          </div>
          
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Item Galeri' : 'Tambah Item Galeri'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="technique">Teknik</Label>
                  <Input
                    id="technique"
                    value={formData.technique}
                    onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                    placeholder="Contoh: DTF, Sablon, Bordir"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image_url">URL Gambar</Label>
                  <Textarea
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingItem ? 'Perbarui' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Kategori: {item.category}
                  </p>
                  {item.technique && (
                    <p className="text-sm text-muted-foreground">
                      Teknik: {item.technique}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              Belum ada item galeri
            </h3>
            <p className="text-muted-foreground">
              Klik tombol "Tambah Item" untuk mulai menambahkan konten galeri.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;