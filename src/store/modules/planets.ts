import { Module, VuexModule, Action } from "vuex-module-decorators";
import SWApi from "@/api/swapi";
// eslint-disable-next-line no-unused-vars
import { IGetRecordsSettings } from "@/api/types";

@Module
export default class Info extends VuexModule {
  /**
   * Получить информацию о планетах
   * @returns {Promise<[number, number]>} Общее число планет и получаемых за 1 запрос
   */
  @Action
  public async getPlanetsInfo() {
    try {
      return await SWApi.getPlanetsInfo();
    } catch (e) {
      this.context.commit("setError", e);
      throw e;
    }
  }

  /**
   * Получить требуемое количество планет
   */
  @Action
  public async getPlanets(planetsSettings: IGetRecordsSettings) {
    try {
      return await SWApi.getPlanets(planetsSettings);
    } catch (e) {
      this.context.commit("setError", e);
      throw e;
    }
  }

  /**
   * Возвращает планету по id
   */
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

  /**
   * Получить статистику из root
   */
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
