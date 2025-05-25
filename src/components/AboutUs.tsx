import { useTranslation } from 'react-i18next';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  UserGroupIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

export default function AboutUs() {
  const { t } = useTranslation();

  const values = [
    {
      icon: ShieldCheckIcon,
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: ClockIcon,
      title: t('about.values.experience.title'),
      description: t('about.values.experience.description')
    },
    {
      icon: UserGroupIcon,
      title: t('about.values.service.title'),
      description: t('about.values.service.description')
    },
    {
      icon: SparklesIcon,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[var(--primary-color)]">
            {t('about.title')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('about.subtitle')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('about.description')}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <value.icon className="h-5 w-5 flex-none text-[var(--primary-color)]" aria-hidden="true" />
                  {value.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{value.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t('about.team.title')}
          </h3>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t('about.team.description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="rounded-md bg-[var(--primary-color)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-color-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
            >
              {t('about.cta.contact')}
            </a>
            <a href="#projects" className="text-sm font-semibold leading-6 text-gray-900">
              {t('about.cta.projects')} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 