import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, si } from "./translations";

const resources = {
  en: {
    translation: en,
  },
  si: {
    translation: si,
  },
};

i18next.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;
