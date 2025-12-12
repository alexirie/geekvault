// src/components/Footer.js

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0b0f15] text-[#c7d5e0] py-6 mt-12 border-t border-[#2a3b52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Texto de copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} GeekVault. {t("footer.derechos")}</p>

        {/* Enlaces de interés */}
        <div className="mt-2 sm:mt-0 flex space-x-4">
          <a href="/about" className="text-sm hover:text-[#66c0f4] transition-colors">{t("footer.nosotros")}</a>
          <a href="/contact" className="text-sm hover:text-[#66c0f4] transition-colors">{t("footer.contacto")}</a>
          <a href="/privacy" className="text-sm hover:text-[#66c0f4] transition-colors">{t("footer.privacidad")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;