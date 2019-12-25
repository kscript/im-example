import Vue from 'vue';
import * as Vuex from 'vuex';
import StoreData from '@/store/state';
import Actions from '@/store/actions';
import Getters from '@/store/getters';
import Mutations from '@/store/mutations';

Vue.use(Vuex);
class StoreDataOptions implements Vuex.StoreOptions<StoreData> {
  public state: StoreData = new StoreData();
  public getters: Vuex.GetterTree<StoreData, StoreData> = Getters;
  public mutations: Vuex.MutationTree<StoreData> = Mutations;
  public actions: Vuex.ActionTree<StoreData, StoreData> = Actions;
}
export default new Vuex.Store(new StoreDataOptions());
