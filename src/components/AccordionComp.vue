<template>
  <ul class="accordion">
    <li v-for="(num, idx) in itemsAmount" :key="num" class="accordion__item">
      <button class="accordion__head" @click="toggle(idx)">
        <slot :name="`header-${num}`"></slot>
      </button>
      <div ref="accordionBodies" class="accordion__body">
        <div class="accordion__content">
          <slot :name="`body-${num}`"></slot>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      ativeIndex: null,
    };
  },
  computed: {
    itemsAmount() {
      return Object.keys(this.$slots).filter((slotName) => {
        return slotName.startsWith('header-');
      }).length;
    },
  },
  methods: {
    toggle(idx) {
      this.$nextTick(() => {
        if (typeof this.ativeIndex === 'number' && this.ativeIndex !== idx) {
          const oldBody = this.$refs.accordionBodies[this.ativeIndex];
          oldBody.style.maxHeight = null;
        }

        this.ativeIndex = idx;
        const body = this.$refs.accordionBodies[idx];
        if (body.style.maxHeight) {
          body.style.maxHeight = null;
        } else {
          body.style.maxHeight = `${body.scrollHeight}px`;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.accordion {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__item {
    overflow: hidden;
    background: lighten(vars.$dark, 5);
    border-radius: 15px;
  }

  &__head {
    width: 100%;
    padding: 20px 24px;
    @include mix.h4;
  }

  &__body {
    @include mix.p-20;

    max-height: 0;
    transition: max-height 0.3s ease-in-out;
  }

  &__content {
    padding: 0 0 15px 30px;
  }
}
</style>
