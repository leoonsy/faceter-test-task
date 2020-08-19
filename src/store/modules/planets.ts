import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import SWApi from "@/api/swapi";
import { IGetPlanetsSettings } from "@/api/types";

@Module
export default class Info extends VuexModule {
  @Action
  public async getPlanetsInfo() {
    try {
      return await SWApi.getPlanetsInfo();
    } catch (e) {
      this.context.commit("setError", e);
      throw e;
    }
  }
  @Action
  public async getPlanets(planetsSettings: IGetPlanetsSettings) {
    try {
      return await SWApi.getPlanets(planetsSettings);
    } catch (e) {
      //this.context.commit("info/setError", e, { root: true });
      this.context.commit("setError", e);
      throw e;
    }
  }
  @Action
  public async getPlanetById(id: number) {
    try {
      return await SWApi.getPlanetById(id);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return null;
      }
      this.context.commit("setError", e);
      throw e;
    }
  }
  @Action
  public async getStatistics() {
    try {
      return await SWApi.getStatistics();
    } catch (e) {
      this.context.commit("setError", e);
      throw e;
    }
  }
}
