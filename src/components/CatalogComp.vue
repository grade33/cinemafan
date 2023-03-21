<template>
  <div class="catalog">
    <h1 class="catalog__title">{{ title }}</h1>
    <FilterComp class="catalog__filter" :filters-list="filtersList" />
    <ul class="catalog__list">
      <li v-for="item in list.results" :key="item.id" class="catalog__item">
        <MediaItem :item="item" />
      </li>
    </ul>
    <PaginationComp
      :current-page="+list.page"
      :last-page="+list.totalPages"
      @change-page="$emit('changePage', $event)"
    />
  </div>
</template>

<script>
import MediaItem from '@/components/MediaItem.vue';
import PaginationComp from '@/components/PaginationComp.vue';
import FilterComp from '@/components/FilterComp.vue';

export default {
  components: { MediaItem, PaginationComp, FilterComp },
  props: {
    filtersList: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Object,
      required: true,
    },
  },
  emits: ['changePage'],
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.catalog {
  &__title {
    @include mix.h1;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 42px 32px;
    padding: 25px 0;
  }
}
</style>
