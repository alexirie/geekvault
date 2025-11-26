// src/components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Texto de copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} GeekVault. Todos los derechos reservados.</p>

        {/* Enlaces de interés */}
        <div className="mt-2 sm:mt-0 flex space-x-4">
          <a href="/about" className="text-sm hover:text-gray-900 transition-colors">Sobre nosotros</a>
          <a href="/contact" className="text-sm hover:text-gray-900 transition-colors">Contacto</a>
          <a href="/privacy" className="text-sm hover:text-gray-900 transition-colors">Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
