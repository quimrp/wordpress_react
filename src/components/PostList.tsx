import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  author: {
    node: {
      name: string;
    };
  };
}

export const PostList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    console.error('Error completo:', error);
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
        {error.networkError && (
          <div className="mt-2 text-sm">
            <p>Detalles del error de red:</p>
            <pre className="mt-1 bg-red-50 p-2 rounded">
              {JSON.stringify(error.networkError, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (!data?.posts?.nodes?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No hay posts disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.posts.nodes.map((post: Post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <div className="text-sm text-gray-500 mb-2">
            {format(new Date(post.date), 'd MMMM yyyy', { locale: es })}
          </div>
          <h2 className="text-xl font-semibold mb-3">
            {post.title}
          </h2>
        </article>
      ))}
    </div>
  );
}; 