<template>
  <nav class="navbar">
    <div class="container">
      <ul class="navbar__list">
        <li v-for="link of links" :key="link.name" class="navbar__item">
          <router-link
            class="navbar__link"
            active-class="active"
            :to="{ name: link.name }"
            :exact="link.exact === true"
          >
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  @Prop({ required: true }) readonly links!: object[];
}
</script>

<style lang="scss">
$menu-bg: #333;
$hover-link-color: #c4c4c4;
$active-link-color: $primary;
$menu-change-breakpoint: 400px;
$link-color: #fff;
$link-hover-color: #000;
$link-active-color: #fff;

.navbar {
  background-color: $menu-bg;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  &__list {
    list-style: none;
    display: flex;
    margin: 0;

    @media (max-width: $menu-change-breakpoint) {
      flex-direction: column;
      width: 100%;
    }
  }

  &__link {
    padding: 20px 25px;
    display: block;
    color: $link-color;

    &:hover {
      background-color: $hover-link-color;
      color: $link-hover-color;
    }

    &.active {
      background-color: $active-link-color;
      color: $link-active-color;
    }
  }

  .container {
    @media (max-width: $menu-change-breakpoint) {
      padding: 0;
    }
  }
}
</style>
