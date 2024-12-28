import { createStore } from "vuex";

const store = createStore({
  state: {
    photos: [
      {
        id: 1,
        name: "Photo1",
        description: "Lorem ipsum",
        date: "23-12-2024",
        location: "California",
        url: "sraczka",
      },
      {
        id: 2,
        name: "Photo2",
        description: "Lorem ipsum",
        date: "23-12-2024",
        location: "California",
        url: "sraczka",
      },
    ],
  },
  mutations: {
    addPhoto(state, photo) {
      state.photos.push(photo);
    },
  },
  actions: {
    updateResults({ commit }, photos) {
      commit("addPhoto", photos);
    },
  },
  getters: {
    // getAllPhotos: (state) => () => {},
  },
});

export default store;
