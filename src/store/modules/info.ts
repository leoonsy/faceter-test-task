import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module
export default class Info extends VuexModule {
  // Состояние загрузки между изменениями маршрутов
  routeLoading = false;
  // Произошло ли какое-либо исключение
  error: any = false;

  @Mutation
  setRouteLoading(loading: boolean) {
    this.routeLoading = loading;
  }
  @Mutation
  setError(error: any) {
    this.error = error;
  }
}
