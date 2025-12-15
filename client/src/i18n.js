import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import esTranslation from "./locales/es/translation.json";
import enTranslation from "./locales/en/translation.json";
import jpTranslation from "./locales/jp/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslation },
      en: { translation: enTranslation },
      jp: { translation: jpTranslation },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "es",
    interpolation: { escapeValue: false }
  });

export default i18n;
