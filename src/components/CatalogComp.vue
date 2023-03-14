<template>
  <div class="catalog">
    <ul class="catalog__list">
      <li
        v-for="mediaItem in mediaCatalog.results"
        :key="mediaItem.id"
        class="catalog__item"
      >
        <MediaItem :media-item="mediaItem" />
      </li>
    </ul>
    <PaginationComp
      :current-page="+mediaCatalog.page"
      :last-page="+mediaCatalog.totalPages"
      @change="$emit('changePage', $event)"
    />
  </div>
</template>

<script>
import MediaItem from './MediaItem.vue';
import PaginationComp from './PaginationComp.vue';

export default {
  components: { MediaItem, PaginationComp },
  props: {
    mediaCatalog: {
      type: Object,
      required: true,
    },
  },
  emits: ['changePage'],
  created() {
    console.log(this.mediaCatalog);
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.catalog {
  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 23px;
    margin-bottom: 32px;
  }
}
</style>
