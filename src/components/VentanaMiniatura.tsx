import React, { useEffect, useRef, useMemo, useState } from 'react';
import VentanaModal from './VentanaModal';

type TipoVentana = 'corredera' | 'oscilobatiente' | 'practicable';
type ManoVentana = 'derecha' | 'izquierda';

interface VentanaMiniaturaProps {
  ancho: number;
  alto: number;
  tipo: TipoVentana;
  mano?: ManoVentana;
  referencia?: string;
  className?: string;
  animar?: boolean;
  precio?: number;
  opciones?: Array<{
    id: string;
    nombre: string;
    descripcion?: string;
    precio?: number;
    activa?: boolean;
  }>;
  onOpcionesChange?: (opciones: Array<{
    id: string;
    nombre: string;
    descripcion?: string;
    precio?: number;
    activa?: boolean;
  }>) => void;
  onAceptar?: () => void;
  isModal?: boolean;
}

// Hook personalizado para manejar el canvas
const useVentanaCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  props: Pick<VentanaMiniaturaProps, 'ancho' | 'alto' | 'tipo' | 'mano' | 'referencia' | 'animar' | 'opciones'>
) => {
  const { ancho, alto, tipo, mano = 'derecha', referencia, animar = false, opciones = [] } = props;
  const [porcentajeApertura, setPorcentajeApertura] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Memoizamos los cálculos de escala y posición
  const { escala, x, y } = useMemo(() => {
    const escala = Math.min(
      (200 - 40) / ancho,
      (150 - 40) / alto
    ) * 0.8;
    
    return {
      escala,
      x: (200 - ancho * escala) / 2,
      y: (150 - alto * escala) / 2
    };
  }, [ancho, alto]);

  // Efecto para la animación
  useEffect(() => {
    if (!isHovered) {
      setPorcentajeApertura(0);
      return;
    }

    const duracion = 2000; // 2 segundos
    const inicio = Date.now();
    
    const animarVentana = () => {
      const ahora = Date.now();
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      setPorcentajeApertura(progreso * 100);
      
      if (progreso < 1) {
        requestAnimationFrame(animarVentana);
      }
    };

    const animacionId = requestAnimationFrame(animarVentana);
    return () => cancelAnimationFrame(animacionId);
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar marco
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, ancho * escala, alto * escala);

    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 10, y + 10, ancho * escala - 20, alto * escala - 20);

    // Dibujar tipo específico de ventana con animación
    switch (tipo) {
      case 'corredera':
        dibujarCorredera(ctx, x, y, ancho * escala, alto * escala, porcentajeApertura);
        break;
      case 'oscilobatiente':
        dibujarOscilobatiente(ctx, x, y, ancho * escala, alto * escala, mano, porcentajeApertura);
        break;
      default:
        dibujarPracticable(ctx, x, y, ancho * escala, alto * escala, mano, porcentajeApertura);
    }

    // Dibujar opciones si existen
    if (opciones && opciones.length > 0) {
      dibujarOpciones(ctx, x, y, ancho * escala, alto * escala, opciones);
    }

    // Dibujar referencia si existe
    if (referencia) {
      ctx.font = '12px Arial';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText(referencia, canvas.width / 2, canvas.height - 10);
    }
  }, [ancho, alto, tipo, mano, referencia, escala, x, y, porcentajeApertura, opciones]);

  return {
    porcentajeApertura,
    setIsHovered
  };
};

