<template>
  <div class="app">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

import { mapActions } from 'pinia';
import { useDataStore } from '@/stores/data.js';

import {
  getMoviesPopular,
  getTvPopular,
  getAnimatedMovies,
  getAnimatedTv,
  getMoviesTopRated,
  getTvTopRated,
} from '@/api/api.js';

export default {
  components: { TheHeader, TheFooter },
  data() {
    return {
      promoNames: {
        movie: [],
        tv: ['House of Dragon', 'Fear The Walking Dead'],
      },
    };
  },
  created() {
    this.setMovies(getMoviesPopular, 'moviesPopular');
    this.setTvShows(getTvPopular, 'tvPopular');

    this.setMovies(getAnimatedMovies, 'moviesAnimated');
    this.setTvShows(getAnimatedTv, 'tvAnimated');

    this.setMovies(getMoviesTopRated, 'moviesTopRated');
    this.setTvShows(getTvTopRated, 'tvTopRated');

    this.setCatalog(getMoviesPopular, 'moviesCatalog');
    this.setCatalog(getTvPopular, 'tvCatalog');

    this.setPromo(this.promoNames);
  },
  methods: {
    ...mapActions(useDataStore, [
      'setMovies',
      'setTvShows',
      'setCatalog',
      'setPromo',
    ]),
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}
</style>
