import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { Getter } from "vuex-class";

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
