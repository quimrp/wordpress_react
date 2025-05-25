import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, XMarkIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/outline';
import type { TFunction } from 'i18next';
import { ventanasEjemplo } from './ventanasEjemplo';

interface FichaItem {
  label: string;
  value: React.ReactNode | boolean;
  tooltip?: string;
}

interface FichaSeccion {
  titulo: string;
  items: FichaItem[];
}

interface FichaVentanaProps {
  nombre: string;
  descripcion?: string;
  imagen: string;
  secciones: FichaSeccion[];
}

function Tooltip({ text }: { text: string }) {
  return (
    <span className="relative group cursor-pointer">
      <InformationCircleIcon className="inline w-4 h-4 ml-1 text-gray-400" />
      <span className="absolute left-1/2 z-10 hidden w-48 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
        {text}
      </span>
    </span>
  );
}

function Valor({ value }: { value: React.ReactNode | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <CheckIcon className="w-5 h-5 text-green-600 inline" />
      : <XMarkIcon className="w-5 h-5 text-gray-400 inline" />;
  }
  return <span>{value}</span>;
}

// Calcula la altura máxima de la cabecera entre todas las ventanas
function getMaxHeaderHeight() {
  // Aproximación: badge (28px) + nombre (48px) + descripción (24px) + márgenes (16px)
  // Si alguna ventana no tiene badge o descripción, se reserva el espacio igualmente
  return 28 + 48 + 24 + 16;
}
const HEADER_MIN_HEIGHT = getMaxHeaderHeight();

