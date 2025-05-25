import { Fragment } from 'react';
import { CheckIcon, MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

type TierName = 'Eco plus 700' | 'Eco plus 760' | 'Scale';

type FeatureTier = {
  [key in TierName]: boolean | string;
};

interface Feature {
  name: string;
  tiers: FeatureTier;
}

interface Section {
  name: string;
  features: Feature[];
}

const tiers = [
  {
    name: 'Eco plus 700',
    description: 'La ventana basica sin extras que la encarezcan.',
    priceMonthly: '19€',
    href: '#',
    highlights: [
      { description: 'Perfileria  Alemana' },
      { description: 'Marco de 70 mm' },
      { description: 'Vidrio de camara' },
      { description: 'Tapa de persiana de 24 mm', disabled: true },
      { description: 'Instalacion Estandart', disabled: true },
      { description: '10 años de garantia de color', disabled: true },
    ],
  },
  {
    name: 'Eco plus 7600',
    description: 'Una ventana con eficiencia mejorada ',
    priceMonthly: '49€',
    href: '#',
    highlights: [
      { description: 'Perfileria Alemana' },
      { description: 'Marco de 76 mm' },
      { description: '5 camaras'},
      { description: 'Triple junta' },
      { description: 'Vidrio de camara' },
      { description: 'Grueso de 30 mm' },
      { description: 'Tratamiento Termico' },
      { description: 'Tratamiento Solar', disabled: true },
      { description: '10 años de garantia de color', disabled: true }
    ],
  },
  {
    name: 'Scale',
    description: 'Flexibilidad total a gran escala.',
    priceMonthly: '99€',
    href: '#',
    highlights: [
      { description: 'Dominios personalizados' },
      { description: 'Entrega de contenido Edge' },
      { description: 'Analítica avanzada' },
      { description: 'Workshops trimestrales' },
      { description: 'Single sign-on (SSO)' },
      { description: 'Soporte telefónico prioritario' },
    ],
  },
];

const sections: Section[] = [
  {
    name: 'Características',
    features: [
      { name: 'Entrega de contenido Edge', tiers: { 'Eco plus 700': true, 'Eco plus 760': true, 'Scale': true } },
      { name: 'Dominios personalizados', tiers: { 'Eco plus 700': '1', 'Eco plus 760': '3', 'Scale': 'Ilimitados' } },
      { name: 'Miembros del equipo', tiers: { 'Eco plus 700': '3', 'Eco plus 760': '20', 'Scale': 'Ilimitados' } },
      { name: 'Single sign-on (SSO)', tiers: { 'Eco plus 700': false, 'Eco plus 760': false, 'Scale': true } },
    ],
  },
  {
    name: 'Informes',
    features: [
      { name: 'Analítica avanzada', tiers: { 'Eco plus 700': true, 'Eco plus 760': true, 'Scale': true } },
      { name: 'Informes básicos', tiers: { 'Eco plus 700': false, 'Eco plus 760': true, 'Scale': true } },
      { name: 'Informes profesionales', tiers: { 'Eco plus 700': false, 'Eco plus 760': false, 'Scale': true } },
      { name: 'Constructor de informes personalizados', tiers: { 'Eco plus 700': false, 'Eco plus 760': false, 'Scale': true } },
    ],
  },
  {
    name: 'Soporte',
    features: [
      { name: 'Soporte online 24/7', tiers: { 'Eco plus 700': true, 'Eco plus 760': true, 'Scale': true } },
      { name: 'Workshops trimestrales', tiers: { 'Eco plus 700': false, 'Eco plus 760': true, 'Scale': true } },
      { name: 'Soporte telefónico prioritario', tiers: { 'Eco plus 700': false, 'Eco plus 760': false, 'Scale': true } },
      { name: 'Onboarding 1:1', tiers: { 'Eco plus 700': false, 'Eco plus 760': false, 'Scale': true } },
    ],
  },
  {
    name: 'Vidrio',
    features: [
      { name: 'Doble acristalamiento', tiers: { 'Eco plus 700': true, 'Eco plus 760': true, 'Scale': true } },
      { name: 'Tratamiento bajo emisivo', tiers: { 'Eco plus 700': false, 'Eco plus 760': true, 'Scale': true } },
    ],
  },
];

function getTierValue(tiers: FeatureTier, tier: string): boolean | string | undefined {
  if (tier === 'Eco plus 700' || tier === 'Eco plus 760' || tier === 'Scale') {
    return tiers[tier];
  }
  return undefined;
}

export default function PriceTable() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 max-lg:text-center lg:max-w-7xl lg:px-8">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-6xl lg:text-pretty">
          Tres ventanas que cubren todas las necesidades
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-medium text-pretty text-gray-600 max-lg:mx-auto sm:text-xl/8">
        Estas tres ventanas resuelben todas las necesidades que puedas tener para aislar tu hogar
        </p>
      </div>
      <div className="relative pt-16 sm:pt-24">
        <div className="absolute inset-x-0 top-48 bottom-0 bg-[radial-gradient(circle_at_center_center,#7775D6,#592E71,#030712_70%)] lg:bg-[radial-gradient(circle_at_center_150%,#7775D6,#592E71,#030712_70%)]" />
        <div className="relative mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
              >
                <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
                  <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                    <h2 className="text-sm font-semibold text-indigo-600">
                      {tier.name} <span className="sr-only">plan</span>
                    </h2>
                    <p className="mt-2 text-sm/6 text-pretty text-gray-600">{tier.description}</p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="text-5xl font-semibold text-gray-950">{tier.priceMonthly}</div>
                      <div className="text-sm text-gray-600">
                        <p>EUR</p>
                        <p>al mes</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <a
                        href={tier.href}
                        aria-label={`Empieza una prueba gratuita en el plan ${tier.name}`}
                        className="inline-block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Prueba gratis
                      </a>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-sm/6 font-medium text-gray-950">Incluye:</h3>
                      <ul className="mt-3 space-y-3">
                        {tier.highlights.map((highlight) => (
                          <li
                            key={highlight.description}
                            data-disabled={highlight.disabled}
                            className="group flex items-start gap-4 text-sm/6 text-gray-600 data-disabled:text-gray-400"
                          >
                            <span className="inline-flex h-6 items-center">
                              <PlusIcon
                                aria-hidden="true"
                                className="size-4 fill-gray-400 group-data-disabled:fill-gray-300"
                              />
                            </span>
                            {highlight.disabled ? <span className="sr-only">No incluido:</span> : null}
                            {highlight.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-6 pt-16 sm:pt-24 lg:max-w-7xl lg:px-8">
        <table className="w-full text-left max-sm:hidden">
          <caption className="sr-only">Comparativa de planes</caption>
          <colgroup>
            <col className="w-2/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
          </colgroup>
          <thead>
            <tr>
              <td className="p-0" />
              {tiers.map((tier) => (
                <th key={tier.name} scope="col" className="p-0">
                  <div className="text-sm font-semibold text-indigo-600">
                    {tier.name} <span className="sr-only">plan</span>
                  </div>
                </th>
              ))}
            </tr>
            <tr>
              <th className="p-0" />
              {tiers.map((tier) => (
                <td key={tier.name} className="px-0 pt-3 pb-0">
                  <a
                    href={tier.href}
                    aria-label={`Empieza con el plan ${tier.name}`}
                    className="inline-block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Empezar
                  </a>
                </td>
              ))}
            </tr>
          </thead>
          {sections.map((section) => (
            <tbody key={section.name} className="group">
              <tr>
                <th scope="colgroup" colSpan={4} className="px-0 pt-10 pb-0 group-first-of-type:pt-5">
                  <div
                    className={`-mx-4 rounded-lg px-4 py-3 text-sm/6 font-semibold text-gray-950
                      ${section.name === 'Vidrio' ? 'bg-orange-400 text-center text-white' : 'bg-gray-50'}`}
                  >
                    {section.name}
                  </div>
                </th>
              </tr>
              {section.features.map((feature) => (
                <tr key={feature.name} className="border-b border-gray-100 last:border-none">
                  <th scope="row" className="px-0 py-4 text-sm/6 font-normal text-gray-600">
                    {feature.name}
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.name} className="p-4 max-sm:text-center">
                      {typeof getTierValue(feature.tiers, tier.name) === 'string' ? (
                        <>
                          <span className="sr-only">{tier.name} incluye:</span>
                          <span className="text-sm/6 text-gray-950">{getTierValue(feature.tiers, tier.name)}</span>
                        </>
                      ) : (
                        <>
                          {getTierValue(feature.tiers, tier.name) === true ? (
                            <CheckIcon aria-hidden="true" className="inline-block w-6 h-6 fill-green-600" />
                          ) : (
                            <MinusIcon aria-hidden="true" className="inline-block w-6 h-6 fill-gray-400" />
                          )}

                          <span className="sr-only">
                            {getTierValue(feature.tiers, tier.name) === true
                              ? `Incluido en ${tier.name}`
                              : `No incluido en ${tier.name}`}
                          </span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        <TabGroup className="sm:hidden">
          <TabList className="flex">
            {tiers.map((tier) => (
              <Tab
                key={tier.name}
                className="w-1/3 border-b border-gray-100 py-4 text-base/8 font-medium text-indigo-600 data-selected:border-indigo-600 [&:not([data-focus])]:focus:outline-hidden"
              >
                {tier.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels as={Fragment}>
            {tiers.map((tier) => (
              <TabPanel key={tier.name}>
                <a
                  href={tier.href}
                  className="mt-8 block rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Empezar
                </a>
                {sections.map((section) => (
                  <Fragment key={section.name}>
                    <div
                      className={`-mx-6 mt-10 rounded-lg px-6 py-3 text-sm/6 font-semibold group-first-of-type:mt-5
                        ${section.name === 'Vidrio' ? 'bg-orange-400 text-center text-white' : 'bg-gray-50 text-gray-950'}`}
                    >
                      {section.name}
                    </div>
                    <dl>
                      {section.features.map((feature) => (
                        <div
                          key={feature.name}
                          className="grid grid-cols-2 border-b border-gray-100 py-4 last:border-none"
                        >
                          <dt className="text-sm/6 font-normal text-gray-600">{feature.name}</dt>
                          <dd className="text-center">
                            {typeof getTierValue(feature.tiers, tier.name) === 'string' ? (
                              <span className="text-sm/6 text-gray-950">{getTierValue(feature.tiers, tier.name)}</span>
                            ) : (
                              <>
                                {getTierValue(feature.tiers, tier.name) === true ? (
                                  <CheckIcon aria-hidden="true" className="inline-block w-6 h-6 fill-green-600" />
                                ) : (
                                  <MinusIcon aria-hidden="true" className="inline-block w-6 h-6 fill-gray-400" />
                                )}

                                <span className="sr-only">{getTierValue(feature.tiers, tier.name) === true ? 'Sí' : 'No'}</span>
                              </>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Fragment>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
} 