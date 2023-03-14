<template>
  <div class="movies">
    <div class="container movies__container">
      <div class="movies__catalog-block">
        <h1 class="movies__title">The Most Popular Films</h1>
        <CatalogComp
          :media-catalog="moviesCatalog"
          @change-page="changeCatalogPage"
        />
      </div>
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
import CatalogComp from '../components/CatalogComp.vue';

import { mapState, mapActions } from 'pinia';
import { useDataStore } from '@/stores/data.js';

import { getMoviesPopular } from '@/api/api.js';

export default {
  components: { SliderList, CatalogComp },
  computed: {
    ...mapState(useDataStore, [
      'moviesAnimated',
      'moviesTopRated',
      'moviesCatalog',
    ]),

    mediaData() {
      return {
        moviesTopRated: { title: 'Top Rated Films', list: this.moviesAnimated },
        moviesAnimated: { title: 'Animated Films', list: this.moviesTopRated },
      };
    },
  },
  created() {
    console.log(this.moviesCatalog);
  },
  methods: {
    ...mapActions(useDataStore, ['setCatalog']),

    changeCatalogPage(page) {
      console.log(page);
      this.setCatalog(getMoviesPopular, 'moviesCatalog', page);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.movies {
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

  &__catalog-block {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  &__title {
    @include mix.h1;
  }
}
</style>
