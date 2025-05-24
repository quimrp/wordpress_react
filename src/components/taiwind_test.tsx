'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import WhatsAppChatAuto from './whatappBot'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from 'react-i18next'


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function TaiwindTest() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 bg-white shadow">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
            <LanguageSwitcher />
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <LanguageSwitcher />
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate pt-14" id="whatsapp-section">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">
              {t('whatsapp.section.title')}
            </h1>
            <p className="mt-4 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              {t('whatsapp.section.description')}
            </p>
            <div className="mt-6 flex items-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[var(--primary-color)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--primary-color-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              >
                {t('whatsapp.section.cta.whatsapp')}
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                {t('whatsapp.section.cta.more')} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:shrink-0 lg:grow">
            <div className="flex flex-col items-center justify-center py-32">
              <div className="relative bg-[#343E4E] rounded-[36px] shadow-2xl border border-gray-300"
                   style={{ width: 280, height: 580 }}>
                {/* Borde exterior del móvil */}
                <div className="absolute inset-0 rounded-[36px] border-4 border-[#4B5563] pointer-events-none" />
                {/* Chat WhatsApp */}
                <div className="w-full h-full rounded-[36px] overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-16 h-2.5 bg-black/30 rounded-full mb-1"></div>
                    <div className="w-5 h-1 bg-black/20 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 bg-black/20 rounded-full border-2 border-white"></div>
                  </div>
                  <WhatsAppChatAuto />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
