<template>
  <div class="home">
    <div class="container home__container">
      <PromoList v-if="promoList" :list="promoList" />

      <div class="home__slides-block">
        <template v-for="slider in slidesData" :key="slider.query">
          <SliderList
            v-if="slider.list"
            :list="slider.list"
            :title="slider.title"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useDataStore } from '@/stores/data.js';

import SliderList from '@/components/SliderList.vue';
import PromoList from '@/components/PromoList.vue';

export default {
  components: { SliderList, PromoList },
  computed: {
    ...mapState(useDataStore, [
      'popularMovies',
      'popularTv',
      'animatedMovies',
      'animatedTv',
      'topRatedMovies',
      'topRatedTv',
      'promoList',
    ]),

    slidesData() {
      return {
        popularMovies: { title: 'Popular Films', list: this.popularMovies },
        popularTv: { title: 'Popular TV Shows', list: this.popularTv },
        animatedMovies: { title: 'Animated Films', list: this.animatedMovies },
        animatedTv: { title: 'Animated TV Shows', list: this.animatedTv },
        topRatedMovies: { title: 'Top Rated Films', list: this.topRatedMovies },
        topRatedTv: { title: 'Top Rated TV Shows', list: this.topRatedTv },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 30px 0;
  padding-bottom: 120px;
  overflow: hidden;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 80px;
  }

  &__slides-block {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>
