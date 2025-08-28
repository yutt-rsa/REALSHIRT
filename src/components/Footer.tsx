import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-white/10">
      <div className="container py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Brand */}
          <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group mb-4">
              <img 
                src="/lovable-uploads/26e048cd-0c2f-4c06-811e-fd9bf1b27620.png" 
                alt="RealShirt Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
              />
              <span className="font-black text-lg sm:text-xl bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">REALSHIRT</span>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Cetak kaos custom berkualitas tinggi dengan teknologi modern sejak 2017. 
              Melayani satuan hingga partai besar dengan standar premium.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">MENU UTAMA</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/produk" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Produk & Layanan
                </Link>
              </li>
              <li>
                <Link to="/galeri" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Galeri
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">LAYANAN</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/upload" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Upload Desain
                </Link>
              </li>
              <li>
                <Link to="/testimoni" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Kontak
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">HUBUNGI KAMI</h3>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="https://instagram.com/kaoscetaksatuan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">@kaoscetaksatuan</span>
              </a>
              <a
                href="https://wa.me/6289650155055"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">0896 5015 5055</span>
              </a>
              <a
                href="mailto:suyutersa@gmail.com"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">suyutersa@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-muted-foreground font-medium">
            © 2024 <span className="text-primary font-bold">REALSHIRT</span>. All rights reserved. Established 2017.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;