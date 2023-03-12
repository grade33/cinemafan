<template>
  <div class="poster-list">
    <Swiper
      :modules="modules"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true,
      }"
      :pagination="{
        clickable: true,
        el: '.poster-list__pagination',
        bulletClass: 'poster-list__pagination-bullet',
        bulletActiveClass: 'poster-list__pagination-bullet_active',
      }"
      :loop="true"
      :slides-per-view="1"
      :space-between="20"
      :speed="1500"
      :simulate-touch="false"
      watch-slides-progress
      class="poster-list__slider"
    >
      <SwiperSlide
        v-for="mediaItem in mediaList"
        :key="mediaItem.id"
        class="poster-list__item"
      >
        <PosterItem :media-item="mediaItem" />
      </SwiperSlide>

      <div class="poster-list__pagination"></div>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import {
  getMovieWithId,
  getTvWithId,
  normalizePosterMovie,
  normalizePosterTv,
} from '../api/api';

import PosterItem from './PosterItem.vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
    PosterItem,
  },
  props: {
    mediaIdList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mediaList: [],
      modules: [Pagination, Autoplay],
    };
  },
  created() {
    this.mediaIdList.movie.forEach(async (id) => {
      const rawMovie = await getMovieWithId(id);
      const movie = normalizePosterMovie(rawMovie);
      this.mediaList.push(movie);
    });

    this.mediaIdList.tv.forEach(async (id) => {
      const rawTv = await getTvWithId(id);
      const tv = normalizePosterTv(rawTv);
      this.mediaList.push(tv);
    });
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.poster-list {
  position: relative;

  &__pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    z-index: 5;
    display: flex;
    width: fit-content;
    transform: translateX(-50%);

    :deep(.poster-list__pagination-bullet) {
      display: block;
      width: 10px;
      height: 10px;
      margin: 4px;
      background-color: rgba(vars.$white, 0.3);
      border-radius: 50%;
      cursor: pointer;
    }

    :deep(.poster-list__pagination-bullet_active) {
      background-color: vars.$white;
    }
  }
}
</style>
