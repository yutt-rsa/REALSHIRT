import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { DatabaseStatusIndicator } from "./DatabaseStatusIndicator";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.about'), path: "/tentang" },
    { name: t('nav.products'), path: "/produk" },
    { name: t('nav.gallery'), path: "/galeri" },
    { name: t('nav.testimonials'), path: "/testimoni" },
    { name: t('nav.upload'), path: "/upload" },
    { name: t('nav.contact'), path: "/kontak" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <img 
            src="/lovable-uploads/5decbe66-1b1c-47ed-a83a-059ca66c2f8e.png" 
            alt="Realohit Logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
          />
          <span className="font-black text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">REALSHIRT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-xs xl:text-sm font-semibold transition-all duration-300 hover:text-primary hover:glow-red px-2 xl:px-3 py-2 rounded-lg ${
                isActive(item.path) 
                  ? "text-primary bg-primary/10 shadow-glow" 
                  : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <DatabaseStatusIndicator />
          <LanguageSwitcher />
          <UserMenu />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-background border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 text-base font-medium transition-colors rounded-lg ${
                  isActive(item.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-white/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 py-3 space-y-3 border-t border-white/10 mt-2 pt-4">
              <DatabaseStatusIndicator />
              <LanguageSwitcher />
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;