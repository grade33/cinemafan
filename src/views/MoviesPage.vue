<template>
  <div class="movies">
    <div class="container movies__container">
      <div class="movies__catalog-block">
        <CatalogComp
          v-if="catalog.list && filtersList.length"
          :list="catalog.list"
          :title="catalog.title"
          :filters-list="filtersList"
          @change-page="changeCatalogPage"
        />
      </div>
      <div class="movies__slides-block">
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
import SliderList from '@/components/SliderList.vue';
import CatalogComp from '@/components/CatalogComp.vue';

import { mapState, mapActions } from 'pinia';
import { useDataStore } from '@/stores/data.js';
import { getMovieGenres } from '../api/api';

export default {
  components: { SliderList, CatalogComp },
  data() {
    return {
      filtersList: [],
    };
  },

  computed: {
    ...mapState(useDataStore, [
      'animatedMovies',
      'topRatedMovies',
      'catalogMovies',
    ]),

    catalog() {
      return {
        title: 'The Most Popular Films',
        list: this.catalogMovies,
      };
    },

    slidesData() {
      return {
        topRatedMovies: { title: 'Top Rated Films', list: this.animatedMovies },
        animatedMovies: { title: 'Animated Films', list: this.topRatedMovies },
      };
    },
  },
  watch: {
    '$route.query.page': {
      handler: function (newPage) {
        this.setCatalogMovies(newPage);
      },
      immediate: true,
    },
  },
  async created() {
    const genres = {
      title: 'Genres',
      list: await getMovieGenres(),
    };
    this.filtersList.push(genres);
  },
  methods: {
    ...mapActions(useDataStore, ['setCatalogMovies']),

    changeCatalogPage(page) {
      this.setCatalogMovies(page);
      this.$router.push({ query: { page } });
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
}
</style>
