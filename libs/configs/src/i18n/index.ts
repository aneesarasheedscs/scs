import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    lng: localStorage.getItem('i18nextLng') || 'en',
    detection: {
      caches: ['localStorage', 'cookie'],
      order: ['querystring', 'navigator', 'path', 'localStorage', 'htmlTag', 'cookie'],
    },
  });

export { i18n };
