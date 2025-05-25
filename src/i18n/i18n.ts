import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationCA from './locales/ca.json';
import translationES from './locales/es.json';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import translationDE from './locales/de.json';
import translationRU from './locales/ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ca: {
        translation: translationCA
      },
      es: {
        translation: translationES
      },
      en: {
        translation: translationEN
      },
      fr: {
        translation: translationFR
      },
      de: {
        translation: translationDE
      },
      ru: {
        translation: translationRU
      }
    },
    fallbackLng: 'ca',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 