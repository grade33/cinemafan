<template>
  <RouterLink to="/" class="media-item">
    <div class="media-item__img-block">
      <span
        v-if="mediaItem.rating"
        :class="{
          'media-item__rating_green': normalizedRating >= 7,
          'media-item__rating_red': normalizedRating < 5,
        }"
        class="media-item__rating"
      >
        {{ normalizedRating }}
      </span>
      <img
        class="media-item__img"
        :src="mediaItem.posterPath"
        :alt="mediaItem.name"
      />
    </div>
    <div class="media-item__text-block">
      <strong class="media-item__name">{{ mediaItem.name }}</strong>
      <div class="media-item__desc">
        <span class="media-item__year">{{ mediaItem.release }}</span>
        <span>,&nbsp;</span>
        <span class="media-item__genre">{{ mediaItem.genre }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: {
    mediaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    normalizedRating() {
      return this.mediaItem.rating.toFixed(1);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.media-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover,
  &:focus-visible,
  &:active {
    transform: scale(1.1);

    .media-item {
      &__img-block {
        &::before {
          border-color: rgba(vars.$purple, 0.5);
        }
      }
    }
  }

  &__img-block {
    position: relative;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: 4px solid transparent;
      border-radius: 16px;
      transition: border-color 0.3s ease-out;
      content: '';
    }
  }

  &__rating {
    @include mix.p-14;

    position: absolute;
    top: 7px;
    left: 7px;
    z-index: 5;
    display: inline-block;
    padding: 1px 6px;
    background: #808080;
    border-radius: 5px;

    &_green {
      background: #007b00;
    }

    &_red {
      background: #ff0b0b;
    }
  }

  &__img {
    border-radius: 16px;
  }

  &__text-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    @include mix.p-18;

    display: -webkit-box;
    overflow: hidden;
    font-weight: 500;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__desc {
    @include mix.p-13;

    display: -webkit-box;
    overflow: hidden;
    color: rgba(vars.$white, 0.5);
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
