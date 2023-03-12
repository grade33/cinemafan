<template>
  <div class="header">
    <div class="header__container container">
      <RouterLink to="/" class="header__logo">CinemaFan</RouterLink>

      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <RouterLink to="/movies" class="header__nav-link"
              >Movies</RouterLink
            >
          </li>
          <li class="header__nav-item">
            <RouterLink to="/tv" class="header__nav-link"> Tv </RouterLink>
          </li>
          <li class="header__nav-item">
            <RouterLink to="/actors" class="header__nav-link"
              >Actors</RouterLink
            >
          </li>
          <li class="header__nav-item">
            <RouterLink to="/news" class="header__nav-link">News</RouterLink>
          </li>
        </ul>
      </nav>

      <form class="header__search" action="#">
        <label class="visually-hidden" for="search">Search</label>
        <input
          id="search"
          class="header__search-field"
          type="search"
          placeholder="Search"
        />
        <button class="header__search-btn" type="submit" @click.prevent>
          <SearchLoupeIcon class="header__search-icon" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import SearchLoupeIcon from '@/components/icons/SearchLoupeIcon.vue';
export default {
  components: { SearchLoupeIcon },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.header {
  background: vars.$bg-black;

  &__container {
    display: flex;
    gap: 30px;
    align-items: center;
    height: 100px;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  &__logo {
    color: vars.$red;
    font-size: 42px;
    font-family: Building, sans-serif;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  &__nav {
    font-family: 'Adam.CG Pro', sans-serif;

    &-list {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    &-link {
      color: rgba(vars.$white, 0.6);
      transition: color 0.3s ease;

      &.router-link-active,
      &:hover,
      &:focus-visible,
      &:active {
        color: vars.$white;
      }
    }
  }

  &__search {
    position: relative;
    flex-grow: 1;
    color: rgba(vars.$white, 0.4);

    &:hover,
    &:focus-within {
      color: vars.$white;
    }

    &-field {
      padding-right: 50px;
    }

    &-btn {
      position: absolute;
      top: 50%;
      right: 0;
      height: 100%;
      padding: 0 10px;
      transform: translateY(-50%);
    }

    &-icon {
      width: 30px;
      height: 30px;
      transition: color 0.3s ease-in-out;
    }
  }
}
</style>