// Componente memoizado para evitar re-renders innecesarios
const VentanaMiniatura: React.FC<VentanaMiniaturaProps> = React.memo(({
  ancho,
  alto,
  tipo,
  mano = 'derecha',
  referencia,
  className = '',
  animar = false,
  precio = 0,
  opciones = [],
  onOpcionesChange,
  onAceptar,
  isModal = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { porcentajeApertura, setIsHovered } = useVentanaCanvas(canvasRef, { 
    ancho, 
    alto, 
    tipo, 
    mano, 
    referencia, 
    animar,
    opciones 
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!isModal) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        className={`relative group ${isModal ? '' : 'cursor-pointer'} ${className}`}
        onMouseEnter={() => animar && setIsHovered(true)}
        onMouseLeave={() => animar && setIsHovered(false)}
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          width={200}
          height={150}
          className={`border border-gray-200 rounded-lg transition-all duration-300 
            ${animar ? 'group-hover:scale-105 group-hover:shadow-lg' : ''}`}
          aria-label={`Ventana ${tipo} ${ancho}x${alto}cm`}
        />
        {animar && (
          <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs text-center rounded">
            {tipo === 'corredera' ? 'Deslizante' : 
             tipo === 'oscilobatiente' ? 'Oscilobatiente' : 
             'Practicable'}
          </div>
        )}
      </div>

      {!isModal && (
        <VentanaModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ventana={{
            ancho,
            alto,
            tipo,
            mano,
            referencia,
            material: 'PVC',
            color: 'Blanco',
            cristal: 'Doble acristalamiento',
            precio: precio,
            opciones: opciones
          }}
          onOpcionesChange={onOpcionesChange}
          onAceptar={onAceptar}
        />
      )}
    </>
  );
});

VentanaMiniatura.displayName = 'VentanaMiniatura';

// Funciones auxiliares de dibujo actualizadas con animación
const dibujarPracticable = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  ancho: number,
  alto: number,
  mano: ManoVentana,
  porcentajeApertura: number
) => {
  // Dibujar marco exterior
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, ancho, alto);

  // Dibujar marco interior
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 10, y + 10, ancho - 20, alto - 20);

  // Calcular posición de la bisagra
  const xBisagra = mano === 'derecha' ? x + 15 : x + ancho - 15;
  
  // Dibujar bisagras
  ctx.beginPath();
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.moveTo(xBisagra, y + alto * 0.2);
  ctx.lineTo(xBisagra, y + alto * 0.3);
  ctx.moveTo(xBisagra, y + alto * 0.7);
  ctx.lineTo(xBisagra, y + alto * 0.8);
  ctx.stroke();

  // Dibujar hoja en movimiento
  ctx.save();
  ctx.translate(xBisagra, y + alto / 2);
  const anguloApertura = (porcentajeApertura / 100) * Math.PI * 0.72;
  ctx.rotate(mano === 'derecha' ? -anguloApertura : anguloApertura);

  // Ajustar el tamaño de la hoja para que coincida con el marco interior
  const anchoHoja = ancho - 20;
  const altoHoja = alto - 20;

  // Dibujar hoja con perspectiva
  ctx.beginPath();
  ctx.strokeStyle = '#4CAF50';
  ctx.lineWidth = 3;
  
  if (mano === 'derecha') {
    // Contorno de la hoja con perspectiva
    ctx.moveTo(0, -altoHoja / 2);
    ctx.lineTo(anchoHoja - 15, -altoHoja / 2);
    ctx.lineTo(anchoHoja - 15, altoHoja / 2);
    ctx.lineTo(0, altoHoja / 2);
    ctx.lineTo(0, -altoHoja / 2);

    // Líneas de profundidad
    ctx.moveTo(0, -altoHoja / 2);
    ctx.lineTo((anchoHoja - 15) * 0.8, -altoHoja / 2 * 0.8);
    ctx.moveTo(0, altoHoja / 2);
    ctx.lineTo((anchoHoja - 15) * 0.8, altoHoja / 2 * 0.8);
  } else {
    // Contorno de la hoja con perspectiva
    ctx.moveTo(0, -altoHoja / 2);
    ctx.lineTo(-(anchoHoja - 15), -altoHoja / 2);
    ctx.lineTo(-(anchoHoja - 15), altoHoja / 2);
    ctx.lineTo(0, altoHoja / 2);
    ctx.lineTo(0, -altoHoja / 2);

    // Líneas de profundidad
    ctx.moveTo(0, -altoHoja / 2);
    ctx.lineTo(-(anchoHoja - 15) * 0.8, -altoHoja / 2 * 0.8);
    ctx.moveTo(0, altoHoja / 2);
    ctx.lineTo(-(anchoHoja - 15) * 0.8, altoHoja / 2 * 0.8);
  }
  ctx.stroke();
  ctx.restore();
};

