<template>
  <section class="planets">
    <Loader v-if="loading" class="planets__loader" />
    <div v-else-if="planets.length" class="container">
      <div class="planets__settings settings">
        <label for="page-size" class="settings__page-text"
          >Number of planets per page:</label
        >
        <input
          id="page-size"
          class="settings__page-size"
          :class="{ error: errors.pageSize }"
          type="number"
          v-model.lazy.number="pageSize"
        />
        <p v-if="errors.pageSize" class="settings__error-info">
          The field must be natural, not exceeding {{ planetsCount }}.
        </p>
      </div>
      <div class="row">
        <div
          class="col-xl-3 col-lg-4 col-sm-6 col-12"
          v-for="planet of planets"
          :key="planet.name"
        >
          <Planet class="planets__item" :planet="planet" />
        </div>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <Paginate
            v-model="page"
            :page-count="pageCount"
            :click-handler="changePageHandler"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination pagination-lg'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
            :prev-link-class="'page-link'"
          >
          </Paginate>
        </div>
      </div>
    </div>
    <div v-else class="planets__not-found">
      <h3>Planets not found</h3>
    </div>
  </section>
</template>

<script lang="ts">
import Planet from "@/components/Planet.vue";
import Paginate from "vuejs-paginate";
import Loader from "@/components/Loader.vue";
import { Vue, Component, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";
// eslint-disable-next-line no-unused-vars
import { IGetPlanetsSettings, IPlanet } from "@/api/types";
// eslint-disable-next-line no-unused-vars
import { Route } from "vue-router";

@Component({
  components: {
    Loader,
    Planet,
    Paginate
  },
  beforeRouteUpdate(this: Planets, to: Route, _from: any, next: any) {
    this.setupPage(to);
    this.setupPlanets();

    next();
  },
  metaInfo() {
    return {
      title: "Planets"
    };
  }
})
export default class Planets extends Vue {
  loading = true;
  planets: IPlanet[] = [];
  planetsCount!: number;
  page!: number;
  pageSize: string | number = localStorage.getItem("pageSize") || 5;
  errors = {
    pageSize: false
  };
  pageCount!: number;
  metaInfo = {
    title: "About Us"
  };

  created() {
    this.setupPage(this.$route);
    this.setupPlanets();
  }

  setupPage(nextRoute: Route) {
    const nextRoutePage = nextRoute.query.page;
    if (nextRoutePage) {
      if (!(typeof nextRoutePage === "string" && /^\d+$/.test(nextRoutePage))) {
        this.$router.push({ name: "error" });
        return;
      }

      this.page = +nextRoutePage;
    } else this.page = 1;
  }

  async setupPlanets() {
    this.loading = true;
    try {
      const [planetsCount, planetsPerPage] = await this.getPlanetsInfo();
      this.planetsCount = planetsCount;
      this.pageCount = Math.ceil(this.planetsCount / +this.pageSize);
      const startPlanet = (this.page - 1) * +this.pageSize + 1;

      this.planets = await this.getPlanets({
        planetsPerPage,
        planetsCount,
        startPlanet,
        limit: +this.pageSize
      });
    } catch {}
    this.loading = false;
  }

  changePageHandler(page: number) {
    this.$router.push(`${this.$route.path}?page=${page}`);
  }

  @Watch("pageSize")
  async pageSizeChanged(newValue: string | number, oldValue: string | number) {
    if (oldValue === newValue) return;

    this.errors.pageSize = !(
      /^\d+$/.test(newValue.toString()) &&
      +newValue > 0 &&
      +newValue <= this.planetsCount
    );
    if (!this.errors.pageSize) {
      localStorage.setItem("pageSize", this.pageSize.toString());
      await this.setupPlanets();
    }
  }

  @Action("getPlanetsInfo")
  getPlanetsInfo!: () => Promise<[number, number]>;
  @Action("getPlanets") getPlanets!: (
    settings: IGetPlanetsSettings
  ) => Promise<IPlanet[]>;
}
</script>
<style lang="scss" scoped>
$error: red;

.planets {
  margin: 40px 0;
  position: relative;
  height: 100%;

  &__item {
    margin: 30px 0 0 0;
  }

  &__loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__not-found {
    height: 100%;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    @media (max-width: #{map-get($grid-breakpoints, 'md')}) {
      max-width: 100%;
    }

    @media (max-width: #{map-get($grid-breakpoints, 'sm')}) {
      padding: 0;
    }
  }
}

.settings {
  margin: 0 15px;

  &__page-text {
    font-size: 1.1rem;
    line-height: 2.2;
    margin-right: 15px;
  }

  &__page-size {
    border: 1px solid #000;
    outline: none;
    padding: 4px;
    border-radius: 5px;
    width: 60px;
    text-align: center;

    &.error {
      border-color: $error;
    }
  }

  &__error-info {
    color: $error;
    margin-top: 7px;
  }
}

.pagination {
  margin: 50px 0 0;
}
</style>
