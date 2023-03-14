import { defineStore } from 'pinia';
import {
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
      promoData: null,
      moviesCatalog: null,
      tvCatalog: null,
      moviesPopular: null,
      tvPopular: null,
      moviesAnimated: null,
      tvAnimated: null,
      moviesTopRated: null,
      tvTopRated: null,
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
    async setCatalog(func, name, page = 1) {
      const catalogRawList = await func(page);
      this[name] = await normalizeListMovie(catalogRawList);
    },
    setPromo(promoNames) {
      this.promoData = [];

      promoNames.movie.forEach(async (name) => {
        const rawMovie = await getPromoMovie(name);
        const movie = normalizePromoMovie(rawMovie);
        this.promoData.push(movie);
      });

      promoNames.tv.forEach(async (name) => {
        const rawTv = await getPromoTv(name);
        const tv = normalizePromoTv(rawTv);
        this.promoData.push(tv);
      });
    },
  },
});
