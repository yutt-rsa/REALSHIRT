import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <img 
          src="/lovable-uploads/5decbe66-1b1c-47ed-a83a-059ca66c2f8e.png" 
          alt="Realohit Logo" 
          className="w-32 h-32 mx-auto mb-8 opacity-50"
        />
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-realshirt-black mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. 
          Halaman mungkin telah dipindahkan atau tidak tersedia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="hero" className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Halaman Sebelumnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
