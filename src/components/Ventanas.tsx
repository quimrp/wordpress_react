import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

const features = [
  {
    name: 'ventanas.features.energy.name',
    description: 'ventanas.features.energy.description',
    icon: HeartIcon,
  },
  {
    name: 'ventanas.features.quality.name',
    description: 'ventanas.features.quality.description',
    icon: PencilSquareIcon,
  },
  {
    name: 'ventanas.features.installation.name',
    description: 'ventanas.features.installation.description',
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
  {
    name: 'ventanas.features.warranty.name',
    description: 'ventanas.features.warranty.description',
    icon: TrashIcon,
  },
]

export default function Ventanas() {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <h2 className="col-span-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            {t('ventanas.title')}
          </h2>
          <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-[var(--primary-color)]">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {t(feature.name)}
                </dt>
                <dd className="mt-1 text-base/7 text-gray-600">{t(feature.description)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 