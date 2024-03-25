// store/index.js
import { createStore } from "vuex";
import ProductService from "../server/ProductService";

const productService = new ProductService();

export default createStore({
  state: {
    posts: [],
    isLoading: false,
    pageSize: 10,
    sortOrder: "asc",
    pageNumber: 1,
    searchText: "",
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_PAGE_NUMBER(state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    SET_SEARCH_TEXT(state, searchText) {
      state.searchText = searchText;
    },
    SET_SORT_ORDER(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
  },
  actions: {
    async fetchPosts({ commit, state }) {
      commit("SET_LOADING", true);
      const posts = await productService.getPosts();
      commit("SET_POSTS", posts);
      commit("SET_LOADING", false);
    },
    setSearchText({ commit }, searchText) {
      commit("SET_SEARCH_TEXT", searchText);
      commit("SET_PAGE_NUMBER", 1); // Reset page number when search text changes
    },
    toggleSortOrder({ commit, state }) {
      const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      commit("SET_SORT_ORDER", newSortOrder);
    },
    nextPage({ commit, state }) {
      commit("SET_PAGE_NUMBER", state.pageNumber + 1);
    },
    prevPage({ commit, state }) {
      commit("SET_PAGE_NUMBER", state.pageNumber - 1);
    },
  },
});
