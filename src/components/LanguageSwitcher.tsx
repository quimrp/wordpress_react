import { useTranslation } from 'react-i18next';
import React from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'ca', label: 'CA' },
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'ru', label: 'RU' }
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          {index > 0 && <span className="text-gray-300">|</span>}
          <button
            onClick={() => changeLanguage(lang.code)}
            className={`text-sm/6 font-semibold text-gray-900 hover:text-[var(--primary-color)] transition-colors ${
              i18n.language === lang.code ? 'text-[var(--primary-color)]' : ''
            }`}
          >
            {lang.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
} 