<template>
  <section class="planet">
    <Loader v-if="loading" class="planet__loader" />
    <div v-else-if="planet" class="container">
      <div class="planet__name">
        {{ planet.name }}
      </div>
      <div class="planet__characters">Characters</div>
      <ul class="planet__list">
        <li class="planet__item">
          <strong>Population: </strong><span>{{ planet.population }}</span>
        </li>
        <li class="planet__item">
          <strong>Climate: </strong><span>{{ planet.climate }}</span>
        </li>
        <li class="planet__item">
          <strong>Diameter: </strong><span>{{ planet.diameter }} km</span>
        </li>
        <li class="planet__item">
          <strong>Rotation period: </strong
          ><span>{{ planet.rotation_period }} hours</span>
        </li>
        <li class="planet__item">
          <strong>Orbital period: </strong
          ><span>{{ planet.orbital_period }} days</span>
        </li>
        <li class="planet__item">
          <strong>Gravity: </strong><span>{{ planet.gravity }}</span>
        </li>
        <li class="planet__item">
          <strong>terrain : </strong><span>{{ planet.terrain }}</span>
        </li>
        <li class="planet__item">
          <strong>Surface water : </strong
          ><span>{{ planet.surface_water }}%</span>
        </li>
      </ul>
    </div>
    <div v-else class="planet__not-found">
      <h3>Planet not found.</h3>
    </div>
  </section>
</template>

<script lang="ts">
import Loader from "@/components/Loader.vue";
import { Vue, Component } from "vue-property-decorator";

// eslint-disable-next-line no-unused-vars
import { IPlanet } from "@/api/types";
import { Action } from "vuex-class";

@Component({
  components: {
    Loader
  },
  metaInfo(this: Planet) {
    return {
      title: this.loading ? "Loading..." : this.planet!.name
    };
  }
})
export default class Planet extends Vue {
  loading: boolean = true;
  planet: IPlanet | null = null;

  async created() {
    try {
      this.planet = await this.getPlanetById(+this.$route.params.id);
    } catch (e) {}

    this.loading = false;
  }

  @Action("getPlanetById") getPlanetById!: (id: number) => Promise<IPlanet>;
}
</script>
<style lang="scss" scoped>
.planet {
  margin: 40px 0;
  height: 100%;
  text-align: center;

  &__name {
    padding: 20px 20px;
    font-size: 1.5rem;
    font-weight: 500;
    background: #474747;
    color: #fff;
    border-radius: 15px 15px 0 0;
  }

  &__loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__characters {
    padding: 15px;
    font-size: 1.3rem;
    background: $primary;
    color: #fff;
  }

  &__list {
    list-style: none;
  }

  &__item {
    background: #e7f1fa;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;

    span {
      text-align: right;
    }

    strong {
      font-weight: 500;
    }

    padding: 15px;

    &:nth-child(even) {
      background-color: #ffffff;
    }
  }

  &__not-found {
    height: 100%;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    @media (max-width: 450px) {
      max-width: 100%;
      padding: 0;
    }
  }
}
</style>
