<template>
  <div class="home">
    <div class="container home__container">
      <PosterList :media-id-list="posterMediaData" />
      <template v-for="media in mediaData" :key="media.query">
        <SliderList
          v-if="media.list"
          :media-list="media.list"
          :title="media.title"
        />
      </template>
    </div>
  </div>
</template>

<script>
import SliderList from '@/components/SliderList.vue';

import {
  normalizeListMovie,
  normalizeListTv,
  getMoviesPopular,
  getTvPopular,
  getMoviesTopRated,
  getTvTopRated,
  getAnimatedMovies,
  getAnimatedTv,
} from '@/api/api.js';
import PosterList from '../components/PosterList.vue';

export default {
  components: { SliderList, PosterList },
  data() {
    return {
      posterMediaData: { movie: [], tv: [94997, 1396, 100088] },
      mediaData: {
        moviesPopular: { title: 'Popular Films', list: null },
        tvPopular: { title: 'Popular TV Shows', list: null },
        moviesAnimated: { title: 'Animated Films', list: null },
        tvAnimated: { title: 'Animated TV Shows', list: null },
        moviesTopRated: { title: 'Top Rated Films', list: null },
        tvTopRated: { title: 'Top Rated TV Shows', list: null },
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
  },
  methods: {
    async setMovies(func, name) {
      const fullList = (await func()).results;

      this.mediaData[name].list = await normalizeListMovie(fullList);
    },
    async setTvShows(func, name) {
      const fullList = (await func()).results;

      this.mediaData[name].list = await normalizeListTv(fullList);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 30px 0;
  overflow: hidden;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
</style>
