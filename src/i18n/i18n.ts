import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import plTranslation from "./locales/pl.json";
import enTranslation from "./locales/en.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: plTranslation },
      en: { translation: enTranslation },
    },
    lng: "pl", // Polish as default language
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
