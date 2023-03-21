import axios from 'axios';

export const apiPaths = {
  basePath: 'https://api.themoviedb.org/3',
  APIKey: 'c6f47a5e59ca4c3c897aaef4440a616c',
  imgSrc: 'https://image.tmdb.org/t/p',
  imgW500: '/w500',
  imgOriginal: '/original',
};

function getFromApi(mediaType, querySettings = '') {
  const url = new URL(apiPaths.basePath + mediaType);
  url.searchParams.append('api_key', apiPaths.APIKey);

  Object.entries(querySettings).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getMovieGenres() {
  return (await getFromApi('/genre/movie/list')).genres;
}

export async function getTvGenres() {
  return (await getFromApi('/genre/tv/list')).genres;
}

export async function getPromoMovie(name) {
  const id = (await getFromApi(`/search/movie`, { query: name, page: 1 }))
    .results[0].id;

  const movieData = await getFromApi(`/movie/${id}`);
  const creditsData = await getFromApi(`/movie/${id}/credits`);

  return Object.assign({}, movieData, creditsData);
}
export async function getPromoTv(name) {
  const id = (await getFromApi(`/search/tv`, { query: name, page: 1 }))
    .results[0].id;

  const movieData = await getFromApi(`/tv/${id}`);
  const creditsData = await getFromApi(`/tv/${id}/credits`);

  return Object.assign({}, movieData, creditsData);
}

export function getAllPopularMovies(page = 1) {
  return getFromApi('/discover/movie', {
    page,
    'primary_release_date.gte': '2022-02-15',
    without_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}

export function getPopularMovies(page = 1) {
  return getFromApi('/discover/movie', {
    page,
    without_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getPopularTv(page = 1) {
  return getFromApi('/discover/tv', {
    page,
    with_status: '0',
    without_genres: '16,10764,10763',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getPopularLastYearMovies(page = 1) {
  return getFromApi('/discover/movie', {
    page,
    'primary_release_date.gte': '2022-02-15',
    without_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getPopularLastYearTv(page = 1) {
  return getFromApi('/discover/tv', {
    page,
    with_status: '0',
    'first_air_date.gte': '2020-01-01',
    without_genres: '16,10764,10763',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getTopRatedMovies(page = 1) {
  return getFromApi('/discover/movie', {
    page,
    'vote_count.gte': '10000',
    without_genres: '16',
    sort_by: 'vote_count.desc',
    with_original_language: 'en',
  });
}
export function getTopRatedTv(page = 1) {
  return getFromApi('/discover/tv', {
    page,
    'vote_count.gte': '6000',
    without_genres: '16,10764,10763',
    sort_by: 'vote_average.desc',
    with_original_language: 'en',
  });
}
export function getAnimatedMovies(page = 1) {
  return getFromApi('/discover/movie', {
    page,
    'primary_release_date.gte': '2022-02-15',
    with_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getAnimatedTv(page = 1) {
  return getFromApi('/discover/tv', {
    page,
    with_status: '0',
    with_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}

export function normalizePromoMovie(rawMovie) {
  const id = rawMovie.id;
  const name = rawMovie.title;
  const overview = rawMovie.overview;
  const release = new Date(rawMovie.release_date).getFullYear();
  const genres = rawMovie.genres.map((genre) => genre.name).join(', ');
  const rating = rawMovie.vote_average;
  const backdropPath =
    apiPaths.imgSrc + apiPaths.imgOriginal + rawMovie.backdrop_path;
  const director = rawMovie.crew.find(
    (member) => member.job === 'Director'
  ).name;
  const cast = rawMovie.cast
    .slice(0, 7)
    .map((actor) => actor.name)
    .join(', ');

  return {
    id,
    name,
    overview,
    release,
    genres,
    rating,
    backdropPath,
    director,
    cast,
  };
}
export function normalizePromoTv(rawTv) {
  const id = rawTv.id;
  const name = rawTv.name;
  const overview = rawTv.overview;
  const release = `${new Date(rawTv.first_air_date).getFullYear()} - ${
    rawTv.status === 'Ended' ? '...' : rawTv.last_air_date
  }`;
  const genres = rawTv.genres.map((genre) => genre.name).join(', ');
  const rating = rawTv.vote_average;
  const backdropPath =
    apiPaths.imgSrc + apiPaths.imgOriginal + rawTv.backdrop_path;
  const director = rawTv.created_by.map((member) => member.name).join(', ');
  const cast = rawTv.cast
    .slice(0, 7)
    .map((actor) => actor.name)
    .join(', ');
  return {
    id,
    name,
    overview,
    release,
    genres,
    rating,
    backdropPath,
    director,
    cast,
  };
}
export async function normalizeListMovie(rawList) {
  const page = rawList.page;
  const totalPages = rawList.total_pages > 500 ? 500 : rawList.total_pages;

  const tvGenreList = (await getFromApi('/genre/tv/list')).genres;
  const movieGenreList = (await getFromApi('/genre/movie/list')).genres;
  const genreList = [...tvGenreList, ...movieGenreList];

  const results = rawList.results.map((rawItem) => {
    const id = rawItem.id;
    const name = rawItem.title;
    const release = new Date(rawItem.release_date).getFullYear();
    const genre = genreList.find((genre) => {
      return genre.id == rawItem.genre_ids[0];
    })?.name;
    const rating = rawItem.vote_average;
    const posterPath = apiPaths.imgSrc + apiPaths.imgW500 + rawItem.poster_path;
    return {
      id,
      name,
      release,
      genre,
      rating,
      posterPath,
    };
  });

  return {
    results,
    page,
    totalPages,
  };
}
export async function normalizeListTv(rawList) {
  const page = rawList.page;
  const totalPages = rawList.total_pages > 500 ? 500 : rawList.total_pages;

  const tvGenreList = (await getFromApi('/genre/tv/list')).genres;
  const movieGenreList = (await getFromApi('/genre/movie/list')).genres;
  const genreList = [...tvGenreList, ...movieGenreList];

  const results = rawList.results.map((rawItem) => {
    const id = rawItem.id;
    const name = rawItem.name;
    const release = new Date(rawItem.first_air_date).getFullYear();
    const genre = genreList.find(
      (genre) => genre.id == rawItem.genre_ids[0]
    )?.name;
    const rating = rawItem.vote_average;
    const posterPath = apiPaths.imgSrc + apiPaths.imgW500 + rawItem.poster_path;
    return {
      id,
      name,
      release,
      genre,
      rating,
      posterPath,
    };
  });

  return {
    results,
    page,
    totalPages,
  };
}
