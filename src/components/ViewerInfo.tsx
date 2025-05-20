import { useQuery } from '@apollo/client';
import { GET_VIEWER } from '../graphql/queries';

export const ViewerInfo = () => {
  const { loading, error, data } = useQuery(GET_VIEWER);

  if (loading) return <div>Cargando información del usuario...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="viewer-info">
      <h2>Usuario Autenticado</h2>
      <p>ID: {data.viewer.id}</p>
      <p>Nombre: {data.viewer.name}</p>
    </div>
  );
}; 