export default function FichaVentana(props: Partial<FichaVentanaProps>) {
  const { t } = useTranslation();

  // Si no recibe props, renderiza todas las fichas de ejemplo en grid centrado y ancho limitado
  if (!props.nombre && !props.imagen && !props.secciones) {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-6xl lg:text-pretty text-center mb-4">
          {t('ventanas.title')}
        </h1>
        <p className="mt-2 mb-8 max-w-2xl text-lg font-medium text-pretty text-gray-600 mx-auto sm:text-xl/8 text-center">
          {t('ventanas.subtitulo')}
        </p>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {ventanasEjemplo.map((ventana: FichaVentanaProps) => (
            <div key={ventana.nombre} className="px-2 flex flex-col">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-auto mb-8 flex flex-col h-full [&_a]:text-[var(--secondary-color)] [&_a:hover]:text-[var(--secondary-color-dark)] [&_a:hover]:underline">
                <div
                  className="sticky top-0 z-10 bg-white pb-2 md:-mx-6 md:px-6 flex flex-col items-center justify-center"
                  style={{ minHeight: HEADER_MIN_HEIGHT }}
                >
                  <div className="h-7 flex items-center justify-center">
                    {ventana.nombre === "EcoPrime 820" ? (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 shadow-lg text-xs font-bold text-gray-900 animate-pulse border border-yellow-300">
                        <StarIcon className="w-4 h-4 text-yellow-600 drop-shadow" />
                        {t('ventanas.mejor_opcion', 'MEJOR OPCIÓN')}
                      </div>
                    ) : null}
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-2">{t(`ventanas.${ventana.nombre}.nombre`)}</h2>
                  <p className="text-center text-gray-500 text-base mb-2 min-h-[48px] line-clamp-2">
                    {t(`ventanas.${ventana.nombre}.descripcion`)}
                  </p>
                </div>
                <div className="flex justify-center mb-4">
                  <img src={ventana.imagen} alt={t(`ventanas.${ventana.nombre}.nombre`)} width={150} height={150} />
                </div>
                {Array.from(new Set(ventanasEjemplo.flatMap((v: FichaVentanaProps) => v.secciones.map((s: FichaSeccion) => s.titulo)))).map((titulo: string) => {
                  const sec = ventana.secciones.find((s: FichaSeccion) => s.titulo === titulo);
                  return (
                    <div key={titulo} className="mb-4 flex-1 flex flex-col">
                      <div className="bg-orange-400 text-white text-center font-semibold py-2 rounded mb-2">{t(`ventanas.secciones.${titulo}`)}</div>
                      {sec ? (
                        <table className="w-full h-full">
                          <tbody>
                            {sec.items.map((item: FichaItem) => (
                              <tr key={item.label} className="border-b last:border-none">
                                <td className="py-2 font-medium">
                                  {t(`ventanas.campos.${item.label}`)}
                                  {item.tooltip && <Tooltip text={t(`ventanas.tooltips.${item.label}`, item.tooltip)} />}
                                </td>
                                <td className="py-2 text-right">
                                  <Valor value={item.value} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="flex-1" />
                      )}
                    </div>
                  );
                })}
                <div className="text-center mt-4">
                  <button className="bg-[var(--primary-color)] text-white px-6 py-2 rounded font-semibold">{t('ventanas.mas_info', '+ info')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <ComparativaVentanas />
        </div>
      </div>
    );
  }
  // Si recibe props, renderiza solo una ficha
  const { nombre, imagen, secciones } = props as FichaVentanaProps;
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full mx-auto mb-8 [&_a]:text-[var(--secondary-color)] [&_a:hover]:text-[var(--secondary-color-dark)] [&_a:hover]:underline">
      <div
        className="sticky top-0 z-10 bg-white pb-2 md:-mx-6 md:px-6 flex flex-col items-center justify-center"
        style={{ minHeight: HEADER_MIN_HEIGHT }}
      >
        <div className="h-7 flex items-center justify-center">
          {nombre === "EcoPrime 820" ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 shadow-lg text-xs font-bold text-gray-900 animate-pulse border border-yellow-300">
              <StarIcon className="w-4 h-4 text-yellow-600 drop-shadow" />
              {t('ventanas.mejor_opcion', 'MEJOR OPCIÓN')}
            </div>
          ) : null}
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">{t(`ventanas.${nombre}.nombre`)}</h2>
        <p className="text-center text-gray-500 text-base mb-2 min-h-[48px] line-clamp-2">
          {t(`ventanas.${nombre}.descripcion`)}
        </p>
      </div>
      <div className="flex justify-center mb-4">
        <img src={imagen} alt={t(`ventanas.${nombre}.nombre`)} width={150} height={150} />
      </div>
      {secciones.map(sec => (
        <div key={sec.titulo} className="mb-4">
          <div className="bg-orange-400 text-white text-center font-semibold py-2 rounded mb-2">{t(`ventanas.secciones.${sec.titulo}`)}</div>
          <table className="w-full">
            <tbody>
              {sec.items.map((item, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2 font-medium">
                    {t(`ventanas.campos.${item.label}`)}
                    {item.tooltip && <Tooltip text={t(`ventanas.tooltips.${item.label}`, item.tooltip)} />}
                  </td>
                  <td className="py-2 text-right">
                    <Valor value={item.value} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="text-center mt-4">
        <button className="bg-[var(--primary-color)] text-white px-6 py-2 rounded font-semibold">{t('ventanas.mas_info', '+ info')}</button>
      </div>
      <div className="mt-16">
        <ComparativaVentanas />
      </div>
    </div>
  );
}

// Ejemplo de uso con dos ventanas:
// export const ventanasEjemplo: FichaVentanaProps[] = [...]

// --- Tabla comparativa ---
type CamposPorSeccion = Record<string, string[]>;

function getComparativaData() {
  // Recolecta todas las secciones y campos únicos
  const secciones = Array.from(new Set(ventanasEjemplo.flatMap((v: FichaVentanaProps) => v.secciones.map((s: FichaSeccion) => s.titulo))));
  const camposPorSeccion: CamposPorSeccion = {};
  secciones.forEach((seccion: string) => {
    camposPorSeccion[seccion] = Array.from(new Set(
      ventanasEjemplo.flatMap((v: FichaVentanaProps) => {
        const sec = v.secciones.find((s: FichaSeccion) => s.titulo === seccion);
        return sec ? sec.items.map((i: FichaItem) => i.label) : [];
      })
    ));
  });
  return { secciones, camposPorSeccion };
}

function getValorVentana(
  ventana: FichaVentanaProps,
  seccion: string,
  campo: string
): React.ReactNode | boolean | null {
  const sec = ventana.secciones.find((s) => s.titulo === seccion);
  if (!sec) return null;
  const item = sec.items.find((i) => i.label === campo);
  if (!item) return null;
  return item.value;
}

function safeT(t: TFunction, key: string, defaultValue?: string) {
  const result = t(key, { defaultValue });
  return typeof result === 'string' ? result : defaultValue || '';
}

function ComparativaVentanas() {
  const { t } = useTranslation();
  const { secciones, camposPorSeccion } = getComparativaData();
  const nombres = ventanasEjemplo.map((v: FichaVentanaProps) => v.nombre);

  return (
    <div className="mx-auto max-w-2xl px-2 pt-8 sm:pt-12 lg:max-w-7xl lg:px-8">
      <div className="w-full">
        <table className="w-full text-left border rounded-xl overflow-hidden bg-white shadow text-xs sm:text-sm">
          <caption className="sr-only">Comparativa de ventanas</caption>
          <colgroup>
            <col className="w-2/5 sm:w-2/5" />
            {nombres.map((n: string, i: number) => <col key={i} className="w-1/5 sm:w-1/5" />)}
          </colgroup>
          <thead>
            <tr>
              <td className="p-0" />
              {ventanasEjemplo.map((ventana: FichaVentanaProps) => (
                <th key={ventana.nombre} scope="col" className="p-0">
                  <div className="text-xs sm:text-sm font-semibold text-orange-600 text-center">
                    {safeT(t, `ventanas.${ventana.nombre}.nombre`, ventana.nombre)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {secciones.map((seccion) => (
            <tbody key={seccion} className="group">
              <tr>
                <th colSpan={nombres.length + 1} className="px-0 pt-6 pb-0 group-first-of-type:pt-3">
                  <div className={`-mx-2 rounded-lg px-2 py-2 text-xs sm:text-sm font-semibold ${seccion === 'VIDRIO' ? 'bg-orange-400 text-center text-white' : 'bg-gray-50 text-gray-950'}`}>{safeT(t, `ventanas.secciones.${seccion}`, seccion)}</div>
                </th>
              </tr>
              {camposPorSeccion[seccion].map((campo) => (
                <tr key={campo} className="border-b border-gray-100 last:border-none">
                  <th className="px-1 py-2 sm:px-0 sm:py-4 text-xs sm:text-sm font-normal text-gray-600 max-w-[90px] truncate whitespace-nowrap overflow-hidden">
                    {safeT(t, `ventanas.campos.${campo}`, campo)}
                  </th>
                  {ventanasEjemplo.map((ventana: FichaVentanaProps) => (
                    <td key={ventana.nombre} className="p-1 sm:p-4 text-center align-middle">
                      <Valor value={getValorVentana(ventana, seccion, campo)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
} 