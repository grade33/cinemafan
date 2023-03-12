<template>
  <div class="footer">
    <div class="container footer__container">
      <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li class="footer__nav-item">
            <RouterLink to="/" class="footer__nav-link">Home</RouterLink>
          </li>
          <li class="footer__nav-item">
            <RouterLink to="/movies" class="footer__nav-link"
              >Movies</RouterLink
            >
          </li>
          <li class="footer__nav-item">
            <RouterLink to="/tv" class="footer__nav-link"> Tv </RouterLink>
          </li>
          <li class="footer__nav-item">
            <RouterLink to="/actors" class="footer__nav-link"
              >Actors</RouterLink
            >
          </li>
          <li class="footer__nav-item">
            <RouterLink to="/news" class="footer__nav-link">News</RouterLink>
          </li>
        </ul>
      </nav>
      <ul class="footer__social">
        <li class="footer__social-item">
          <a href="https://github.com/grade33" class="footer__social-link">
            <GithubIcon class="footer__social-icon" />
          </a>
        </li>
        <li class="footer__social-item">
          <a
            href="https://www.linkedin.com/in/3do/"
            class="footer__social-link"
          >
            <LinkedinIcon class="footer__social-icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import GithubIcon from '@/components/icons/GithubIcon.vue';
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue';

export default { components: { LinkedinIcon, GithubIcon } };
</script>

<style lang="scss" scoped>
@use '@/assets/scss/partials/variables' as vars;
@use '@/assets/scss/partials/mixins' as mix;

.footer {
  padding: 20px 0;
  background: vars.$bg-black;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }

  &__nav {
    &-list {
      display: flex;
      gap: 30px;
      align-items: center;
      width: fit-content;
    }

    &-link {
      color: rgba(vars.$white, 0.6);
      transition: color 0.3s ease-in-out;

      &:hover,
      &:focus-visible,
      &:active {
        color: vars.$white;
      }
    }
  }

  &__social {
    display: flex;
    gap: 15px;
    align-items: center;

    &-link {
      color: rgba(vars.$white, 0.6);

      &:hover,
      &:focus-visible,
      &:active {
        color: vars.$white;
      }
    }

    &-icon {
      width: 30px;
      height: 30px;
      transition: color 0.3s ease-in-out;
    }
  }
}
</style>
