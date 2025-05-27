import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'react-i18next'

const features = [
  {
    name: 'ventanas.features.push.name',
    description: 'ventanas.features.push.description',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'ventanas.features.ssl.name',
    description: 'ventanas.features.ssl.description',
    icon: LockClosedIcon,
  },
  {
    name: 'ventanas.features.db.name',
    description: 'ventanas.features.db.description',
    icon: ServerIcon,
  },
]

export default function Example() {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <div className="flex-1 flex flex-col justify-center">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-[var(--primary-color)]">{t('ventanas.features.title')}</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-[var(--secondary-color)] sm:text-5xl">
                {t('ventanas.features.subtitle')}
              </p>
              <p className="mt-6 text-lg/8 text-[var(--primary-color)]">
                {t('ventanas.features.intro')}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-[var(--primary-color)] lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-[var(--primary-color)]">
                      <feature.icon aria-hidden="true" className="mr-3 inline-block h-6 w-6 text-[var(--secondary-color)]" />
                      {t(feature.name)}
                    </dt>{' '}
                    <dd className="inline text-[var(--primary-color)]">{t(feature.description)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center h-full">
            <picture>
              <source srcSet="/images/s82-2.avif" type="image/avif" />
              <img
                src="/images/s82-2.jpg"
                alt={t('ventanas.features.imageAlt')}
                className="h-full w-auto object-contain max-h-[600px]"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  )
}
 