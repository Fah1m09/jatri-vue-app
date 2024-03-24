import { createStore } from "vuex";

export default createStore({
  state: {
    postsData: [],
    GrowthProgramIndicator: "",
  },
  getters: {},
  mutations: {
    setPostData(state, data) {
      state.postsData = data;
    },
    setGrowthProgramIndicator(state, data) {
      state.GrowthProgramIndicator = data;
    },
   
  },
  actions: {
    // async getChartPopup(SALES_PERIOD, Dist_NR) {
    //   const reportsSalesTracingSummary = new ReportsSalesTracingSummary();
    //   const salesTracingSummaryGraphData =
    //     await reportsSalesTracingSummary.getChartPopup(SALES_PERIOD, Dist_NR);
    //   this.commit("setChartPopupData", salesTracingSummaryGraphData);
    // },
  },
  modules: {},
});
