import { cloneDeep } from "lodash";

import { mutations, getters } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";
import pizza from "@/static/pizza.json";
import misc from "@/static/misc.json";

import VuexPlugins from "@/plugins/vuexPlugins";
import {
  normalizeDough,
  normalizeIngredient,
  normalizeSauce,
  normalizeSize,
} from "@/common/helpers/normalize.helper";

const initState = () => ({
  loading: false,
  appData: {
    dough: pizza.dough.map(normalizeDough),
    sauces: pizza.sauces.map(normalizeSauce),
    ingredients: pizza.ingredients.map(normalizeIngredient),
    sizes: pizza.sizes.map(normalizeSize),
    misc,
  },
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }
  return new Vuex.Store({
    state: initState(),
    mutations,
    getters,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
