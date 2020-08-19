import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module
export default class Info extends VuexModule {
  routeLoading = false;
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
