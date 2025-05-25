import { CheckIcon, XMarkIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

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

// Utilidad para obtener el máximo número de secciones entre todas las fichas
function getMaxSecciones() {
  return Math.max(...ventanasEjemplo.map(v => v.secciones.length));
}

// Utilidad para obtener los títulos de sección en orden para alinear
function getSeccionTitles() {
  const allTitles = ventanasEjemplo.flatMap(v => v.secciones.map(s => s.titulo));
  return Array.from(new Set(allTitles));
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
    const seccionTitles = getSeccionTitles();
    return (
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-6xl lg:text-pretty text-center mb-4">
          {t('ventanas.title')}
        </h1>
        <p className="mt-2 mb-8 max-w-2xl text-lg font-medium text-pretty text-gray-600 mx-auto sm:text-xl/8 text-center">
          {t('ventanas.subtitulo')}
        </p>
        <div className="grid md:grid-cols-3 gap-8 w-full">
          {ventanasEjemplo.map((ventana) => (
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
                {seccionTitles.map((titulo, idx) => {
                  const sec = ventana.secciones.find(s => s.titulo === titulo);
                  return (
                    <div key={titulo} className="mb-4 flex-1 flex flex-col">
                      <div className="bg-orange-400 text-white text-center font-semibold py-2 rounded mb-2">{t(`ventanas.secciones.${titulo}`)}</div>
                      {sec ? (
                        <table className="w-full h-full">
                          <tbody>
                            {sec.items.map((item, i) => (
                              <tr key={i} className="border-b last:border-none">
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
  const { nombre, descripcion, imagen, secciones } = props as FichaVentanaProps;
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
export const ventanasEjemplo: FichaVentanaProps[] = [
  {
    nombre: "EcoPrime 700",
    descripcion: "La ventana básica sin extras que la encarezcan.",
    imagen: "/wp-content/uploads/2023/09/veka_70.png.webp",
    secciones: [
      {
        titulo: "Perfileria",
        items: [
          { label: "Marca", value: <a href="https://www.veka.es/"><img src="https://www.veka.es/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/logo-veka.png.webp" width={30} /></a> },
          { label: "Color", value: "Blanco" },
          { label: "Serie", value: <a href="https://www.veka.es/wp-content/uploads/2023/03/catalogo-softline-70-veka-doble-junta-recto-feb-23-esp.pdf">EcoPrime 700</a> },
          { label: "Marco", value: "70 mm" },
          { label: "Triple Junta", value: false, tooltip: "Mejora la hermeticidad" },
          { label: "Transmitancia térmica Uf", value: "1,4 W/m2 K", tooltip: "El número menor es el mayor aislamiento" },
        ]
      },
      {
        titulo: "VIDRIO",
        items: [
          { label: "Marca", value: <a href="https://www.guardiansun.es/"><img src="/wp-content/uploads/2023/09/Guardian_Sun_Logo.png.webp" width={60} /></a> },
          { label: "Cámara", value: "16 mm", tooltip: "Lo que mejor funciona es de mínimo 16 mm" },
          { label: "Triple Vidrio", value: false, tooltip: "Mejora mucho el aislamiento" },
          { label: "Intercalario Warm Edge", value: false, tooltip: "Mejora un 10% el aislamiento" },
          { label: "Tratamiento Térmico", value: false, tooltip: "Mejora mucho el aislamiento" },
          { label: "Tratamiento Solar", value: false, tooltip: "Filtra el calor producido por la radiación solar" },
          { label: "Puertas y balconeras de seguridad", value: false, tooltip: "Evita daños por rotura y accidentes" },
        ]
      },
      {
        titulo: "INSTALACION",
        items: [
          { label: "Espuma de alta densidad", value: false, tooltip: "Mejora el aislamiento entre la ventana y el muro" },
          { label: "Tapajuntas clipado de pvc", value: true, tooltip: "Permite aplicar mejor la espuma, no usamos tapajuntas de aluminio" },
          { label: "Acabados de Paleteria", value: false },
        ]
      },
      {
        titulo: "GARANTIA",
        items: [
          { label: "Sello Aenor del Perfil", value: true },
          { label: "Sello Aenor de la Ventana", value: true, tooltip: "Exclusivo sello aenor de la ventana acabada" },
          { label: "10 años garantia color", value: true },
        ]
      },
    ]
  },
  {
    nombre: "EcoPrime 760",
    descripcion: "Una ventana con eficiencia mejorada.",
    imagen: "/wp-content/uploads/2023/09/veka_70.png.webp",
    secciones: [
      {
        titulo: "Perfileria",
        items: [
          { label: "Marca", value: <a href="https://www.veka.es/"><img src="https://www.veka.es/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/logo-veka.png.webp" width={30} /></a> },
          { label: "Color", value: "Blanco" },
          { label: "Serie", value: <a href="https://www.veka.es/wp-content/uploads/2022/01/catalogo-ventanas-practicables-softline-76-veka.pdf">EcoPrime 760</a> },
          { label: "Marco", value: "76 mm" },
          { label: "Triple Junta", value: true, tooltip: "Mejora la hermeticidad" },
          { label: "Transmitancia térmica Uf", value: "1,1 W/m2 K", tooltip: "El número menor es el mayor aislamiento" },
        ]
      },
      {
        titulo: "VIDRIO",
        items: [
          { label: "Marca", value: <a href="https://www.guardiansun.es/"><img src="/wp-content/uploads/2023/09/Guardian_Sun_Logo.png.webp" width={60} /></a> },
          { label: "Cámara", value: "20 mm", tooltip: "Lo que mejor funciona es de mínimo 16 mm" },
          { label: "Triple Vidrio", value: false, tooltip: "Mejora mucho el aislamiento" },
          { label: "Intercalario Warm Edge", value: false, tooltip: "Mejora un 10% el aislamiento" },
          { label: "Tratamiento Térmico", value: true, tooltip: "Mejora mucho el aislamiento" },
          { label: "Tratamiento Solar", value: false, tooltip: "Filtra el calor producido por la radiación solar" },
          { label: "Puertas y balconeras de seguridad", value: true, tooltip: "Evita daños por rotura y accidentes" },
        ]
      },
      {
        titulo: "INSTALACION",
        items: [
          { label: "Espuma de alta densidad", value: true, tooltip: "Mejora el aislamiento entre la ventana y el muro" },
          { label: "Tapajuntas clipado de pvc", value: true, tooltip: "Permite aplicar mejor la espuma, no usamos tapajuntas de aluminio" },
          { label: "Acabados de Paleteria", value: false },
        ]
      },
      {
        titulo: "GARANTIA",
        items: [
          { label: "Sello Aenor del Perfil", value: true },
          { label: "Sello Aenor de la Ventana", value: true, tooltip: "Exclusivo sello aenor de la ventana acabada" },
          { label: "10 años garantia color", value: true },
        ]
      },
    ]
  },
  {
    nombre: "EcoPrime 820",
    descripcion: "La mejor opción en aislamiento y prestaciones.",
    imagen: "/wp-content/uploads/2024/09/veka_82-1.png",
    secciones: [
      {
        titulo: "Perfileria",
        items: [
          { label: "Marca", value: <a href="https://www.veka.es/"><img src="https://www.veka.es/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/logo-veka.png.webp" width={30} /></a> },
          { label: "Color", value: "Blanco" },
          { label: "Serie", value: <a href="https://www.veka.es/wp-content/uploads/2021/06/SOFTLINE-82_-CAST_web.pdf">EcoPrime 820</a> },
          { label: "Marco", value: "82 mm" },
          { label: "Triple Junta", value: true, tooltip: "Mejora la hermeticidad" },
          { label: "Transmitancia térmica Uf", value: "1,0 W/m2 K", tooltip: "El número menor es el mayor aislamiento" },
        ]
      },
      {
        titulo: "VIDRIO",
        items: [
          { label: "Marca", value: <a href="https://www.guardiansun.es/"><img src="/wp-content/uploads/2023/09/Guardian_Sun_Logo.png.webp" width={60} /></a> },
          { label: "Cámara", value: "20 mm", tooltip: "Lo que mejor funciona es de mínimo 16 mm" },
          { label: "Triple Vidrio", value: true, tooltip: "Mejora mucho el aislamiento" },
          { label: "Intercalario Warm Edge", value: true, tooltip: "Mejora un 10% el aislamiento" },
          { label: "Tratamiento Térmico", value: true, tooltip: "Mejora mucho el aislamiento" },
          { label: "Tratamiento Solar", value: true, tooltip: "Filtra el calor producido por la radiación solar" },
          { label: "Puertas y balconeras de seguridad", value: true, tooltip: "Evita daños por rotura y accidentes" },
        ]
      },
      {
        titulo: "INSTALACION",
        items: [
          { label: "Espuma de alta densidad", value: true, tooltip: "Mejora el aislamiento entre la ventana y el muro" },
          { label: "Tapajuntas clipado de pvc", value: true, tooltip: "Permite aplicar mejor la espuma, no usamos tapajuntas de aluminio" },
          { label: "Acabados de Paleteria", value: false },
        ]
      },
      {
        titulo: "GARANTIA",
        items: [
          { label: "Sello Aenor del Perfil", value: true },
          { label: "Sello Aenor de la Ventana", value: true, tooltip: "Exclusivo sello aenor de la ventana acabada" },
          { label: "10 años garantia color", value: true },
        ]
      },
    ]
  },
];

// --- Tabla comparativa ---
type CamposPorSeccion = Record<string, string[]>;

function getComparativaData() {
  // Recolecta todas las secciones y campos únicos
  const secciones = Array.from(new Set(ventanasEjemplo.flatMap(v => v.secciones.map(s => s.titulo))));
  const camposPorSeccion: CamposPorSeccion = {};
  secciones.forEach((seccion: string) => {
    camposPorSeccion[seccion] = Array.from(new Set(
      ventanasEjemplo.flatMap((v) => {
        const sec = v.secciones.find((s) => s.titulo === seccion);
        return sec ? sec.items.map((i) => i.label) : [];
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

function safeT(t: any, key: string, defaultValue?: string) {
  const result = t(key, defaultValue);
  return typeof result === 'string' ? result : defaultValue || '';
}

function ComparativaVentanas() {
  const { t } = useTranslation();
  const { secciones, camposPorSeccion } = getComparativaData();
  const nombres = ventanasEjemplo.map((v) => v.nombre);

  return (
    <div className="mx-auto max-w-2xl px-2 pt-8 sm:pt-12 lg:max-w-7xl lg:px-8">
      <div className="w-full">
        <table className="w-full text-left border rounded-xl overflow-hidden bg-white shadow text-xs sm:text-sm">
          <caption className="sr-only">Comparativa de ventanas</caption>
          <colgroup>
            <col className="w-2/5 sm:w-2/5" />
            {nombres.map((n, i) => <col key={i} className="w-1/5 sm:w-1/5" />)}
          </colgroup>
          <thead>
            <tr>
              <td className="p-0" />
              {ventanasEjemplo.map((ventana) => (
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
                  {ventanasEjemplo.map((ventana) => (
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