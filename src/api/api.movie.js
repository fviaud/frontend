import axios from "axios";

const apiMovie = axios.create({
  baseURL: "https://api.themoviedb.org/4",
});

apiMovie.interceptors.request.use((req) => {
  req.headers["Authorization"] =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzcyMzFiNDhiMmY4ODVjMDgyNmZmYjFhMDk3Yjc0MCIsInN1YiI6IjVkNzhiNTJiMzk1NDlhMDAxMDk3YzdjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhUjygI9QeGNcGfdauDksNe7Xjvl1SjXj7fCVWgM_IU";
  return req;
});

const apiMovieMap = (m) => ({
  img: "https://image.tmdb.org/t/p/w500" + m.poster_path,
  title: m.title,
  details: `${m.release_date} | ${m.vote_average}/10 (${m.vote_count})`,
  description: m.overview,
});

export const getMovies = async (setState, page) => {
  try {
    const response = await apiMovie.get(
      "/discover/movie?language=fr-FR&page=" + page
    );
    setState((state) => ({
      values: [...state.values, ...response.data.results.map(apiMovieMap)],
      loading: false,
      hasMore: response.data.results.length > 0,
      error: false,
    }));
  } catch (error) {
    setState({ values: [], loading: false, error: error.message });
  }
};

export const getSearchMovies = async (setState, page, query) => {
  console.log(query);
  try {
    const response = await apiMovie.get(
      `/search/movie?query=${query}&language=fr-FR&page=` + page
    );
    setState((state) => ({
      values: [...state.values, ...response.data.results.map(apiMovieMap)],
      loading: false,
      hasMore: response.data.results.length > 0,
      error: false,
    }));
  } catch (error) {
    setState({ values: [], loading: false, error: error.message });
  }
};
