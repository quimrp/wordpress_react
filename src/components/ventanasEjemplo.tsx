import React from 'react';
import { useTranslation } from 'react-i18next';

export const ventanasEjemplo = () => {
  const { t } = useTranslation();
  return [
    {
      nombre: "EcoPrime 700",
      descripcion: "La ventana básica sin extras que la encarezcan.",
      imagen: "/wp-content/uploads/2023/09/veka_70.png.webp",
      secciones: [
        {
          titulo: "Perfileria",
          items: [
            { label: "Marca", value: (
              <span className="flex justify-center items-center h-full">
                <a href="https://www.veka.es/">
                  <img width={30} src="https://www.veka.es/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/logo-veka.png.webp" />
                </a>
              </span>
            ) },
            { label: "Color", value: t('ventanas.colores.blanco', 'Blanco') },
            { label: "Serie", value: <a href="https://www.veka.es/wp-content/uploads/2023/03/catalogo-softline-70-veka-doble-junta-recto-feb-23-esp.pdf">EcoPrime 700</a> },
            { label: "Marco", value: "70 mm" },
            { label: "Triple Junta", value: false, tooltip: "Mejora la hermeticidad" },
            { label: "Transmitancia térmica Uf", value: "1,4 W/m2 K", tooltip: "El número menor es el mayor aislamiento" },
          ]
        },
        {
          titulo: "VIDRIO",
          items: [
            { label: "Marca", value: (
              <span className="flex justify-center items-center h-full">
                <a href="https://www.guardiansun.es/">
                  <img src="/wp-content/uploads/2023/09/Guardian_Sun_Logo.png.webp" width={60} />
                </a>
              </span>
            ) },
            { label: "Cámara", value: (
              <span className="flex items-center justify-center h-[60px]">
                16 mm
              </span>
            ), tooltip: "Lo que mejor funciona es de mínimo 16 mm" },
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
            { label: "Marca", value: (
              <span className="flex justify-center items-center h-full">
                <a href="https://www.veka.es/">
                  <img width={30} src="https://www.veka.es/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/logo-veka.png.webp" />
                </a>
              </span>
            ) },
            { label: "Color", value: t('ventanas.colores.blanco', 'Blanco') },
            { label: "Serie", value: <a href="https://www.veka.es/wp-content/uploads/2022/01/catalogo-ventanas-practicables-softline-76-veka.pdf">EcoPrime 760</a> },
            { label: "Marco", value: "76 mm" },
            { label: "Triple Junta", value: true, tooltip: "Mejora la hermeticidad" },
            { label: "Transmitancia térmica Uf", value: "1,1 W/m2 K", tooltip: "El número menor es el mayor aislamiento" },
          ]
        },
        {
          titulo: "VIDRIO",
          items: [
            { label: "Marca", value: (
              <span className="flex justify-center items-center h-full">
                <a href="https://www.guardiansun.es/">
                  <img src="/wp-content/uploads/2023/09/Guardian_Sun_Logo.png.webp" width={60} />
                </a>
              </span>
            ) },
            { label: "Cámara", value: (
              <span className="flex items-center justify-center h-[60px]">
                20 mm
              </span>
            ), tooltip: "Lo que mejor funciona es de mínimo 16 mm" },
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
            { label: "Marca", value: (
              <span className="flex justify-center items-center h-full">
                <a href="https://www.veka.es/">
                  <img width={30} src="https://www.veka.es/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/03/logo-veka.png.webp" />
                </a>
              </span>
            ) },
            { label: "Color", value: t('ventanas.colores.blanco', 'Blanco') },
            { label: "Serie", value: <a href="https://www.veka.es/wp-content/uploads/2021/06/SOFTLINE-82_-CAST_web.pdf">EcoPrime 820</a> },
            { label: "Marco", value: "82 mm" },
            { label: "Triple Junta", value: true, tooltip: "Mejora la hermeticidad" },
            { label: "Transmitancia térmica Uf", value: "1,0 W/m2 K", tooltip: "El número menor es el mayor aislamiento" },
          ]
        },
        {
          titulo: "VIDRIO",
          items: [
            { label: "Marca", value: (
              <span className="flex justify-center items-center h-full">
                <a href="https://www.guardiansun.es/">
                  <img src="/wp-content/uploads/2023/09/Guardian_Sun_Logo.png.webp" width={60} />
                </a>
              </span>
            ) },
            { label: "Cámara", value: (
              <span className="flex items-center justify-center h-[60px]">
                 2 X 16 mm
              </span>
            ), tooltip: "Lo que mejor funciona es de mínimo 16 mm" },
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
};
