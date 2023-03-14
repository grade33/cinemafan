<template>
  <div class="pagination">
    <button
      v-for="page in paginationState"
      :key="page"
      class="pagination__btn"
      type="button"
      @click="$emit('change', page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
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
  emits: ['change'],
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
      if (this.currentPage + 2 < this.lastPage) paginationState.push(this.lastPage);

      return paginationState;
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

    display: block;
    min-width: 40px;
    padding: 3px 10px;
    text-align: center;
    background: vars.$dark;
    border-radius: 5px;
  }
}
</style>
