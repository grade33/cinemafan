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
  getPopularLastYearMovies,
  getPopularLastYearTv,
  getAnimatedMovies,
  getAnimatedTv,
  getTopRatedMovies,
  getTopRatedTv,
} from '@/api/api.js';

export default {
  components: { TheHeader, TheFooter },
  data() {
    return {
      promoNames: {
        movie: ['Fight Club'],
        tv: ['House of Dragon', 'Better Call Saul', 'Fear The Walking Dead'],
      },
    };
  },
  created() {
    this.setMovies(getPopularLastYearMovies, 'popularMovies');
    this.setTvShows(getPopularLastYearTv, 'popularTv');

    this.setMovies(getAnimatedMovies, 'animatedMovies');
    this.setTvShows(getAnimatedTv, 'animatedTv');

    this.setMovies(getTopRatedMovies, 'topRatedMovies');
    this.setTvShows(getTopRatedTv, 'topRatedTv');
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
