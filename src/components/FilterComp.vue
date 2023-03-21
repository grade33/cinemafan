<template>
  <div class="filters">
    <button class="filters__btn" type="button" @click="isOpen = true">
      <FilterIcon class="filters__icon" />
      Filters
    </button>
    <Teleport to="#app">
      <Transition appear name="appearance">
        <div
          v-show="isOpen"
          class="filters__overlay"
          @click.self="isOpen = false"
        >
          <Transition appear name="slide">
            <div v-show="isOpen" class="filters__popup">
              <div class="filters__content">
                <ul
                  v-for="(filter, idx) in filtersList"
                  :key="filter"
                  class="filters__list"
                >
                  <li class="filters__item">
                    <AccordionComp>
                      <template #[`header-${idx+1}`]>{{
                        filter.title
                      }}</template>
                      <template #[`body-${idx+1}`]>
                        <ul v-for="item in filter.list" :key="item">
                          <li>
                            <button type="button">{{ item.name }}</button>
                          </li>
                        </ul>
                      </template>
                    </AccordionComp>
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import FilterIcon from '@/components/icons/FilterIcon.vue';
import AccordionComp from './AccordionComp.vue';

export default {
  components: { FilterIcon, AccordionComp },
  props: {
    filtersList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    console.log(this.filtersList[0].title, this.filtersList[0].list[0].name);
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.filters {
  position: relative;

  &__btn {
    display: flex;
    gap: 8px;
    align-items: center;
    width: fit-content;
    margin-left: auto;
    padding: 7px 18px;
    background: vars.$dark;
    border-radius: 12px;
    transition: background-color 0.3s ease-in-out;
    @include mix.h5;

    &:hover,
    &:focus-visible,
    &:active {
      background: lighten(vars.$dark, 15%);
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    background: rgba(vars.$dark, 0.4);
    border-radius: 12px;
    backdrop-filter: blur(3px);
  }

  &__popup {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40%;
    overflow-y: auto;
    background: vars.$dark;
    border-radius: 12px 0 0 12px;
    transition: transform 0.3s ease-in-out;
  }

  &__content {
    padding: 50px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.appearance-enter-active,
.appearance-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.appearance-enter-from,
.appearance-leave-to {
  opacity: 0;
}
</style>
