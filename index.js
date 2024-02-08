export const state = () => ({
    counter: 0
  })

  export const getters = {
    getCounter(state) {
      return state.counter
    }
  }

  export const mutations = {
    increment(state) {
      state.counter++
    }
  }

  export const actions = {
    async fetchCounter({ state }) {
      // make request
      const res = { data: 10 };
      state.counter = res.data;
      return res.data;
    }
  }


  import Vue from 'vue';
  import App from './App.vue';
  import EmployeeList from './pages/companies/_id/employees/index.vue'; // Sesuaikan path sesuai struktur proyek Anda

  Vue.config.productionTip = false;

  // Menggunakan komponen EmployeeList sebagai komponen global
  Vue.component('employee-list', EmployeeList);

  new Vue({
    render: h => h(App),
  }).$mount('#app');
