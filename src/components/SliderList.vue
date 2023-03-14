<template>
  <div class="slider">
    <h2 v-if="title" class="slider__title">{{ title }}</h2>
    <Swiper
      :modules="modules"
      :navigation="{
        prevEl: '.slider__btn_prev',
        nextEl: '.slider__btn_next',
      }"
      :slides-per-view="6"
      :slides-per-group="5"
      :space-between="23"
      :speed="700"
      watch-slides-progress
      :simulate-touch="false"
      class="slider__list"
    >
      <SwiperSlide
        v-for="mediaItem in mediaList"
        :key="mediaItem.id"
        class="slider__item"
      >
        <MediaItem :media-item="mediaItem" />
      </SwiperSlide>
      <button class="slider__btn slider__btn_prev">
        <ArrowRightIcon class="slider__btn-icon" />
      </button>
      <button class="slider__btn slider__btn_next">
        <ArrowRightIcon class="slider__btn-icon" />
      </button>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
import MediaItem from '@/components/MediaItem.vue';

export default {
  components: {
    ArrowRightIcon,
    Swiper,
    SwiperSlide,
    MediaItem,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    mediaList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      modules: [Navigation],
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/mixins' as mix;
@use '@/assets/scss/partials/variables' as vars;

.slider {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    @include mix.h2;
  }

  &__list {
    width: 100%;
    height: auto;
    overflow: visible;

    .swiper {
      &-button-prev,
      &-button-next {
        display: none !important;
        width: 50px;
        height: 50px;
        border-radius: 50%;

        &::after {
          content: none;
        }
      }
    }
  }

  &__item {
    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;

    &:not(.swiper-slide-visible) {
      visibility: hidden;
      opacity: 0;
    }
  }

  &__btn {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 3;

    &-icon {
      position: absolute;
      top: 96px;
      width: 42px;
      height: 42px;
      transition: transform 0.3s ease-in-out;
    }

    &_prev {
      left: 0;
      padding-right: 15px;
      padding-left: calc(100vw - var(--container) / 2);
      transform: translateX(-100%);

      svg {
        right: 0;
        transform: rotate(180deg) translateY(-50%);
      }

      &:hover,
      &:focus-visible,
      &:active {
        svg {
          transform: rotate(180deg) translateY(-50%) translateX(25%);
        }
      }
    }

    &_next {
      right: 0;
      padding-right: calc(100vw - var(--container) / 2);
      padding-left: 15px;
      transform: translateX(100%);

      svg {
        left: 0;
        transform: translateY(50%);
      }

      &:hover,
      &:focus-visible,
      &:active {
        svg {
          transform: translateX(25%) translateY(50%);
        }
      }
    }
  }
}
</style>
