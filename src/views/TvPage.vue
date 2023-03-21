<template>
  <div class="tv">
    <div class="container tv__container">
      <div class="tv__catalog-block">
        <CatalogComp
          v-if="catalog.list"
          :list="catalog.list"
          :title="catalog.title"
          @change-page="changeCatalogPage"
        />
      </div>
      <div class="tv__slides-block">
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

export default {
  components: { SliderList, CatalogComp },
  computed: {
    ...mapState(useDataStore, ['animatedTv', 'topRatedTv', 'catalogTv']),

    catalog() {
      return {
        title: 'The Most Popular TV Shows',
        list: this.catalogTv,
      };
    },

    slidesData() {
      return {
        topRatedTv: { title: 'Top Rated TV Shows', list: this.animatedTv },
        animatedTv: { title: 'Animated TV Shows', list: this.topRatedTv },
      };
    },
  },
  watch: {
    '$route.query.page': {
      handler: function (newPage) {
        this.setCatalogTv(newPage);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(useDataStore, ['setCatalogTv']),

    changeCatalogPage(page) {
      this.setCatalogTv(page);
      this.$router.push({ query: { page } });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.tv {
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
