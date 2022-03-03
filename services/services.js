import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '51b4ee2954ef8c7fdaba40ac1ee374ba';

// Get poular movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  return resp.data.results;
};
// Get upcoming movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
  return resp.data.results;
};

// Get popular tv
export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`);
  return resp.data.results;
};

// Get family movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};

// Get documentarys
export const getDocumentaries = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};

// Get movie (detail)
export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
  return resp.data;
};
