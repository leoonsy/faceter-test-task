<template>
  <div class="planetCard">
    <h2 class="planetCard__name">
      {{ planet.name }}
    </h2>
    <ul class="planetCard__list">
      <li class="planetCard__item">
        <strong>Population: </strong>
        <span>{{ planet.population }}</span>
      </li>
      <li class="planetCard__item">
        <strong>Climate: </strong>
        <span>{{ planet.climate }}</span>
      </li>
      <li class="planetCard__item">
        <strong>Diameter: </strong>
        <span>{{ planet.diameter }} km</span>
      </li>
    </ul>
    <span class="planetCard__more">...</span>
    <router-link
      :to="{ name: 'planet', params: { id: planetId } }"
      tag="button"
      class="btn-reset planetCard__detail"
    >
      Read more
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IPlanet } from '@/api/types';

@Component
export default class PlanetCard extends Vue {
  @Prop({ required: true }) readonly planet!: IPlanet;

  /**
   * Формирует id планеты по ее URL
   */
  get planetId() {
    return this.planet.url.split('/').slice(-2, -1)[0];
  }
}
</script>
<style lang="scss">
.planetCard {
  background: #e2e2e2;
  padding-bottom: 20px;

  &__name {
    text-align: center;
    font-size: 1.6rem;
    background: $primary;
    color: #fff;
    padding: 20px;
  }

  &__detail {
    margin: 0 auto;
    display: block;
    width: 120px;
    border: 2px solid #525252;
    color: #525252;
    padding: 6px 0;

    &:hover {
      color: #000000;
      border-color: #000000;
    }
  }

  &__list {
    list-style: none;
    padding: 20px;
    margin: 0;
  }

  &__item {
    margin: 6px 0;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;

    span {
      text-align: right;
    }

    strong {
      font-weight: 500;
    }
  }

  &__more {
    text-align: center;
    display: block;
    margin: 0 0 15px;
  }
}
</style>
