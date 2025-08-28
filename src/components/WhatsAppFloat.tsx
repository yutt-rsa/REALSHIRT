import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "6289650155055"; // Format: country code + number without +
    const message = "Halo RealShirt, saya ingin bertanya tentang layanan cetak kaos custom. Mohon informasinya. Terima kasih.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      size="icon"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="sr-only">Chat WhatsApp</span>
    </Button>
  );
};

export default WhatsAppFloat;