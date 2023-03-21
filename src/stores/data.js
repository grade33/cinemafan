import { defineStore } from 'pinia';
import {
  getPopularMovies,
  getPopularTv,
  getPromoMovie,
  getPromoTv,
  normalizeListMovie,
  normalizeListTv,
  normalizePromoMovie,
  normalizePromoTv,
} from '../api/api';

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      promoList: null,
      catalogMovies: null,
      catalogTv: null,
      popularMovies: null,
      popularTv: null,
      animatedMovies: null,
      animatedTv: null,
      topRatedMovies: null,
      topRatedTv: null,
    };
  },

  actions: {
    async setMovies(func, name) {
      const rawList = await func();
      this[name] = (await normalizeListMovie(rawList)).results;
    },
    async setTvShows(func, name) {
      const rawList = await func();
      this[name] = (await normalizeListTv(rawList)).results;
    },
    async setCatalogMovies(page = 1) {
      const catalogRawList = await getPopularMovies(page);
      this.catalogMovies = await normalizeListMovie(catalogRawList);
    },
    async setCatalogTv(page = 1) {
      const catalogRawList = await getPopularTv(page);
      this.catalogTv = await normalizeListTv(catalogRawList);
    },
    setPromo(promoNames) {
      this.promoList = [];

      const moviePromises = promoNames.movie.map(async (name) => {
        const rawMovie = await getPromoMovie(name);
        console.log(rawMovie);
        return normalizePromoMovie(rawMovie);
      });
      Promise.all(moviePromises).then((movieArr) => {
        movieArr.forEach((movie) => {
          this.promoList.push(movie);
        });
      });

      const tvPromises = promoNames.tv.map(async (name) => {
        const rawTv = await getPromoTv(name);
        return normalizePromoTv(rawTv);
      });
      Promise.all(tvPromises).then((tvArr) => {
        tvArr.forEach((tv) => {
          this.promoList.push(tv);
        });
      });
    },
  },
});
