<template>
  <section class="statistics">
    <Loader v-if="loading" class="statistics__loader" />
    <div v-else class="container">
      <div class="statistics__header">
        Total count of Star Wars objects:
      </div>
      <ul class="statistics__list">
        <li
          v-for="statistic of statistics"
          :key="statistic.name"
          class="statistics__item"
        >
          <div class="statistics__name">{{ statistic.name }}:</div>
          <div class="statistics__count">{{ statistic.count }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import Loader from "@/components/Loader.vue";
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
// eslint-disable-next-line no-unused-vars
import { IStatistics } from "@/api/types";
// eslint-disable-next-line no-unused-vars
import Planet from "@/views/Planet.vue";

@Component({
  components: {
    Loader
  },
  metaInfo(this: Planet) {
    return {
      title: "Statistics"
    };
  }
})
export default class Statistics extends Vue {
  statistics: IStatistics = [];
  loading = true;

  async created() {
    try {
      this.statistics = await this.getStatistics();
    } catch {}

    this.loading = false;
  }

  @Action("getStatistics")
  getStatistics!: () => Promise<IStatistics>;
}
</script>

<style lang="scss">
.statistics {
  padding: 30px 0;
  height: 100%;
  position: relative;

  &__loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__header {
    font-size: 1.5rem;
    text-align: center;
  }

  &__list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px 0;
  }

  &__item {
    display: flex;
    margin: 15px;
  }

  &__name {
    padding: 10px 15px;
    background-color: $primary;
    color: #fff;
  }

  &__count {
    padding: 10px 15px;
    background-color: #d7d7d7;
  }
}
</style>
