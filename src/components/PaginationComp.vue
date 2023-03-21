<template>
  <div class="pagination">
    <button
      class="pagination__btn pagination__btn_prev"
      type="button"
      @click="changePage(currentPage - 1)"
    >
      <ArrowRightIcon />
    </button>

    <button
      v-for="page in paginationState"
      :key="page"
      class="pagination__btn"
      type="button"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination__btn pagination__btn_next"
      type="button"
      @click="changePage(currentPage + 1)"
    >
      <ArrowRightIcon />
    </button>
  </div>
</template>

<script>
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
export default {
  components: { ArrowRightIcon },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    lastPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['changePage'],
  computed: {
    paginationState() {
      const paginationState = [];
      if (this.currentPage - 2 > 1) paginationState.push(1);
      if (this.currentPage - 3 > 1) paginationState.push('...');

      for (let i = this.currentPage - 2; i < this.currentPage + 3; i++) {
        if (i >= 1 && i <= this.lastPage) {
          paginationState.push(i);
        }
      }

      if (this.currentPage + 3 < this.lastPage) paginationState.push('...');
      if (this.currentPage + 2 < this.lastPage)
        paginationState.push(this.lastPage);

      return paginationState;
    },
  },
  methods: {
    changePage(newPage) {
      if (!(newPage >= 1 && newPage <= this.lastPage)) return;
      this.$emit('changePage', newPage);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.pagination {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;

  &__btn {
    @include mix.h5;

    min-width: 40px;
    height: 100%;
    min-height: 40px;
    padding: 3px 10px;
    text-align: center;
    background: vars.$dark;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

    &:hover,
    &:focus-visible,
    &:active {
      background: lighten(vars.$dark, 15%);
    }

    svg {
      width: 20px;
      height: 20px;
    }

    &_prev {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
