import axios from 'axios';

const API_URL = 'https://instaltancaments.com/wp-json/wp/v2';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2luc3RhbHRhbmNhbWVudHMuY29tIiwiaWF0IjoxNzQ3NTQ1NjU4LCJuYmYiOjE3NDc1NDU2NTgsImV4cCI6MTc0ODE1MDQ1OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.aCtPeC2n_cxlmuH9wTPcA_JmQsQnp71wrrO9oW8tHlo';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export const getPosts = async () => {
  try {
    const response = await api.get('/posts', {
      params: {
        _embed: true,
        per_page: 9
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPost = async (id: number) => {
  try {
    const response = await api.get(`/posts/${id}`, {
      params: {
        _embed: true
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
}; 