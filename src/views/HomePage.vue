<template>
  <div class="home">
    <div class="container home__container">
      <PromoList />
      <div class="movies__slides-block">
        <template v-for="media in mediaData" :key="media.query">
          <SliderList
            v-if="media.list"
            :media-list="media.list"
            :title="media.title"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SliderList from '@/components/SliderList.vue';
import PromoList from '../components/PromoList.vue';

import { mapState } from 'pinia';
import { useDataStore } from '@/stores/data.js';

export default {
  components: { SliderList, PromoList },
  computed: {
    ...mapState(useDataStore, [
      'moviesPopular',
      'tvPopular',
      'moviesAnimated',
      'tvAnimated',
      'moviesTopRated',
      'tvTopRated',
      'promoData',
    ]),

    mediaData() {
      return {
        moviesPopular: { title: 'Popular Films', list: this.moviesPopular },
        tvPopular: { title: 'Popular TV Shows', list: this.tvPopular },
        moviesAnimated: { title: 'Animated Films', list: this.moviesAnimated },
        tvAnimated: { title: 'Animated TV Shows', list: this.tvAnimated },
        moviesTopRated: { title: 'Top Rated Films', list: this.moviesTopRated },
        tvTopRated: { title: 'Top Rated TV Shows', list: this.tvTopRated },
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
    gap: 50px;
  }
}
</style>
