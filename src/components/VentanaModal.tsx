import React, { useState, useEffect } from 'react';
import VentanaMiniatura from './VentanaMiniatura';

interface OpcionVentana {
  id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  activa?: boolean;
}

interface VentanaModalProps {
  isOpen: boolean;
  onClose: () => void;
  ventana: {
    ancho: number;
    alto: number;
    tipo: 'corredera' | 'oscilobatiente' | 'practicable';
    mano?: 'derecha' | 'izquierda';
    referencia?: string;
    material?: string;
    color?: string;
    cristal?: string;
    precio?: number;
    opciones?: OpcionVentana[];
  };
  onOpcionesChange?: (opciones: OpcionVentana[]) => void;
  onAceptar?: () => void;
}

const VentanaModal: React.FC<VentanaModalProps> = ({ 
  isOpen, 
  onClose, 
  ventana,
  onOpcionesChange,
  onAceptar 
}) => {
  const [opcionesActivas, setOpcionesActivas] = useState<Set<string>>(new Set());
  const [hasChanges, setHasChanges] = useState(false);

  // Inicializar opciones activas cuando se abre el modal
  useEffect(() => {
    if (isOpen && ventana.opciones) {
      const opcionesIniciales = new Set(
        ventana.opciones
          .filter(opcion => opcion.activa)
          .map(opcion => opcion.id)
      );
      setOpcionesActivas(opcionesIniciales);
      setHasChanges(false);
    }
  }, [isOpen, ventana.opciones]);

  if (!isOpen) return null;

  const toggleOpcion = (id: string) => {
    const nuevasOpciones = new Set(opcionesActivas);
    if (nuevasOpciones.has(id)) {
      nuevasOpciones.delete(id);
    } else {
      nuevasOpciones.add(id);
    }
    setOpcionesActivas(nuevasOpciones);
    setHasChanges(true);

    // Actualizar las opciones en el presupuesto
    if (onOpcionesChange && ventana.opciones) {
      const opcionesActualizadas = ventana.opciones.map(opcion => ({
        ...opcion,
        activa: nuevasOpciones.has(opcion.id)
      }));
      onOpcionesChange(opcionesActualizadas);
    }
  };

  const handleAceptar = () => {
    if (onAceptar) {
      onAceptar();
    }
    onClose();
  };

  // Calcular precio total incluyendo solo las opciones activas
  const precioTotal = ventana.precio 
    ? ventana.precio + (ventana.opciones?.reduce((sum, opcion) => 
        opcionesActivas.has(opcion.id) ? sum + (opcion.precio || 0) : sum, 0) || 0)
    : undefined;

  // Depuración
  console.log('Opciones activas:', Array.from(opcionesActivas));
  console.log('Opciones filtradas:', ventana.opciones?.filter(opcion => opcionesActivas.has(opcion.id)));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Vista Previa de Ventana
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vista previa de la ventana */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <VentanaMiniatura
                ancho={ventana.ancho}
                alto={ventana.alto}
                tipo={ventana.tipo}
                mano={ventana.mano}
                referencia={ventana.referencia}
                animar={true}
                opciones={ventana.opciones?.filter(opcion => opcionesActivas.has(opcion.id))}
              />
            </div>
          </div>

          {/* Características de la ventana */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dimensiones</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {ventana.ancho} x {ventana.alto} cm
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
                <p className="mt-1 text-lg text-gray-900 capitalize">
                  {ventana.tipo}
                </p>
              </div>
              {ventana.mano && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Mano</h3>
                  <p className="mt-1 text-lg text-gray-900 capitalize">
                    {ventana.mano}
                  </p>
                </div>
              )}
              {ventana.referencia && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Referencia</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {ventana.referencia}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-4">
                {ventana.material && (
                  <div>
                    <h4 className="text-sm text-gray-500">Material</h4>
                    <p className="mt-1 text-gray-900">{ventana.material}</p>
                  </div>
                )}
                {ventana.color && (
                  <div>
                    <h4 className="text-sm text-gray-500">Color</h4>
                    <p className="mt-1 text-gray-900">{ventana.color}</p>
                  </div>
                )}
                {ventana.cristal && (
                  <div>
                    <h4 className="text-sm text-gray-500">Cristal</h4>
                    <p className="mt-1 text-gray-900">{ventana.cristal}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sección de opciones con switches */}
            {ventana.opciones && ventana.opciones.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Opciones Disponibles</h3>
                <div className="space-y-3">
                  {ventana.opciones.map((opcion) => (
                    <div key={opcion.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleOpcion(opcion.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                              ${opcionesActivas.has(opcion.id) ? 'bg-blue-600' : 'bg-gray-200'}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                ${opcionesActivas.has(opcion.id) ? 'translate-x-6' : 'translate-x-1'}`}
                            />
                          </button>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{opcion.nombre}</p>
                            {opcion.descripcion && (
                              <p className="text-xs text-gray-500">{opcion.descripcion}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      {opcion.precio && (
                        <p className="text-sm font-medium text-gray-900 ml-4">
                          {opcion.precio.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Precio total */}
            {precioTotal && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Precio Base</h3>
                  <p className="text-gray-900">
                    {ventana.precio?.toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </p>
                </div>
                {ventana.opciones && ventana.opciones.length > 0 && (
                  <div className="flex justify-between items-center mt-2">
                    <h3 className="text-sm font-medium text-gray-500">Opciones Seleccionadas</h3>
                    <p className="text-gray-900">
                      {(ventana.opciones.reduce((sum, opcion) => 
                        opcionesActivas.has(opcion.id) ? sum + (opcion.precio || 0) : sum, 0))
                        .toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Total</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {precioTotal.toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={handleAceptar}
            className={`px-4 py-2 rounded-md transition-colors ${
              hasChanges 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasChanges}
          >
            Aceptar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default VentanaModal; 