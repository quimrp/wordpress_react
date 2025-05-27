import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import VentanaMiniatura from "./VentanaMiniatura";
import VentanaModal from "./VentanaModal";
dayjs.extend(duration);

interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
}

interface LineaPresupuesto {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
  opciones?: OpcionLinea[];
  ancho?: number;
  alto?: number;
  tipo?: 'corredera' | 'oscilobatiente' | 'practicable';
  mano?: 'derecha' | 'izquierda';
}

interface OpcionLinea {
  nombre: string;
  valor: number;
  activo: boolean;
}

interface Presupuesto {
  id: string;
  cliente: Cliente;
  estado: "pendiente" | "entregado" | "aceptado" | "denegado";
  fechaCreacion: string;
  fechaCaducidad: string;
  lineas: LineaPresupuesto[];
  totalPresupuesto: number;
}

const presupuestoEjemplo: Presupuesto = {
  id: "presup-001",
  cliente: {
    nombre: "Joan Pérez",
    email: "joanperez@example.com",
    telefono: "+34 600 123 456"
  },
  estado: "pendiente",
  fechaCreacion: "2025-05-25",
  fechaCaducidad: "2025-06-25",
  lineas: [
    {
      descripcion: "Ventana aluminio blanco 120x120 cm con doble cristal",
      cantidad: 2,
      precioUnitario: 320,
      total: 640,
      ancho: 120,
      alto: 120,
      tipo: 'practicable',
      mano: 'derecha'
    },
    {
      descripcion: "Ventana corredera aluminio gris 150x100 cm con persiana integrada",
      cantidad: 1,
      precioUnitario: 480,
      total: 480,
      ancho: 150,
      alto: 100,
      tipo: 'corredera'
    },
    {
      descripcion: "Ventanal fijo PVC blanco 200x150 cm con triple acristalamiento",
      cantidad: 1,
      precioUnitario: 650,
      total: 650,
      ancho: 200,
      alto: 150,
      tipo: 'practicable',
      mano: 'izquierda',
      opciones: [
        { nombre: "Vidrio bajo emisivo", valor: 80, activo: false }
      ]
    },
    {
      descripcion: "Ventana oscilobatiente aluminio negro 100x100 cm con rotura puente térmico",
      cantidad: 3,
      precioUnitario: 375,
      total: 1125,
      ancho: 100,
      alto: 100,
      tipo: 'oscilobatiente',
      mano: 'derecha'
    },
    {
      descripcion: "Retirada y gestión de residuos de ventanas antiguas",
      cantidad: 1,
      precioUnitario: 150,
      total: 150
    }
  ],
  totalPresupuesto: 3045
};

const estadoColor: Record<Presupuesto["estado"], string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  entregado: "bg-blue-100 text-blue-800",
  aceptado: "bg-green-100 text-green-800",
  denegado: "bg-red-100 text-red-800"
};

