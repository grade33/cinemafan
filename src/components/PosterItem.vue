<template>
  <RouterLink to="/" class="poster-item">
    <div class="poster-item__content">
      <div class="poster-item__name-block">
        <strong class="poster-item__name">{{ mediaItem.name }}</strong>
        <p class="poster-item__overview">{{ mediaItem.overview }}</p>
      </div>
      <ul class="poster-item__structure">
        <li class="poster-item__structure-item">
          <span class="poster-item__structure-name">Genre: </span>
          <span class="poster-item__structure-content">{{
            mediaItem.genres
          }}</span>
        </li>
        <li class="poster-item__structure-item">
          <span class="poster-item__structure-name">Directed By: </span>
          <span class="poster-item__structure-content">{{
            mediaItem.director
          }}</span>
        </li>
        <li class="poster-item__structure-item">
          <span class="poster-item__structure-name">Cast: </span>
          <span class="poster-item__structure-content">{{
            mediaItem.cast
          }}</span>
        </li>
      </ul>
    </div>
    <div class="poster-item__img-wrap">
      <img class="poster-item__img" :src="mediaItem.backdropPath" alt="" />
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    mediaItem: {
      type: Object,
      default: () => {},
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.poster-item {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 16px;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    background-image: linear-gradient(
      90deg,
      vars.$dark 45%,
      rgba(vars.$dark, 0.99) 50%,
      rgba(vars.$dark, 0) 100%
    );
    content: '';
  }

  &__content {
    position: relative;
    z-index: 4;
    display: flex;
    flex: none;
    flex-direction: column;
    gap: 20px;
    width: 45%;
    min-height: 450px;
    padding: 30px 0 45px 40px;
    background: vars.$dark;
  }

  &__name-block {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__name {
    @include mix.h1;
  }

  &__overview {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__structure {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: auto;

    &-item {
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    &-name {
      color: vars.$text-gray;
    }
  }

  &__img-wrap {
    margin-left: auto;
  }

  &__img {
    width: 100%;
    height: 100%;
    animation: poster-zoom 7s ease-in-out infinite alternate-reverse;
  }

  @keyframes poster-zoom {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(1.25);
    }
  }
}
</style>
