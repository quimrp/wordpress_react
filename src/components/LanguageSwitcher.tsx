import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('ca')}
        className={`text-sm/6 font-semibold text-gray-900 hover:text-[var(--primary-color)] transition-colors ${
          i18n.language === 'ca' ? 'text-[var(--primary-color)]' : ''
        }`}
      >
        CA
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => changeLanguage('es')}
        className={`text-sm/6 font-semibold text-gray-900 hover:text-[var(--primary-color)] transition-colors ${
          i18n.language === 'es' ? 'text-[var(--primary-color)]' : ''
        }`}
      >
        ES
      </button>
    </div>
  );
} 