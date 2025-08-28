import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationButtonsProps {
  previousPath?: string;
  previousLabel?: string;
  nextPath?: string;
  nextLabel?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  previousPath,
  previousLabel,
  nextPath,
  nextLabel
}) => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center">
        {previousPath ? (
          <Link to={previousPath}>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {previousLabel || t('button.previous')}
            </Button>
          </Link>
        ) : (
          <div></div>
        )}

        {nextPath ? (
          <Link to={nextPath}>
            <Button variant="hero" className="flex items-center gap-2">
              {nextLabel || t('button.next')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;