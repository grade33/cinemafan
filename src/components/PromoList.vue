<template>
  <div class="promo">
    <Swiper
      :modules="modules"
      :autoplay="{
        delay: 8000,
        pauseOnMouseEnter: true,
      }"
      :loop="true"
      :pagination="{
        clickable: true,
        el: '.promo__pagination',
        bulletClass: 'promo__pagination-bullet',
        bulletActiveClass: 'promo__pagination-bullet_active',
      }"
      :slides-per-view="1"
      :space-between="20"
      :speed="1500"
      :simulate-touch="false"
      watch-slides-progress
      class="promo__slider"
    >
      <SwiperSlide v-for="item in list" :key="item.id" class="promo__item">
        <PromoItem :item="item" />
      </SwiperSlide>

      <div class="promo__pagination"></div>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import PromoItem from '@/components/PromoItem.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    PromoItem,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.promo {
  position: relative;

  &__pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 5;
    display: flex;
    width: fit-content;
    transform: translateX(-50%);

    :deep(.promo__pagination-bullet) {
      display: block;
      width: 10px;
      height: 10px;
      margin: 4px;
      background-color: rgba(vars.$white, 0.3);
      border-radius: 50%;
      cursor: pointer;
    }

    :deep(.promo__pagination-bullet_active) {
      background-color: vars.$white;
    }
  }
}
</style>
