'use client'

import { useTranslation } from 'react-i18next'
import WhatsAppChatAuto from './whatappBot'

export default function TaiwindTest() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
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
