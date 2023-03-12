import axios from 'axios';

export const apiPaths = {
  basePath: 'https://api.themoviedb.org/3',
  APIKey: 'c6f47a5e59ca4c3c897aaef4440a616c',
  imgSrc: 'https://image.tmdb.org/t/p',
  imgW500: '/w500',
  imgOriginal: '/original',
};

function getMediaList(mediaType, querySettings) {
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

export async function getMovieWithId(id) {
  const urlMovie = new URL(apiPaths.basePath + `/movie/${id}`);
  urlMovie.searchParams.append('api_key', apiPaths.APIKey);

  const urlCredits = new URL(apiPaths.basePath + `/movie/${id}/credits`);
  urlCredits.searchParams.append('api_key', apiPaths.APIKey);

  const movieData = (await axios.get(urlMovie)).data;
  const creditsData = (await axios.get(urlCredits)).data;

  return Object.assign({}, movieData, creditsData);
}
export async function getTvWithId(id) {
  const urlMovie = new URL(apiPaths.basePath + `/tv/${id}`);
  urlMovie.searchParams.append('api_key', apiPaths.APIKey);

  const urlCredits = new URL(apiPaths.basePath + `/tv/${id}/credits`);
  urlCredits.searchParams.append('api_key', apiPaths.APIKey);

  const movieData = (await axios.get(urlMovie)).data;
  const creditsData = (await axios.get(urlCredits)).data;

  return Object.assign({}, movieData, creditsData);
}

export function getMoviesPopular() {
  return getMediaList('/discover/movie', {
    'primary_release_date.gte': '2022-02-15',
    without_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getMoviesTopRated() {
  return getMediaList('/discover/movie', {
    'vote_count.gte': '10000',
    without_genres: '16',
    sort_by: 'vote_count.desc',
    with_original_language: 'en',
  });
}
export function getAnimatedMovies() {
  return getMediaList('/discover/movie', {
    'primary_release_date.gte': '2022-02-15',
    with_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}

export function getTvPopular() {
  return getMediaList('/discover/tv', {
    with_status: '0',
    'first_air_date.gte': '2020-01-01',
    without_genres: '16,10764,10763',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}
export function getTvTopRated() {
  return getMediaList('/discover/tv', {
    'vote_count.gte': '6000',
    without_genres: '16,10764,10763',
    sort_by: 'vote_average.desc',
    with_original_language: 'en',
  });
}
export function getAnimatedTv() {
  return getMediaList('/discover/tv', {
    with_status: '0',
    with_genres: '16',
    sort_by: 'popularity.desc',
    with_original_language: 'en',
  });
}

function getMovieGenreList() {
  const url = new URL(apiPaths.basePath + '/genre/movie/list');
  url.searchParams.append('api_key', apiPaths.APIKey);

  return axios
    .get(url)
    .then((response) => {
      const genres = response.data.genres;
      return genres;
    })
    .catch((error) => console.log(error));
}
function getTvGenreList() {
  const url = new URL(apiPaths.basePath + '/genre/tv/list');
  url.searchParams.append('api_key', apiPaths.APIKey);

  return axios
    .get(url)
    .then((response) => {
      const genres = response.data.genres;
      return genres;
    })
    .catch((error) => console.log(error));
}

export function normalizePosterMovie(rawMovie) {
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
export function normalizePosterTv(rawTv) {
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
  const movieGenreList = await getMovieGenreList();
  return rawList.map((rawItem) => {
    const id = rawItem.id;
    const name = rawItem.title;
    const release = new Date(rawItem.release_date).getFullYear();
    const genre = movieGenreList.find(
      (genre) => genre.id == rawItem.genre_ids[0]
    ).name;
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
}
export async function normalizeListTv(rawList) {
  const tvGenreList = await getTvGenreList();
  return rawList.map((rawItem) => {
    const id = rawItem.id;
    const name = rawItem.name;
    const release = new Date(rawItem.first_air_date).getFullYear();
    const genre =
      tvGenreList.find((genre) => genre.id == rawItem.genre_ids[0])?.name || '';
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
}
