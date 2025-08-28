import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex bg-background/50 rounded-lg p-1">
        <Button
          variant={language === 'id' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('id')}
          className="text-xs px-2 py-1 h-auto"
        >
          ID
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="text-xs px-2 py-1 h-auto"
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;