// Componente Switch tipo iOS/Material
const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 ${checked ? 'bg-orange-500' : 'bg-gray-300'}`}
    aria-pressed={checked}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
    />
  </button>
);

// Countdown visual corporativo
const Countdown = ({ fechaCaducidad }: { fechaCaducidad: string }) => {
  const [countDownTime, setCountDownTime] = React.useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  React.useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs();
      const end = dayjs(fechaCaducidad);
      const diff = end.diff(now);
      if (diff <= 0) {
        setCountDownTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const dur = dayjs.duration(diff);
      setCountDownTime({
        days: String(Math.floor(dur.asDays())).padStart(2, '0'),
        hours: String(dur.hours()).padStart(2, '0'),
        minutes: String(dur.minutes()).padStart(2, '0'),
        seconds: String(dur.seconds()).padStart(2, '0'),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [fechaCaducidad]);

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <span className="text-base sm:text-lg font-semibold text-black text-center tracking-widest px-2 mb-2">
        Esta oferta caduca en:
      </span>
      <span className="text-2xl sm:text-3xl font-semibold text-white text-center tracking-widest px-2 mb-6">
        ¡Aprovecha tu oferta antes de que expire!
      </span>
      <div className="flex justify-center gap-3 sm:gap-8">
        {[
          { label: 'días', value: countDownTime.days },
          { label: 'horas', value: countDownTime.hours },
          { label: 'min', value: countDownTime.minutes },
          { label: 'seg', value: countDownTime.seconds },
        ].map((item, idx) => (
          <div key={item.label} className="flex flex-col gap-2 items-center">
            <div className="h-16 w-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex justify-center items-center bg-black rounded-lg shadow-xl">
              <span className="lg:text-6xl sm:text-5xl text-3xl font-extrabold text-orange-500 tabular-nums">
                {item.value}
              </span>
            </div>
            <span className="text-orange-400 text-xs sm:text-lg text-center uppercase font-semibold tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PresupuestoView: React.FC = () => {
  const [presupuesto, setPresupuesto] = React.useState<Presupuesto>(presupuestoEjemplo);
  const [modalAbierto, setModalAbierto] = React.useState<number | null>(null);

  // Actualizar opción de línea
  const handleToggleOpcion = (lineaIdx: number, opcionIdx: number) => {
    setPresupuesto(prev => {
      const nuevasLineas = prev.lineas.map((linea, i) => {
        if (i !== lineaIdx) return linea;
        if (!linea.opciones) return linea;
        
        const nuevasOpciones = linea.opciones.map((op, j) =>
          j === opcionIdx ? { ...op, activo: !op.activo } : op
        );
        
        // Calcular nuevo precio unitario
        const precioBase = linea.precioUnitario;
        const opcionesActivas = nuevasOpciones.filter(o => o.activo);
        const precioOpciones = opcionesActivas.reduce((sum, o) => sum + o.valor, 0);
        const nuevoPrecioUnitario = precioBase + precioOpciones;
        
        return {
          ...linea,
          opciones: nuevasOpciones,
          precioUnitario: nuevoPrecioUnitario,
          total: nuevoPrecioUnitario * linea.cantidad
        };
      });
      
      // Recalcular total presupuesto
      const nuevoTotal = nuevasLineas.reduce((sum, l) => sum + l.total, 0);
      
      return { 
        ...prev, 
        lineas: nuevasLineas, 
        totalPresupuesto: nuevoTotal 
      };
    });
  };

  // Calcular IVA y total con IVA
  const IVA_PORCENTAJE = 0.21;
  const iva = presupuesto.totalPresupuesto * IVA_PORCENTAJE;
  const totalConIva = presupuesto.totalPresupuesto + iva;

  return (
    <div className="max-w-7xl mx-auto my-8 px-4 lg:px-12 py-10 bg-white shadow-2xl rounded-lg font-sans">
      <Countdown fechaCaducidad={presupuesto.fechaCaducidad} />
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-1 text-center">
          Presupuesto #{presupuesto.id}
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-black rounded px-4 py-2 flex items-center">
            <span className="text-xs text-white mr-2">Caduca en</span>
            <span className="text-3xl font-bold text-orange-500 tabular-nums">{presupuesto.fechaCaducidad}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Cliente:</span>{" "}
            {presupuesto.cliente.nombre}
          </p>
          <p>
            <span className="font-medium text-gray-800">Email:</span>{" "}
            {presupuesto.cliente.email}
          </p>
          <p>
            <span className="font-medium text-gray-800">Teléfono:</span>{" "}
            {presupuesto.cliente.telefono}
          </p>
          <p>
            <span className="font-medium text-gray-800">Creado:</span>{" "}
            {presupuesto.fechaCreacion}
          </p>
          <p>
            <span className="font-medium text-gray-800">Caduca:</span>{" "}
            {presupuesto.fechaCaducidad}
          </p>
          <span
            className={`inline-block rounded-full px-3 py-1 font-semibold text-xs ${estadoColor[presupuesto.estado]}`}
          >
            {presupuesto.estado.toUpperCase()}
          </span>
        </div>
      </header>

      <table className="w-full table-auto border-collapse text-gray-700">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-600 text-sm uppercase tracking-wide">
            <th className="p-3 border-b border-gray-200">Descripción</th>
            <th className="p-3 border-b border-gray-200 text-right w-20 min-w-[60px]">Cantidad</th>
            <th className="p-3 border-b border-gray-200 text-right w-32 min-w-[110px]">Precio unitario</th>
            <th className="p-3 border-b border-gray-200 text-right w-32 min-w-[110px]">Total</th>
          </tr>
        </thead>
        <tbody>
          {presupuesto.lineas.map((linea, i) => (
            <React.Fragment key={i}>
              <tr className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 align-top w-auto max-w-xs">
                  <div className="flex items-start gap-4">
                    {linea.ancho && linea.alto && linea.tipo && (
                      <div className="flex-shrink-0">
                        <VentanaMiniatura
                          data-ventana-id={i}
                          ancho={linea.ancho}
                          alto={linea.alto}
                          tipo={linea.tipo}
                          mano={linea.mano}
                          referencia={`${linea.ancho}x${linea.alto}`}
                          animar={true}
                          precio={linea.precioUnitario}
                          opciones={linea.opciones?.map(op => ({
                            id: op.nombre,
                            nombre: op.nombre,
                            precio: op.valor,
                            activa: op.activo
                          }))}
                          onOpcionesChange={(nuevasOpciones) => {
                            setPresupuesto(prev => {
                              const nuevasLineas = prev.lineas.map((l, idx) => {
                                if (idx !== i) return l;
                                return {
                                  ...l,
                                  opciones: nuevasOpciones.map(op => ({
                                    nombre: op.nombre,
                                    valor: op.precio || 0,
                                    activo: op.activa || false
                                  }))
                                };
                              });
                              return {
                                ...prev,
                                lineas: nuevasLineas
                              };
                            });
                          }}
                          onAceptar={() => {
                            console.log('Cambios aceptados para la línea', i);
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <span>{linea.descripcion}</span>
                      </div>
                      {linea.opciones && linea.opciones.length > 0 && (
                        <div className="mt-2 space-y-1 text-xs">
                          {linea.opciones.map((op, j) => (
                            <label key={j} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                              <Switch checked={op.activo} onChange={() => handleToggleOpcion(i, j)} />
                              <span>{op.nombre} <span className="text-orange-500 font-semibold">+€{op.valor}</span> <span className="text-xs text-gray-400">/unidad</span></span>
                            </label>
                          ))}
                        </div>
                      )}
                      {linea.ancho && linea.alto && linea.tipo && (
                        <button
                          onClick={() => setModalAbierto(i)}
                          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar ventana
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-3 text-right w-20 min-w-[60px]">{linea.cantidad}</td>
                <td className="p-3 text-right w-32 min-w-[110px]">€ {(linea.precioUnitario + (linea.opciones ? linea.opciones.filter(o => o.activo).reduce((acc, o) => acc + o.valor, 0) : 0)).toFixed(2)}</td>
                <td className="p-3 text-right w-32 min-w-[110px] font-semibold">
                  € {((linea.precioUnitario + (linea.opciones ? linea.opciones.filter(o => o.activo).reduce((acc, o) => acc + o.valor, 0) : 0)) * linea.cantidad).toFixed(2)}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-gray-200 font-semibold text-black text-lg">
            <td colSpan={3} className="p-3 text-right bg-white">
              Total presupuesto
            </td>
            <td className="p-3 text-right bg-white">€ {presupuesto.totalPresupuesto.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      {/* Bloque minimalista de desglose IVA y total */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end">
        <div className="flex-1 sm:flex-none sm:w-64 bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center">
          <div className="mb-1 text-gray-500 font-medium uppercase tracking-wider text-xs">IVA (21%)</div>
          <div className="text-xl font-bold text-black">€ {iva.toFixed(2)}</div>
        </div>
        <div className="flex-1 sm:flex-none sm:w-64 bg-black border-2 border-black rounded-lg p-5 flex flex-col items-center">
          <div className="mb-1 text-white font-semibold uppercase tracking-wider text-xs">Total con IVA</div>
          <div className="text-2xl font-extrabold text-white tracking-wide">€ {totalConIva.toFixed(2)}</div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow transition-colors duration-200"
        >
          Aceptar oferta
        </button>
      </div>

      {/* Modal */}
      {modalAbierto !== null && presupuesto.lineas[modalAbierto] && (
        <VentanaModal
          isOpen={true}
          onClose={() => setModalAbierto(null)}
          ventana={{
            ancho: presupuesto.lineas[modalAbierto].ancho!,
            alto: presupuesto.lineas[modalAbierto].alto!,
            tipo: presupuesto.lineas[modalAbierto].tipo!,
            mano: presupuesto.lineas[modalAbierto].mano,
            referencia: `${presupuesto.lineas[modalAbierto].ancho}x${presupuesto.lineas[modalAbierto].alto}`,
            material: 'PVC',
            color: 'Blanco',
            cristal: 'Doble acristalamiento',
            precio: presupuesto.lineas[modalAbierto].precioUnitario,
            opciones: presupuesto.lineas[modalAbierto].opciones?.map(op => ({
              id: op.nombre,
              nombre: op.nombre,
              precio: op.valor,
              activa: op.activo
            }))
          }}
          onOpcionesChange={(nuevasOpciones) => {
            setPresupuesto(prev => {
              const nuevasLineas = prev.lineas.map((l, idx) => {
                if (idx !== modalAbierto) return l;
                return {
                  ...l,
                  opciones: nuevasOpciones.map(op => ({
                    nombre: op.nombre,
                    valor: op.precio || 0,
                    activo: op.activa || false
                  }))
                };
              });
              return {
                ...prev,
                lineas: nuevasLineas
              };
            });
          }}
          onAceptar={() => {
            setModalAbierto(null);
          }}
        />
      )}
    </div>
  );
};

export default PresupuestoView;