const dibujarCorredera = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  ancho: number,
  alto: number,
  porcentajeApertura: number
) => {
  // Dibujar marco exterior
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, ancho, alto);

  // Dibujar marco interior
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 10, y + 10, ancho - 20, alto - 20);

  // Calcular desplazamiento
  const desplazamiento = (porcentajeApertura / 100) * (ancho / 2);

  // Dibujar hoja en movimiento
  ctx.beginPath();
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 4;
  
  // Dibujar hoja completa
  ctx.moveTo(x + ancho / 2 + desplazamiento, y);
  ctx.lineTo(x + ancho / 2 + desplazamiento, y + alto);
  ctx.stroke();

  // Dibujar flechas
  const flecha = 20;
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 2;

  // Flecha izquierda
  ctx.beginPath();
  ctx.moveTo(x + ancho / 4 + flecha, y + alto / 2);
  ctx.lineTo(x + ancho / 4 - flecha, y + alto / 2);
  ctx.lineTo(x + ancho / 4 - flecha / 2, y + alto / 2 - flecha / 2);
  ctx.moveTo(x + ancho / 4 - flecha, y + alto / 2);
  ctx.lineTo(x + ancho / 4 - flecha / 2, y + alto / 2 + flecha / 2);
  ctx.stroke();

  // Flecha derecha
  ctx.beginPath();
  ctx.moveTo(x + (3 * ancho) / 4 - flecha + desplazamiento, y + alto / 2);
  ctx.lineTo(x + (3 * ancho) / 4 + flecha + desplazamiento, y + alto / 2);
  ctx.lineTo(x + (3 * ancho) / 4 + flecha / 2 + desplazamiento, y + alto / 2 - flecha / 2);
  ctx.moveTo(x + (3 * ancho) / 4 + flecha + desplazamiento, y + alto / 2);
  ctx.lineTo(x + (3 * ancho) / 4 + flecha / 2 + desplazamiento, y + alto / 2 + flecha / 2);
  ctx.stroke();
};

const dibujarOscilobatiente = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  ancho: number,
  alto: number,
  mano: ManoVentana,
  porcentajeApertura: number
) => {
  // Dibujar marco exterior
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, ancho, alto);

  // Dibujar marco interior
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 10, y + 10, ancho - 20, alto - 20);

  // Dibujar hoja en movimiento
  ctx.save();
  ctx.translate(x + ancho/2, y + alto - 6);
  const anguloApertura = (porcentajeApertura / 100) * Math.PI * 0.2;
  ctx.rotate(-anguloApertura);

  // Ajustar el tamaño de la hoja para que coincida con el marco interior
  const anchoHoja = ancho - 20;
  const altoHoja = alto - 20;

  // Dibujar hoja con perspectiva
  ctx.beginPath();
  ctx.strokeStyle = '#4CAF50';
  ctx.lineWidth = 3;
  
  // Contorno de la hoja con perspectiva
  ctx.moveTo(-anchoHoja/2, 0);
  ctx.lineTo(anchoHoja/2, 0);
  ctx.lineTo(anchoHoja/2, -altoHoja);
  ctx.lineTo(-anchoHoja/2, -altoHoja);
  ctx.lineTo(-anchoHoja/2, 0);

  // Líneas de profundidad
  ctx.moveTo(-anchoHoja/2, 0);
  ctx.lineTo(-anchoHoja/2 * 0.8, -altoHoja * 0.8);
  ctx.moveTo(anchoHoja/2, 0);
  ctx.lineTo(anchoHoja/2 * 0.8, -altoHoja * 0.8);

  // Líneas de oscilación con perspectiva
  ctx.moveTo(-anchoHoja/2, 0);
  ctx.lineTo(-anchoHoja/2 * 0.5, -altoHoja * 0.5);
  ctx.moveTo(anchoHoja/2, 0);
  ctx.lineTo(anchoHoja/2 * 0.5, -altoHoja * 0.5);
  
  ctx.stroke();
  ctx.restore();

  // Dibujar bisagra inferior
  ctx.fillStyle = '#333';
  ctx.fillRect(x + ancho/2 - 30, y + alto - 6, 60, 12);
};

const dibujarOpciones = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  ancho: number,
  alto: number,
  opciones: Array<{
    id: string;
    nombre: string;
    descripcion?: string;
    precio?: number;
  }>
) => {
  console.log('Dibujando opciones:', opciones);
  if (!opciones || opciones.length === 0) return;

  // Dibujar indicador de opciones
  ctx.save();
  ctx.strokeStyle = '#4CAF50';
  ctx.lineWidth = 2;
  
  // Dibujar un círculo en la esquina superior derecha
  const radio = 8;
  const centroX = x + ancho - radio - 5;
  const centroY = y + radio + 5;
  
  ctx.beginPath();
  ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
  ctx.stroke();
  
  // Dibujar el número de opciones
  ctx.fillStyle = '#4CAF50';
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(opciones.length.toString(), centroX, centroY);
  
  ctx.restore();
};

export default VentanaMiniatura; 